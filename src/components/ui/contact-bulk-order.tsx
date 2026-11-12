"use client";
import React, { useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface ContactBulkOrderProps {
  onBackToHome?: () => void;
}

export function ContactBulkOrder({ onBackToHome }: ContactBulkOrderProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    phone: "",
    city: "Indore",
    orderType: "Retail Store Wholesale (Daily/Weekly)",
    quantity: "5 to 20 Cartons (Store Restock)",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate preformatted WhatsApp text
  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hello Indira Enterprises (Sffron Snacks Indore)! 👋\n\n` +
        `📦 *NEW BULK ORDER INQUIRY*\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *Name:* ${formData.fullName || "Prospective Buyer"}\n` +
        `🏢 *Business / Event:* ${formData.company || "Not specified"}\n` +
        `📞 *Contact:* ${formData.phone || "Not provided"}\n` +
        `📍 *Location:* ${formData.city || "Indore"}\n` +
        `📋 *Order Type:* ${formData.orderType}\n` +
        `🔢 *Quantity:* ${formData.quantity}\n` +
        `💬 *Flavors / Notes:* ${formData.message || "Please provide price list and carton details."}\n` +
        `━━━━━━━━━━━━━━━━━━━━\n` +
        `Looking forward to your quotation and delivery schedule!`
    );
  };

  const handleWhatsAppDirect = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/919669955869?text=${getWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: "",
      company: "",
      phone: "",
      city: "Indore",
      orderType: "Retail Store Wholesale (Daily/Weekly)",
      quantity: "5 to 20 Cartons (Store Restock)",
      message: "",
    });
  };

  return (
    <section className="relative w-full pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section matching user reference screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/30 text-red-400 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(229,35,42,0.25)]">
            <span>Bulk Orders & Inquiries</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
            Contact <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">us</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Looking for wholesale retail cartons, party & wedding snack boxes, or dealership inquiries in Indore and beyond? Reach out directly and let us know how we can serve you.
          </p>
        </div>

        {/* 2-Column Responsive Grid matching screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* LEFT COLUMN: "Get in touch" */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                Get in touch
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Reach out via any channel below. We typically respond within minutes for bulk inquiries and store orders.
              </p>
            </div>

            {/* Contact Channels Cards */}
            <div className="space-y-3.5">
              {/* WhatsApp Bulk Channel */}
              <a
                href="https://wa.me/919669955869?text=Hello%20Indira%20Enterprises!%20I%20would%20like%20to%20inquire%20about%20bulk%20orders%20and%20wholesale%20cartons."
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      WhatsApp Bulk Desk
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Chat ↗
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mt-1">
                  +91 96699 55869
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Instant chat & carton quotes</p>
              </a>

              {/* Direct Phone Call */}
              <a
                href="tel:+919669955869"
                className="group block p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Direct Phone Call
                  </span>
                  <span className="text-xs text-neutral-400 font-semibold group-hover:translate-x-1 transition-transform">
                    Call ↗
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors mt-1">
                  +91 96699 55869
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">Monday to Saturday: 9:00 AM to 8:30 PM</p>
              </a>

              {/* Factory / Depot Address */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  Indira Enterprises
                </span>
                <p className="text-sm sm:text-base font-semibold text-white leading-snug mt-1">
                  Lasudia Mori, Dewas Naka, Indore, Madhya Pradesh
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Central wholesale dispatch & manufacturing
                </p>
              </div>

              {/* Operating Hours */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                  Dispatch Schedule
                </span>
                <p className="text-sm sm:text-base font-semibold text-white mt-1">
                  Monday to Saturday • 9:00 AM to 8:30 PM
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Same-day / next-day delivery across Indore
                </p>
              </div>

              {/* Official Social Media */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                  Follow Sffron Snacks
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/sffron_snacks?utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-neutral-200 hover:text-white transition-all duration-200"
                  >
                    <span>Instagram ↗</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1F7mvrx83c/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-semibold text-neutral-200 hover:text-white transition-all duration-200"
                  >
                    <span>Facebook ↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Connect on WhatsApp Bulk Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-950/20 to-black/40 border border-emerald-500/30 shadow-[0_12px_36px_-8px_rgba(37,211,102,0.3)]">
              <div className="mb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Need an Immediate Quotation?
                </h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Skip waiting for an email reply. Connect directly with our dispatch manager on WhatsApp for carton pricing and sample boxes.
              </p>
              <a
                href="https://wa.me/919669955869?text=Hello%20Indira%20Enterprises!%20I%20am%20looking%20for%20bulk%20orders%20of%20Sffron%20Snacks%20in%20Indore.%20Please%20share%20wholesale%20rates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{
                  background:
                    "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                }}
              >
                <span>Connect on WhatsApp for Bulk Orders</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: "Send a message" Form Card matching screenshot */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/15 bg-[#0B0D14]/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.15)]">
              {/* Card Header */}
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Send a message
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Fill out the form and we&apos;ll get back to you promptly.
                </p>
                <div className="border-b border-dashed border-white/15 mt-5"></div>
              </div>

              {submitted ? (
                /* Success Message State */
                <div className="py-8 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(37,211,102,0.4)]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    Bulk Inquiry Received!
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Indira Enterprises wholesale team will review your order details and contact you promptly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button
                      type="button"
                      onClick={handleWhatsAppDirect}
                      className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                      style={{
                        background:
                          "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                      }}
                    >
                      <span>Confirm Now on WhatsApp ↗</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-neutral-300 hover:text-white backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3)] transition-all cursor-pointer hover:scale-[1.02] active:scale-95"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Bulk Form */
                <form onSubmit={handleWhatsAppDirect} className="space-y-5">
                  {/* Row 1: Full Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Company / Store Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        WhatsApp / Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        City / Delivery Area
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-11 px-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 3: Order Type & Estimated Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Inquiry / Order Type
                      </label>
                      <div className="relative">
                        <select
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#141824] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 appearance-none pr-8 cursor-pointer"
                        >
                          <option value="Retail Store Wholesale (Daily/Weekly)">
                            Retail Store Wholesale (Daily/Weekly)
                          </option>
                          <option value="Party & Wedding Event Cartons">
                            Party & Wedding Event Cartons
                          </option>
                          <option value="School / College Canteen Supply">
                            School / College Canteen Supply
                          </option>
                          <option value="Distributorship / Dealership Inquiry">
                            Distributorship / Dealership Inquiry
                          </option>
                          <option value="Assorted Mixed Carton Trial">
                            Assorted Mixed Carton Trial
                          </option>
                          <option value="Other Inquiries">Other Inquiries</option>
                        </select>
                        <ChevronDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                        Estimated Quantity
                      </label>
                      <div className="relative">
                        <select
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl bg-[#141824] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 appearance-none pr-8 cursor-pointer"
                        >
                          <option value="1 to 5 Master Cartons (Trial / Party)">
                            1 - 5 Master Cartons (Trial / Party)
                          </option>
                          <option value="5 to 20 Cartons (Store Restock)">
                            5 - 20 Cartons (Store Restock)
                          </option>
                          <option value="20 to 50 Cartons (Wholesale Supply)">
                            20 - 50 Cartons (Wholesale Supply)
                          </option>
                          <option value="50+ Master Cartons (Distributor Batch)">
                            50+ Master Cartons (Distributor Batch)
                          </option>
                        </select>
                        <ChevronDown
                          size={15}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message / Flavor Specifics */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Snack Flavors & Order Notes
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3.5 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Direct WhatsApp Order Action Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full h-12 px-6 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(37,211,102,0.7)] hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center cursor-pointer whitespace-nowrap"
                      style={{
                        background:
                          "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                      }}
                      title="Send this order inquiry directly to our WhatsApp"
                    >
                      <span>Connect on WhatsApp ↗</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center leading-snug pt-1">
                    All wholesale orders handled directly by Indira Enterprises, Lasudia Mori, Indore.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Factory & Depot Location Map Section */}
        <div className="mt-12 sm:mt-16 rounded-3xl border border-white/15 bg-[#0B0D14]/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_64px_rgba(0,0,0,0.85),inset_0_1.5px_2px_rgba(255,255,255,0.15)] overflow-hidden">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-3">
                <span>Manufacturing & Dispatch Hub</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Visit Our Indore Depot
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 max-w-2xl leading-relaxed">
                Panchal Compound, Lasudia Mori, Dewas Naka, Indore, Madhya Pradesh 452010. Serving wholesale buyers, retail chains, and direct stockists across Central India.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://maps.app.goo.gl/6izeB4VFSod3bfNi8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white backdrop-blur-xl border border-red-500/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_10px_28px_-6px_rgba(229,35,42,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_14px_36px_-4px_rgba(229,35,42,0.7)] transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
                style={{
                  background:
                    "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 60%), rgba(229, 35, 42, 0.55)",
                }}
              >
                <span>Get Directions ↗</span>
              </a>
              <a
                href="https://maps.app.goo.gl/6izeB4VFSod3bfNi8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm text-neutral-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all duration-200"
              >
                <span>Open in Google Maps ↗</span>
              </a>
            </div>
          </div>

          {/* Quick Info Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Primary Landmark
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                Panchal Compound, Lasudia Mori
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">Dewas Naka Industrial Belt</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Logistics Connectivity
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                AB Road & Dewas Bypass
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">Rapid transit across M.P. & Western India</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Dispatch Desk
              </span>
              <p className="text-sm font-semibold text-white mt-1">
                Monday to Saturday: 9:00 AM to 8:30 PM
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">Truck / tempo loading bay on-site</p>
            </div>
          </div>

          {/* Embedded Map Frame */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3678.5607055377677!2d75.9052672!3d22.7816785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d316eed5af9%3A0x8d068924f0035b63!2sQWJ4%2BWM7%2C%20Panchal%20Compound%2C%20Lasudia%20Mori%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1794473492598!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sffron Snacks • Indira Enterprises Location Map (Dewas Naka, Indore)"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactBulkOrder;
