export const site = {
  name: "MindArct",
  domain: "mindarct.com",
  url: "https://mindarct.com",
  tagline: "We architect smart software.",
  description:
    "MindArct builds custom software, AI automation and SaaS products, and helps teams migrate data between platforms with confidence.",
  email: "hello@mindarct.com", // TODO: replace with your real address
  socials: [
    { label: "GitHub", href: "https://github.com/MindArct" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/mindarct" }, 
  ],
};

export const services = [
  {
    icon: "code",
    title: "Custom Software",
    text: "Web apps, internal tools and mobile-ready platforms designed around how your business actually works.",
  },
  {
    icon: "spark",
    title: "AI & Automation",
    text: "Assistants, document processing and workflow automation that remove repetitive work from your team.",
  },
  {
    icon: "compass",
    title: "Consultation",
    text: "Architecture reviews, technology choices and roadmaps, so you build the right thing before you build it.",
  },
  {
    icon: "swap",
    title: "Data Migration",
    text: "Safe, verified moves of your data between platforms and systems, with mapping, validation and rollback plans.",
  },
  {
    icon: "cloud",
    title: "SaaS Products",
    text: "We design, build and launch subscription products, and run our own, from MVP to multi-tenant scale.",
  },
] as const;

export const process = [
  { title: "Discover", text: "We learn your goals, users and constraints." },
  { title: "Design", text: "Scope, architecture and clickable UI before code." },
  { title: "Build", text: "Short iterations with working demos every week." },
  { title: "Launch & grow", text: "Deploy, monitor and improve after go-live." },
];

export const serviceOptions = [
  "Custom Software",
  "AI & Automation",
  "Consultation",
  "Data Migration",
  "SaaS Product",
  "Something else",
] as const;
