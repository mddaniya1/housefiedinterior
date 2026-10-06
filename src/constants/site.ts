/**
 * Single source of truth for all client content shown on the site.
 * Keeping copy here keeps section components presentational and reusable.
 */

import heroLiving from "@/assets/hero-living.jpg";
import featureLounge from "@/assets/feature-lounge.jpg";
import detailChair from "@/assets/detail-chair.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import contactDark from "@/assets/contact-dark.jpg";

export const IMAGES = {
  heroLiving,
  featureLounge,
  detailChair,
  aboutStudio,
  contactDark,
};

export const LOGO = {
  src: "/images/housefied-logo.png",
  alt: "HOUSEFIED logo",
  width: 240,
  height: 80,
};

export const BRAND = {
  name: "HOUSEFIED",
  owner: "Hamza",
  tagline: "Interior Design & Turnkey Execution",
  description:
    "HOUSEFIED is a Karachi interior design and turnkey execution studio for elite residential and commercial spaces — luxury kitchens, modern TV walls, bespoke bathrooms and smart wardrobes.",
  phone: "+92 339 4122544",
  whatsapp: "https://wa.me/923394122544",
  email: "info.housefied@gmail.com",
  address: {
    street: "Office no 201, 2nd Floor, Qurtuba Market/Mall, near Grappetite Chowrangi, Bahadurabad",
    city: "Karachi",
    region: "Sindh",
    postalCode: "74800",
    country: "PK",
  },
  satelliteAddress: "Block B, Adamjee Nagar Society, Karachi",
  hours: "Closed · Opens 10:00 AM on Monday",
  social: [
    { platform: "Facebook", handle: "Housefied Karachi" },
    { platform: "Instagram", handle: "@housefied" },
  ],
} as const;

export const WHATSAPP_BOOKING_URL =
  "https://wa.me/923394122544?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20consultation%20for%20my%20interior%20design%20project.";

/** Social profile links — replace these placeholder URLs with the real profiles. */
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/your-page",
  instagram: "https://instagram.com/your-handle",
  whatsapp: "https://wa.me/923394122544",
} as const;

export const HERO = {
  heading: "Turning Homes into a Living Paradise",
  description:
    "Expert interior design and seamless execution services in Karachi. Crafting timeless spaces, luxury kitchens, modern wardrobes, and elegant living areas tailored to elite lifestyles.",
  cta: "Book a Free Consultation",
} as const;

export const STATS = [
  { value: 11, decimals: 0, suffix: "K+", label: "Facebook Followers" },
  { value: 50, decimals: 0, suffix: "+", label: "Completed Homes" },
  { value: 5, decimals: 1, suffix: "", label: "Google Rating (9 Verified Reviews)" },
  { value: 100, decimals: 0, suffix: "%", label: "Dedicated Execution" },
] as const;

export const COLLECTION = [
  {
    name: "Luxury Kitchens",
    place: "Smart, stylish and highly functional culinary spaces",
    image: project1,
    span: "short",
  },
  {
    name: "Modern TV Walls & Lounges",
    place: "Timeless and elegant living area entertainment centers",
    image: project2,
    span: "tall",
  },
  {
    name: "Bespoke Bathrooms",
    place: "Where luxury meets comfort and premium hardware",
    image: project3,
    span: "tall",
  },
  {
    name: "Smart Wardrobes & Cabinetry",
    place: "Organized, elevated and custom storage design",
    image: project4,
    span: "short",
  },
] as const;

export const PROJECT_GROUPS = [
  { slug: "kitchens", label: "Kitchens" },
  { slug: "interiors", label: "Interiors" },
  { slug: "wardrobes", label: "Wardrobes" },
  { slug: "bathrooms", label: "Bathrooms" },
] as const;

export const PROJECT_CATEGORIES = ["All", "Kitchens", "Interiors", "Wardrobes", "Bathrooms"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  name: string;
  category: Exclude<ProjectCategory, "All">;
  categorySlug: string;
  location: string;
  year: string;
  image: string;
  description: string;
  gallery: string[];
};

export const PROJECTS: Project[] = [
  { slug: "bahadurabad-kitchen", name: "Bahadurabad Kitchen", category: "Kitchens", categorySlug: "kitchens", location: "Bahadurabad, Karachi", year: "2025", image: project1, description: "A warm, handle-less kitchen with imported soft-close hardware, a seamless quartz island and integrated appliances planned around daily family cooking.", gallery: [project1, detailChair, featureLounge] },
  { slug: "dha-family-kitchen", name: "DHA Family Kitchen", category: "Kitchens", categorySlug: "kitchens", location: "DHA Phase VI, Karachi", year: "2024", image: project5, description: "Full kitchen renewal with tall pantry storage, concealed lighting and durable matte lacquer finishes.", gallery: [project5, project1, aboutStudio] },
  { slug: "adamjee-nagar-lounge", name: "Adamjee Nagar Lounge", category: "Interiors", categorySlug: "interiors", location: "Adamjee Nagar, Karachi", year: "2025", image: project2, description: "A calm lounge anchored by a fluted TV wall with concealed cabling, warm wood panelling and layered lighting.", gallery: [project2, featureLounge, heroLiving] },
  { slug: "bath-island-full-home", name: "Bath Island Full Home", category: "Interiors", categorySlug: "interiors", location: "Bath Island, Karachi", year: "2023", image: featureLounge, description: "Turnkey execution of a newly built home — living, dining and bedrooms designed, procured and installed by one team.", gallery: [featureLounge, heroLiving, aboutStudio] },
  { slug: "clifton-wardrobe-suite", name: "Clifton Wardrobe Suite", category: "Wardrobes", categorySlug: "wardrobes", location: "Clifton, Karachi", year: "2024", image: project4, description: "Floor-to-ceiling wardrobes with intelligent internals, glass display shelving and soft-close motion throughout.", gallery: [project4, detailChair, aboutStudio] },
  { slug: "gulshan-master-closet", name: "Gulshan Master Closet", category: "Wardrobes", categorySlug: "wardrobes", location: "Gulshan-e-Iqbal, Karachi", year: "2024", image: aboutStudio, description: "A walk-in master closet with island drawers, mirrored panels and quiet linear lighting.", gallery: [aboutStudio, project4, detailChair] },
  { slug: "dha-spa-bathroom", name: "DHA Spa Bathroom", category: "Bathrooms", categorySlug: "bathrooms", location: "DHA Phase VI, Karachi", year: "2024", image: project3, description: "Stone, brass and soft light combined into a private spa-like bathroom with a frameless walk-in shower.", gallery: [project3, detailChair, heroLiving] },
  { slug: "pechs-guest-bathroom", name: "PECHS Guest Bathroom", category: "Bathrooms", categorySlug: "bathrooms", location: "PECHS, Karachi", year: "2023", image: detailChair, description: "A compact guest bathroom made generous with large-format tiles, a floating vanity and premium fittings.", gallery: [detailChair, project3, aboutStudio] },
];

export const CORE_AREAS = [
  { slug: "luxury-kitchens", title: "Luxury Kitchens", summary: "Imported hardware, seamless counters and precise joinery for culinary spaces built to last.", body: "Smart, stylish and highly functional culinary spaces. We plan layouts around how you actually cook, specify imported soft-close hardware, and build every cabinet with precise joinery and durable finishes.", images: [project1, project5, detailChair] },
  { slug: "tv-walls-lounges", title: "Modern TV Walls & Lounges", summary: "Elegant media walls, concealed cabling and lounge layouts that anchor the whole living area.", body: "Timeless and elegant living area entertainment centers. Fluted panels, stone, concealed cabling and layered lighting come together into a wall that anchors the whole room.", images: [project2, featureLounge, heroLiving] },
  { slug: "bespoke-bathrooms", title: "Bespoke Bathrooms", summary: "Stone, brass and light detailed together for bathrooms that feel like a private spa.", body: "Where luxury meets comfort and premium hardware. We detail stone, fittings, waterproofing and lighting together so the finished bathroom feels like a private spa — and lasts.", images: [project3, detailChair, aboutStudio] },
  { slug: "smart-wardrobes-cabinetry", title: "Smart Wardrobes & Cabinetry", summary: "Made-to-measure wardrobes with intelligent internals, soft-close motion and quiet finishes.", body: "Organized, elevated and custom storage design. Every wardrobe is made to measure with intelligent internals, soft-close motion and finishes chosen to match the room.", images: [project4, aboutStudio, detailChair] },
  { slug: "full-home-turnkey", title: "Full Home Turnkey", summary: "Design, procurement and on-site direction of every trade — handed over ready to live in.", body: "From the first survey to the final handover, one team designs, procures and directs carpentry, electrical, stone, paint and finishing — so your home is delivered ready to live in.", images: [featureLounge, heroLiving, project2] },
] as const;

export const STANDARDS = [
  { title: "Imported hardware", text: "Soft-close hinges, runners and fittings from trusted international brands — chosen for years of daily use." },
  { title: "Precise joinery", text: "Every cabinet and panel is drawn, cut and assembled to exact measurements for clean lines and tight seams." },
  { title: "Quality materials", text: "Moisture-resistant boards, durable lacquers, natural stone and premium finishes — never shortcuts." },
  { title: "On-site supervision", text: "Our team directs every trade on site daily, so quality is checked while the work happens, not after." },
  { title: "Clean handover", text: "We snag, clean and walk you through every detail before handing over the keys to a ready home." },
] as const;

export const PROCESS_STEPS = [
  { title: "Project Survey", text: "We visit your space, take measurements and understand how you want to live." },
  { title: "Design Concepts", text: "Layouts, 3D views and material direction tailored to your taste and budget." },
  { title: "Finishes & Furnishing", text: "We finalise materials, hardware, colours and furniture together with you." },
  { title: "Procurement", text: "We source and order everything from trusted suppliers, on schedule." },
  { title: "Delivery & Installation", text: "Our team installs, supervises and hands over a finished, ready-to-live space." },
] as const;

export const SERVICES = [
  {
    title: "Luxury Kitchens",
    description:
      "Imported hardware, seamless counters and precise joinery for culinary spaces built to last.",
    icon: "compass",
  },
  {
    title: "Modern TV Walls & Lounges",
    description:
      "Elegant media walls, concealed cabling and lounge layouts that anchor the whole living area.",
    icon: "frame",
  },
  {
    title: "Bespoke Bathrooms",
    description:
      "Stone, brass and light detailed together for bathrooms that feel like a private spa.",
    icon: "ruler",
  },
  {
    title: "Smart Wardrobes & Cabinetry",
    description:
      "Made-to-measure wardrobes with intelligent internals, soft-close motion and quiet finishes.",
    icon: "armchair",
  },
  {
    title: "Full Home Turnkey Execution",
    description:
      "Design, procurement and on-site direction of every trade — handed over ready to live in.",
    icon: "hardhat",
  },
  {
    title: "Free Design Consultation",
    description:
      "A focused visit with Hamza: measurements, material direction and a transparent scope plan.",
    icon: "message",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "The way Hamza, the owner, replicates the design and turns a home into a living paradise, I can vouch for him and recommend his expertise forever. The best designer in Karachi.",
    name: "Verified Client",
    role: "Google Review",
    initials: "GR",
    rating: 5,
  },
  {
    quote:
      "Quite satisfied with Housefied. They worked quite professionally, their work is timeless and elegant. Long way to go 👏👏",
    name: "Verified Client",
    role: "Google Review",
    initials: "GR",
    rating: 5,
  },
  {
    quote: "Amazing experience.........worked with complete dedication........keep it up",
    name: "Verified Client",
    role: "Google Review",
    initials: "GR",
    rating: 5,
  },
] as const;

export const SERVICE_OPTIONS = [
  "Luxury Kitchen",
  "Bespoke Bathroom",
  "Custom Wardrobes",
  "TV Wall/Lounge",
  "Full Home Turnkey",
] as const;

export const FAQS = [
  {
    question: "How does a project with HOUSEFIED begin?",
    answer:
      "Every project starts with a free consultation at your site or at our Bahadurabad office. We measure the space, understand how you want to live in it, and return with a design direction and a transparent scope and cost breakdown.",
  },
  {
    question: "Do you handle execution as well as design?",
    answer:
      "Yes — HOUSEFIED is a complete turnkey studio. We direct carpentry, electrical, stone, paint and finishing teams ourselves, so one team is accountable from drawing to handover.",
  },
  {
    question: "Which areas of Karachi do you work in?",
    answer:
      "We work across Karachi, from Bahadurabad and Adamjee Nagar to DHA, Clifton, Bath Island and Gulshan, and we take selected projects in other cities.",
  },
  {
    question: "How long does a full home take?",
    answer:
      "A single kitchen or TV wall typically runs four to eight weeks. A newly constructed full home, including wardrobes and bathrooms, generally takes three to six months depending on scope.",
  },
  {
    question: "Can you work within a set budget?",
    answer:
      "Absolutely. We plan material grades against your budget up front, show you the options honestly, and never begin ordering before you approve the breakdown.",
  },
] as const;

export const FOOTER_LINKS: { heading: string; links: { label: string; to: string; params?: Record<string, string> }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Who We Are", to: "/who-we-are" },
      { label: "Our Standards", to: "/our-standards" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    heading: "Core Areas",
    links: CORE_AREAS.map((c) => ({ label: c.title, to: "/core-areas/$slug", params: { slug: c.slug } })),
  },
  {
    heading: "Projects",
    links: PROJECT_GROUPS.map((g) => ({ label: g.label, to: "/projects/$category", params: { category: g.slug } })),
  },
];
