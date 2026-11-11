"use client";
import React from "react";

interface BornInIndoreStoryProps {
  onNavigateToBlog?: () => void;
  onNavigateToContact?: () => void;
}

export function BornInIndoreStory({
  onNavigateToBlog,
  onNavigateToContact,
}: BornInIndoreStoryProps) {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 text-white overflow-hidden">
      {/* Ambient background warm glows */}
      <div className="absolute top-1/3 left-1/3 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Story Shell with Liquid Glass Framing */}
        <div className="rounded-3xl sm:rounded-[36px] border border-white/15 bg-[#0B0D14]/85 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_24px_64px_rgba(0,0,0,0.85)]">
          {/* Top Eyebrow & Headline */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/30 text-red-400 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(229,35,42,0.25)]">
              <span>Heritage & Craft</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Born in Indore,{" "}
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Crunched Across Malwa
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
              In Indore, food isn&apos;t just sustenance—it is an emotion. Sffron Snacks was founded to bottle the street-side magic of the country&apos;s culinary capital into everyday, accessible ₹10 treats.
            </p>
          </div>

          {/* 2-Column Blended Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pt-8 sm:pt-10 border-t border-white/10 mb-10 sm:mb-12">
            {/* Left Column: Flavor Tradition */}
            <div className="flex flex-col justify-between space-y-4 lg:border-r lg:border-white/10 lg:pr-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 block mb-2">
                  The Indori Flavor Legacy
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  Sarafa & 56 Dukan in Every Handful
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-3">
                  Indore&apos;s palate is famously exacting. A truly great snack cannot simply be salty or spicy—it demands an intricate interplay of tanginess, subtle sweetness, and deep savory crunch.
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  From our signature Masala Ring dusted with indigenous Malwa spices to our sacred Sendha Namak (Rock Salt) Falahari Mixture formulated for Navratri and Ekadashi fasting, we honor the recipes that built Indore&apos;s reputation as India&apos;s street food capital.
                </p>
              </div>
            </div>

            {/* Right Column: Modern Facility & Packaging */}
            <div className="flex flex-col justify-between space-y-4 lg:pl-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 block mb-2">
                  Modern Hygiene & Automation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  Factory-Gate Crispness Guaranteed
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-3">
                  Traditional taste meets modern food science at our Indira Enterprises production plant in Lasudia Mori, Dewas Naka. We fry in temperature-governed, fresh daily batches and immediately seal each pack with nitrogen-flush technology.
                </p>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  This seals in peak crunch and aroma without artificial preservatives, guaranteeing that a pack opened anywhere in Madhya Pradesh tastes just as fresh as if it had just left the fryer.
                </p>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8 border-t border-white/10">
            {onNavigateToBlog && (
              <button
                type="button"
                onClick={onNavigateToBlog}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-red-500/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(229,35,42,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(229,35,42,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background:
                    "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(229, 35, 42, 0.42)",
                }}
              >
                <span>Read Sffron Journal & Food Stories →</span>
              </button>
            )}

            {onNavigateToContact && (
              <button
                type="button"
                onClick={onNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-neutral-200 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Locate Dewas Naka Facility</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BornInIndoreStory;
