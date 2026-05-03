"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { addToCart } from "@/lib/cart-client";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-600">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-orange-500">
          {product.brand}
        </p>

        <h3 className="mt-1 text-lg font-black text-gray-900">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm font-bold text-gray-700">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            {product.rating}
          </p>

          <p className="text-xl font-black text-orange-600">
            ${product.price}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <ShoppingCart size={16} />
            Add
          </button>

          <Link
            href={`/products/${product.id}`}
            className="block rounded-2xl bg-gray-900 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-500"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}