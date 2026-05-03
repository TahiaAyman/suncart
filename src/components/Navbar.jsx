"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { getCartItems } from "@/lib/cart-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/my-profile", label: "My Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    setCartItems(getCartItems());

    const updateCart = () => {
      setCartItems(getCartItems());
    };

    window.addEventListener("suncart-cart-change", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("suncart-cart-change", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    window.location.replace("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-300 text-white shadow-lg">
            <ShoppingBag size={22} />
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-orange-600">
              SunCart
            </h1>
            <p className="-mt-1 text-xs text-gray-500">Summer Essentials</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === link.href
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {mounted && user && (
            <>
              <Link
                href="/cart"
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                  pathname === "/cart"
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                }`}
              >
                <ShoppingCart size={18} />
                Cart
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-gray-900 px-2 text-xs text-white">
                  {totalItems}
                </span>
              </Link>

              <img
                src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt={user.name || "User"}
                className="h-10 w-10 rounded-full border-2 border-orange-200 object-cover"
              />

              <button
                onClick={handleLogout}
                className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Logout
              </button>
            </>
          )}

          {mounted && !user && (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-orange-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-orange-100 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                onClick={() => setOpen(false)}
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  pathname === link.href
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {mounted && user && (
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold ${
                  pathname === "/cart"
                    ? "bg-orange-500 text-white"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <ShoppingCart size={18} />
                  Cart
                </span>
                <span className="rounded-full bg-gray-900 px-2 py-1 text-xs text-white">
                  {totalItems}
                </span>
              </Link>
            )}

            <div className="mt-3 flex gap-2">
              {mounted && user ? (
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl bg-orange-50 px-4 py-3 text-center text-sm font-semibold text-orange-600"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}