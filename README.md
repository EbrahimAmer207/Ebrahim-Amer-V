# 🌌 Ebrahim Amer | Front-End Engineering Portfolio V5

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-f107a3?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A premium, high-performance, single-page portfolio designed for top 1% front-end engineers. Built using Next.js 16 (App Router), React 19, TypeScript, and custom-tailored CSS Modules. Fully interactive, SEO-optimized, and built to achieve 100/100 Core Web Vitals.

🌐 **Live Demo:** [ebrahim-amer-v.vercel.app](https://ebrahim-amer-v.vercel.app/)

---

## ✨ Key Features & User Experience

This portfolio is not just a resume; it is an interactive engineering showcase. Here are the core user experience innovations integrated into the project:

### ⌨️ Keyboard-Driven Command Palette (`⌘K` / `Ctrl + K`)
- **Instant Shortcuts**: Users can navigate between sections, change the application theme, send an email, and trigger CV downloads instantly.
- **Full Accessibility**: Complete keyboard trap, arrow-key navigation, and tab indices.

### 📊 Live Lighthouse Audit Monitor
- **Core Web Vitals Tracker**: Features an interactive, custom-animated Lighthouse meter built inside React.
- **Perfect Scores**: Dynamically tracks and proves the site's production-grade performance, accessibility, best practices, and SEO.

### 🗺️ Interactive Skill Map & Marquee
- **Premium Dual-Row Marquee**: Split dynamically into two parallel tracks moving in opposite directions with a hardware-accelerated linear animation.
- **Micro-Interactions**: Hovering over any skill pill or row automatically pauses the marquee (`animation-play-state: paused`) for easy cursor inspection.
- **Edge Fading Mask**: Utilizes CSS `mask-image` linear gradients to seamlessly blend scrolling tags into the screen margins.
- **Smooth Layout Transitions**: Category filters animate changing lists dynamically using Framer Motion exit/enter transitions.

### 🟢 Professional Availability Module ("Available For")
- **Active Status Indicator**: Includes a live green pulsing badge notifying recruiters of active availability.
- **Glassmorphic Grid**: Categorized opportunities into highly visual, glowing-border cards (Junior Frontend Roles, Internships, and Freelance/Contracting).
- **Interactive Call-To-Action**: Smooth scroll hooks that direct potential employers instantly to the connection portal.

### 🐙 Dynamic GitHub Contribution Widget
- **Activity Graph**: Simulates a high-performance commit activity matrix matching GitHub’s official contribution interface.
- **Hover Micro-interactions**: Fully responsive custom tooltips showing precise commit counts and dates.

### 🎨 Premium Visual Aesthetics & Animation
- **3D Fluid Background**: Uses GPU-accelerated canvas animations to create a deep, futuristic dark-mode environment.
- **Custom Spring Cursor**: Includes a lagging, cursor-follower micro-interaction on desktop viewports to increase design premiumness.
- **Scroll Reveal Architecture**: Custom React hook orchestrating stagger animations on scroll boundaries using Intersection Observers.

---

## 🛠️ Technology Stack & Architecture

This application is built with zero CSS frameworks in the core (Vanilla CSS modules) to maximize flexibility, asset lightweightness, and rendering speed.

| Category | Technologies | Description |
|---|---|---|
| **Core Framework** | Next.js 16 (App Router), React 19, TypeScript | Server components, dynamic routing, and strict type safety. |
| **Animation Suite** | Framer Motion, GSAP (GreenSock) | Smooth physics-based springs, layouts, and page transitions. |
| **Styling System** | CSS Modules (Vanilla variables) | 100% scoped class names, zero layout shift (CLS), CSS variables. |
| **Icons & Media** | Lucide React | Highly optimized vector graphic system. |
| **Data Flow** | Context API, Custom Hooks | Modularized globally accessible states (e.g. Command Palette, Theme). |

---

## 📁 Repository Structure

```text
├── public/                 # Static assets, fonts, and global files
│   ├── Files/              # Resume documents (CV)
│   └── Img/                # Profile image & project mockup screenshots
├── src/
│   ├── app/                # Next.js App Router (Layouts & Pages)
│   │   ├── projects/       # Dynamic routes for Project Case Studies
│   │   │   └── [slug]/     # Case study pages
│   │   ├── globals.css     # Design system core rules & CSS variables
│   │   └── page.tsx        # Main entry point (landing page)
│   ├── components/
│   │   ├── layout/         # Navigation, Loader, Footer wrappers
│   │   ├── sections/       # Hero, About, Projects, Experience, Skills, Availability, Contact
│   │   └── ui/             # CommandPalette, LighthouseMeter, GithubActivity, Background3D
│   ├── context/            # Global context (e.g. AppContext for theme & palette state)
│   ├── data/               # Static project databases (projectsData.ts)
│   └── hooks/              # Custom reusable hooks (useMousePosition, useScrollReveal)
```

---

## 💼 Core Case Studies Highlighted

The portfolio showcases **6 production-ready engineering projects**, each documented with deep problem-solution-result stories, metrics, and challenges:

1. **LUXE E-Commerce** (Next.js Fullstack Platform) - Stripe payments, Firebase Auth, Firestore, <1.5s load times.
2. **Supabase Portfolio CMS** (Fullstack React Development) - Vite, PostgreSQL, JWT Auth, live admin dashboard.
3. **Aetheria Estate** (React.js Development) - Luxury property filtering with zero-delay asynchronous state.
4. **Apex E-Commerce** (API-Driven Client) - Caching, skeleton loaders, and zero layout shift.
5. **Nexus Admin Dashboard** (Interactive CRUD Application) - SVG data charting, modal control states.
6. **Nimbus Weather Client** (Asynchronous Service) - Geolocation API, atmospheric condition CSS animations.

---

## ⚡ Getting Started

Follow these steps to run the portfolio on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/EbrahimAmer207/Ebrahim-Amer-V.git
cd Ebrahim-Amer-V
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To build a production bundle and check the static site generation:
```bash
npm run build
npm run start
```

---

## ⚙️ Development Scripts
- `npm run dev` - Starts the Next.js development server.
- `npm run build` - Creates an optimized production build of the project.
- `npm run start` - Starts the compiled Next.js production server.
- `npm run lint` - Runs ESLint to verify code quality and consistency.

---

## 📬 Contact & Connect

- **Engineer:** Ebrahim Abdelmonem Amer
- **Role:** Front-End / React & Next.js Developer (CS Graduate '26)
- **Email:** himaamer937@gmail.com
- **LinkedIn:** [linkedin.com/in/ebrahim-amer0](https://www.linkedin.com/in/ebrahim-amer0/)
- **GitHub:** [@EbrahimAmer207](https://github.com/EbrahimAmer207)

---
*Built with ❤️ and high-performance React code by Ebrahim Amer.*
