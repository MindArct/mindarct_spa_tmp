// NOTE: These are sample entries with placeholder screenshots.
// Replace images in /public/projects/<slug>/ and edit the text below with real project info.

export type Project = {
  slug: string;
  title: string;
  category: "Platform" | "SaaS" | "AI" | "Migration";
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  outcome: string;
  liveUrl?: string;
  images: { src: string; alt: string }[];
};

const shots = (slug: string, names: string[], ext = "svg") =>
  names.map((n, i) => ({ src: `/projects/${slug}/${i + 1}.${ext}`, alt: `${n} screen` }));

export const projects: Project[] = [
  {
    slug: "ree-gallery",
    title: "Ree Gallery",
    category: "Platform",
    summary: "A cinematic website for an event management, photography and videography studio, built to showcase albums and take bookings.",
    problem:
      "The studio's best work lived in scattered social posts and chat threads, with no premium place to present albums, explain packages and capture booking requests.",
    solution:
      "A visually driven, story-first website with album galleries, packages, a blog, team profiles and a booking flow, all in a warm, cinematic identity of its own.",
    features: [
      "Cinematic home page with featured work and clear calls to action",
      "Albums with detail pages and full-size photo galleries",
      "Packages page to compare photo, video and full-coverage options",
      "Booking form with event type, date, venue and package selection",
      "Blog, About and team sections",
      "Sign-in protected area for managing content",
    ],
    stack: ["TanStack Start", "TypeScript", "Tailwind", "Supabase"],
    outcome: "One polished home for the studio's portfolio, with enquiries arriving through a single booking flow.",
    liveUrl: "https://cartnuvia.com",
    images: shots("ree-gallery", ["Home", "Albums", "Album details", "Booking"], "webp"),
  },
  {
    slug: "planflow",
    title: "PlanFlow",
    category: "SaaS",
    summary: "Multi-tenant project planning SaaS with boards, timelines and team reporting.",
    problem: "Small agencies juggled spreadsheets and chat threads to track delivery across clients.",
    solution:
      "One workspace per team with kanban boards, a timeline view and weekly status reports generated automatically.",
    features: [
      "Kanban boards and timeline view",
      "Role-based access and client portals",
      "Automatic weekly status reports",
      "Subscription billing with trial and plan limits",
      "Activity feed and notifications",
    ],
    stack: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    outcome: "Cut weekly status reporting from hours to minutes for pilot teams.",
    images: shots("planflow", ["Board", "Timeline", "Reports"]),
  },
  {
    slug: "databridge",
    title: "DataBridge",
    category: "Migration",
    summary: "A guided tool for moving records between platforms with field mapping and validation.",
    problem: "Switching CRM or e-commerce platforms meant fragile CSV exports and silently lost records.",
    solution: "A mapping-first migration pipeline that previews, transforms, validates and reconciles every record.",
    features: [
      "Visual field mapping with transformation rules",
      "Dry-run preview and error report before import",
      "Batch processing with resume and rollback",
      "Post-migration reconciliation report",
    ],
    stack: ["Node.js", "TypeScript", "Queue workers", "REST APIs"],
    outcome: "Migrated 400k+ records with zero unreconciled differences.",
    images: shots("databridge", ["Mapping", "Preview", "Reconciliation"]),
  },
  {
    slug: "supportpilot",
    title: "SupportPilot",
    category: "AI",
    summary: "An AI assistant that answers customer questions from a company's own docs and hands off to humans.",
    problem: "Support teams repeated the same answers all day while customers waited in queues.",
    solution:
      "A retrieval-based assistant grounded in your documentation, with confidence thresholds and smooth human handoff.",
    features: [
      "Answers grounded in your docs with source citations",
      "Confidence-based escalation to a human agent",
      "Conversation analytics and gap detection",
      "Embeddable chat widget",
    ],
    stack: ["Claude API", "Next.js", "Vector search", "TypeScript"],
    outcome: "Resolved the majority of common questions without agent involvement in testing.",
    images: shots("supportpilot", ["Chat", "Analytics", "Knowledge base"]),
  },
];

export const upcoming = [
  { title: "MigrateKit", tag: "SaaS", text: "Self-serve platform migrations: connect two tools, map fields, move data." },
  { title: "InvoiceLens", tag: "AI", text: "Upload invoices and receipts, get clean structured data and accounting exports." },
  { title: "StudioCRM", tag: "SaaS", text: "A lightweight CRM for freelancers and small studios, built around follow-ups." },
  { title: "ArctOps", tag: "Automation", text: "No-code workflows that connect your tools and let AI handle the repetitive steps." },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
