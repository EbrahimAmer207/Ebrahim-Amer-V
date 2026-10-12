export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectStory {
  problem: string;
  solution: string;
  result: string;
}

export interface ProjectScreenshot {
  src: string;
  caption: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  demoUrl: string;
  codeUrl: string;
  isPrivateCode?: boolean;
  brandNameArabic?: string;
  description: string;
  longDescription: string;
  tech: string[];
  metrics: ProjectMetric[];
  story: ProjectStory;
  challenges: string[];
  outcomes: string[];
  screenshots?: ProjectScreenshot[];
}

export const projectsData: Project[] = [
  // ── Primary 3 Commercial Company Projects ────────────────────────────────
  {
    slug: 'growfet',
    title: 'Growfet — EdTech Academy Platform',
    category: 'EdTech Academy Platform',
    demoUrl: 'https://www.growfet.com/',
    codeUrl: '',
    isPrivateCode: true,
    description: 'An educational academy platform built to present training programs, showcase trainees and graduates, and provide interactive interfaces for managing trainee-related information.',
    longDescription: 'Growfet is an educational academy platform built to present training programs, showcase trainees and graduates, and provide interactive interfaces for managing trainee-related information. Migrated from a legacy architecture to a modern React 19 and Vite application with bilingual Arabic/English routing and responsive trainee showcases.',
    tech: [
      'React 19',
      'JavaScript ES6+',
      'Vite',
      'React Router',
      'TanStack Query',
      'Bootstrap 5',
      'CSS Modules',
      'Dynamic SEO',
    ],
    metrics: [
      { label: 'Architecture', value: 'React 19 + Vite' },
      { label: 'Localization', value: 'Arabic & English' },
      { label: 'State Sync', value: 'TanStack Query' },
      { label: 'Deployment', value: 'Production Live' },
    ],
    story: {
      problem: 'The legacy website struggled with monolithic legacy code that complicated feature development, lacked structured internationalization between Arabic and English, and provided no streamlined mechanism for trainees or staff to browse graduate profiles and program data efficiently.',
      solution: 'Engineered a modular React 19 architecture powered by Vite with feature-based directory organization. Developed dual-direction (RTL/LTR) routing with language-aware UI components, implemented TanStack Query for caching and asynchronous data fetching, and built interactive trainee showcases with dynamic modals and administrative controls.',
      result: 'A resilient, high-speed academy portal deployed to production, delivering seamless bilingual navigation, rapid profile discovery, and a clean administrative interface for managing trainee information.',
    },
    challenges: [
      'Migrating legacy views into modular, reusable React 19 components without disrupting live academy registrations or SEO rank.',
      'Architecting bidirectional layouts supporting seamless Arabic (RTL) and English (LTR) typography, navigation flows, and layout mirroring.',
      'Designing interactive trainee showcase modals and admin forms with live status controls and image previews while maintaining optimal performance.',
    ],
    outcomes: [
      'Migrated the legacy website to a modular React 19 and Vite application using reusable components and feature-based architecture.',
      'Implemented bilingual Arabic/English routing with RTL/LTR support and language-aware navigation.',
      'Developed interactive trainee showcases, searchable graduate profiles, and reusable detail modals.',
      'Built front-end administrative dashboard interfaces for trainee management, including forms, status controls, and image previews.',
      'Implemented custom browser-based animations and responsive layouts.',
      'Developed dynamic SEO metadata and structured data support for localized routes.',
    ],
    screenshots: [
      {
        src: '/Img/image copy.png',
        caption: 'Growfet Academy bilingual landing interface and program offerings showcase.',
      },
    ],
  },
  {
    slug: 'rashet-etr',
    title: 'Rashet Etr — Luxury Fragrance E-Commerce',
    brandNameArabic: 'رشة عطر',
    category: 'Luxury Fragrance E-Commerce',
    demoUrl: 'https://rashet-etr.growfet.com/',
    codeUrl: '',
    isPrivateCode: true,
    description: 'An Arabic fragrance e-commerce storefront focused on premium product presentation, RTL usability, product discovery, and a streamlined shopping experience.',
    longDescription: 'Rashet Etr (رشة عطر) is an Arabic fragrance e-commerce storefront focused on premium product presentation, RTL usability, product discovery, and a streamlined shopping experience. Migrated from a legacy Vanilla JavaScript storefront to React 19 and Vite, featuring in-browser SQLite WebAssembly, persistent IndexedDB cart storage, touch-friendly Swiper carousels, and an Arabic RTL interface.',
    tech: [
      'React 19',
      'JavaScript ES6+',
      'Vite',
      'Swiper',
      'SQLite WASM',
      'IndexedDB',
      'CSS Modules',
      'Arabic RTL Design',
    ],
    metrics: [
      { label: 'In-Browser DB', value: 'SQLite WASM' },
      { label: 'Storage Layer', value: 'IndexedDB Sync' },
      { label: 'Direction', value: 'Arabic RTL First' },
      { label: 'Deployment', value: 'Production Live' },
    ],
    story: {
      problem: 'The legacy Vanilla JavaScript storefront was difficult to scale, lacked robust client-side state persistence, and suffered from latency during product filtering. Additionally, fragile mobile cart handling caused lost sessions during intermittent connectivity.',
      solution: 'Re-architected the store into a component-driven React 19 and Vite application. Integrated SQLite WebAssembly directly into the browser thread with an IndexedDB persistence layer for instant catalog querying and cart retention, paired with fluid touch carousels and an Arabic RTL-first checkout funnel.',
      result: 'A production-ready luxury storefront delivering zero-latency catalog filtering, offline network status feedback, seamless Arabic typographic rhythm, and a frictionless multi-step checkout flow.',
    },
    challenges: [
      'Integrating and querying SQLite WebAssembly in the browser environment with persistent IndexedDB backing while maintaining minimal bundle footprint.',
      'Crafting a high-end editorial fragrance aesthetic with native Arabic RTL spacing, typography, and touch-friendly interactive carousels.',
      'Architecting a multi-step checkout funnel with cart state preservation across network drops and browser refreshes.',
    ],
    outcomes: [
      'Migrated a legacy Vanilla JavaScript storefront to React 19 and Vite using reusable components and feature-based modules.',
      'Developed interactive product filtering, shopping cart functionality, and a multi-step checkout flow.',
      'Integrated SQLite WebAssembly for in-browser database operations and local product and shopping data persistence.',
      'Implemented offline network-status feedback and touch-friendly product carousels.',
      'Delivered an Arabic RTL interface with localized typography and currency presentation.',
    ],
    screenshots: [
      {
        src: '/Img/image.png',
        caption: 'Rashet Etr luxury fragrance storefront with Arabic RTL layout, category discovery, and Swiper carousels.',
      },
    ],
  },
  {
    slug: 'growfet-tech',
    title: 'Growfet Tech — Digital Services Platform',
    category: 'Digital Services Platform',
    demoUrl: 'https://tech.growfet.com/',
    codeUrl: '',
    isPrivateCode: true,
    description: 'A digital services platform designed to present technical services, showcase projects, and provide interactive tools that help potential clients explore service options.',
    longDescription: 'Growfet Tech is a digital services platform designed to present technical services, showcase projects, and provide interactive tools that help potential clients explore service options. Built with a modular React 19 and TypeScript architecture, custom CSS design tokens, a keyboard-driven command palette, an interactive project cost estimator, and Google Analytics 4.',
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'CSS Modules',
      'CSS Design Tokens',
      'Command Palette',
      'Google Analytics 4',
      'Lead Generation',
    ],
    metrics: [
      { label: 'Core Stack', value: 'React 19 + TypeScript' },
      { label: 'Styling Engine', value: 'CSS Design Tokens' },
      { label: 'Interactive Tools', value: 'Estimator & Palette' },
      { label: 'Deployment', value: 'Production Live' },
    ],
    story: {
      problem: 'Digital service agencies often rely on static brochures that fail to engage technical buyers or clarify project scopes, while heavy third-party UI component libraries degrade page performance and hinder bespoke brand identity.',
      solution: 'Constructed a lightweight, modular React 19 and TypeScript platform using pure CSS Modules and custom design tokens. Built interactive client tools including a keyboard-driven command palette, project showcase modals, and a dynamic real-time project cost estimator connected to automated WhatsApp lead channels and Google Analytics 4.',
      result: 'A high-performance digital services platform enabling prospective clients to dynamically calculate project scope costs, navigate portfolios via keyboard shortcuts, and convert into qualified leads effortlessly.',
    },
    challenges: [
      'Engineering a comprehensive, fully responsive design token architecture without relying on external UI component frameworks.',
      'Developing real-time estimation math that accurately adjusts pricing formulas based on multi-variable client selections.',
      'Implementing power-user keyboard navigation through a custom command palette while maintaining seamless mobile touch compatibility.',
    ],
    outcomes: [
      'Developed a modular React and TypeScript architecture with reusable UI components and custom design tokens.',
      'Built interactive features, including a keyboard-driven command palette, project showcase modals, and a dynamic project cost estimator.',
      'Implemented custom UI interactions and responsive navigation.',
      'Integrated Google Analytics 4, WhatsApp-based lead generation, and dynamic SEO metadata.',
      'Applied lightweight styling and component patterns without relying on third-party UI frameworks.',
    ],
    screenshots: [
      {
        src: '/Img/image copy 2.png',
        caption: 'Growfet Tech digital services hero and interactive dynamic branding canvas.',
      },
    ],
  },

  // ── Additional Engineering Builds (View More) ───────────────────────────
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
    screenshots: [
      {
        src: '/Img/luxe-ecommerce.png',
        caption: 'LUXE luxury fashion storefront with high-performance product discovery.',
      },
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
    screenshots: [
      {
        src: '/Img/4.png',
        caption: 'Aetheria Estate luxury real estate discovery interface.',
      },
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
    screenshots: [
      {
        src: '/Img/fake.png',
        caption: 'Apex E-Commerce responsive product catalog and checkout.',
      },
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
    screenshots: [
      {
        src: '/Img/Dash.png',
        caption: 'Nexus Admin Dashboard management console and metrics visualization.',
      },
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
    screenshots: [
      {
        src: '/Img/we.png',
        caption: 'Nimbus Weather Client meteorological forecast view.',
      },
    ],
  },
];
