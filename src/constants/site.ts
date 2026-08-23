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
  alt: `${BRAND.name} logo`,
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

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

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

export const PROJECT_CATEGORIES = ["All", "Residential", "Commercial", "Turnkey"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECTS: {
  name: string;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  image: string;
}[] = [
  { name: "Bahadurabad Kitchen", category: "Residential", year: "2025", image: project1 },
  { name: "Adamjee Nagar Lounge", category: "Residential", year: "2025", image: project2 },
  { name: "DHA Phase VI Bathroom", category: "Residential", year: "2024", image: project3 },
  { name: "Clifton Wardrobe Suite", category: "Turnkey", year: "2024", image: project4 },
  { name: "Gulshan Corporate Floor", category: "Commercial", year: "2024", image: project5 },
  { name: "Bath Island Full Home", category: "Turnkey", year: "2023", image: featureLounge },
];

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

export const FOOTER_LINKS = [
  {
    heading: "Company",
    links: ["About HOUSEFIED", "Our Process", "The Team", "Reviews", "Careers"],
  },
  {
    heading: "Services",
    links: [
      "Luxury Kitchens",
      "Modern TV Walls",
      "Bespoke Bathrooms",
      "Smart Wardrobes",
      "Full Home Turnkey",
    ],
  },
  {
    heading: "Projects",
    links: ["Residential", "Commercial", "Turnkey", "Newly Built Homes", "Archive"],
  },
  {
    heading: "Social",
    links: ["Facebook — Housefied Karachi", "Instagram — @housefied", "WhatsApp Helpline"],
  },
] as const;
