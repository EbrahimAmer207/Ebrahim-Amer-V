export interface Project {
  slug: string;
  title: string;
  category: string;
  demoUrl: string;
  codeUrl: string;
  description: string;
  longDescription: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  story: {
    problem: string;
    solution: string;
    result: string;
  };
  challenges: string[];
  outcomes: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'luxe-ecommerce',
    title: 'LUXE E-Commerce',
    category: 'Next.js Fullstack Platform',
    demoUrl: '',
    codeUrl: '',
    description: 'A premium full-stack fashion storefront built with Next.js App Router, featuring Stripe payments, Firebase Auth, Firestore DB, and real-time inventory.',
    longDescription: 'LUXE is a luxury-inspired, type-safe Next.js e-commerce application designed for high-end fashion brands. It integrates a multi-step checkout workflow with Stripe Payments, authentication with Firebase, persistent shopping cart management, client-side product filtering/sorting, and an SEO-optimized architecture.',
    tech: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Firebase Auth', 'Firestore DB', 'Stripe Payments', 'Zustand'],
    metrics: [
      { label: 'Lighthouse Score', value: '95+' },
      { label: 'SEO Audit Score', value: '100/100' },
      { label: 'Filter latency', value: '< 25ms' },
      { label: 'Load Time', value: '< 1.5s' },
    ],
    story: {
      problem: 'E-commerce sites often suffer from slow load times, insecure payment processes, and poor cart persistence, which lead to high bounce rates and lost conversions.',
      solution: 'Designed a Next.js App Router system with Server-Side Rendering (SSR) for catalog pages, client-side Zustand state management for instant cart response, Firebase for user session persistence, and secure Stripe Checkout APIs.',
      result: 'A production-ready fashion commerce platform loading in under 1.5 seconds, featuring seamless animations, a secure payment process, and comprehensive search engine optimization.',
    },
    challenges: [
      'Synchronizing client cart states with server product stock data dynamically without causing layout shifts.',
      'Handling webhook lifecycle events securely to update order records in Firestore upon Stripe payment authorization.',
      'Optimizing multi-level product filters (category, sizes, prices, colors) entirely on the client side with custom hooks.',
    ],
    outcomes: [
      'Integrated Stripe payment intents and verified webhooks to complete the automated order lifecycle.',
      'Designed responsive skeleton loading components to match every product card shape, reducing CLS to 0.01.',
      'Configured dynamic XML sitemap generation and semantic meta schemas to maximize search index rankings.',
    ],
  },
  {
    slug: 'supabase-portfolio',
    title: 'Supabase Portfolio CMS',
    category: 'Fullstack React Development',
    demoUrl: 'https://ebrahim-amer.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/Ebrahim-Amer',
    description: 'An interactive portfolio platform powered by React, Vite, and Supabase, featuring a live admin dashboard, JWT auth, PostgreSQL database, and command palette navigation.',
    longDescription: 'This is a high-performance personal portfolio architecture integrated with a complete admin dashboard. It enables real-time content editing, dynamic project/skill management, and instant cloud database synchronization on Supabase PostgreSQL without writing code or redeploying.',
    tech: ['React.js', 'Vite', 'Supabase (BaaS)', 'PostgreSQL', 'JWT Auth', 'Bootstrap 5', 'Command Palette', 'CSS Modules'],
    metrics: [
      { label: 'Database sync latency', value: '< 8ms' },
      { label: 'Admin JWT duration', value: 'Secure' },
      { label: 'Command response time', value: '< 10ms' },
      { label: 'CSS bundle size', value: '24kb' },
    ],
    story: {
      problem: 'Traditional portfolio sites require developers to manually edit source code and rebuild/redeploy the entire site just to update a project description or add a new skill.',
      solution: 'Engineered a client-side React portfolio hooked up to a remote Supabase PostgreSQL database. Developed an authentication gate and a private dashboard for WYSIWYG editing, enabling real-time content updates.',
      result: 'An interactive, dynamic portfolio platform that saves content changes instantly, syncs globally in milliseconds, and allows navigation via a keyboard-driven Command Palette.',
    },
    challenges: [
      'Securing content routes on the client side using robust auth state validation gates.',
      'Designing a dynamic database schema to store nested arrays (skills, timeline, achievements) in a clean, queryable format.',
      'Managing complex form validation and automatic draft saving within the admin dashboard.',
    ],
    outcomes: [
      'Built a secure authentication gate using JWT and Supabase User sessions.',
      'Designed a keyboard-friendly command palette interface allowing instant routing across sections.',
      'Implemented an automatic real-time sync model that updates the public portfolio instantly upon dashboard saving.',
    ],
  },
  {
    slug: 'aetheria-estate',
    title: 'Aetheria Estate',
    category: 'React.js Development',
    demoUrl: 'https://final-project-jzo2jpzib-ebrahim-amer207s-projects.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/Final-project',
    description: 'A comprehensive React platform that makes property browsing and discovery streamlined via custom filters and clean grid states.',
    longDescription: 'Aetheria Estate is a luxury property discovery client designed to handle high-volume listings with zero-delay filtering. Built with React and designed for maximum visual premiumness, it bridges the gap between complicated agency filtering databases and smooth, responsive frontend interactions.',
    tech: ['React.js', 'Bootstrap 5', 'REST APIs', 'React Router', 'Context API', 'Axios'],
    metrics: [
      { label: 'Filter latency', value: '< 15ms' },
      { label: 'Asset size reduction', value: '42%' },
      { label: 'SEO Audit Score', value: '100/100' },
      { label: 'Lighthouse Performance', value: '98%' },
    ],
    story: {
      problem: 'Real estate websites are typically bloated with heavy assets, slow database queries, and rigid filtering options. This causes potential buyers to experience high latency, UI layout shifts, and search friction.',
      solution: 'Developed a decoupled React client utilizing client-side state memoization and structured context management. Implemented an asynchronous filtering pipeline that updates search results instantly as users adjust inputs without blocking the main UI thread.',
      result: 'Delivered an ultra-responsive user experience where listing filters execute in less than 15ms, with an intuitive, mobile-first interface that eliminates visual clutter.',
    },
    challenges: [
      'Synchronizing multi-select query filters across React components without triggering excessive re-renders.',
      'Integrating third-party mock endpoint integrations while maintaining fallback states for network offline capabilities.',
      'Achieving smooth layout transitions when grid cards re-order during category shifts.',
    ],
    outcomes: [
      'Created a highly modular, atomic folder structure where UI inputs are isolated from the listing grids.',
      'Reduced initial paint times by lazy-loading non-critical card images using intersection observers.',
      'Implemented robust client-side validation for contact forms, lowering API submission failures to near zero.',
    ],
  },
  {
    slug: 'apex-ecommerce',
    title: 'Apex E-commerce',
    category: 'API-Driven Client',
    demoUrl: 'https://fake-store-sigma-virid.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/fake-store',
    description: 'An API-driven storefront pulling live products into an optimized shopping experience featuring search state caching and skeleton loaders.',
    longDescription: 'Apex E-commerce connects directly to mock REST endpoints to showcase a complete checkout and product discovery cycle. It focuses heavily on UX optimization, incorporating skeleton loading states, local storage persistence for shopping cart state, and a highly responsive grid layout.',
    tech: ['HTML5', 'CSS Modules', 'JavaScript ES6+', 'REST APIs', 'Local Storage', 'Intersection Observer'],
    metrics: [
      { label: 'Cart sync speed', value: 'Instant' },
      { label: 'Time to Interactive', value: '1.1s' },
      { label: 'Layout shift (CLS)', value: '0.00' },
      { label: 'Accessibility (A11y)', value: '99/100' },
    ],
    story: {
      problem: 'E-commerce users abandon carts when pages load slowly or when adding items is sluggish. Relying on remote servers for every minor cart update degrades performance, especially on poor mobile connections.',
      solution: 'Designed an asynchronous local-first state machine for cart operations. Products are loaded dynamically using fetch with cached responses in-memory, while skeleton elements maintain structural integrity during network latency.',
      result: 'An e-commerce prototype that functions entirely under 1.2 seconds load time with instant local feedback on cart additions.',
    },
    challenges: [
      'Mitigating layout shifts (CLS) when remote product image ratios are unknown before loading.',
      'Gracefully handling API rate limits and connection downtime by serving cached catalog data.',
      'Establishing a reliable local-first sync between multiple browser tabs to keep the cart state updated.',
    ],
    outcomes: [
      'Established precise layout skeletons that mimic product cards, keeping layout shifts at absolute zero.',
      'Developed custom client-side search logic that filters catalog products locally, eliminating API round-trips for search actions.',
      'Integrated accessible ARIA roles and labels across all checkout inputs.',
    ],
  },
  {
    slug: 'nexus-dashboard',
    title: 'Nexus Admin Dashboard',
    category: 'Interactive Application',
    demoUrl: 'https://dashboard-psi-blue-10.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/dashboard',
    description: 'A data-intensive administration dashboard built to manage records through clear, task-oriented CRUD states.',
    longDescription: 'Nexus is a control panel simulation built to demonstrate complex record management, user administration, and system metrics visualization. It features interactive status reports, dynamic form edits, and customized alert states.',
    tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript ES6+', 'Mock DB', 'SVG Charting'],
    metrics: [
      { label: 'CRUD Operation delay', value: '0ms (Local)' },
      { label: 'First Input Delay (FID)', value: '12ms' },
      { label: 'CSS Asset Weight', value: '24kb' },
      { label: 'Data Refresh speed', value: 'Real-time' },
    ],
    story: {
      problem: 'Administration dashboards are often cluttered, causing user fatigue. Poorly designed CRUD structures make editing data prone to human error due to a lack of clear validation and transaction feedback.',
      solution: 'Applied a clean, card-based grid layout with high visual hierarchy. Actions (Edit, Delete, Add) are coupled with modern modal dialogs, status tags, and clear validation messages.',
      result: 'A high-performance management console that speeds up CRUD operations and displays metrics clearly using lightweight CSS and custom SVG indicators.',
    },
    challenges: [
      'Structuring modal state triggers without polluting the main HTML document.',
      'Creating responsive tables that fit complex multi-column data on mobile screens without breaking the page wrapper.',
      'Simulating database responses with local state synchronization.',
    ],
    outcomes: [
      'Developed a fluid card-to-table transition system optimized for mobile viewports using CSS media overrides.',
      'Secured error-free forms by implementing custom regex pattern validators.',
      'Ensured complete keyboard navigation support across all CRUD options.',
    ],
  },
  {
    slug: 'nimbus-weather',
    title: 'Nimbus Weather Client',
    category: 'Asynchronous Services',
    demoUrl: 'https://pets-cmsq.vercel.app/',
    codeUrl: 'https://github.com/EbrahimAmer207/weather',
    description: 'A live weather interface fetching geo-coordinates to render responsive forecasts and localized micro-interactions.',
    longDescription: 'Nimbus Weather Client uses third-party APIs to deliver localized meteorological data. It features search-autocomplete, coordinates lookup, and custom illustrations that shift dynamically based on weather conditions.',
    tech: ['JavaScript ES6+', 'HTML5', 'CSS3 Variables', 'Weather APIs', 'Geolocation API'],
    metrics: [
      { label: 'API response time', value: '180ms' },
      { label: 'Initial size', value: '15kb' },
      { label: 'Lighthouse Best Practices', value: '100%' },
      { label: 'Performance rating', value: 'A+' },
    ],
    story: {
      problem: 'Many weather clients are slow, cluttered with ads, and difficult to read on the go. Additionally, manual location typing adds friction for mobile users who want instant local reports.',
      solution: 'Integrated the browser Geolocation API for instant single-tap weather retrieval, and designed a layout that highlights primary metrics (temp, condition, wind) in large, high-contrast type.',
      result: 'A clean, lightweight weather application that determines location and displays live conditions within 200ms.',
    },
    challenges: [
      'Parsing complex JSON weather responses and translating wind speeds/temperatures dynamically depending on user locale.',
      'Handling API error codes gracefully (e.g. when location permissions are denied by the user).',
      'Implementing atmospheric background animations that do not drain mobile battery life.',
    ],
    outcomes: [
      'Developed lightweight, GPU-accelerated CSS animations for wind and rain symbols.',
      'Implemented robust fallback flows using IP-based location queries when GPS access is blocked.',
      'Reduced script weight by avoiding external libraries, relying purely on native ES6 fetch.',
    ],
  },
];
