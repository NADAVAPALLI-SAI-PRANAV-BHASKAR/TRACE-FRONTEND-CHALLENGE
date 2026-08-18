# Acdyon Technologies Frontend Challenge — Part 2: Decisions & Architecture

## 1. Why This Approach

For **Trace** — a fictional developer product designed around the promise *"When production breaks, see the story — not the noise"* — we chose to build a single, deeply refined incident workflow rather than a sprawling marketing site with shallow placeholder pages.

Instead of generating generic SaaS sections (fake customer logos, unverified metrics, or stock testimonials), we made the chronological incident timeline the visual and functional centerpiece. By deliberately scoping the project to typed static/demo data with no backend or live integrations, we directed all available development time toward:
- **UI Craft & Aesthetic Restraint**: A warm, high-contrast developer-tool palette (`#faf9f5` canvas, near-black typography, monospace technical metadata, and restrained 1px borders) avoiding purple gradients or decorative glassmorphism.
- **Interactive Storytelling**: A 5-event timeline connecting code commits, database connection exhaustion, latency threshold alerts, engineer rollbacks, and recovery in one synchronized narrative.
- **Responsive Rigor**: Dedicated desktop split-pane and mobile-first stacked drawer layouts checked at 390px mobile and 1440px desktop viewports with zero horizontal overflow.
- **Zero Bloat**: Leveraging native React 19, TypeScript, and Tailwind CSS without installing third-party component libraries.

---

## 2. Trade-offs & Future Scope

Under the constraints of a take-home challenge, we prioritized executing one end-to-end incident timeline with high polish over spreading effort across multiple incomplete screens.

With additional production time (e.g., a full week), we would expand the implementation to include:
- **API-backed incident and telemetry data**.
- **Real integrations with monitoring, alerting, source-control, and database systems**.
- **Automated visual regression testing, accessibility auditing, and broader cross-device testing**.
- **Broader interaction coverage across secondary incident workflows**.

---

## 3. AI Usage

I used Google Antigravity and ChatGPT throughout the implementation for scaffolding, coding assistance, debugging, review, and iteration.

I reviewed the AI-assisted implementation and manually verified the key product, visual, responsive, and interaction decisions, including:
- Establishing the visual direction and developer aesthetic.
- Defining the modular component architecture and TypeScript data contracts.
- Structuring responsive breakpoints and layout adaptations between mobile (390px) and desktop.
- Enforcing strict honesty constraints (explicitly labeling demo data and removing unverified metric claims).
- Scoping meaningful user interactions (such as the context inspector and undisclosed Konami code easter egg).
- Conducting final audits, builds (`npm run build`), and type checks (`npx tsc --noEmit`).
