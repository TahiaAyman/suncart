import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:py-20">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 text-sm font-semibold text-orange-600 shadow-sm">
            <Sparkles size={16} />
            Hot Deals for Sunny Days
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-950 md:text-7xl">
            Summer Sale <span className="text-orange-500">50%</span>
            <br />
            <span className="text-amber-500">OFF</span> on Essentials
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
            Explore sunglasses, skincare, summer outfits, beach bags, and
            hydration products designed for a brighter, cooler season.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white transition hover:bg-orange-600"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#hot-deals"
              className="inline-flex items-center rounded-full border border-orange-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:bg-orange-50"
            >
              View Hot Deals
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-gradient-to-br from-orange-300 via-yellow-200 to-amber-100 p-5 shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.8rem]">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
                alt="Summer beach"
                className="h-[460px] w-full object-cover"
              />

              <div className="absolute bottom-6 left-6 rounded-[1.8rem] bg-white/95 p-5 shadow-xl">
                <p className="text-sm font-bold text-orange-500">
                  Limited Offer
                </p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">
                  Hot Deals 🔥
                </h3>
                <p className="mt-1 text-slate-500">Up to 50% discount</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}