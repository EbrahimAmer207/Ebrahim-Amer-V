-- =============================================================================
-- Seed: seed.sql
-- Description: Verified database seed preserving 100% of real portfolio content.
-- Idempotency: Uses deterministic stable UUIDs and ON CONFLICT upsert logic.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Table: hero_content (1 row)
-- -----------------------------------------------------------------------------
INSERT INTO public.hero_content (
  id,
  badge_text,
  title_line_1,
  title_line_2,
  title_line_3,
  description,
  primary_cta_label,
  primary_cta_link,
  secondary_cta_label,
  secondary_cta_link,
  cv_download_url,
  cv_download_filename,
  profile_image_url,
  proof_metrics
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Available for junior roles & internships',
  'Building Digital',
  'Experiences That',
  'Feel Effortless.',
  'Front-End Engineer focused on high-performance React & Next.js applications, pixel-perfect design systems, and interactive storytelling that converts visitors into clients.',
  'View Selected Work',
  '#projects',
  'Let''s Connect',
  '#contact',
  '/Files/EBRAHIM_ABDELMONEM_CV.pdf',
  'Ebrahim_Amer_CV.pdf',
  '/Img/profile.jpg',
  '[{"value":"9+","label":"Projects Built"},{"value":"4+","label":"Certifications"},{"value":"2026","label":"CS Graduation"}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 2. Table: about_content (1 row)
-- -----------------------------------------------------------------------------
INSERT INTO public.about_content (
  id,
  tag,
  title,
  paragraph_1,
  paragraph_2,
  focus_blocks
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '04 / STORY & APPROACH',
  'Turning Ideas Into High-Performance Code.',
  'Hi, I’m Ebrahim Abdelmonem Amer, a Computer Science student at Mansoura University (graduating in 2026) specializing in modern front-end architectures. I build responsive, highly interactive web applications that focus on asset size reductions, client-side speed optimizations, and clean, modular execution.',
  'My development philosophy centers around writing readable, maintainable TypeScript and React components, minimizing layout shifts, and ensuring maximum responsiveness across viewports. Whether creating complete e-commerce single-page interfaces or modular administrative panels, I focus on delivering seamless UX that elevates the brand.',
  '[{"label":"01 / CLEAN CODE","text":"Structuring atomic React file structures with explicit prop types and isolated concerns."},{"label":"02 / PERFORMANCE FIRST","text":"Optimizing page delivery to maintain perfect scores on Google Core Web Vitals."}]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 3. Table: site_settings (1 row)
-- -----------------------------------------------------------------------------
INSERT INTO public.site_settings (
  id,
  email,
  phone,
  location,
  linkedin_url,
  github_url,
  site_title,
  meta_description
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  'himaamer937@gmail.com',
  '+20 109 627 1378',
  'Mansoura, Egypt',
  'https://www.linkedin.com/in/ebrahim-amer0/',
  'https://github.com/EbrahimAmer207',
  'Ebrahim Amer | Premium Front-End Engineer & React Developer',
  'Sophisticated, performance-first front-end portfolio of Ebrahim Amer. React.js, Next.js, and TypeScript developer focused on building digital experiences that feel effortless.'
) ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 4. Table: projects (All 9 verified projects)
-- -----------------------------------------------------------------------------
INSERT INTO public.projects (
  id, slug, title, category, demo_url, code_url, is_private_code, brand_name_arabic,
  description, long_description, tech, metrics, story, challenges, outcomes, screenshots,
  featured, is_published, display_order
) VALUES
(
  '00000000-0000-0000-0001-000000000001',
  'growfet',
  'Growfet — EdTech Academy Platform',
  'EdTech Academy Platform',
  'https://www.growfet.com/',
  '',
  true,
  '',
  'An educational academy platform built to present training programs, showcase trainees and graduates, and provide interactive interfaces for managing trainee-related information.',
  'Growfet is an educational academy platform built to present training programs, showcase trainees and graduates, and provide interactive interfaces for managing trainee-related information. Migrated from a legacy architecture to a modern React 19 and Vite application with bilingual Arabic/English routing and responsive trainee showcases.',
  '["React 19","JavaScript ES6+","Vite","React Router","TanStack Query","Bootstrap 5","CSS Modules","Dynamic SEO"]'::jsonb,
  '[{"label":"Architecture","value":"React 19 + Vite"},{"label":"Localization","value":"Arabic & English"},{"label":"State Sync","value":"TanStack Query"},{"label":"Deployment","value":"Production Live"}]'::jsonb,
  '{"problem":"The legacy website struggled with monolithic legacy code that complicated feature development, lacked structured internationalization between Arabic and English, and provided no streamlined mechanism for trainees or staff to browse graduate profiles and program data efficiently.","solution":"Engineered a modular React 19 architecture powered by Vite with feature-based directory organization. Developed dual-direction (RTL/LTR) routing with language-aware UI components, implemented TanStack Query for caching and asynchronous data fetching, and built interactive trainee showcases with dynamic modals and administrative controls.","result":"A resilient, high-speed academy portal deployed to production, delivering seamless bilingual navigation, rapid profile discovery, and a clean administrative interface for managing trainee information."}'::jsonb,
  '["Migrating legacy views into modular, reusable React 19 components without disrupting live academy registrations or SEO rank.","Architecting bidirectional layouts supporting seamless Arabic (RTL) and English (LTR) typography, navigation flows, and layout mirroring.","Designing interactive trainee showcase modals and admin forms with live status controls and image previews while maintaining optimal performance."]'::jsonb,
  '["Migrated the legacy website to a modular React 19 and Vite application using reusable components and feature-based architecture.","Implemented bilingual Arabic/English routing with RTL/LTR support and language-aware navigation.","Developed interactive trainee showcases, searchable graduate profiles, and reusable detail modals.","Built front-end administrative dashboard interfaces for trainee management, including forms, status controls, and image previews.","Implemented custom browser-based animations and responsive layouts.","Developed dynamic SEO metadata and structured data support for localized routes."]'::jsonb,
  '[{"src":"/Img/image copy.png","caption":"Growfet Academy bilingual landing interface and program offerings showcase."}]'::jsonb,
  true, true, 1
),
(
  '00000000-0000-0000-0001-000000000002',
  'rashet-etr',
  'Rashet Etr — Luxury Fragrance E-Commerce',
  'Luxury Fragrance E-Commerce',
  'https://rashet-etr.growfet.com/',
  '',
  true,
  'رشة عطر',
  'An Arabic fragrance e-commerce storefront focused on premium product presentation, RTL usability, product discovery, and a streamlined shopping experience.',
  'Rashet Etr (رشة عطر) is an Arabic fragrance e-commerce storefront focused on premium product presentation, RTL usability, product discovery, and a streamlined shopping experience. Migrated from a legacy Vanilla JavaScript storefront to React 19 and Vite, featuring in-browser SQLite WebAssembly, persistent IndexedDB cart storage, touch-friendly Swiper carousels, and an Arabic RTL interface.',
  '["React 19","JavaScript ES6+","Vite","Swiper","SQLite WASM","IndexedDB","CSS Modules","Arabic RTL Design"]'::jsonb,
  '[{"label":"In-Browser DB","value":"SQLite WASM"},{"label":"Storage Layer","value":"IndexedDB Sync"},{"label":"Direction","value":"Arabic RTL First"},{"label":"Deployment","value":"Production Live"}]'::jsonb,
  '{"problem":"The legacy Vanilla JavaScript storefront was difficult to scale, lacked robust client-side state persistence, and suffered from latency during product filtering. Additionally, fragile mobile cart handling caused lost sessions during intermittent connectivity.","solution":"Re-architected the store into a component-driven React 19 and Vite application. Integrated SQLite WebAssembly directly into the browser thread with an IndexedDB persistence layer for instant catalog querying and cart retention, paired with fluid touch carousels and an Arabic RTL-first checkout funnel.","result":"A production-ready luxury storefront delivering zero-latency catalog filtering, offline network status feedback, seamless Arabic typographic rhythm, and a frictionless multi-step checkout flow."}'::jsonb,
  '["Integrating and querying SQLite WebAssembly in the browser environment with persistent IndexedDB backing while maintaining minimal bundle footprint.","Crafting a high-end editorial fragrance aesthetic with native Arabic RTL spacing, typography, and touch-friendly interactive carousels.","Architecting a multi-step checkout funnel with cart state preservation across network drops and browser refreshes."]'::jsonb,
  '["Migrated a legacy Vanilla JavaScript storefront to React 19 and Vite using reusable components and feature-based modules.","Developed interactive product filtering, shopping cart functionality, and a multi-step checkout flow.","Integrated SQLite WebAssembly for in-browser database operations and local product and shopping data persistence.","Implemented offline network-status feedback and touch-friendly product carousels.","Delivered an Arabic RTL interface with localized typography and currency presentation."]'::jsonb,
  '[{"src":"/Img/image.png","caption":"Rashet Etr luxury fragrance storefront with Arabic RTL layout, category discovery, and Swiper carousels."}]'::jsonb,
  true, true, 2
),
(
  '00000000-0000-0000-0001-000000000003',
  'growfet-tech',
  'Growfet Tech — Digital Services Platform',
  'Digital Services Platform',
  'https://tech.growfet.com/',
  '',
  true,
  '',
  'A digital services platform designed to present technical services, showcase projects, and provide interactive tools that help potential clients explore service options.',
  'Growfet Tech is a digital services platform designed to present technical services, showcase projects, and provide interactive tools that help potential clients explore service options. Built with a modular React 19 and TypeScript architecture, custom CSS design tokens, a keyboard-driven command palette, an interactive project cost estimator, and Google Analytics 4.',
  '["React 19","TypeScript","Vite","CSS Modules","CSS Design Tokens","Command Palette","Google Analytics 4","Lead Generation"]'::jsonb,
  '[{"label":"Core Stack","value":"React 19 + TypeScript"},{"label":"Styling Engine","value":"CSS Design Tokens"},{"label":"Interactive Tools","value":"Estimator & Palette"},{"label":"Deployment","value":"Production Live"}]'::jsonb,
  '{"problem":"Digital service agencies often rely on static brochures that fail to engage technical buyers or clarify project scopes, while heavy third-party UI component libraries degrade page performance and hinder bespoke brand identity.","solution":"Constructed a lightweight, modular React 19 and TypeScript platform using pure CSS Modules and custom design tokens. Built interactive client tools including a keyboard-driven command palette, project showcase modals, and a dynamic real-time project cost estimator connected to automated WhatsApp lead channels and Google Analytics 4.","result":"A high-performance digital services platform enabling prospective clients to dynamically calculate project scope costs, navigate portfolios via keyboard shortcuts, and convert into qualified leads effortlessly."}'::jsonb,
  '["Engineering a comprehensive, fully responsive design token architecture without relying on external UI component frameworks.","Developing real-time estimation math that accurately adjusts pricing formulas based on multi-variable client selections.","Implementing power-user keyboard navigation through a custom command palette while maintaining seamless mobile touch compatibility."]'::jsonb,
  '["Developed a modular React and TypeScript architecture with reusable UI components and custom design tokens.","Built interactive features, including a keyboard-driven command palette, project showcase modals, and a dynamic project cost estimator.","Implemented custom UI interactions and responsive navigation.","Integrated Google Analytics 4, WhatsApp-based lead generation, and dynamic SEO metadata.","Applied lightweight styling and component patterns without relying on third-party UI frameworks."]'::jsonb,
  '[{"src":"/Img/image copy 2.png","caption":"Growfet Tech digital services hero and interactive dynamic branding canvas."}]'::jsonb,
  true, true, 3
),
(
  '00000000-0000-0000-0001-000000000004',
  'luxe-ecommerce',
  'LUXE E-Commerce',
  'Next.js Fullstack Platform',
  '',
  '',
  false,
  '',
  'A premium full-stack fashion storefront built with Next.js App Router, featuring Stripe payments, Firebase Auth, Firestore DB, and real-time inventory.',
  'LUXE is a luxury-inspired, type-safe Next.js e-commerce application designed for high-end fashion brands. It integrates a multi-step checkout workflow with Stripe Payments, authentication with Firebase, persistent shopping cart management, client-side product filtering/sorting, and an SEO-optimized architecture.',
  '["Next.js 14","React 18","TypeScript","Tailwind CSS","Firebase Auth","Firestore DB","Stripe Payments","Zustand"]'::jsonb,
  '[{"label":"Lighthouse Score","value":"95+"},{"label":"SEO Audit Score","value":"100/100"},{"label":"Filter latency","value":"< 25ms"},{"label":"Load Time","value":"< 1.5s"}]'::jsonb,
  '{"problem":"E-commerce sites often suffer from slow load times, insecure payment processes, and poor cart persistence, which lead to high bounce rates and lost conversions.","solution":"Designed a Next.js App Router system with Server-Side Rendering (SSR) for catalog pages, client-side Zustand state management for instant cart response, Firebase for user session persistence, and secure Stripe Checkout APIs.","result":"A production-ready fashion commerce platform loading in under 1.5 seconds, featuring seamless animations, a secure payment process, and comprehensive search engine optimization."}'::jsonb,
  '["Synchronizing client cart states with server product stock data dynamically without causing layout shifts.","Handling webhook lifecycle events securely to update order records in Firestore upon Stripe payment authorization.","Optimizing multi-level product filters (category, sizes, prices, colors) entirely on the client side with custom hooks."]'::jsonb,
  '["Integrated Stripe payment intents and verified webhooks to complete the automated order lifecycle.","Designed responsive skeleton loading components to match every product card shape, reducing CLS to 0.01.","Configured dynamic XML sitemap generation and semantic meta schemas to maximize search index rankings."]'::jsonb,
  '[{"src":"/Img/luxe-ecommerce.png","caption":"LUXE luxury fashion storefront with high-performance product discovery."}]'::jsonb,
  false, true, 4
),
(
  '00000000-0000-0000-0001-000000000005',
  'aetheria-estate',
  'Aetheria Estate',
  'React.js Development',
  'https://final-project-jzo2jpzib-ebrahim-amer207s-projects.vercel.app/',
  'https://github.com/EbrahimAmer207/Final-project',
  false,
  '',
  'A comprehensive React platform that makes property browsing and discovery streamlined via custom filters and clean grid states.',
  'Aetheria Estate is a luxury property discovery client designed to handle high-volume listings with zero-delay filtering. Built with React and designed for maximum visual premiumness, it bridges the gap between complicated agency filtering databases and smooth, responsive frontend interactions.',
  '["React.js","Bootstrap 5","REST APIs","React Router","Context API","Axios"]'::jsonb,
  '[{"label":"Filter latency","value":"< 15ms"},{"label":"Asset size reduction","value":"42%"},{"label":"SEO Audit Score","value":"100/100"},{"label":"Lighthouse Performance","value":"98%"}]'::jsonb,
  '{"problem":"Real estate websites are typically bloated with heavy assets, slow database queries, and rigid filtering options. This causes potential buyers to experience high latency, UI layout shifts, and search friction.","solution":"Developed a decoupled React client utilizing client-side state memoization and structured context management. Implemented an asynchronous filtering pipeline that updates search results instantly as users adjust inputs without blocking the main UI thread.","result":"Delivered an ultra-responsive user experience where listing filters execute in less than 15ms, with an intuitive, mobile-first interface that eliminates visual clutter."}'::jsonb,
  '["Synchronizing multi-select query filters across React components without triggering excessive re-renders.","Integrating third-party mock endpoint integrations while maintaining fallback states for network offline capabilities.","Achieving smooth layout transitions when grid cards re-order during category shifts."]'::jsonb,
  '["Created a highly modular, atomic folder structure where UI inputs are isolated from the listing grids.","Reduced initial paint times by lazy-loading non-critical card images using intersection observers.","Implemented robust client-side validation for contact forms, lowering API submission failures to near zero."]'::jsonb,
  '[{"src":"/Img/4.png","caption":"Aetheria Estate luxury real estate discovery interface."}]'::jsonb,
  false, true, 5
),
(
  '00000000-0000-0000-0001-000000000006',
  'apex-ecommerce',
  'Apex E-commerce',
  'API-Driven Client',
  'https://fake-store-sigma-virid.vercel.app/',
  'https://github.com/EbrahimAmer207/fake-store',
  false,
  '',
  'An API-driven storefront pulling live products into an optimized shopping experience featuring search state caching and skeleton loaders.',
  'Apex E-commerce connects directly to mock REST endpoints to showcase a complete checkout and product discovery cycle. It focuses heavily on UX optimization, incorporating skeleton loading states, local storage persistence for shopping cart state, and a highly responsive grid layout.',
  '["HTML5","CSS Modules","JavaScript ES6+","REST APIs","Local Storage","Intersection Observer"]'::jsonb,
  '[{"label":"Cart sync speed","value":"Instant"},{"label":"Time to Interactive","value":"1.1s"},{"label":"Layout shift (CLS)","value":"0.00"},{"label":"Accessibility (A11y)","value":"99/100"}]'::jsonb,
  '{"problem":"E-commerce users abandon carts when pages load slowly or when adding items is sluggish. Relying on remote servers for every minor cart update degrades performance, especially on poor mobile connections.","solution":"Designed an asynchronous local-first state machine for cart operations. Products are loaded dynamically using fetch with cached responses in-memory, while skeleton elements maintain structural integrity during network latency.","result":"An e-commerce prototype that functions entirely under 1.2 seconds load time with instant local feedback on cart additions."}'::jsonb,
  '["Mitigating layout shifts (CLS) when remote product image ratios are unknown before loading.","Gracefully handling API rate limits and connection downtime by serving cached catalog data.","Establishing a reliable local-first sync between multiple browser tabs to keep the cart state updated."]'::jsonb,
  '["Established precise layout skeletons that mimic product cards, keeping layout shifts at absolute zero.","Developed custom client-side search logic that filters catalog products locally, eliminating API round-trips for search actions.","Integrated accessible ARIA roles and labels across all checkout inputs."]'::jsonb,
  '[{"src":"/Img/fake.png","caption":"Apex E-Commerce responsive product catalog and checkout."}]'::jsonb,
  false, true, 6
),
(
  '00000000-0000-0000-0001-000000000007',
  'nexus-dashboard',
  'Nexus Admin Dashboard',
  'Interactive Application',
  'https://dashboard-psi-blue-10.vercel.app/',
  'https://github.com/EbrahimAmer207/dashboard',
  false,
  '',
  'A data-intensive administration dashboard built to manage records through clear, task-oriented CRUD states.',
  'Nexus is a control panel simulation built to demonstrate complex record management, user administration, and system metrics visualization. It features interactive status reports, dynamic form edits, and customized alert states.',
  '["HTML5","CSS3","Bootstrap 5","JavaScript ES6+","Mock DB","SVG Charting"]'::jsonb,
  '[{"label":"CRUD Operation delay","value":"0ms (Local)"},{"label":"First Input Delay (FID)","value":"12ms"},{"label":"CSS Asset Weight","value":"24kb"},{"label":"Data Refresh speed","value":"Real-time"}]'::jsonb,
  '{"problem":"Administration dashboards are often cluttered, causing user fatigue. Poorly designed CRUD structures make editing data prone to human error due to a lack of clear validation and transaction feedback.","solution":"Applied a clean, card-based grid layout with high visual hierarchy. Actions (Edit, Delete, Add) are coupled with modern modal dialogs, status tags, and clear validation messages.","result":"A high-performance management console that speeds up CRUD operations and displays metrics clearly using lightweight CSS and custom SVG indicators."}'::jsonb,
  '["Structuring modal state triggers without polluting the main HTML document.","Creating responsive tables that fit complex multi-column data on mobile screens without breaking the page wrapper.","Simulating database responses with local state synchronization."]'::jsonb,
  '["Developed a fluid card-to-table transition system optimized for mobile viewports using CSS media overrides.","Secured error-free forms by implementing custom regex pattern validators.","Ensured complete keyboard navigation support across all CRUD options."]'::jsonb,
  '[{"src":"/Img/Dash.png","caption":"Nexus Admin Dashboard management console and metrics visualization."}]'::jsonb,
  false, true, 7
),
(
  '00000000-0000-0000-0001-000000000008',
  'nimbus-weather',
  'Nimbus Weather Client',
  'Asynchronous Services',
  'https://pets-cmsq.vercel.app/',
  'https://github.com/EbrahimAmer207/weather',
  false,
  '',
  'A live weather interface fetching geo-coordinates to render responsive forecasts and localized micro-interactions.',
  'Nimbus Weather Client uses third-party APIs to deliver localized meteorological data. It features search-autocomplete, coordinates lookup, and custom illustrations that shift dynamically based on weather conditions.',
  '["JavaScript ES6+","HTML5","CSS3 Variables","Weather APIs","Geolocation API"]'::jsonb,
  '[{"label":"API response time","value":"180ms"},{"label":"Initial size","value":"15kb"},{"label":"Lighthouse Best Practices","value":"100%"},{"label":"Performance rating","value":"A+"}]'::jsonb,
  '{"problem":"Many weather clients are slow, cluttered with ads, and difficult to read on the go. Additionally, manual location typing adds friction for mobile users who want instant local reports.","solution":"Integrated the browser Geolocation API for instant single-tap weather retrieval, and designed a layout that highlights primary metrics (temp, condition, wind) in large, high-contrast type.","result":"A clean, lightweight weather application that determines location and displays live conditions within 200ms."}'::jsonb,
  '["Parsing complex JSON weather responses and translating wind speeds/temperatures dynamically depending on user locale.","Handling API error codes gracefully (e.g. when location permissions are denied by the user).","Implementing atmospheric background animations that do not drain mobile battery life."]'::jsonb,
  '["Developed lightweight, GPU-accelerated CSS animations for wind and rain symbols.","Implemented robust fallback flows using IP-based location queries when GPS access is blocked.","Reduced script weight by avoiding external libraries, relying purely on native ES6 fetch."]'::jsonb,
  '[{"src":"/Img/we.png","caption":"Nimbus Weather Client meteorological forecast view."}]'::jsonb,
  false, true, 8
),
(
  '00000000-0000-0000-0001-000000000009',
  'supabase-portfolio',
  'Supabase Portfolio CMS',
  'Fullstack React Development',
  'https://ebrahim-amer.vercel.app/',
  'https://github.com/EbrahimAmer207/Ebrahim-Amer',
  false,
  '',
  'An interactive portfolio platform powered by React, Vite, and Supabase, featuring a live admin dashboard, JWT auth, PostgreSQL database, and command palette navigation.',
  'This is a high-performance personal portfolio architecture integrated with a complete admin dashboard. It enables real-time content editing, dynamic project/skill management, and instant cloud database synchronization on Supabase PostgreSQL without writing code or redeploying.',
  '["React.js","Vite","Supabase (BaaS)","PostgreSQL","JWT Auth","Bootstrap 5","Command Palette","CSS Modules"]'::jsonb,
  '[{"label":"Database sync latency","value":"< 8ms"},{"label":"Admin JWT duration","value":"Secure"},{"label":"Command response time","value":"< 10ms"},{"label":"CSS bundle size","value":"24kb"}]'::jsonb,
  '{"problem":"Traditional portfolio sites require developers to manually edit source code and rebuild/redeploy the entire site just to update a project description or add a new skill.","solution":"Engineered a client-side React portfolio hooked up to a remote Supabase PostgreSQL database. Developed an authentication gate and a private dashboard for WYSIWYG editing, enabling real-time content updates.","result":"An interactive, dynamic portfolio platform that saves content changes instantly, syncs globally in milliseconds, and allows navigation via a keyboard-driven Command Palette."}'::jsonb,
  '["Securing content routes on the client side using robust auth state validation gates.","Designing a dynamic database schema to store nested arrays (skills, timeline, achievements) in a clean, queryable format.","Managing complex form validation and automatic draft saving within the admin dashboard."]'::jsonb,
  '["Built a secure authentication gate using JWT and Supabase User sessions.","Designed a keyboard-friendly command palette interface allowing instant routing across sections.","Implemented an automatic real-time sync model that updates the public portfolio instantly upon dashboard saving."]'::jsonb,
  '[{"src":"/Img/port.png","caption":"Supabase Portfolio CMS interactive dashboard and public showcase."}]'::jsonb,
  false, true, 9
)
ON CONFLICT (slug) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 5. Table: skills (All 29 verified skills across 4 categories)
-- -----------------------------------------------------------------------------
INSERT INTO public.skills (id, name, category, level, display_order, is_visible) VALUES
-- Languages (6)
('00000000-0000-0000-0002-000000000001', 'JavaScript ES6+', 'languages', 'Expert', 1, true),
('00000000-0000-0000-0002-000000000002', 'TypeScript', 'languages', 'Advanced', 2, true),
('00000000-0000-0000-0002-000000000003', 'SQL', 'languages', 'Advanced', 3, true),
('00000000-0000-0000-0002-000000000004', 'Python', 'languages', 'Intermediate', 4, true),
('00000000-0000-0000-0002-000000000005', 'C++', 'languages', 'Intermediate', 5, true),
('00000000-0000-0000-0002-000000000006', 'C#', 'languages', 'Intermediate', 6, true),

-- Frontend (9)
('00000000-0000-0000-0002-000000000007', 'React.js (v19)', 'frontend', 'Expert', 7, true),
('00000000-0000-0000-0002-000000000008', 'Next.js (App Router)', 'frontend', 'Expert', 8, true),
('00000000-0000-0000-0002-000000000009', 'HTML5 & CSS3', 'frontend', 'Expert', 9, true),
('00000000-0000-0000-0002-000000000010', 'TanStack Query', 'frontend', 'Advanced', 10, true),
('00000000-0000-0000-0002-000000000011', 'Redux Toolkit', 'frontend', 'Advanced', 11, true),
('00000000-0000-0000-0002-000000000012', 'Context API', 'frontend', 'Expert', 12, true),
('00000000-0000-0000-0002-000000000013', 'Tailwind CSS', 'frontend', 'Expert', 13, true),
('00000000-0000-0000-0002-000000000014', 'Bootstrap 5', 'frontend', 'Expert', 14, true),
('00000000-0000-0000-0002-000000000015', 'Vite', 'frontend', 'Expert', 15, true),

-- Backend (7)
('00000000-0000-0000-0002-000000000016', 'SQLite WASM', 'backend', 'Advanced', 16, true),
('00000000-0000-0000-0002-000000000017', 'RESTful APIs', 'backend', 'Expert', 17, true),
('00000000-0000-0000-0002-000000000018', 'MySQL', 'backend', 'Advanced', 18, true),
('00000000-0000-0000-0002-000000000019', 'Laravel', 'backend', 'Advanced', 19, true),
('00000000-0000-0000-0002-000000000020', 'PHP', 'backend', 'Advanced', 20, true),
('00000000-0000-0000-0002-000000000021', 'MVC Architecture', 'backend', 'Advanced', 21, true),
('00000000-0000-0000-0002-000000000022', 'OOP Concepts', 'backend', 'Advanced', 22, true),

-- Tools (7)
('00000000-0000-0000-0002-000000000023', 'Git & GitHub', 'tools', 'Expert', 23, true),
('00000000-0000-0000-0002-000000000024', 'Google Antigravity', 'tools', 'Expert', 24, true),
('00000000-0000-0000-0002-000000000025', 'ChatGPT', 'tools', 'Expert', 25, true),
('00000000-0000-0000-0002-000000000026', 'Performance Audit', 'tools', 'Advanced', 26, true),
('00000000-0000-0000-0002-000000000027', 'Problem Solving', 'tools', 'Expert', 27, true),
('00000000-0000-0000-0002-000000000028', 'Data Structures', 'tools', 'Advanced', 28, true),
('00000000-0000-0000-0002-000000000029', 'Algorithms', 'tools', 'Advanced', 29, true)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 6. Table: ai_tools (All 5 verified entries)
-- -----------------------------------------------------------------------------
INSERT INTO public.ai_tools (id, name, tag, summary, details, icon_name, display_order, is_visible) VALUES
(
  '00000000-0000-0000-0003-000000000001',
  'Google Antigravity',
  'Workflow & Coding',
  'AI-assisted coding and development workflows.',
  'Leveraging agentic development workflows, project-wide reasoning, and terminal verification while keeping software architecture and system boundaries human-driven.',
  'Terminal',
  1,
  true
),
(
  '00000000-0000-0000-0003-000000000002',
  'ChatGPT',
  'Problem-Solving & Analysis',
  'Technical problem-solving, code explanations, debugging assistance, and development planning.',
  'Evaluating architectural trade-offs, accelerating complex API explorations, and structuring implementation approaches before committing production code.',
  'Sparkles',
  2,
  true
),
(
  '00000000-0000-0000-0003-000000000003',
  'AI-Assisted Development',
  'Implementation Workflow',
  'Supporting implementation, refactoring, and development workflows with AI tools.',
  'Accelerating component scaffolding, modular refactoring routines, and repetitive boilerplate generation without compromising code clarity or structure.',
  'Workflow',
  3,
  true
),
(
  '00000000-0000-0000-0003-000000000004',
  'Prompt Engineering',
  'Context & Precision',
  'Writing structured prompts for relevant and actionable development outputs.',
  'Formulating clear technical constraints, supplying localized codebase context, and guiding AI outputs toward deterministic, type-safe implementations.',
  'Binary',
  4,
  true
),
(
  '00000000-0000-0000-0003-000000000005',
  'AI-Powered Debugging',
  'Root-Cause Analysis',
  'Investigating errors, evaluating potential fixes, and understanding root causes.',
  'Diagnosing tricky stack traces, analyzing edge cases in asynchronous state, and evaluating remediation approaches before committing fixes.',
  'ShieldCheck',
  5,
  true
)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 7. Table: experiences (All 5 verified experiences, education & certifications)
-- -----------------------------------------------------------------------------
INSERT INTO public.experiences (id, type, title, role_or_degree, institution, date_range, description, cert_url, display_order, is_visible) VALUES
(
  '00000000-0000-0000-0004-000000000001',
  'experience',
  'Egypt Digital Pioneers Initiative (DEPI)',
  'Frontend Development Fellow',
  'Ministry of Communications & Information Technology',
  'Jul 2025 - Dec 2025',
  'Developed scalable and responsive web applications using React.js within an industry-simulated environment. Collaborated using Git and Agile methodologies to deliver optimized components, integrated APIs, and participated in regular peer code reviews.',
  '/Files/Ebrahim Abdelmonem Ebrahim.pdf',
  1,
  true
),
(
  '00000000-0000-0000-0004-000000000002',
  'experience',
  'NTI Creativa Initiative',
  'Frontend Trainee',
  'National Telecommunication Institute (NTI)',
  'Aug 2025 - Oct 2025',
  'Focused on creating responsive, semantic HTML5, CSS3, and JavaScript layouts. Worked on cross-browser compatibility, DOM manipulation, and modular UI layouts under professional mentoring guidelines.',
  '/Files/Ebrahim Abdelmonem Ebrahim Ebrahim.pdf',
  2,
  true
),
(
  '00000000-0000-0000-0004-000000000003',
  'education',
  'Mansoura University',
  'Bachelor of Computer Science',
  'Faculty of Computers and Information',
  '2022 - 2026 (Expected)',
  'Studying core algorithms, data structures, object-oriented programming (OOP), system design, and database systems.',
  '',
  3,
  true
),
(
  '00000000-0000-0000-0004-000000000004',
  'certification',
  'React.js Advanced Diploma',
  'T-Square Academy',
  'T-Square Academy',
  'Jul 2024 - Nov 2024',
  'Advanced training in React concepts: Hook lifecycles, Context APIs, React Router, client-side routing, and global state management using Redux Toolkit.',
  '',
  4,
  true
),
(
  '00000000-0000-0000-0004-000000000005',
  'certification',
  'Laravel Backend Diploma',
  'T-Square Academy',
  'T-Square Academy',
  'Nov 2024 - Mar 2025',
  'Focused on MVC architecture, database migrations, model relationships, routing, authentication, and RESTful API development.',
  '',
  5,
  true
)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------------------------
-- 8. Table: media_assets (0 rows)
-- Left intentionally empty until files are uploaded via admin dashboard.
-- -----------------------------------------------------------------------------
