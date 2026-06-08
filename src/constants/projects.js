import naitikImg from "../assets/naitik.png";
import sangrillaImg from "../assets/sangrilla.png";
import expectoImg from "../assets/expecto.png";
import jpRestaurantImg from "../assets/jp-restaurant.png";
import socialImg from "../assets/social.png";
import project6Img from "../assets/project6.png";

export const projects = [
  {
    id: 1,
    title: "Social by Naava",
    category: "Brand",
    description: "Cafe & Social Space",
    tags: ["Next.js", "CMS"],
    result: "Modernized web presence",
    image: socialImg,
    link: "https://naavasip.vercel.app/",
    problem: "The physical social space lacked a cohesive digital identity, leading to lost opportunities for private event inquiries, low brand discoverability, and friction in customer outreach.",
    solution: "We engineered a fluid, dark-mode web showcase utilizing a high-performance Next.js engine. We integrated a custom headless CMS for real-time menu and event updates, paired with an automated event lead acquisition funnel.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"],
    results: {
      metrics: [
        { label: "Event Inquiries", value: "2.5x" },
        { label: "Mobile Load Speed", value: "< 0.4s" },
        { label: "Brand Interaction", value: "+180%" }
      ],
      summary: "Transformed Naava's brand presence, turning their site into an automated booking channel that runs 24/7."
    }
  },
  {
    id: 2,
    title: "Sangrilla",
    category: "Web",
    description: "Restaurant Website",
    tags: ["Next.js", "Framer Motion"],
    result: "Increased online reservations",
    image: sangrillaImg,
    link: "https://sangrill.vercel.app/",
    problem: "A high-end restaurant lost revenue daily due to a slow, unresponsive website and an outdated third-party reservation widget that caused users to bounce.",
    solution: "We designed and developed a cinematic dining experience page with immersive Framer Motion animations. We built a custom, light-speed inline table reservation flow that requires zero page refreshes.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Node.js", "MongoDB"],
    results: {
      metrics: [
        { label: "Direct Bookings", value: "+40%" },
        { label: "Bounce Rate", value: "-28%" },
        { label: "Customer Inquiries", value: "+65%" }
      ],
      summary: "Created a premium digital storefront that matches the physical dining quality, converting passive visitors into reserved guests."
    }
  },
  {
    id: 3,
    title: "JP Restaurant & Banquet",
    category: "Web",
    description: "Banquet & Dining",
    tags: ["React", "Tailwind"],
    result: "Optimized for high conversion",
    image: jpRestaurantImg,
    link: "https://jp-gamma-eosin.vercel.app/",
    problem: "The banquet hall suffered from low booking rates and tedious manual scheduling because prospects couldn't view availability or request quotes efficiently.",
    solution: "We developed a clean, high-conversion React application featuring an interactive 3D virtual space preview and an intuitive quotation generator that qualifies leads automatically.",
    technologies: ["React", "Tailwind CSS", "GSAP", "EmailJS", "Netlify"],
    results: {
      metrics: [
        { label: "Lead Quality", value: "+95%" },
        { label: "Manual Calls Saved", value: "12hrs/wk" },
        { label: "Conversion Rate", value: "6.2%" }
      ],
      summary: "Created an automated quoting system that filters and captures high-value banquet leads before they reach out to competitors."
    }
  },
  {
    id: 4,
    title: "Expecto",
    category: "Brand",
    description: "Restaurant & Story",
    tags: ["React", "GSAP"],
    result: "Unique identity & fast load times",
    image: expectoImg,
    link: "https://kingslayer-hi.vercel.app/",
    problem: "A themed restaurant wanted to tell its unique brand story digitally but struggled with high-fidelity asset rendering causing massive lag and high bounce rates on mobile.",
    solution: "We built a customized story-driven site using lightweight SVG animations, GSAP scrolltriggers, and WebP asset optimization, bringing the narrative to life without sacrificing loading speeds.",
    technologies: ["React", "GSAP", "Tailwind CSS", "Cloudinary", "Vite"],
    results: {
      metrics: [
        { label: "Mobile Performance", value: "99/100" },
        { label: "Avg. Session Duration", value: "+150s" },
        { label: "Social Shares", value: "+85%" }
      ],
      summary: "Delivered a butter-smooth visual journey that keeps visitors engaged, strengthening brand attachment and driving offline foot traffic."
    }
  },
  {
    id: 5,
    title: "Naitik",
    category: "Web",
    description: "Corporate Website",
    tags: ["React", "Tailwind", "Vercel"],
    result: "High-performance fine dining site",
    image: naitikImg,
    link: "https://naitik-steel.vercel.app/",
    problem: "A corporate catering brand suffered from a lack of digital authority, making it difficult to win enterprise contracts worth lakhs.",
    solution: "We engineered a clean, sophisticated React portal highlighting their scale of operations, food safety protocols, and client list, coupled with a seamless request-for-proposal pipeline.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    results: {
      metrics: [
        { label: "Corporate RFPs", value: "+110%" },
        { label: "Enterprise trust index", value: "High" },
        { label: "Load Velocity", value: "0.2s" }
      ],
      summary: "Repositioned the corporate brand to stand out in enterprise bids, turning their web presence into an active commercial asset."
    }
  },
  {
    id: 6,
    title: "Pause Cafe",
    category: "Web",
    description: "Cafe & Menu Experience",
    tags: ["React", "UI/UX"],
    result: "Beautiful menu showcase",
    image: project6Img,
    link: "https://pausecafe.vercel.app/",
    problem: "A local cafe's physical menus changed frequently, causing high printing costs, and their static PDF menu online was painful for customers to read on mobile.",
    solution: "We created a mobile-first digital menu asset with dynamic filtering (allergens, vegan, pricing) and integrated QR code scanning, updating instantly through a client dashboard.",
    technologies: ["React", "CSS Variables", "LocalForage", "Vite"],
    results: {
      metrics: [
        { label: "Menu Print Costs", value: "Saved 100%" },
        { label: "Mobile Menu Views", value: "4,000/mo" },
        { label: "Table Turn Time", value: "-15%" }
      ],
      summary: "Modernized table service by creating a quick-loading digital menu system, reducing operational friction."
    }
  },
  {
    id: 7,
    title: "Cafe Europa",
    category: "Web",
    description: "European Cafe Brand",
    tags: ["Web", "Design System"],
    result: "Premium digital experience",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    link: "https://cafe-europa.vercel.app/",
    problem: "Cafe Europa needed a digital system to support franchise growth and showcase standardized menu details across multiple locations.",
    solution: "We architected a unified design system and multi-location page framework that makes launching pages for new branches simple and consistent.",
    technologies: ["React", "Tailwind CSS", "Figma Design System", "Vercel"],
    results: {
      metrics: [
        { label: "Franchise Leads", value: "+80%" },
        { label: "New Page Setups", value: "< 2 hrs" },
        { label: "Unified SEO Index", value: "Ranked #1" }
      ],
      summary: "Established a scalable franchise portal that facilitates multi-city organic reach."
    }
  },
  {
    id: 8,
    title: "Hoppers Restro",
    category: "Web",
    description: "Restaurant Ordering",
    tags: ["React", "Backend"],
    result: "Streamlined online orders",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    link: "https://hoppers-restro.vercel.app/",
    problem: "High commission rates from food aggregator platforms (Zomato/Swiggy) were eating into Hopper's net profit margins.",
    solution: "We engineered a direct-to-consumer online ordering system with instant SMS order notifications and direct WhatsApp checkout integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Twilio API"],
    results: {
      metrics: [
        { label: "Commission Saved", value: "₹45,000/mo" },
        { label: "Repeat Customers", value: "+34%" },
        { label: "Order Ticket Size", value: "+12%" }
      ],
      summary: "Successfully decoupled the restaurant from aggregators, building a high-margin digital channel they own completely."
    }
  },
  {
    id: 9,
    title: "Adroit Coaching",
    category: "App",
    description: "Coaching WebApp Platform",
    tags: ["React", "EdTech", "Vercel"],
    result: "Complete student management",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: "https://adroit-demo.vercel.app/",
    problem: "Coaching institutes struggle to manage student enrollment, study materials, and tests, relying on scattered WhatsApp groups and Excel sheets.",
    solution: "We engineered a robust WebApp platform that consolidates student dashboards, mock tests, and a digital library with automated email reporting.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    results: {
      metrics: [
        { label: "Admin Overhead", value: "-75%" },
        { label: "Student Engagement", value: "92%" },
        { label: "Mock Tests Run", value: "10,000+" }
      ],
      summary: "Delivered a centralized SaaS asset that saves hours of administrative work and elevates the student learning experience."
    }
  },
  {
    id: 10,
    title: "Takshashila IAS",
    category: "App",
    description: "Civil Services Academy",
    tags: ["EdTech", "Portal"],
    result: "Seamless video delivery",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
    link: "https://takshashila-ias-md.vercel.app/",
    problem: "A premium IAS academy had issues with video course piracy and slow video buffering for students in low-bandwidth rural areas.",
    solution: "We implemented an encrypted video streaming portal utilizing secure HLS transcoding and dynamic adaptive bitrate playback.",
    technologies: ["React", "AWS S3", "CloudFront", "HLS Streaming", "JWT Auth"],
    results: {
      metrics: [
        { label: "Piracy Attempts", value: "Reduced to 0" },
        { label: "Rural Buffering", value: "-60%" },
        { label: "Video Watch Time", value: "+45%" }
      ],
      summary: "Secured intellectual property while improving content delivery, helping the academy expand its remote subscriber base."
    }
  },
  {
    id: 11,
    title: "Sandesh Education",
    category: "App",
    description: "Online Learning Platform",
    tags: ["WebApp", "LMS"],
    result: "Engaging student dashboard",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
    link: "https://sandesh-six.vercel.app/",
    problem: "Students suffered from learning fatigue due to static, text-heavy LMS interfaces that lacked interactive progression tracking.",
    solution: "We built an engaging student dashboard with gamified milestones, real-time analytics, and automated progress reports sent to parents.",
    technologies: ["React", "Tailwind CSS", "Recharts", "Node.js", "PostgreSQL"],
    results: {
      metrics: [
        { label: "Course Completion", value: "+62%" },
        { label: "Active Daily Users", value: "1.8x" },
        { label: "Parent NPS Score", value: "9.2/10" }
      ],
      summary: "Gamified learning outcomes, increasing user retention and driving higher renewal rates for the academy."
    }
  },
  {
    id: 12,
    title: "Evoke Rho",
    category: "App",
    description: "Interactive Coaching",
    tags: ["Next.js", "EdTech"],
    result: "High retention rates",
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2070&auto=format&fit=crop",
    link: "https://evoke-rho.vercel.app/",
    problem: "Evoke Rho's high-ticket clients felt disconnected during group-coaching phases, leading to drop-offs before renewals.",
    solution: "We engineered an interactive Next.js web application with personal goal tracking, integrated direct messaging, and group accountability boards.",
    technologies: ["Next.js", "WebSockets", "Tailwind CSS", "Prisma", "PostgreSQL"],
    results: {
      metrics: [
        { label: "Client Retention", value: "95%" },
        { label: "Goal Completion", value: "+80%" },
        { label: "Direct Referrals", value: "+40%" }
      ],
      summary: "Built a community-first digital asset that justifies high-ticket pricing by demonstrating tangible client results."
    }
  },
  {
    id: 13,
    title: "Pitman Training",
    category: "App",
    description: "Skills Development Hub",
    tags: ["React", "Assessment"],
    result: "Automated testing flows",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop",
    link: "https://pitman.vercel.app/",
    problem: "Grading skills assessments manually for thousands of candidates created huge administrative bottlenecks and delayed hiring cycles.",
    solution: "We engineered a web assessment engine that auto-grades coding and spreadsheet exercises in real-time, providing immediate feedback.",
    technologies: ["React", "Node.js", "Docker Sandbox", "Tailwind CSS"],
    results: {
      metrics: [
        { label: "Grading Turnaround", value: "Instant" },
        { label: "Time-to-Hire", value: "-50%" },
        { label: "Candidate Throughput", value: "3x" }
      ],
      summary: "Automated recruitment pipelines, significantly reducing cost-per-hire for corporate clients."
    }
  },
  {
    id: 14,
    title: "Maa Lyart",
    category: "App",
    description: "Educational Portal",
    tags: ["Web", "EdTech"],
    result: "Scalable architecture",
    image: "https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2574&auto=format&fit=crop",
    link: "https://maa-lyart.vercel.app/",
    problem: "The existing portal crashed every time exam results were published due to database connection overload.",
    solution: "We re-architected the portal with a serverless edge database and server-side static rendering, ensuring high stability during traffic spikes.",
    technologies: ["Next.js", "SupaBase Serverless", "Tailwind CSS", "Vercel Edge"],
    results: {
      metrics: [
        { label: "Concurrent Traffic", value: "15,000 Users" },
        { label: "Uptime During Load", value: "100%" },
        { label: "Server Cost Reduction", value: "60%" }
      ],
      summary: "Optimized infrastructure for elastic scaling, saving thousands of rupees in monthly server fees."
    }
  },
  {
    id: 15,
    title: "Icon Academy",
    category: "App",
    description: "Digital Classroom",
    tags: ["LMS", "Video"],
    result: "Smooth learning experience",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    link: "https://icon-ten-tawny.vercel.app/",
    problem: "Students struggled to coordinate group projects and live assignments within their current LMS, requiring extra third-party software licenses.",
    solution: "We built a custom digital classroom with built-in whiteboard tools, synchronized document editing, and a group messaging dashboard.",
    technologies: ["React", "Socket.io", "Express", "Node.js", "Tailwind CSS"],
    results: {
      metrics: [
        { label: "Tool License Savings", value: "₹20,000/yr" },
        { label: "Collaboration Rate", value: "+75%" },
        { label: "Daily Active Students", value: "+40%" }
      ],
      summary: "Consolidated toolsets into one high-performance digital asset, driving down software costs."
    }
  },
  {
    id: 16,
    title: "Tiwari Coaching",
    category: "App",
    description: "Tiwari Delta Platform",
    tags: ["React", "Students"],
    result: "Organized course structure",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2070&auto=format&fit=crop",
    link: "https://tiwari-delta.vercel.app/",
    problem: "Tiwari Coaching lacked an integrated system for scheduling and tracking syllabus completion across multiple batches.",
    solution: "We engineered an administrative dashboard with interactive calendars, batch tracking, and automated progress alerts for student cohorts.",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    results: {
      metrics: [
        { label: "Scheduling Conflict", value: "Zeroed out" },
        { label: "Syllabus Compliance", value: "100%" },
        { label: "Admin Productivity", value: "+45%" }
      ],
      summary: "Streamlined multi-batch organization, allowing the center to take on 30% more students without hiring additional admin staff."
    }
  }
];
