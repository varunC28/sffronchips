"use client";
import React, { useState, useRef, useEffect } from "react";
import type { Dish } from "./dish-orbit-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileDishHeroProps {
  dishes: Dish[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  onOrder?: (dish: Dish, index: number) => void;
}

export function MobileDishHero({
  dishes,
  activeIndex = 0,
  onChange,
  onOrder,
}: MobileDishHeroProps) {
  const [index, setIndex] = useState(activeIndex);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== index) {
      setIndex(activeIndex);
    }
  }, [activeIndex]);

  const n = dishes.length;
  const currentDish = dishes[index] || dishes[0];

  const go = (next: number) => {
    const wrapped = ((next % n) + n) % n;
    setIndex(wrapped);
    onChange?.(wrapped);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        go(index + 1); // swipe left -> next
      } else {
        go(index - 1); // swipe right -> prev
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Thumbnail window pagination
  const visibleCount = 4;
  const startThumb = Math.max(0, Math.min(index - 1, n - visibleCount));

  return (
    <section
      className="relative w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-white select-none px-3"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Ambient Color Halo behind Product */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-30"
        style={{
          background: currentDish.accent || "#E5232A",
        }}
      />

      {/* TOP & MIDDLE GROUP: Packet + Details with balanced vertical spacing */}
      <div className="w-full flex-1 flex flex-col items-center justify-center pt-16 sm:pt-18 z-10 max-h-[82vh]">
        {/* Packet Image */}
        <div className="relative w-full max-w-[260px] h-[30vh] max-h-[270px] flex items-center justify-center mb-3 sm:mb-4">
          <img
            key={currentDish.image}
            src={currentDish.image}
            alt={currentDish.title + " " + currentDish.subtitle}
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300"
          />
        </div>

        {/* Eyebrow */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2 leading-none">
          {currentDish.eyebrow ?? `#${index + 1} Best Selling Crunch`}
        </p>

        {/* Title */}
        <h2 className="leading-tight mb-3 text-center">
          <span className="block font-light text-base sm:text-lg text-neutral-200 tracking-tight mb-0.5">
            {currentDish.title}
          </span>
          <span className="block font-black text-2xl sm:text-3xl text-white tracking-tight uppercase drop-shadow-md">
            {currentDish.subtitle}
          </span>
        </h2>

        {/* Tagline */}
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 max-w-[310px] mx-auto mb-4 sm:mb-5 font-normal text-center px-2">
          {currentDish.tagline ?? currentDish.description}
        </p>

        {/* Badges & Compact Matching WhatsApp Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2 sm:mb-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-red-500/20 border border-red-500/40 text-white backdrop-blur-md shadow-[0_2px_12px_rgba(229,35,42,0.35)]">
            {currentDish.price ?? "MRP ₹10"}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-neutral-200 backdrop-blur-md">
            {currentDish.weight ?? "28g Pack"}
          </span>
          <button
            type="button"
            onClick={() => onOrder?.(currentDish, index)}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white flex items-center justify-center transition-all duration-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_16px_rgba(37,211,102,0.4)] border border-emerald-400/40 active:scale-95 cursor-pointer hover:scale-105"
            style={{
              background:
                "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
            }}
          >
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* ZONE 3: THUMB-LEVEL SNACK SELECTOR STRIP (Bottom) */}
      <div className="w-full max-w-[380px] pb-4 sm:pb-6 pt-1 flex items-center justify-center gap-1.5 z-20 flex-none">
        {/* Left Arrow */}
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous snack"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 border border-white/15 text-neutral-300 hover:text-white active:scale-90 transition-all flex-none"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Snack Mini Cards Window */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          {dishes.slice(startThumb, startThumb + visibleCount).map((d) => {
            const actualIndex = dishes.indexOf(d);
            const isActive = actualIndex === index;
            return (
              <button
                key={actualIndex}
                type="button"
                onClick={() => go(actualIndex)}
                className={`w-[60px] h-[68px] rounded-xl flex flex-col items-center justify-center p-1 gap-1 transition-all duration-200 flex-none ${
                  isActive
                    ? "bg-red-500/25 border-2 border-red-500 shadow-[0_0_16px_rgba(229,35,42,0.5),inset_0_1px_2px_rgba(255,255,255,0.5)] scale-105"
                    : "bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300"
                }`}
              >
                <img
                  src={d.image}
                  alt=""
                  className="w-8 h-8 object-contain filter drop-shadow-md"
                />
                <span className="text-[8px] font-semibold tracking-tight text-white line-clamp-1 w-full text-center px-0.5">
                  {d.label ?? d.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next snack"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 border border-white/15 text-neutral-300 hover:text-white active:scale-90 transition-all flex-none"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default MobileDishHero;