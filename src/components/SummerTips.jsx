import { Droplets, ShieldCheck, Shirt } from "lucide-react";

const tips = [
  {
    icon: ShieldCheck,
    title: "Use sunscreen daily",
    text: "Apply sunscreen before outdoor activities to protect your skin from harsh sunlight.",
  },
  {
    icon: Droplets,
    title: "Stay hydrated",
    text: "Carry a reusable water bottle and drink water regularly throughout the day.",
  },
  {
    icon: Shirt,
    title: "Choose breathable outfits",
    text: "Lightweight fabrics help you stay cool and comfortable during warm weather.",
  },
];

export default function SummerTips() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <div className="rounded-[2rem] bg-orange-500 p-6 md:p-10">
        <div className="mb-8">
          <p className="font-bold text-orange-100">Summer Care Tips</p>

          <h2 className="mt-2 text-3xl font-black text-white">
            Stay fresh under the sun
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {tips.map((tip) => {
            const Icon = tip.icon;

            return (
              <div key={tip.title} className="rounded-3xl bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-orange-600">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-lg font-black text-gray-900">
                  {tip.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {tip.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}