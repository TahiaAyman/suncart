const brands = ["SunShade", "GlowCare", "SunnyWear", "HydroCool"];

export default function TopBrands() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-8 text-center">
        <p className="font-bold text-orange-500">Top Brands</p>

        <h2 className="mt-2 text-3xl font-black text-gray-950">
          Brands made for summer
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brands.map((brand) => (
          <div
            key={brand}
            className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 text-2xl font-black text-white">
              {brand.charAt(0)}
            </div>

            <h3 className="mt-5 text-xl font-black text-gray-900">{brand}</h3>

            <p className="mt-2 text-sm text-gray-500">Premium summer picks</p>
          </div>
        ))}
      </div>
    </section>
  );
}