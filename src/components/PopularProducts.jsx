"use client";

import products from "@/app/data/products.json";
import ProductCard from "./ProductCard";
import Lottie from "lottie-react";

const fireAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 120,
  h: 120,
  nm: "Hot Deal Pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Pulse Circle",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [65] },
            { t: 30, s: [25] },
            { t: 60, s: [65] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [80, 80, 100] },
            { t: 30, s: [115, 115, 100] },
            { t: 60, s: [80, 80, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [70, 70] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.35, 0.05, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Small Dot",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100] },
            { t: 30, s: [70, 70, 100] },
            { t: 60, s: [50, 50, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [38, 38] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.65, 0.05, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

export default function PopularProducts() {
  const hotDeals = products.slice(0, 3);

  return (
    <section id="hot-deals" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-orange-500">Hot Deals</p>

            <div className="h-8 w-8">
              <Lottie animationData={fireAnimation} loop={true} />
            </div>
          </div>

          <h2 className="mt-2 text-3xl font-black text-gray-950 md:text-4xl">
            Today&apos;s summer deals
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-gray-600">
          Grab these seasonal favorites before the summer sale ends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {hotDeals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}