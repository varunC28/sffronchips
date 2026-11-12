"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text = "SFFRON",
  duration,
  className,
}: {
  text?: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 340 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#FDB813" />
              <stop offset="25%" stopColor="#F15A24" />
              <stop offset="50%" stopColor="#E5232A" />
              <stop offset="75%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      {/* Subtle background guide stroke so the letters are always faintly visible */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-red-950/40 font-black tracking-widest text-7xl font-sans"
        style={{ opacity: hovered ? 0.6 : 0.2 }}
      >
        {text}
      </text>

      {/* Infinite looping animated stroke outline */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-red-500 font-black tracking-widest text-7xl font-sans"
        style={{
          filter: "drop-shadow(0 0 6px rgba(229, 35, 42, 0.6))",
        }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: [1000, 0, 0, -1000],
          opacity: [0.3, 1, 1, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          times: [0, 0.42, 0.58, 1],
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.35"
        mask="url(#textMask)"
        className="fill-transparent font-black tracking-widest text-7xl font-sans"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, rgba(15, 15, 20, 0.4) 40%, rgba(229, 35, 42, 0.12) 80%, rgba(241, 90, 36, 0.06) 100%)",
      }}
    />
  );
};

export function HoverFooter({
  onNavigateToContact,
}: {
  onNavigateToContact?: () => void;
}) {
  // Contact info data
  const contactInfo = [
    {
      text: "+91 96699 55869",
      href: "tel:+919669955869",
    },
    {
      text: "WhatsApp Bulk Order Support",
      href: "https://wa.me/919669955869?text=Hello%20Indira%20Enterprises!%20I%20would%20like%20to%20place%20a%20bulk%20order%20for%20Sffron%20Snacks.",
    },
    {
      text: "Lasudia Mori, Dewas Naka, Indore, M.P.",
    },
    {
      text: "Open Mon - Sat: 9:00 AM - 8:30 PM",
    },
  ];

  // Social media icons
  const socialLinks = [
    {
      icon: <MessageCircle size={19} />,
      label: "WhatsApp",
      href: "https://wa.me/919669955869",
    },
    {
      icon: <Instagram size={19} />,
      label: "Instagram",
      href: "https://www.instagram.com/sffron_snacks?utm_source=qr",
    },
    {
      icon: <Facebook size={19} />,
      label: "Facebook",
      href: "https://www.facebook.com/share/1F7mvrx83c/",
    },
    { icon: <Phone size={19} />, label: "Call Us", href: "tel:+919669955869" },
  ];

  return (
    <footer className="relative z-20 bg-[#0B0D14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[36px] overflow-hidden m-4 sm:m-8 lg:m-12 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.18),0_24px_64px_rgba(0,0,0,0.85)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-12 pb-8 sm:pt-16 sm:pb-12 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4 max-w-lg">
            <div className="flex items-center gap-3">
              <img
                src="/logo.webp"
                alt="Sffron Snacks"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_12px_rgba(229,35,42,0.6)]"
              />
              <span className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
                Sffron <span className="text-red-500">Snacks</span>
              </span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Indore&apos;s proud snack brand crafting crunchy chips, savory rings, and authentic fasting namkeen with zero compromise on taste.
            </p>
          </div>

          {/* Contact & Location section */}
          <div className="flex flex-col md:items-end">
            <div className="w-full max-w-md">
              <h4 className="text-white text-base sm:text-lg font-bold mb-5">
                Indira Enterprises
              </h4>
              <ul className="space-y-2.5 text-sm text-neutral-300">
                {contactInfo.map((item, i) => (
                  <li key={i}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-red-400 transition-colors leading-snug"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="leading-snug text-neutral-400">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
              {onNavigateToContact && (
                <button
                  type="button"
                  onClick={onNavigateToContact}
                  className="mt-5 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-xl border border-white/30 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.6),inset_0_-1.5px_3px_rgba(0,0,0,0.5),0_10px_28px_-6px_rgba(229,35,42,0.5)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.85),0_14px_36px_-4px_rgba(229,35,42,0.7)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
                  style={{
                    background:
                      "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0) 55%), rgba(229, 35, 42, 0.38)",
                  }}
                >
                  <span>Bulk Order & Wholesale Form</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        <hr className="border-t border-white/10 my-6 sm:my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-neutral-400 space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-5 text-neutral-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-red-500/50 hover:text-red-400 hover:bg-white/10 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Brand Copyright & Manufacturing Tag */}
          <p className="text-center md:text-right text-neutral-400">
            &copy; {new Date().getFullYear()} Sffron Snacks & Foods • Indira Enterprises, Indore. All rights reserved.
          </p>
        </div>
      </div>

      {/* Interactive SFFRON Text Hover Effect */}
      <div className="flex h-40 sm:h-64 lg:h-80 -mt-8 sm:-mt-20 -mb-8 sm:-mb-16 pointer-events-auto">
        <TextHoverEffect text="SFFRON" className="z-30 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
