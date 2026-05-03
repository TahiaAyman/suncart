import products from "@/app/data/products.json";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Products | SunCart",
};

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="mb-10">
        <p className="font-bold text-orange-500">All Products</p>

        <h1 className="mt-2 text-4xl font-black text-gray-950">
          Summer essentials collection
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Browse seasonal products for skincare, beach trips, hydration,
          fashion, and daily outdoor comfort.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}