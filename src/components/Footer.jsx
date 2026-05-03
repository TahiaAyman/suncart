import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-black text-orange-400">SunCart</h2>

          <p className="mt-3 max-w-md text-sm leading-7 text-gray-300">
            A modern summer essentials store for sunglasses, skincare, outfits,
            hydration products, and beach accessories.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">Contact Info</h3>

          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +880 1700 000000
            </p>

            <p className="flex items-center gap-2">
              <Mail size={16} /> support@suncart.com
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>

          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-300">
            <Link href="/" className="hover:text-orange-400">
              Home
            </Link>

            <Link href="/products" className="hover:text-orange-400">
              Products
            </Link>

            <Link href="/my-profile" className="hover:text-orange-400">
              My Profile
            </Link>

            <Link href="#" className="hover:text-orange-400">
              Privacy Policy
            </Link>
          </div>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-bold text-orange-300 hover:bg-orange-500 hover:text-white"
            >
              f
            </a>

            <a
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-bold text-orange-300 hover:bg-orange-500 hover:text-white"
            >
              ig
            </a>

            <a
              href="#"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-sm font-bold text-orange-300 hover:bg-orange-500 hover:text-white"
            >
              x
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SunCart. All rights reserved.
      </div>
    </footer>
  );
}