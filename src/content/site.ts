/**
 * Single source of truth for site copy and data.
 *
 * Content rules (keep these when editing):
 *  - Only verified facts. No invented clients, metrics, awards, reviews or years.
 *  - Case-study metrics stay empty until confirmed by the project owner.
 *  - Social / resource links render only when a real URL is filled in.
 */

export const company = {
  name: "SSLC Startup",
  wordmark: "SSLC STARTUP",
  tagline: "Software product engineering",
  email: "business@sslctstartup.com",
  phone: "+91 97180 41853",
  phoneHref: "tel:+919718041853",
  whatsappHref: "https://wa.me/919718041853",
  /** City-level location for structured data and AI answers (no street address published). */
  location: { locality: "Noida", region: "Uttar Pradesh", country: "IN", label: "Noida, India" },
  /** Shown on /about. Facts confirmed by the owner only. */
  founder: {
    name: "Shivam Tyagi",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/shivam-tyagi-48a996285/",
    bio: "Shivam leads product and engineering at SSLC Startup. A Python and AI engineer, he works across backends, cloud infrastructure and AI systems, and is involved in every project from the first call to launch.",
  },
  /** Government of India MSME (Udyam) registration — publicly verifiable. */
  registration: {
    label: "Udyam Registered MSME",
    /** As on the Udyam certificate (date of incorporation / registration of enterprise). */
    founded: "2024-02-01",
    number: "UDYAM-UP-28-0248151",
    verifyUrl: "https://udyamregistration.gov.in/Udyam_Verify.aspx",
  },
  footerLine: ["Build better software.", "Build better businesses."],
  /** Add real profile URLs here; empty entries are not rendered. */
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/sslc-startup/" },
    { label: "Instagram", href: "" },
    { label: "GitHub", href: "" },
  ],
} as const;

export const seo = {
  title: "SSLC Startup | AI, Web & App Development Company",
  description:
    "SSLC Startup builds AI agents, SaaS platforms, web and mobile apps and CRM/ERP systems for startups and growing businesses. Free consultation.",
  /** Brand spellings people search for — used for site name & structured data. */
  alternateNames: ["SSLC", "SSLC Startup", "SSLC Start-up", "sslctstartup", "SSLC Startups"],
  keywords: [
    "SSLC Startup",
    "SSLC",
    "software development company",
    "custom software development",
    "AI development company",
    "AI agents development",
    "AI chatbot development",
    "SaaS development",
    "web application development",
    "website development company",
    "mobile app development",
    "iOS and Android app development",
    "React Native app development",
    "CRM development",
    "ERP software development",
    "business automation",
    "Next.js development",
    "Django development",
    "cloud and DevOps services",
    "software company India",
  ],
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Technology", href: "/#technology" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;

export type ProjectType =
  | "AI Product"
  | "SaaS"
  | "Web App"
  | "Mobile App"
  | "CRM / ERP"
  | "Automation"
  | "Custom Software"
  | "Other";

export const projectTypes: ProjectType[] = [
  "AI Product",
  "SaaS",
  "Web App",
  "Mobile App",
  "CRM / ERP",
  "Automation",
  "Custom Software",
  "Other",
];

export type Service = {
  id: string;
  name: string;
  short: string;
  outcome: string;
  capabilities: string[];
  stack: string[];
  flowTitle: string;
  flow: { label: string; detail: string }[];
  inquiryType: ProjectType;
};

export const services: Service[] = [
  {
    id: "ai",
    name: "AI & Intelligent Systems",
    short: "AI",
    outcome:
      "Put AI where it removes real work: answering customers, qualifying leads, routing tasks and turning data into decisions.",
    capabilities: ["AI agents", "LLM integrations", "Workflow automation", "Recommendation engines", "Intelligent workflows"],
    stack: ["OpenAI / Claude APIs", "RAG", "Python", "Vector search"],
    flowTitle: "An AI agent, end to end",
    flow: [
      { label: "User", detail: "Asks a question or triggers a task" },
      { label: "AI Agent", detail: "Understands intent, plans the steps" },
      { label: "Business Logic", detail: "Rules, permissions, guardrails" },
      { label: "API", detail: "Calls your systems securely" },
      { label: "Database", detail: "Reads and writes real records" },
      { label: "Action", detail: "Replies, updates, notifies — logged" },
    ],
    inquiryType: "AI Product",
  },
  {
    id: "saas",
    name: "SaaS & Platforms",
    short: "SaaS",
    outcome:
      "Launch a subscription product that is ready for paying customers on day one — and for thousands of them after that.",
    capabilities: ["Multi-tenant SaaS", "Dashboards", "Subscriptions", "Billing", "Admin systems"],
    stack: ["Next.js", "Django / Node.js", "PostgreSQL", "Stripe / Razorpay"],
    flowTitle: "A multi-tenant SaaS core",
    flow: [
      { label: "Sign-up", detail: "Workspace created per customer" },
      { label: "Auth & Roles", detail: "SSO, invites, permissions" },
      { label: "Billing", detail: "Plans, trials, usage, invoices" },
      { label: "Tenant Data", detail: "Isolated, backed-up, auditable" },
      { label: "Admin Console", detail: "Support, metrics, controls" },
      { label: "Analytics", detail: "Activation, retention, revenue" },
    ],
    inquiryType: "SaaS",
  },
  {
    id: "web",
    name: "Web Applications",
    short: "Web",
    outcome:
      "Replace spreadsheets and email threads with a web platform your customers and team actually enjoy using.",
    capabilities: ["Business platforms", "Customer portals", "Marketplaces", "Internal tools"],
    stack: ["React", "Next.js", "TypeScript", "REST / GraphQL"],
    flowTitle: "A customer portal request",
    flow: [
      { label: "Customer", detail: "Signs in from any device" },
      { label: "Portal UI", detail: "Fast, accessible, responsive" },
      { label: "API Gateway", detail: "Auth, rate limits, validation" },
      { label: "Workflows", detail: "Approvals, status, assignments" },
      { label: "Database", detail: "Single source of truth" },
      { label: "Notifications", detail: "Email, SMS, in-app" },
    ],
    inquiryType: "Web App",
  },
  {
    id: "mobile",
    name: "Mobile Applications",
    short: "Mobile",
    outcome:
      "Ship native-quality iOS and Android apps from one codebase, connected to the same backend as your web product.",
    capabilities: ["iOS", "Android", "React Native", "Flutter"],
    stack: ["React Native / Expo", "Flutter", "Push notifications", "App Store & Play"],
    flowTitle: "An app that works offline",
    flow: [
      { label: "iOS / Android", detail: "One codebase, native feel" },
      { label: "Local Cache", detail: "Usable without a connection" },
      { label: "Sync API", detail: "Conflict-safe background sync" },
      { label: "Backend", detail: "Shared with your web product" },
      { label: "Push", detail: "Targeted, timely notifications" },
      { label: "Release", detail: "Store builds & OTA updates" },
    ],
    inquiryType: "Mobile App",
  },
  {
    id: "custom",
    name: "Custom Software",
    short: "Custom",
    outcome:
      "When off-the-shelf tools force you to bend your process, we build software shaped around the way you work.",
    capabilities: ["Business systems", "Workflow automation", "Custom platforms", "Third-party integrations"],
    stack: ["Python", "Django", "Node.js", "PostgreSQL"],
    flowTitle: "From manual process to system",
    flow: [
      { label: "Manual Process", detail: "Spreadsheets, calls, copy-paste" },
      { label: "Process Map", detail: "Every step and exception mapped" },
      { label: "Custom Platform", detail: "Built around your workflow" },
      { label: "Integrations", detail: "Talks to the tools you keep" },
      { label: "Automation", detail: "Repetitive steps removed" },
      { label: "Reporting", detail: "Live view of the business" },
    ],
    inquiryType: "Custom Software",
  },
  {
    id: "crm-erp",
    name: "CRM & ERP",
    short: "CRM / ERP",
    outcome:
      "One connected system for sales, operations, inventory and customers — instead of five tools that don't agree.",
    capabilities: ["Sales pipelines", "Operations", "Inventory", "Customer management", "Business automation"],
    stack: ["Django", "PostgreSQL", "Celery", "Role-based access"],
    flowTitle: "Lead to cash, in one system",
    flow: [
      { label: "Lead", detail: "Captured from every channel" },
      { label: "Pipeline", detail: "Stages, owners, follow-ups" },
      { label: "Order", detail: "Quotes become orders" },
      { label: "Inventory", detail: "Stock reserved automatically" },
      { label: "Invoice", detail: "Billing without re-typing" },
      { label: "Dashboard", detail: "Revenue and ops at a glance" },
    ],
    inquiryType: "CRM / ERP",
  },
  {
    id: "backend",
    name: "API & Backend",
    short: "Backend",
    outcome:
      "The part users never see and always feel: fast APIs, clean data models and background jobs that don't fall over.",
    capabilities: ["REST & GraphQL APIs", "Microservices", "Queues & workers", "Data modelling", "Third-party integrations"],
    stack: ["Django", "Node.js", "PostgreSQL", "Redis", "Celery"],
    flowTitle: "A request through the backend",
    flow: [
      { label: "Client", detail: "Web, mobile or partner" },
      { label: "REST / GraphQL", detail: "Versioned, documented" },
      { label: "Services", detail: "Domain logic, well-tested" },
      { label: "PostgreSQL", detail: "Modelled for growth" },
      { label: "Redis", detail: "Caching & rate limiting" },
      { label: "Queue Workers", detail: "Heavy work, off the request" },
    ],
    inquiryType: "Custom Software",
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    short: "Cloud",
    outcome:
      "Deploy with confidence: automated pipelines, monitored infrastructure and environments that scale when you do.",
    capabilities: ["AWS", "Docker", "CI/CD", "Monitoring", "Scaling", "Security"],
    stack: ["AWS", "Docker", "GitHub Actions", "Infrastructure as code"],
    flowTitle: "Commit to production",
    flow: [
      { label: "Commit", detail: "Reviewed pull request" },
      { label: "CI Pipeline", detail: "Tests, lint, security checks" },
      { label: "Container", detail: "Reproducible Docker build" },
      { label: "Deploy", detail: "Zero-downtime release on AWS" },
      { label: "Monitor", detail: "Logs, metrics, alerts" },
      { label: "Scale", detail: "Capacity follows demand" },
    ],
    inquiryType: "Custom Software",
  },
];

export const architectureLayers = [
  { name: "Frontend", detail: "Web and mobile interfaces built for speed and accessibility.", tech: ["React", "Next.js", "React Native"] },
  { name: "API", detail: "Versioned, documented contracts between every client and the core.", tech: ["REST", "GraphQL"] },
  { name: "Business Logic", detail: "Your rules, isolated, tested and easy to change.", tech: ["Python", "Django", "Node.js"] },
  { name: "Database", detail: "Data models designed for the product you'll have in two years.", tech: ["PostgreSQL"] },
  { name: "Queue", detail: "Emails, reports, syncs and AI calls run in the background.", tech: ["Redis", "Celery"] },
  { name: "AI / Automation", detail: "Models and agents plugged into the workflow, with guardrails.", tech: ["AI/LLMs"] },
  { name: "Cloud Infrastructure", detail: "Containerised, monitored and deployed through CI/CD.", tech: ["AWS", "Docker"] },
] as const;

export const technologies = [
  "Python",
  "Django",
  "Node.js",
  "React",
  "Next.js",
  "React Native",
  "PostgreSQL",
  "Redis",
  "Celery",
  "AWS",
  "Docker",
  "AI/LLMs",
];

export type CaseStudy = {
  id: string;
  kind: "project" | "blueprint";
  name: string;
  summary: string;
  problem: string;
  solution: string;
  capabilities: string[];
  technology: string[];
  impact: string;
  /** Verified, quantified outcomes only. Leave empty until confirmed. */
  metrics: { value: string; label: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-support-agent",
    kind: "blueprint",
    name: "AI Support Agent",
    summary: "Customer support that resolves, not just replies.",
    problem: "Support teams answer the same questions every day while complex tickets wait in the queue.",
    solution:
      "An agent grounded in your knowledge base and order data that resolves routine requests, escalates with full context and logs every action.",
    capabilities: ["Retrieval over your docs", "Order & account lookups", "Human hand-off", "Audit trail"],
    technology: ["Python", "LLM APIs", "PostgreSQL", "Redis"],
    impact: "Takes repetitive volume off the team while humans stay in control of edge cases.",
    metrics: [],
  },
  {
    id: "multi-tenant-saas",
    kind: "blueprint",
    name: "Multi-tenant SaaS Core",
    summary: "A subscription product built to scale from day one.",
    problem: "Most SaaS MVPs are rebuilt within a year because tenancy, billing and roles were bolted on later.",
    solution:
      "Tenant isolation, role-based access, subscription billing and an admin console in place before the first feature ships.",
    capabilities: ["Tenant isolation", "Roles & permissions", "Subscription billing", "Admin console"],
    technology: ["Next.js", "Django", "PostgreSQL", "AWS"],
    impact: "New features land on a stable base instead of forcing a rewrite.",
    metrics: [],
  },
  {
    id: "realtime-mobile",
    kind: "blueprint",
    name: "Real-time Mobile Platform",
    summary: "iOS, Android and web on one live backend.",
    problem: "Separate apps per platform drift apart, double the cost and never quite share the same data.",
    solution:
      "One React Native codebase with offline cache, real-time sync and push, sharing APIs and business logic with the web dashboard.",
    capabilities: ["Offline-first", "Real-time sync", "Push notifications", "Web dashboard"],
    technology: ["React Native", "Node.js", "PostgreSQL", "Redis"],
    impact: "One team ships every platform together — features, fixes and data stay in step.",
    metrics: [],
  },
  {
    id: "crm-erp-suite",
    kind: "blueprint",
    name: "Sales CRM & ERP",
    summary: "Leads, orders, inventory and invoices in one system.",
    problem: "Sales, operations and finance work in separate tools, so data is re-typed and never quite agrees.",
    solution:
      "One connected platform with pipelines, quotes-to-orders, stock reservation and invoicing, with role-based access for every team.",
    capabilities: ["Sales pipeline", "Order management", "Inventory", "Invoicing"],
    technology: ["Django", "PostgreSQL", "Celery", "React"],
    impact: "Every team works from the same live data, with far less manual entry.",
    metrics: [],
  },
  {
    id: "ai-document-automation",
    kind: "blueprint",
    name: "AI Document Automation",
    summary: "Invoices, forms and emails processed automatically.",
    problem: "Teams spend hours reading documents and copying the same data into business systems.",
    solution:
      "An AI pipeline that extracts and validates data from documents, routes exceptions to a human and syncs results to your systems.",
    capabilities: ["Data extraction", "Validation rules", "Human review", "System sync"],
    technology: ["Python", "LLM APIs", "Redis", "AWS"],
    impact: "Repetitive document work runs in the background, with people handling only the exceptions.",
    metrics: [],
  },
  {
    id: "customer-portal",
    kind: "blueprint",
    name: "Customer Portal",
    summary: "Self-service requests, quotes and invoices for your customers.",
    problem: "Customers chase updates by email and phone because they can't see the status of their requests.",
    solution:
      "A secure portal where customers raise requests, approve quotes, track progress and pay invoices — connected to your back office.",
    capabilities: ["Secure sign-in", "Request tracking", "Quote approval", "Online payments"],
    technology: ["Next.js", "Node.js", "PostgreSQL", "Stripe / Razorpay"],
    impact: "Fewer status calls and faster approvals, with customers served around the clock.",
    metrics: [],
  },
];

export const aiUseCases = [
  { title: "AI Customer Support", detail: "Resolves routine questions from your docs and order data; escalates the rest with context." },
  { title: "AI Sales Assistant", detail: "Qualifies inbound leads, books meetings and keeps your CRM up to date." },
  { title: "AI Operations Agent", detail: "Watches queues and systems, flags exceptions and drafts the fix for approval." },
  { title: "AI Data Analyst", detail: "Answers business questions in plain language, straight from your database." },
  { title: "AI Workflow Automation", detail: "Reads documents, extracts the data and moves it through your process." },
  { title: "AI Recommendation Engine", detail: "Personalises products, content or matches based on real behaviour." },
];

export const processSteps = [
  { n: "01", title: "Discover", line: "Understand the business.", detail: "Goals, users, constraints and the shortest path to value — agreed before code.", deliverables: ["Scope & priorities", "Technical approach", "Roadmap & estimate"] },
  { n: "02", title: "Design", line: "Turn ideas into experiences.", detail: "Flows, wireframes and interface design you can click through and react to.", deliverables: ["User flows", "UI design", "Clickable prototype"] },
  { n: "03", title: "Engineer", line: "Build reliable software.", detail: "Short iterations with working software you can review every step of the way.", deliverables: ["Frontend & backend", "APIs & integrations", "Automated tests"] },
  { n: "04", title: "Launch", line: "Deploy to production.", detail: "Hardened, monitored and released without drama — web, app stores and cloud.", deliverables: ["CI/CD pipeline", "Production release", "Monitoring"] },
  { n: "05", title: "Scale", line: "Improve, automate and grow.", detail: "Measure what users do, then improve performance, features and automation.", deliverables: ["Iteration roadmap", "Performance tuning", "Ongoing support"] },
];

export const differentiators = [
  { title: "Product Thinking", detail: "We understand the business problem before writing code — and push back when a feature won't move the needle." },
  { title: "Engineering Depth", detail: "Architecture, backend, APIs, databases and infrastructure are part of the product, not an afterthought." },
  { title: "AI Native", detail: "AI is integrated where it creates measurable value — never bolted on for a press release." },
  { title: "Built For Scale", detail: "We design systems that can grow with your business, so success doesn't trigger a rewrite." },
  { title: "Long-Term Partnership", detail: "Launch is not the end of the relationship. We stay to improve, maintain and extend what we built." },
];

export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "Flexible"] as const;
export const budgets = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"] as const;

/** Ways to engage — edit to match how SSLC actually contracts. */
export const engagementModels = [
  {
    title: "Project-based",
    tag: "Defined scope",
    detail: "A clear scope, timeline and estimate for a product, MVP or feature set — delivered in milestones you can review.",
    bestFor: "MVPs, new products, redesigns",
  },
  {
    title: "Dedicated team",
    tag: "Flexible capacity",
    detail: "An SSLC team working as an extension of yours — product, design and engineering that scales with your roadmap.",
    bestFor: "Growing products, ongoing roadmaps",
  },
  {
    title: "Support & scale",
    tag: "After launch",
    detail: "Monitoring, maintenance, performance work and new features for software that is already live.",
    bestFor: "Live platforms, legacy systems",
  },
];

export const techGroups = [
  { title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Mobile", items: ["React Native", "Expo", "Flutter", "iOS & Android"] },
  { title: "Backend", items: ["Python", "Django", "Node.js", "REST / GraphQL"] },
  { title: "Data", items: ["PostgreSQL", "Redis", "Celery", "Vector search"] },
  { title: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Monitoring"] },
  { title: "AI", items: ["LLM APIs", "AI agents", "RAG", "Automation"] },
];

/** FAQ — answers describe how SSLC works; edit freely. */
export const faqs = [
  {
    q: "What kind of projects does SSLC take on?",
    a: "Software products and business systems: AI agents and automation, SaaS platforms, web applications, iOS and Android apps, CRM/ERP systems, APIs and cloud infrastructure — from a first MVP to platforms that need to scale.",
  },
  {
    q: "How does a project start?",
    a: "Send us a short brief through the form or WhatsApp. We review it, set up a discovery call to understand your goals, users and constraints, and follow up with a written proposal covering scope, approach, timeline and estimate.",
  },
  {
    q: "How can we work together?",
    a: "Three ways: a project-based engagement with a defined scope, a dedicated team that works as an extension of yours, or support & scale for software that is already live.",
  },
  {
    q: "Do you work with startups or only established companies?",
    a: "Both. We work with founders validating a new product, growing businesses replacing manual processes, and larger teams that need extra product and engineering capacity.",
  },
  {
    q: "Can you add AI to an existing product?",
    a: "Yes — AI is integrated where it creates measurable value: support agents grounded in your data, lead qualification, document processing, recommendations and workflow automation, with guardrails and human review where it matters.",
  },
  {
    q: "What is SSLC Startup?",
    a: "SSLC Startup (also written SSLC) is a software development company based in Noida, India. It designs and builds AI agents, SaaS platforms, web applications, iOS and Android apps, CRM/ERP systems, APIs and cloud infrastructure for startups and growing businesses.",
  },
  {
    q: "Is SSLC Startup a registered business?",
    a: "Yes. SSLC Startup is registered as a Micro enterprise (MSME) with the Government of India's Ministry of Micro, Small & Medium Enterprises under the Udyam scheme, registration number UDYAM-UP-28-0248151. Anyone can verify it on udyamregistration.gov.in.",
  },
  {
    q: "What technologies does SSLC Startup use?",
    a: "React, Next.js and TypeScript for the web; React Native, Expo and Flutter for iOS and Android; Python, Django and Node.js for backends; PostgreSQL and Redis for data; AWS, Docker and CI/CD for cloud; and LLM APIs, AI agents and RAG for AI features.",
  },
  {
    q: "How do I contact SSLC Startup?",
    a: "Email business@sslctstartup.com, message +91 97180 41853 on WhatsApp, or send a brief through the project form on sslctstartup.com. A free consultation is included before any proposal.",
  },
  {
    q: "What happens after launch?",
    a: "Launch is not the end of the relationship. We monitor, maintain and keep improving what we build — performance, new features, automation and scaling as your business grows.",
  },
];
