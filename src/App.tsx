import React, { useEffect, useState } from "react";
import DataRain from "@/components/ui/data-rain";
import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel";
import MobileDishHero from "@/components/ui/mobile-dish-hero";
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from "@/components/ui/liquid-glass-navbar";
import HoverFooter from "@/components/ui/hover-footer";
import Blogs3 from "@/components/ui/blogs-3";
import Faqs02 from "@/components/ui/faqs-02";
import ContactBulkOrder from "@/components/ui/contact-bulk-order";
import WholesaleB2BBanner from "@/components/ui/wholesale-b2b-banner";
import BornInIndoreStory from "@/components/ui/born-in-indore-story";
import { MessageCircle, Phone, BookOpen, HelpCircle, PhoneCall } from "lucide-react";

const SFFRON_DISHES: Dish[] = [
  {
    title: "Sffron",
    subtitle: "Masala Ring",
    image: "/sffron-ring-v2.webp",
    eyebrow: "#1 Best Selling Crunch",
    label: "Masala Ring",
    rating: 4.9,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "Crispy puffed rings dusted with an authentic blend of spicy Indori masalas. Light, crunchy, and irresistible.",
    description: "Crispy puffed rings dusted with an authentic blend of spicy Indori masalas. Light, crunchy, and irresistible.",
    likes: 1420,
    highlights: ["Authentic Indori Taste", "No Preservatives", "Crispy Crunch", "Best Before 4 Months"],
    accent: "#164396",
    price: "MRP ₹10",
    weight: "28g Pack",
  },
  {
    title: "Sffron",
    subtitle: "Cheese Balls",
    image: "/sffron-cheese-balls-v2.webp",
    eyebrow: "#2 Melty Cheese Favorite",
    label: "Cheese Balls",
    rating: 4.8,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "Air-puffed golden spheres generously coated in savory, velvety cheese seasoning. Melts right in your mouth.",
    description: "Air-puffed golden spheres generously coated in savory, velvety cheese seasoning. Melts right in your mouth.",
    likes: 1890,
    highlights: ["Rich Cheddar Flavor", "Melt-In-Mouth Crunch", "Zero Trans Fat", "Air Puffed"],
    accent: "#F15A24",
    price: "MRP ₹10",
    weight: "28g Pack",
  },
  {
    title: "Sffron",
    subtitle: "Spicy Chips",
    image: "/sffron-masala-flour-chips-v2.webp",
    eyebrow: "#3 Fiery Hot Crunch",
    label: "Spicy Chips",
    rating: 4.9,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "Finely sliced golden potato crisps infused with fiery red chili for authentic spice lovers.",
    description: "Finely sliced golden potato chips infused with hot cayenne and red chili spices for true spice lovers.",
    likes: 2130,
    highlights: ["Fiery Red Chili", "Extra Crispy Cut", "Universal ₹10 MRP", "Spicy Tadka"],
    accent: "#E5232A",
    price: "MRP ₹10",
    weight: "30g Pack",
  },
  {
    title: "Sffron",
    subtitle: "Tasty Peanuts",
    image: "/saffron-tasty-peanuts-v2.webp",
    eyebrow: "#4 High Protein Snack",
    label: "Tasty Peanuts",
    rating: 4.7,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "High-protein roasted whole peanuts wrapped in a crispy spicy besan crust. Perfect teatime crunch.",
    description: "High-protein whole roasted peanuts encased in a crunchy, spiced chickpea flour crust. Perfect teatime companion.",
    likes: 980,
    highlights: ["High Protein", "Spicy Besan Coating", "Rock Salt Spiced", "Roasted Peanuts"],
    accent: "#FDB813",
    price: "MRP ₹10",
    weight: "32g Pack",
  },
  {
    title: "Sffron",
    subtitle: "Banana Chips",
    image: "/saffron-tasty-banana-chips-v2.webp",
    eyebrow: "#5 Premium South Crunch",
    label: "Banana Chips",
    rating: 4.9,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "Golden sun-dried banana crisps fried to delicate crunch and lightly dusted with mild salt and spices.",
    description: "Golden sun-dried banana crisps fried to delicate crunch and dusted with signature mild salt and spices.",
    likes: 1650,
    highlights: ["High Protein", "Fasting / Upvas Special", "Sun-Dried Bananas", "Wafer Thin"],
    accent: "#E8A338",
    price: "MRP ₹10",
    weight: "25g Pack",
  },
  {
    title: "Sffron",
    subtitle: "Falahari Mix",
    image: "/saffron-falahari-mixture-v2.webp",
    eyebrow: "#6 Authentic Upvas Special",
    label: "Falahari Mix",
    rating: 5.0,
    chef: "Sffron Snacks",
    kitchen: "Lasudia Mori, Dewas Naka, Indore",
    tagline: "Traditional fasting mixture packed with crisp potato salli, roasted peanuts, cashews & sendha namak.",
    description: "Traditional fasting mixture packed with crisp potato salli, roasted peanuts, cashews, raisins, and sendha namak.",
    likes: 2470,
    highlights: ["Sendha Namak (Rock Salt)", "Cashews & Raisins", "Fasting Approved", "Potato Salli"],
    accent: "#FF9933",
    price: "MRP ₹10",
    weight: "40g Pack",
  },
];

const SFFRON_NAV_ITEMS: LiquidNavItem[] = [
  { label: "Home", icon: NimbusIcons.home, fx: "glow" },
  { label: "Blog", icon: <BookOpen size={15} strokeWidth={1.8} />, fx: "pop" },
  { label: "FAQ", icon: <HelpCircle size={15} strokeWidth={1.8} />, fx: "spin" },
  { label: "Contact Us", icon: <PhoneCall size={15} strokeWidth={1.8} />, fx: "plane" },
];

export default function App() {
  const [particleCount, setParticleCount] = useState<number>(600);
  const [activeNav, setActiveNav] = useState<number>(0);
  const [activeDishIndex, setActiveDishIndex] = useState<number>(0);
  const [navTone, setNavTone] = useState<"light" | "dark">("dark");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setParticleCount(180);
      } else if (window.innerWidth < 1024) {
        setParticleCount(350);
      } else {
        setParticleCount(600);
      }
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const handleWhatsAppOrder = (dish?: Dish) => {
    const phone = "919669955869";
    const text = encodeURIComponent(
      dish
        ? `Hello Sffron Snacks Indore! 👋\nI want to order:\n\n📦 *${dish.title} ${dish.subtitle}* (${dish.weight ?? "₹10 Pack"})\n💰 Price: ${dish.price ?? "MRP ₹10"}\n📍 City: Indore\n\nPlease let me know bulk packs & delivery details!`
        : `Hello Sffron Snacks Indore! 👋\nI would like to inquire about chip boxes, wholesale bulk orders, and delivery in Indore.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const handleNavSelect = (index: number) => {
    setActiveNav(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCarouselDishChange = (dishIndex: number) => {
    setActiveDishIndex(dishIndex);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050508] text-white selection:bg-red-500 selection:text-white">
      {/* Background Interactive Data Rain Canvas with Physics */}
      <DataRain
        fullscreen={true}
        count={particleCount}
        flowSpeed={0.95}
        obstacleRadius={window.innerWidth < 640 ? 46 : 68}
        autopilot={true}
        className="pointer-events-none"
      />

      {/* Floating Glass Liquid Navbar & Perfectly Aligned Brand Emblem */}
      <header
        className={`fixed top-4 sm:top-6 inset-x-0 z-50 pointer-events-none transition-all duration-300 ${
          isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-8 relative flex items-center justify-center h-[38px] sm:h-[42px]">
          {/* Subtle Floating Brand Emblem - Centered on the exact same baseline */}
          <div
            className="absolute left-3 sm:left-8 pointer-events-auto h-[38px] sm:h-[42px] flex items-center justify-center gap-2 px-2.5 sm:px-3.5 rounded-full border border-white/20 backdrop-blur-xl shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.5),0_12px_36px_-8px_rgba(0,0,0,0.6)] cursor-pointer group transition-all duration-300 hover:border-white/40 hover:scale-105 active:scale-95"
            style={{
              background: "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 60%), rgba(12, 16, 28, 0.76)",
            }}
            onClick={() => handleNavSelect(0)}
            title="Sffron Snacks"
          >
            <img
              src="/logo.webp"
              alt="Sffron Snacks"
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-[0_2px_10px_rgba(229,35,42,0.6)] group-hover:rotate-6 transition-transform"
            />
            <span className="hidden sm:inline font-extrabold text-xs sm:text-sm tracking-tight leading-none drop-shadow-md text-white whitespace-nowrap">
              Sffron <span className="text-red-500">Snacks</span>
            </span>
          </div>

          {/* Centered Liquid Glass Navbar */}
          <div className="pointer-events-auto flex items-center justify-center h-[38px] sm:h-[42px]">
            <LiquidNavbar
              tone={navTone}
              sound={true}
              active={activeNav}
              items={SFFRON_NAV_ITEMS}
              onChange={handleNavSelect}
            />
          </div>
        </div>
      </header>

      {/* Main View: Hero Carousel on Home, BlogsSection on Blog, FAQ on FAQ, Contact on Contact */}
      <main className="relative z-10 w-full min-h-screen">
        {activeNav === 1 ? (
          <Blogs3
            onBackToHome={() => handleNavSelect(0)}
            onModalChange={setIsModalOpen}
          />
        ) : activeNav === 2 ? (
          <Faqs02 />
        ) : activeNav === 3 ? (
          <ContactBulkOrder onBackToHome={() => handleNavSelect(0)} />
        ) : (
          <>
            {/* Dedicated Mobile Hero (< md: iPhone, Pixel, Galaxy) */}
            <div className="block md:hidden">
              <MobileDishHero
                dishes={SFFRON_DISHES}
                activeIndex={activeDishIndex}
                onChange={handleCarouselDishChange}
                onOrder={handleWhatsAppOrder}
              />
            </div>

            {/* Full GSAP Orbit Carousel (>= md: Tablet, iPad, Laptop, Desktop) */}
            <div className="hidden md:block">
              <DishOrbitCarousel
                dishes={SFFRON_DISHES}
                height="100dvh"
                loop={false}
                activeIndex={activeDishIndex}
                onChange={handleCarouselDishChange}
                onOrder={handleWhatsAppOrder}
              />
            </div>

            {/* "Born in Indore" Heritage & Craft Story */}
            <BornInIndoreStory
              onNavigateToBlog={() => handleNavSelect(1)}
              onNavigateToContact={() => handleNavSelect(3)}
            />

            {/* Retailer & B2B Wholesale Banner */}
            <WholesaleB2BBanner onNavigateToContact={() => handleNavSelect(3)} />
          </>
        )}
      </main>

      {/* Sffron Snacks Hover Footer with Interactive SFFRON Text Glow Effect */}
      <HoverFooter onNavigateToContact={() => handleNavSelect(3)} />

      {/* Global Fixed Floating WhatsApp Action Button (Hidden on Mobile to Prevent Clashing with Hero Primary CTA) */}
      <aside
        className={`fixed bottom-6 right-6 z-50 hidden sm:block transition-all duration-300 ${
          isModalOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <a
          href="https://wa.me/919669955869?text=Hello%20Sffron%20Snacks%20Indore!%20I%20would%20like%20to%20order%20chips%20and%20snacks."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Order"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full text-white backdrop-blur-xl border border-white/40 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.85),inset_0_-2px_4px_rgba(0,0,0,0.35),0_12px_36px_-6px_rgba(37,211,102,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,1),0_16px_42px_-4px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "radial-gradient(120% 140% at 30% 15%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.32)",
          }}
          title="Chat with Sffron Snacks on WhatsApp"
        >
          {/* Subtle Live Pulse Ping */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-white"></span>
          </span>

          <MessageCircle className="w-7 h-7 fill-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
        </a>
      </aside>
    </div>
  );
}
