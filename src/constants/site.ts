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

export const BRAND = {
  name: "Lumen & Oak",
  tagline: "Interior Design Atelier",
  description:
    "Lumen & Oak is an interior design atelier crafting calm, light-led homes — residential interiors, bespoke furniture and full architectural styling.",
  phone: "+351 210 555 480",
  email: "studio@lumenandoak.com",
  address: {
    street: "Rua da Alfândega 42",
    city: "Lisbon",
    region: "Lisboa",
    postalCode: "1100-016",
    country: "PT",
  },
  hours: "Mon – Fri · 09:00 – 18:00",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

export const STATS = [
  { value: 240, suffix: "+", label: "Interiors completed" },
  { value: 180, suffix: "+", label: "Private clients" },
  { value: 16, suffix: "", label: "Years of practice" },
  { value: 9, suffix: "", label: "Design awards" },
] as const;

export const COLLECTION = [
  { name: "Casa Aurelia", place: "Cascais", image: project1, span: "short" },
  { name: "The Reading Room", place: "Porto", image: project2, span: "tall" },
  { name: "Linen House", place: "Sintra", image: project3, span: "tall" },
  { name: "Fluted Salon", place: "Lisbon", image: project4, span: "short" },
  { name: "Travertine Passage", place: "Comporta", image: project5, span: "tall" },
] as const;

export const PROJECT_CATEGORIES = ["All", "Residential", "Retail", "Hospitality"] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECTS: {
  name: string;
  category: Exclude<ProjectCategory, "All">;
  year: string;
  image: string;
}[] = [
  { name: "Casa Aurelia", category: "Residential", year: "2024", image: project1 },
  { name: "The Reading Room", category: "Hospitality", year: "2024", image: project2 },
  { name: "Linen House", category: "Residential", year: "2023", image: project3 },
  { name: "Fluted Salon", category: "Retail", year: "2023", image: project4 },
  { name: "Travertine Passage", category: "Hospitality", year: "2022", image: project5 },
  { name: "Atelier Norte", category: "Retail", year: "2022", image: featureLounge },
];

export const SERVICES = [
  {
    title: "Full Interior Design",
    description:
      "Concept, spatial planning, material palettes and complete delivery for private residences.",
    icon: "compass",
  },
  {
    title: "Architectural Styling",
    description:
      "Light studies, joinery detailing and finishes developed alongside your architect.",
    icon: "ruler",
  },
  {
    title: "Bespoke Furniture",
    description: "Made-to-measure pieces produced with Iberian workshops and natural materials.",
    icon: "armchair",
  },
  {
    title: "Art & Object Curation",
    description: "Sourcing of art, ceramics and vintage objects that give a room its quiet story.",
    icon: "frame",
  },
  {
    title: "Renovation Direction",
    description: "On-site direction of trades, schedules and budgets from demolition to handover.",
    icon: "hardhat",
  },
  {
    title: "Design Consultation",
    description: "A focused half-day session with drawings, palettes and a prioritised action plan.",
    icon: "message",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "They understood the light in our apartment before they understood us. Every room now feels inevitable.",
    name: "Amara Silveira",
    role: "Private residence, Cascais",
    initials: "AS",
    rating: 5,
  },
  {
    quote:
      "Restrained, precise and completely unhurried. The joinery detailing alone was worth the commission.",
    name: "Tobias Kregel",
    role: "Hotel owner, Porto",
    initials: "TK",
    rating: 5,
  },
  {
    quote:
      "Our flagship store finally feels like the brand. Customers stay twice as long as they used to.",
    name: "Íris Monteiro",
    role: "Retail founder, Lisbon",
    initials: "IM",
    rating: 5,
  },
] as const;

export const FAQS = [
  {
    question: "How does a project with your studio begin?",
    answer:
      "Every commission opens with a consultation at your space or at our Lisbon atelier. We discuss how you live, review the architecture and light, and return within two weeks with a concept direction and a fee proposal.",
  },
  {
    question: "What is the typical timeline?",
    answer:
      "A single-room refresh runs six to ten weeks. A full residence, including joinery and bespoke furniture, generally takes five to nine months from concept to installation.",
  },
  {
    question: "Do you take projects outside Portugal?",
    answer:
      "Yes. Roughly a third of our work is international, mainly across Spain, France and Morocco. Travel and site supervision are quoted transparently per project.",
  },
  {
    question: "Can you work with our existing furniture?",
    answer:
      "Often, and gladly. We audit what you own, keep the pieces with character, and design around them so the result feels collected rather than bought.",
  },
  {
    question: "How is your fee structured?",
    answer:
      "A fixed design fee based on scope and area, followed by transparent procurement at trade cost. You always see the full breakdown before anything is ordered.",
  },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Company",
    links: ["Our Story", "The Atelier", "Careers", "Press", "Journal"],
  },
  {
    heading: "Services",
    links: [
      "Interior Design",
      "Architectural Styling",
      "Bespoke Furniture",
      "Art Curation",
      "Consultation",
    ],
  },
  {
    heading: "Projects",
    links: ["Residential", "Retail", "Hospitality", "Archive", "Awards"],
  },
  {
    heading: "Social",
    links: ["Instagram", "Pinterest", "LinkedIn", "Behance"],
  },
] as const;
