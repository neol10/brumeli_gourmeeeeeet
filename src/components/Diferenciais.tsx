"use client";

import { Heart, Sparkles, Truck, Award } from "lucide-react";
import { brandConfig } from "../data/brand";

const iconMap = {
  Heart: Heart,
  Sparkles: Sparkles,
  Truck: Truck,
  Award: Award,
};

export default function Diferenciais() {
  return (
    <section className="py-16 md:py-20 bg-creme-200/40 border-y border-marrom/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {brandConfig.features.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;
            return (
              <div key={idx} className="flex flex-col items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-creme-100 flex items-center justify-center text-terracota border border-marrom/15 shadow-sm">
                  <IconComponent className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-medium text-marrom leading-snug mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-marrom/75 font-sans leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
