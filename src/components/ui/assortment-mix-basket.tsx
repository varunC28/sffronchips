import React from "react";

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-current flex-none"
    aria-hidden="true"
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.13-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
  </svg>
);

interface AssortmentMixBasketProps {
  className?: string;
}

export function AssortmentMixBasket({ className = "" }: AssortmentMixBasketProps) {
  const whatsappNumber = "919669955869";
  const whatsappMessage = encodeURIComponent(
    "Hello Indira Enterprises! I want to order the *Sffron Snack Assortment Mix Basket* to taste all 19 flavors. Please share the basket price, delivery timeline, and payment options for dispatch."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const highlights = [
    "All 19 Signature Snack Varieties Included",
    "Chips, Savory Rings, Upvas Namkeen & Popcorn",
    "Nitrogen Flushed for Guaranteed Crispness",
    "Direct Factory Dispatch from Indore",
  ];

  return (
    <section
      id="assortment-basket"
      className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 ${className}`}
    >
      <div className="relative rounded-3xl md:rounded-[36px] border border-white/10 bg-gradient-to-b from-[#111420]/75 via-[#0A0C13]/85 to-black/90 backdrop-blur-xl p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)]">
        {/* Background Ambient Glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: "#F15A24" }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "#25D366" }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* LEFT COLUMN: Assortment Basket Image Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] flex items-center justify-center">
              {/* Radial backdrop halo */}
              <div
                className="absolute inset-4 rounded-full blur-2xl opacity-25 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(229, 35, 42, 0.2) 60%, transparent 80%)",
                }}
              />

              <img
                src="/sffron-snack-flavours-gift-basket.webp"
                alt="Sffron Snack Flavours Gift Basket • Taste All 19 Flavors"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_24px_48px_rgba(0,0,0,0.9)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Details & Exclusive WhatsApp Order Action */}
          <div className="lg:col-span-6 flex flex-col items-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <span>All In One Tasting Hamper</span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Sffron Snack <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500">Assortment Mix Basket</span>
            </h2>

            {/* Subtitle / Tagline */}
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-relaxed mt-3 max-w-xl">
              Can&apos;t decide which crunch to enjoy first? Get our curated all flavor tasting basket featuring every authentic Indori chip, puffed ring, fasting falahari namkeen, and gourmet popcorn packet. Perfect for family teatime, gifting, or discovering your personal favorites.
            </p>

            {/* Highlights List - Seamlessly blending without boxed cards */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 my-6 w-full max-w-xl">
              {highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-none shadow-[0_0_8px_rgba(251,191,36,0.85)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* WhatsApp Only Order Action matching other green buttons across the website */}
            <div className="w-full pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                style={{
                  background:
                    "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                }}
                title="Order Sffron Assortment Mix Basket directly on WhatsApp"
              >
                <WhatsAppIcon />
                <span>Order on WhatsApp</span>
              </a>

              <p className="text-[11px] text-neutral-400 leading-snug mt-2.5">
                Your prefilled inquiry opens directly in WhatsApp. Handled by Indira Enterprises dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssortmentMixBasket;
