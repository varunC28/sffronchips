"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import type { Dish } from "./dish-orbit-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MobileDishHeroProps {
  dishes: Dish[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  onOrder?: (dish: Dish, index: number) => void;
}

// Mobile dynamic curved brush stroke path calculation (matching desktop GSAP arcPath)
function arcPath(
  a0: number,
  a1: number,
  cx: number,
  cy: number,
  r: number,
  w: number,
  steps = 40
): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push((cx + c * (r + h)).toFixed(1) + " " + (cy + s * (r + h)).toFixed(1));
    inner.push((cx + c * (r - h)).toFixed(1) + " " + (cy + s * (r - h)).toFixed(1));
  }
  return "M" + outer.join("L") + "L" + inner.reverse().join("L") + "Z";
}

const ARC_ANGLES: [number, number][] = [
  [46, 124],
  [40, 118],
  [52, 128],
  [44, 120],
];

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 fill-current flex-none" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
  </svg>
);

export function MobileDishHero({
  dishes,
  activeIndex = 0,
  onChange,
  onOrder,
}: MobileDishHeroProps) {
  const [index, setIndex] = useState(activeIndex);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const segRef = useRef(activeIndex);
  const isInternalScroll = useRef(false);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const n = dishes.length;
  const currentDish = dishes[index] || dishes[0];

  // Sync external activeIndex changes
  useEffect(() => {
    if (activeIndex !== undefined && activeIndex !== index) {
      setIndex(activeIndex);
      segRef.current = activeIndex;
    }
  }, [activeIndex]);

  // Height of scroll track: ~45vh per snack + 100vh initial viewport
  const scrollPerDish = 0.45;
  const trackHeight = `calc(${Math.max(1, n - 1)} * ${scrollPerDish * 100}vh + 100vh)`;

  // ScrollTrigger for Scroll-Based Progression
  useEffect(() => {
    const track = trackRef.current;
    if (!track || n <= 1) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (isInternalScroll.current) return;
        const seg = Math.min(n - 1, Math.max(0, Math.round(self.progress * (n - 1))));
        if (seg !== segRef.current) {
          segRef.current = seg;
          setIndex(seg);
          onChangeRef.current?.(seg);
        }
      },
    });

    stRef.current = trigger;
    return () => {
      trigger.kill();
      stRef.current = null;
    };
  }, [n]);

  const go = (next: number) => {
    const wrapped = ((next % n) + n) % n;
    setIndex(wrapped);
    segRef.current = wrapped;
    onChangeRef.current?.(wrapped);

    // Sync window scroll position with the selected snack if within the hero
    const st = stRef.current;
    if (st && n > 1) {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY >= st.start - 10 && scrollY <= st.end + 10) {
        isInternalScroll.current = true;
        const targetY = st.start + ((st.end - st.start) * wrapped) / (n - 1);
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setTimeout(() => {
          isInternalScroll.current = false;
        }, 500);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Detect intentional horizontal swipe (ignore vertical scrolling)
    if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        go(index + 1); // swipe left -> next snack
      } else {
        go(index - 1); // swipe right -> prev snack
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Calculate dynamic swoosh arc path matching current dish
  const currentArcPath = useMemo(() => {
    const [a0, a1] = ARC_ANGLES[((index % ARC_ANGLES.length) + ARC_ANGLES.length) % ARC_ANGLES.length];
    return arcPath(a0, a1, 160, -180, 310, 56);
  }, [index]);

  // Thumbnail window pagination (4 visible cards centered near active index)
  const visibleCount = 4;
  const startThumb = Math.max(0, Math.min(index - 1, n - visibleCount));

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: trackHeight }}
    >
      <section
        className="sticky top-0 w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between items-center text-white select-none px-3 z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT-RAIL MICRO-PAGER DOTS (Matching tablet/laptop dsh-pager) */}
        <aside
          className="absolute left-2.5 sm:left-4 top-[38%] -translate-y-1/2 flex flex-col items-center gap-1.5 z-20 py-2"
          aria-label="Snack catalog pager"
        >
          {dishes.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Jump to snack ${i + 1}`}
                className="p-0.5 group cursor-pointer"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-1.5 h-4 bg-red-500 shadow-[0_0_10px_rgba(229,35,42,0.9)] opacity-100"
                      : "w-1 h-1 bg-white/35 opacity-40 group-hover:opacity-80"
                  }`}
                />
              </button>
            );
          })}
        </aside>

        {/* TOP & MIDDLE MAIN GROUP */}
        <div className="w-full flex-1 flex flex-col items-center justify-center pt-16 sm:pt-18 z-10 max-h-[82vh]">
          {/* ZONE 1: TOP CHIPS PACKET WITH DYNAMIC SWOOSH ARC (Chips on Top) */}
          <div className="relative w-full max-w-[320px] h-[30vh] max-h-[250px] flex items-center justify-center mb-2 sm:mb-3">
            {/* Ambient Flavor Radial Glow */}
            <div
              className="absolute w-60 h-60 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-30"
              style={{
                background: currentDish.accent || "#E5232A",
              }}
            />

            {/* Dynamic Colored Swoosh Arc SVG (Identical to Desktop) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 380 240"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={currentArcPath}
                fill={currentDish.accent || "#E5232A"}
                opacity={0.88}
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {/* Centered Floating Chips Packet with Desktop Dual Drop-Shadow */}
            <img
              key={currentDish.image}
              src={currentDish.image}
              alt={currentDish.title + " " + currentDish.subtitle}
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_36px_rgba(0,0,0,0.85)] drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-300 pointer-events-none"
            />
          </div>

          {/* ZONE 2: PRODUCT IDENTITY & DETAILS (Text Below Chips) */}
          <a
            href="#assortment-basket"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 active:scale-95 transition-all mb-1.5"
          >
            <span>Taste All 19 Flavors: Assortment Basket ↓</span>
          </a>

          {/* Eyebrow in Brand Gold */}
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#FDB813] mb-1.5 leading-none drop-shadow-sm text-center">
            {currentDish.eyebrow ?? `#${index + 1} Best Selling Crunch`}
          </p>

          {/* Title: Thin Brand + Bold Extra-Black Subtitle */}
          <h2 className="leading-tight mb-2 text-center">
            <span className="block font-light text-sm sm:text-base text-neutral-200 tracking-tight mb-0.5">
              {currentDish.title}
            </span>
            <span className="block font-black text-2xl sm:text-3xl text-white tracking-tight uppercase drop-shadow-[0_3px_14px_rgba(0,0,0,0.6)]">
              {currentDish.subtitle}
            </span>
          </h2>

          {/* Crisp 2-Line Tagline / Description */}
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2 max-w-[320px] mx-auto mb-3.5 sm:mb-4 font-normal text-center px-3">
            {currentDish.tagline ?? currentDish.description}
          </p>

          {/* Liquid-Glass Badges Trio: Price + Weight + Glowing WhatsApp CTA */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2 sm:mb-3">
            {/* Price Pill */}
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-black text-white backdrop-blur-md border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_4px_16px_rgba(229,35,42,0.4)]"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 60%), rgba(229, 35, 42, 0.32)",
              }}
            >
              {currentDish.price ?? "MRP ₹10"}
            </span>

            {/* Weight Pill */}
            <span
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-100 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.5),0_4px_12px_rgba(0,0,0,0.3)]"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 60%), rgba(255, 255, 255, 0.08)",
              }}
            >
              {currentDish.weight ?? "28g Pack"}
            </span>

            {/* Order on WhatsApp CTA with Native Icon */}
            <button
              type="button"
              onClick={() => onOrder?.(currentDish, index)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all duration-200 border border-emerald-400/50 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_6px_20px_rgba(37,211,102,0.45)] hover:shadow-[inset_0_1px_2.5px_rgba(255,255,255,0.95),0_8px_24px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.38)",
              }}
            >
              <WhatsAppIcon />
              <span>Order on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* ZONE 3: THUMB-LEVEL CAROUSEL STRIP (Matching Desktop dsh-strip) */}
        <div className="w-full max-w-[400px] pb-4 sm:pb-6 pt-1 flex items-center justify-center gap-2 z-20 flex-none px-2">
          {/* Left Arrow Disc */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous snack"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/90 active:scale-90 hover:scale-105 transition-all flex-none border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_14px_rgba(0,0,0,0.3)] backdrop-blur-md cursor-pointer"
            style={{
              background:
                "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 60%), rgba(255, 255, 255, 0.08)",
            }}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Snack Liquid-Glass Mini Cards Window */}
          <div className="flex items-center gap-2 overflow-hidden py-1">
            {dishes.slice(startThumb, startThumb + visibleCount).map((d) => {
              const actualIndex = dishes.indexOf(d);
              const isActive = actualIndex === index;
              return (
                <button
                  key={actualIndex}
                  type="button"
                  onClick={() => go(actualIndex)}
                  className={`w-[68px] sm:w-[74px] h-[82px] sm:h-[88px] rounded-[14px] flex flex-col items-center justify-center p-1.5 gap-1 transition-all duration-300 flex-none cursor-pointer ${
                    isActive
                      ? "border-1.5 border-red-500/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_8px_20px_rgba(229,35,42,0.45)] scale-[1.04]"
                      : "border border-white/15 hover:border-white/30 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.25)] opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    background: isActive
                      ? "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0) 65%), rgba(229, 35, 42, 0.24)"
                      : "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0) 60%), rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <img
                    src={d.image}
                    alt=""
                    className={`w-9 h-9 sm:w-10 sm:h-10 object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
                      isActive ? "scale-110" : "scale-95"
                    }`}
                  />
                  <span className="text-[9px] font-semibold tracking-tight text-white/95 line-clamp-1 w-full text-center px-0.5">
                    {d.label ?? d.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow Disc */}
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next snack"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/90 active:scale-90 hover:scale-105 transition-all flex-none border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_4px_14px_rgba(0,0,0,0.3)] backdrop-blur-md cursor-pointer"
            style={{
              background:
                "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0) 60%), rgba(255, 255, 255, 0.08)",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default MobileDishHero;
