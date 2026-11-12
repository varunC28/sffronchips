"use client";
import React from "react";

interface WholesaleB2BBannerProps {
  onNavigateToContact?: () => void;
}

export function WholesaleB2BBanner({ onNavigateToContact }: WholesaleB2BBannerProps) {
  const whatsappUrl = `https://wa.me/919669955869?text=${encodeURIComponent(
    "Hello Indira Enterprises! I own a retail store / business in Indore and would like your wholesale carton price list and distributor details."
  )}`;

  const perks = [
    {
      title: "Direct Factory Margins",
      tagline: "Maximum Profitability Per Strip",
      desc: "Dispatched straight from the Indira Enterprises manufacturing facility in Lasudia Mori with zero middleman markups, ensuring top margins for your store.",
    },
    {
      title: "Low Trial MOQ (5 Cartons)",
      tagline: "Test Demand With Zero Risk",
      desc: "Mix and match across all 20 snack varieties in a single 5-carton starter order to discover what flies off your racks fastest before ordering in full pallet volume.",
    },
    {
      title: "Same-Day Indore Dispatch",
      tagline: "Daily Route Delivery",
      desc: "Reliable daily local dispatch covering Vijay Nagar, Palasia, Bhanwarkua, Sarafa, Rajwada, Annapurna, and Dewas Naka so your shelves stay stocked.",
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 text-white overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main Banner Shell with Liquid Glass Framing */}
        <div className="rounded-3xl sm:rounded-[36px] border border-white/15 bg-[#0B0D14]/85 backdrop-blur-2xl p-6 sm:p-10 lg:p-14 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_24px_64px_rgba(0,0,0,0.85)]">
          {/* Top Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/30 text-red-400 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(229,35,42,0.25)]">
              <span>Wholesale & Retail Distribution</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              Stock Sffron in{" "}
              <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                Your Store
              </span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
              Direct factory supply for kirana stores, supermarkets, pan shops, college canteens, and wedding caterers across Indore and Madhya Pradesh. Universal ₹10 pricing for lightning-fast customer repeat buys.
            </p>
          </div>

          {/* 3 Seamless Columns Blended Directly Into Background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10 sm:mb-12 pt-8 sm:pt-10 border-t border-white/10">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-start md:border-r md:border-white/10 md:last:border-r-0 md:pr-8 last:pr-0"
              >
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 block mb-1.5">
                  {perk.tagline}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                  {perk.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8 border-t border-white/10">
            {/* Primary WhatsApp Order / Price Sheet */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              style={{
                background:
                  "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
              }}
            >
              <span>Request Wholesale Price Sheet on WhatsApp ↗</span>
            </a>

            {/* Direct Call Pill */}
            <a
              href="tel:+919669955869"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-neutral-200 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Call Wholesale Desk: +91 96699 55869</span>
            </a>

            {/* Detailed Form Link */}
            {onNavigateToContact && (
              <button
                type="button"
                onClick={onNavigateToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm text-neutral-300 hover:text-white backdrop-blur-xl bg-transparent hover:bg-white/5 border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Detailed Inquiry Form</span>
              </button>
            )}
          </div>

          {/* Subtext info */}
          <p className="text-[11px] sm:text-xs text-neutral-400 text-center mt-5 font-normal">
            Factory & Wholesale Dispatch: Indira Enterprises, Lasudia Mori, Dewas Naka, Indore • Operational Monday to Saturday (9:00 AM – 8:30 PM)
          </p>
        </div>
      </div>
    </section>
  );
}

export default WholesaleB2BBanner;
