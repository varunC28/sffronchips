"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  X,
  Share2,
  Check,
  MessageCircle,
  Tag,
} from "lucide-react";

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  featured?: boolean;
  content: string[];
  tags: string[];
}

const SFFRON_BLOG_POSTS: BlogPost[] = [
  {
    id: "secret-of-indori-crunch",
    title: "The Art of Indori Crunch: Why Malwa Snacks Hit Different",
    subtitle: "From Sarafa Bazaar to 56 Dukan, exploring Indore's obsession with bold spices and delicate textures.",
    category: "Indore Culture",
    readTime: "4 min read",
    date: "Nov 10, 2026",
    image: "/sffron-ring-v2.webp",
    featured: true,
    author: {
      name: "Sffron Master Chef",
      role: "Taste & Spice Curator",
      avatar: "/logo.webp",
    },
    excerpt:
      "Indore isn't just a city in central India; it is the undisputed street food capital of the nation. Discover why our snacks carry that unmistakable chatpata kick that leaves you reaching for one more handful.",
    tags: ["Indore Food", "Malwa Heritage", "Spices", "Street Food"],
    content: [
      "Indore's culinary legacy is built on a simple obsession: no snack should ever be boring. Whether you are walking through the historic night stalls of Sarafa Bazaar or grabbing an evening bite at 56 Dukan, the tastebuds of Indore demand a layered balance of tanginess, crunch, and authentic local masalas.",
      "At Sffron Snacks, based right in Lasudia Mori, Dewas Naka, Indore, our master recipes are rooted in this deep Malwa heritage. Our seasoning blends are freshly ground and carefully measured to produce an authentic Indori flavor profile—bursting with coriander seed notes, hing (asafoetida), black pepper, and fiery red chili.",
      "Every single batch of our Masala Rings and Savory Crisps is test-tasted to ensure that the crunch starts light and airy, releasing the aromatic spice burst on the very first bite. That is the true Sffron standard.",
    ],
  },
  {
    id: "air-puffed-cheese-balls",
    title: "Air-Puffed vs Deep Fried: The Magic Behind Sffron Cheese Balls",
    subtitle: "How high-heat hot-air extrusion delivers rich melted cheddar taste without heavy oiliness.",
    category: "Crunch Science",
    readTime: "3 min read",
    date: "Nov 08, 2026",
    image: "/sffron-cheese-balls-v2.webp",
    author: {
      name: "Quality & Innovation",
      role: "Food Crafting Team",
      avatar: "/logo.webp",
    },
    excerpt:
      "Ever wondered how a snack can taste intensely cheesy while remaining as light as air? Here is a peek inside our modern air-puffing production line.",
    tags: ["Cheese Balls", "Air Puffed", "Kid Favorite", "Snack Science"],
    content: [
      "Traditional snacks often rely heavily on deep oil frying to achieve texture. But for our signature Cheese Balls, we took a radically modern approach using hot-air puffing technology.",
      "High-grade corn meal is expanded rapidly under high heat and steam pressure. This instantly creates micro air pockets within the sphere, producing a featherlight spherical structure that crunches gently before melting on your tongue.",
      "Immediately after puffing, each sphere is tossed in a specialized seasoning drum where it is coated with premium savory cheddar cheese blend. The result? Pure cheesy bliss that both kids and adults can never put down.",
    ],
  },
  {
    id: "ultimate-upvas-fasting-mix",
    title: "Fast & Feast: Why Sendha Namak & Salli Make the Ultimate Upvas Mix",
    subtitle: "Navratri, Shivratri, or Ekadashi—authentic fasting namkeen crafted strictly with sendha namak.",
    category: "Fasting Special",
    readTime: "5 min read",
    date: "Nov 05, 2026",
    image: "/saffron-falahari-mixture-v2.webp",
    author: {
      name: "Indira Kitchen Team",
      role: "Traditional Namkeen Masters",
      avatar: "/logo.webp",
    },
    excerpt:
      "Fasting doesn't mean compromising on delicious flavor. Learn how Sffron prepares traditional Upvas Falahari Mixture following age-old festive recipes.",
    tags: ["Upvas", "Falahari", "Sendha Namak", "Fasting Food"],
    content: [
      "In Indian households, fasting days (Vrat/Upvas) are occasions of spiritual dedication and heartfelt culinary tradition. Conventional table salt and common spices cannot be consumed, requiring a completely segregated and clean production environment.",
      "Sffron Falahari Mixture is crafted exclusively with pure Sendha Namak (natural Himalayan rock salt) and mild festive seasonings. We combine crisp, golden potato salli (julienned crisp potato strands) with whole roasted peanuts, cashews, and sweet golden raisins.",
      "This delivers an incredible harmony of sweet, salty, and nutty sensations. It keeps your energy high throughout the fasting day while remaining 100% compliant with religious observances.",
    ],
  },
  {
    id: "chai-pe-charcha-peanuts",
    title: "Chai Pe Charcha: 5 Evening Teatime Pairings with Sffron Tasty Peanuts",
    subtitle: "Crispy besan-crusted peanuts are India's favorite companion for steaming cups of adrak chai.",
    category: "Food Pairings",
    readTime: "4 min read",
    date: "Oct 29, 2026",
    image: "/saffron-tasty-peanuts-v2.webp",
    author: {
      name: "Sffron Foodies",
      role: "Culinary Pairings",
      avatar: "/logo.webp",
    },
    excerpt:
      "No Indian evening is complete without a piping hot cup of tea and a crunchy snack. Discover the best combinations to upgrade your 5 PM teatime ritual.",
    tags: ["Teatime", "Tasty Peanuts", "Chai Snacks", "Evening Crunch"],
    content: [
      "There is a sacred bond between hot, aromatic Masala Chai and a bowl of crispy, spicy snacks. Among all the options on the table, Sffron Tasty Peanuts hold a special place of honor.",
      "Each whole roasted peanut is encased in a crunchy, spiced chickpea flour (besan) batter dusted with chatpata rock salt, chili, and dried mango powder. The protein-rich peanut core paired with the savory crust provides a satisfying crunch that cuts through the creamy sweetness of milk tea.",
      "Next time you host friends for an evening chat or sit down to unwind after a long work day, pour yourself a steaming cup of ginger chai and crack open a ₹10 pack of Sffron Tasty Peanuts. Pure perfection.",
    ],
  },
  {
    id: "south-banana-chips-indore",
    title: "Sun-Ripened Plantains: South Indian Tradition Meets Indori Spice Blend",
    subtitle: "Delicately sliced golden banana crisps fried to delicate perfection with mild rock salt.",
    category: "Product Spotlight",
    readTime: "3 min read",
    date: "Oct 22, 2026",
    image: "/saffron-tasty-banana-chips-v2.webp",
    author: {
      name: "Sffron Sourcing",
      role: "Farm-to-Pack Standards",
      avatar: "/logo.webp",
    },
    excerpt:
      "Banana chips have been celebrated for generations. Discover how we select premium raw plantains to make sure every bite is paper-thin and delightfully crisp.",
    tags: ["Banana Chips", "Plantains", "Natural Crunch", "Indori Twist"],
    content: [
      "Great banana chips begin long before they reach the fryer. It all starts with sourcing the right variety of raw green plantains harvested at the peak of firmness.",
      "Using precision slicers, the raw bananas are cut paper-thin directly into clean, temperature-controlled vegetable oil. This rapid frying locks in the natural earthy flavor of the fruit while eliminating excess oil retention.",
      "A delicate sprinkle of fine sea salt and mild ground black pepper finishes the chip, ensuring a pure, light crunch that is suitable for children, tea breaks, and festive fasting days alike.",
    ],
  },
  {
    id: "fiery-chili-spicy-chips",
    title: "The Fiery Red Chili Kick: Inside Sffron Spicy Potato Chips",
    subtitle: "Why true spice enthusiasts in Madhya Pradesh refuse to settle for mild, ordinary chips.",
    category: "Spice Masters",
    readTime: "4 min read",
    date: "Oct 15, 2026",
    image: "/sffron-masala-flour-chips-v2.webp",
    author: {
      name: "Sffron Master Chef",
      role: "Taste & Spice Curator",
      avatar: "/logo.webp",
    },
    excerpt:
      "Madhya Pradesh loves its spice bold, vibrant, and unapologetic. Here is how our hot paprika and red chili recipe was developed for true crunch enthusiasts.",
    tags: ["Spicy Chips", "Red Chili", "Hot & Crispy", "Indori Tadka"],
    content: [
      "In Central India, spices are treated with reverence. A great snack shouldn't just be salty; it needs character, heat, and a memorable lingering warmth.",
      "Sffron Spicy Chips are made with extra-crispy cut potato slices that hold onto spice granules exceptionally well. We dust them in a proprietary seasoning mixture of sun-dried red chilies, roasted cumin, clove powder, and a touch of amchur (dry mango) for tang.",
      "From the moment you rip open the bag, the deep red aroma hits your senses. One bite delivers an intense, fiery crunch that makes it the ultimate snack for spice lovers.",
    ],
  },
];

const CATEGORIES = [
  "All Stories",
  "Indore Culture",
  "Crunch Science",
  "Fasting Special",
  "Food Pairings",
  "Product Spotlight",
  "Spice Masters",
];

interface Blogs3Props {
  onBackToHome?: () => void;
  onModalChange?: (isOpen: boolean) => void;
}

export function Blogs3({ onBackToHome, onModalChange }: Blogs3Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Stories");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const openArticle = (post: BlogPost) => {
    setActiveArticle(post);
    onModalChange?.(true);
  };

  const closeArticle = () => {
    setActiveArticle(null);
    onModalChange?.(false);
  };

  const filteredPosts =
    selectedCategory === "All Stories"
      ? SFFRON_BLOG_POSTS
      : SFFRON_BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const featuredPost = SFFRON_BLOG_POSTS.find((p) => p.featured) || SFFRON_BLOG_POSTS[0];
  const regularPosts = filteredPosts.filter((p) => p.id !== (selectedCategory === "All Stories" ? featuredPost.id : ""));

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="relative w-full pt-28 pb-20 px-4 sm:px-6 lg:px-12 text-white">
      {/* Header section with liquid glass badges & title */}
      <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(229,35,42,0.25)]">
          <span>Sffron Journal & Food Stories</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
          Crisp Stories, <span className="bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">Indori Flavors</span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          Explore recipes, behind-the-scenes crunch secrets, festive fasting traditions, and the vibrant snack culture of Indore, Madhya Pradesh.
        </p>

        {/* Filter categories pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-red-500 text-white shadow-[0_0_20px_rgba(229,35,42,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)] border border-red-400 scale-105"
                    : "bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 border border-white/10 backdrop-blur-md"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Featured Card (Prominent Header Card when "All Stories" is selected) */}
        {selectedCategory === "All Stories" && featuredPost && (
          <article
            onClick={() => openArticle(featuredPost)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-[#0B0D14]/80 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_20px_50px_rgba(229,35,42,0.25)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image Column */}
              <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center p-6">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600/90 text-white backdrop-blur-md border border-white/30 shadow-md">
                  Featured Story
                </span>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-red-400 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                  {featuredPost.excerpt}
                </p>

                {/* Author & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-9 h-9 rounded-full object-contain p-0.5 border border-white/20 bg-white/5"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">
                        {featuredPost.author.name}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5 leading-none">
                        {featuredPost.author.role}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-400 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Regular 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => openArticle(post)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0B0D14]/70 backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-red-500/40 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(229,35,42,0.18)]"
            >
              <div>
                {/* Image Plate */}
                <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center p-4 mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.6)] group-hover:scale-108 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-red-400 transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 font-normal">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer row */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-contain p-0.5 border border-white/15 bg-white/5"
                  />
                  <span className="text-xs font-semibold text-neutral-300">
                    {post.author.name}
                  </span>
                </div>

                <span className="text-xs font-bold text-red-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight size={13} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Liquid Glass Article Reader Modal with Dedicated Z-Index and Sticky Action Bars */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={closeArticle}
        >
          <div
            className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/20 bg-[#0B0D14] shadow-[0_24px_64px_rgba(0,0,0,0.95),inset_0_1.5px_2px_rgba(255,255,255,0.25)] text-left flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Top Bar with Category & Prominent Close Button */}
            <div className="sticky top-0 px-6 sm:px-8 py-3.5 bg-[#0B0D14]/95 backdrop-blur-xl border-b border-white/10 z-30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-300">
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold uppercase tracking-wider text-[11px]">
                  {activeArticle.category}
                </span>
                <span className="hidden sm:inline text-neutral-500">•</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-neutral-400">
                  <Calendar size={13} />
                  {activeArticle.date}
                </span>
                <span className="text-neutral-500">•</span>
                <span className="inline-flex items-center gap-1 text-neutral-400">
                  <Clock size={13} />
                  {activeArticle.readTime}
                </span>
              </div>

              <button
                type="button"
                onClick={closeArticle}
                aria-label="Close article"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-500/20 hover:border-red-500/50 text-neutral-300 hover:text-white border border-white/15 transition-all cursor-pointer flex-none active:scale-90"
              >
                <X size={19} />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="px-6 sm:px-10 py-6 overflow-y-auto flex-1">
              {/* Modal Title */}
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                {activeArticle.title}
              </h2>

              {/* Modal Subtitle */}
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-6 pb-5 border-b border-white/10">
                {activeArticle.subtitle}
              </p>

              {/* Modal Product Image Banner - Seamless Ambient Display */}
              <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 flex items-center justify-center p-6 mb-7 overflow-hidden relative">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="max-h-full object-contain filter drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] relative z-10"
                />
              </div>

              {/* Article Body Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-neutral-200 leading-relaxed font-normal mb-8">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2 mb-4 pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-neutral-400 flex items-center gap-1 mr-2">
                  <Tag size={13} /> Tags:
                </span>
                {activeArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky Frosted Bottom Action Bar */}
            <div className="sticky bottom-0 px-6 sm:px-8 py-3.5 bg-[#0B0D14]/95 backdrop-blur-xl border-t border-white/10 z-30 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-9 h-9 rounded-full object-contain p-0.5 border border-white/20 bg-white/5"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-none">
                    {activeArticle.author.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-none">
                    {activeArticle.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 text-neutral-200 transition-colors"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  <span>{copiedLink ? "Copied" : "Share"}</span>
                </button>

                <a
                  href={`https://wa.me/919669955869?text=${encodeURIComponent(
                    `Hello Sffron Snacks! I read your story "${activeArticle.title}" and would like to order snacks in Indore.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-xl border border-emerald-400/40 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.7),inset_0_-1.5px_3px_rgba(0,0,0,0.4),0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.9),0_12px_32px_rgba(37,211,102,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  style={{
                    background:
                      "radial-gradient(120% 140% at 30% 0%, rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 60%), rgba(37, 211, 102, 0.42)",
                  }}
                >
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Blogs3;