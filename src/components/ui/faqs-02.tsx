"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  id: string;
  category: "all" | "orders" | "products" | "wholesale" | "fasting";
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    id: "where-manufactured",
    category: "products",
    question: "Where are Sffron Snacks manufactured?",
    answer:
      "Sffron Snacks is manufactured by Indira Enterprises located at Lasudia Mori, Dewas Naka, Indore, Madhya Pradesh. Our modern facility produces fresh, hygienic snacks daily following authentic Indori recipes and strict quality standards.",
  },
  {
    id: "snack-pricing",
    category: "products",
    question: "What is the price of Sffron snack packs?",
    answer:
      "All 20 of our signature snacks, including Masala Rings, Cheese Balls, Ratlami Sev, Aloo Bhujia, Punjabi Tadka, Ragi Chips, Gourmet Popcorn, and Upvas Falahari Mix, are priced at a universal, affordable MRP of ₹10, making authentic Indori crunch accessible to everyone.",
  },
  {
    id: "how-to-order",
    category: "orders",
    question: "How do I place an order in Indore?",
    answer:
      "You can place an order directly through WhatsApp! Simply tap any 'Order on WhatsApp' button on this website or message us at +91 96699 55869 with your desired snacks and delivery location in Indore. Our team will promptly confirm your order and delivery schedule.",
  },
  {
    id: "wholesale-retailers",
    category: "wholesale",
    question: "Do you supply bulk orders for retail shopkeepers and supermarkets?",
    answer:
      "Yes! We partner with grocers, kirana stores, school canteens, and supermarkets across Indore and surrounding districts. We supply bulk carton boxes with attractive wholesale margins and consistent weekly restocking.",
  },
  {
    id: "fasting-upvas-mix",
    category: "fasting",
    question: "What makes Sffron Falahari Mix suitable for fasting (Upvas)?",
    answer:
      "Our Falahari Mixture is prepared exclusively with pure Sendha Namak (natural Himalayan rock salt) and festive fasting ingredients including golden potato salli, whole roasted peanuts, cashews, and sweet raisins. It contains zero ordinary table salt or prohibited spices.",
  },
  {
    id: "shelf-life",
    category: "products",
    question: "What is the shelf life and packaging quality?",
    answer:
      "Sffron snacks have a shelf life of 4 months from the manufacturing date. Every bag is packaged in airtight, multi-layer metallic barrier pouches with nitrogen flushing to keep the snacks perfectly crisp, fresh, and moisture-free.",
  },
  {
    id: "party-event-cartons",
    category: "orders",
    question: "Can I order custom assorted cartons for parties and events?",
    answer:
      "Yes! We regularly provide assorted cartons for birthday celebrations, weddings, corporate tea breaks, and festive gatherings. You can choose a custom mix of flavors in a single master carton. Inquire via WhatsApp for party discounts.",
  },
  {
    id: "distributorship-dealership",
    category: "wholesale",
    question: "How can I apply for a distributorship or dealership?",
    answer:
      "We are actively expanding our distribution network across Madhya Pradesh and neighboring states. If you are an experienced FMCG distributor or wholesaler, contact our sales leadership directly at +91 96699 55869 or send a wholesale inquiry on WhatsApp.",
  },
];

const CATEGORIES = [
  { label: "All Questions", value: "all" },
  { label: "Orders & Delivery", value: "orders" },
  { label: "Products & Taste", value: "products" },
  { label: "Wholesale & Stores", value: "wholesale" },
  { label: "Upvas / Fasting", value: "fasting" },
];

export function Faqs02() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<string[]>(["where-manufactured", "how-to-order"]);

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    selectedCategory === "all"
      ? FAQS_DATA
      : FAQS_DATA.filter((item) => item.category === selectedCategory);

  return (
    <section className="relative w-full pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(229,35,42,0.25)]">
            <span>Got Questions? We Have Answers</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">Questions</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            Everything you need to know about our authentic Indori snacks, universal ₹10 MRP, local delivery, wholesale cartons, and Upvas fasting specialties.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-red-500 text-white shadow-[0_0_20px_rgba(229,35,42,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-red-400 scale-105"
                      : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10 backdrop-blur-md"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Support & Contact Card */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-28">
            <div className="rounded-3xl border border-white/15 bg-[#0B0D14]/80 backdrop-blur-2xl p-6 sm:p-8 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),0_20px_48px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-4">
                <h3 className="text-lg font-bold text-white leading-tight">Need Instant Help?</h3>
                <p className="text-xs text-neutral-400 mt-1">Chat with Indira Enterprises</p>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-normal mb-6">
                Have a question not listed here, or want to order bulk chips cartons for an upcoming event in Indore? Connect directly with our team!
              </p>

              <div className="space-y-2 mb-6 text-xs sm:text-sm text-neutral-300">
                <p>Lasudia Mori, Dewas Naka, Indore, M.P.</p>
                <p>Monday to Saturday: 9:00 AM to 8:30 PM</p>
                <p className="text-white font-semibold">+91 96699 55869</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href="https://wa.me/919669955869?text=Hello%20Sffron%20Snacks!%20I%20have%20a%20question%20about%20your%20snacks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  style={{
                    background:
                      "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                  }}
                >
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:+919669955869"
                  className="w-full flex items-center justify-center px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-neutral-200 backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3)] hover:text-white transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <span>Direct Call Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-red-500/40 bg-[#0B0D14]/90 shadow-[0_12px_32px_rgba(229,35,42,0.15)]"
                      : "border-white/10 bg-[#0B0D14]/60 hover:border-white/20 hover:bg-[#0B0D14]/80"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 border ${
                        isOpen
                          ? "bg-red-500/20 text-red-400 border-red-500/40 rotate-180"
                          : "bg-white/5 text-neutral-400 border-white/10"
                      }`}
                    >
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal border-t border-white/5 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faqs02;