"use client";

import products from "@/app/data/products.json";
import { addToCart } from "@/lib/cart-client";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const product = products.find((item) => String(item.id) === String(params.id));

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product);
    toast.success(`${product.name} added to cart`);
    router.push("/cart");
  };

  if (!product) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-20 text-center md:px-8">
        <h1 className="text-3xl font-black text-gray-950">
          Product not found
        </h1>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-white"
        >
          Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 font-bold text-orange-600"
      >
        <ArrowLeft size={18} /> Back to Products
      </Link>

      <div className="grid gap-10 rounded-[2rem] border border-orange-100 bg-white p-5 shadow-xl md:grid-cols-2 md:p-8">
        <div className="overflow-hidden rounded-[1.5rem]">
          <img
            src={product.image}
            alt={product.name}
            className="h-[420px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-600">
            {product.category}
          </span>

          <p className="mt-6 text-sm font-bold text-orange-500">
            {product.brand}
          </p>

          <h1 className="mt-2 text-4xl font-black text-gray-950">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap gap-4">
            <p className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2 font-bold text-gray-700">
              <Star size={17} className="fill-yellow-400 text-yellow-400" />
              {product.rating}
            </p>

            <p className="rounded-full bg-green-50 px-4 py-2 font-bold text-green-700">
              Stock: {product.stock}
            </p>
          </div>

          <p className="mt-6 text-4xl font-black text-orange-600">
            ${product.price}
          </p>

          <p className="mt-6 leading-8 text-gray-600">
            {product.description}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}