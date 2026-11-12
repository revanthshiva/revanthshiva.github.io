// All site content lives here. Taken from Revanth's résumé (Nov 2026).

export const profile = {
  name: "Revanth Shiva",
  role: "Full Stack Developer",
  tagline: "I build the software a business runs on, and keep it running.",
  city: "Bengaluru, India",
  location: "Bengaluru, India. Open to relocating anywhere.",
  email: "revanthshiva3@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/revanthshiva/" },
    { label: "Resume (PDF)", href: "/Revanth_Shiva_Resume.pdf" },
  ],
};

export const heroStats = [
  { num: "1,000+", label: "commits shipped" },
  { num: "10", label: "products built" },
  { num: "4+", label: "years building software" },
];

export const story = [
  {
    label: "The problem",
    text: "In every company, something important still runs on slow, manual work.",
  },
  {
    label: "My approach",
    text: "I learn how that work really happens, then build software that quietly takes it over.",
  },
  {
    label: "Business automation",
    text: "Then I keep it fast and easy to change, because the business never stands still.",
  },
];

export type Capability = {
  title: string;
  summary: string;
  points: string[];
  stack: string[];
  color: string;
};

export const capabilities: Capability[] = [
  {
    title: "Prime",
    summary: "A web platform for reviewing and marking up construction drawings, modelled on Bluebeam Revu.",
    points: [
      "Teams open PDF drawings together and add markups, comments and measurement takeoffs in real time.",
      "Compare two revisions of a sheet side by side, and carry markups forward onto the new version.",
      "Review 3D IFC building models next to the flat 2D sheets.",
      "A companion Revit add-in links the designer's model straight to the web app.",
    ],
    stack: ["Laravel", "Inertia", "Vue 3", "TypeScript"],
    color: "#6EE7F0",
  },
  {
    title: "Operations & finance platform",
    summary: "A large internal system that a whole company runs its day-to-day work on.",
    points: [
      "One place for staff to handle finance, assets, projects and operations.",
      "Role-based access, so each team only sees and edits what it should.",
      "Reporting runs on approved, parameterised SQL — never ad-hoc queries.",
      "Primary developer across hundreds of commits over two-plus years.",
    ],
    stack: ["PHP", "Laravel", "MySQL", "Blade"],
    color: "#FFC94D",
  },
  {
    title: "Engineering web portal",
    summary: "A public-facing web application for an engineering business.",
    points: [
      "Customer-facing pages backed by the same data as the internal platform.",
      "Server-rendered PHP for fast first loads and search visibility.",
      "Handles outside enquiries and account access.",
    ],
    stack: ["PHP", "MySQL", "JavaScript"],
    color: "#7C8CFF",
  },
  {
    title: "QuickBooks integration",
    summary: "A service that keeps internal finance data in sync with QuickBooks Online.",
    points: [
      "Two-way sync of invoices, customers and payments between the business system and QuickBooks.",
      "Runs on a schedule and on demand, validating everything before it writes.",
      "Retries and clear error states, so a failed call never loses data.",
    ],
    stack: ["TypeScript", "Node.js", "REST APIs"],
    color: "#5EE6B8",
  },
  {
    title: "Natural-language data assistant",
    summary: "An AI agent that answers plain-language questions about company data.",
    points: [
      "Staff ask things like “which projects are overdue?” and get a written answer with the data behind it.",
      "The AI picks the right data source and filters, mapped to safe, read-only SQL — it never writes raw SQL.",
      "It checks its own answer (e.g. that an “overdue” filter was really applied) and retries if not.",
      "Answers stream to the page live, with the steps it took.",
    ],
    stack: ["Python", "FastAPI", "LLM APIs"],
    color: "#FF8FB1",
  },
  {
    title: "Civil site inspection software",
    summary: "Field software for civil engineers to record a site inspection and get a finished PDF report.",
    points: [
      "Step-by-step form for site photos, drawings and on-screen signatures.",
      "Produces a formatted PDF report at the end of each inspection.",
      "Syncs finished reports to Google Drive automatically.",
      "Installs on a phone as a PWA, for use out on site.",
    ],
    stack: ["Next.js", "TypeScript", "MongoDB"],
    color: "#78D0FF",
  },
  {
    title: "Shipping & port tracker",
    summary: "An app that keeps shipment and port activity in one live view.",
    points: [
      "Shows the status of shipments and port movements at a glance.",
      "Replaces chasing updates across spreadsheets and email threads.",
    ],
    stack: ["TypeScript", "React", "Node.js"],
    color: "#FFB27A",
  },
  {
    title: "NSE swing-trading screener",
    summary: "A personal tool that scans the Indian stock market for swing-trade setups.",
    points: [
      "Pulls the full NSE F&O universe live from Angel One’s SmartAPI on every scan.",
      "Scores each stock on a checklist: trend, momentum, volume and strength versus the Nifty.",
      "Surfaces the day’s strongest setups in a dashboard, so there’s no manual chart-hunting.",
    ],
    stack: ["Python", "Node.js", "React", "SmartAPI"],
    color: "#74E0C0",
  },
  {
    title: "AI photo location finder",
    summary: "Upload a photo and it works out where the picture was taken.",
    points: [
      "Reads text and landmarks from the image with a vision model.",
      "Searches Maps and Street View for candidate places.",
      "Matches each candidate back against the original photo to pick the best.",
    ],
    stack: ["Python", "Flask", "Vision", "Maps API"],
    color: "#B693FF",
  },
  {
    title: "Ad performance dashboard",
    summary: "One view of a company’s own Google and Meta ad spend and results.",
    points: [
      "A single table across both platforms: spend, leads and cost per lead.",
      "Deep links straight into each campaign’s Ads Manager.",
      "Replaces hopping between two ad consoles to see how the money is doing.",
    ],
    stack: ["TypeScript", "React", "Node.js"],
    color: "#FF9ED6",
  },
];

export const experience = [
  {
    org: "CSA Engineering",
    type: "Full-time",
    where: "Australia · Remote",
    when: "Oct 2023 – Present",
    duration: "3 yrs 2 mos",
    roles: [
      { role: "IT Manager", when: "Dec 2024 – Present", duration: "2 yrs" },
      { role: "Full-stack Developer", when: "Oct 2023 – Dec 2024", duration: "1 yr 3 mos" },
    ],
    points: [
      "Design and develop custom software that automates business workflows and improves operational efficiency.",
      "Build React and Vue.js frontends and the RESTful APIs behind them for reliable data exchange.",
      "Work with SQL and data pipelines to support business applications and operational reporting.",
      "Run code reviews, apply best practices, and collaborate with cross-functional, international teams.",
    ],
  },
  {
    org: "Caps Workmanship",
    type: "Part-time",
    where: "India · Remote",
    when: "Jan 2022 – Mar 2023",
    duration: "1 yr 3 mos",
    roles: [{ role: "Web Developer", when: "Jan 2022 – Mar 2023", duration: "1 yr 3 mos" }],
    points: [
      "Built and maintained responsive WordPress websites focused on usability and cross-device compatibility.",
      "Implemented SEO strategies to improve organic traffic and online visibility.",
    ],
  },
  {
    org: "Guru Daksha Consultancy Services LLP",
    type: "Freelance",
    where: "Coimbatore, Tamil Nadu, India · Remote",
    when: "Jun 2022 – Feb 2023",
    duration: "9 mos",
    roles: [{ role: "WordPress Developer", when: "Jun 2022 – Feb 2023", duration: "9 mos" }],
    points: [],
  },
  {
    org: "Bosch Rexroth",
    type: "Apprenticeship",
    where: "Pollachi, Tamil Nadu, India",
    when: "Apr 2022",
    duration: "1 mo",
    roles: [{ role: "Internship Trainee", when: "Apr 2022", duration: "1 mo" }],
    points: [],
  },
];

export const education = [
  { title: "B.E. Mechatronics", school: "Hindusthan College of Engineering and Technology", when: "2021 – 2024" },
  { title: "Diploma, Mechanical Engineering", school: "NPR Polytechnic College", when: "2018 – 2020" },
];

export const skills: string[][] = [
  ["React", "Vue.js", "JavaScript", "TypeScript", "HTML", "CSS"],
  ["Node.js", "MERN stack", "PHP / Laravel", "Python", "REST APIs", "SQL"],
  ["LLM agents", "RAG", "NL-to-SQL", "Workflow automation", "Git"],
  ["Cybersecurity", "Kali Linux", "Firewalls", "Linux servers", "Google Workspace", "Microsoft 365"],
];

export const languages = "English (fluent), Tamil (native), Malayalam (intermediate)";
