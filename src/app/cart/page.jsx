"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  clearCart,
  getCartItems,
  getCartTotal,
  removeFromCart,
} from "@/lib/cart-client";
import toast from "react-hot-toast";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = () => {
    setCartItems(getCartItems());
  };

  useEffect(() => {
    loadCart();

    window.addEventListener("suncart-cart-change", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("suncart-cart-change", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = getCartTotal(cartItems);

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="font-bold text-orange-500">Shopping Cart</p>

          <h1 className="mt-2 text-4xl font-black text-gray-950">
            Your selected products
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Review your selected summer items. Removing a product will
            automatically update total items and total price.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={handleClearCart}
            className="w-fit rounded-full bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[2rem] border border-orange-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-orange-100 text-orange-600">
            <ShoppingBag size={30} />
          </div>

          <h2 className="mt-5 text-2xl font-black text-gray-950">
            Your cart is empty
          </h2>

          <p className="mt-3 text-gray-600">
            Add products first. Your selected items will appear here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full rounded-2xl object-cover sm:w-32"
                />

                <div className="flex-1">
                  <p className="text-sm font-bold text-orange-500">
                    {item.brand}
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-950">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-sm font-semibold text-gray-600">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 font-black text-orange-600">
                    ${item.price} × {item.quantity} = $
                    {item.price * item.quantity}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={17} />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[2rem] border border-orange-100 bg-white p-6 shadow-lg">
            <p className="font-bold text-orange-500">Order Summary</p>

            <h2 className="mt-2 text-2xl font-black text-gray-950">
              Cart Total
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-orange-100 pb-4">
                <span className="font-semibold text-gray-600">
                  Total Items
                </span>

                <span className="text-xl font-black text-gray-950">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-600">
                  Total Price
                </span>

                <span className="text-3xl font-black text-orange-600">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <Link
              href="/products"
              className="mt-6 block rounded-2xl bg-gray-900 px-5 py-3 text-center font-bold text-white transition hover:bg-orange-500"
            >
              Add More Products
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}