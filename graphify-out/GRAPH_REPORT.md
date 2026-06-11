# Graph Report - Nexora  (2026-06-11)

## Corpus Check
- 136 files · ~2,091,981 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 602 nodes · 739 edges · 70 communities (53 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ce335cc5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 14 edges
3. `cn()` - 10 edges
4. `usePortal()` - 10 edges
5. `usePortal()` - 8 edges
6. `fadeUp` - 8 edges
7. `staggerContainer` - 8 edges
8. `getScroll()` - 7 edges
9. `tailwind` - 6 edges
10. `aliases` - 6 edges

## Surprising Connections (you probably didn't know these)
- `InvoiceSystem()` --calls--> `fmt()`  [INFERRED]
  src/pages/InvoiceSystem.jsx → nexoraa-client-portal/components/pages/billing-page.tsx
- `PageRouter()` --calls--> `usePortal()`  [EXTRACTED]
  nexoraa-client-portal/app/page.tsx → nexoraa-client-portal/lib/portal-context.tsx
- `Navbar()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/utils/cn.js
- `OverviewPage()` --calls--> `usePortal()`  [EXTRACTED]
  src/components/portal/OverviewPage.jsx → src/components/portal/PortalContext.jsx
- `SidebarContent()` --calls--> `cn()`  [EXTRACTED]
  src/components/portal/Sidebar.jsx → src/utils/cn.js

## Communities (70 total, 17 thin omitted)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (39): dependencies, animejs, canvas-confetti, clsx, @emailjs/browser, framer-motion, gsap, @gsap/react (+31 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (9): fadeDown, fadeLeft, fadeRight, fadeUp, pageTransition, scaleIn, staggerContainer, posts (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (7): services, getServiceComparison(), iconMap, ServiceDetails(), destroyScroll(), getScroll(), initScroll()

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (3): steps, PulseCard, BentoCard

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (12): docsData, useMagneticEffect(), useMousePosition(), Navbar(), faqs, steps, allItems, recentItems (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (5): supabase, DEFAULT_PROJECT_DATA, LOG_POOL, MOCK_DATA, portalNavItems

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (7): team, darkBgColors, hexColors, memberIntroductions, memberNotes, panelColors, posterMap

### Community 9 - "Community 9"
Cohesion: 0.06
Nodes (24): colorMap, iconMap, NotificationPanel(), OverviewPage(), PortalContext, PortalProvider(), usePortal(), assetFiles (+16 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (31): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, lucide-react, next, react (+23 more)

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (4): content, __dirname, __filename, files

### Community 13 - "Community 13"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 16 - "Community 16"
Cohesion: 0.24
Nodes (3): projects, ProjectCard, FeaturedCard

### Community 29 - "Community 29"
Cohesion: 0.22
Nodes (7): __dirname, envContent, envPath, __filename, key, parts, val

### Community 32 - "Community 32"
Cohesion: 0.29
Nodes (5): navigation, nonRefundable, reveal, stages, toneStyles

### Community 33 - "Community 33"
Cohesion: 0.47
Nodes (4): ThemeContext, ThemeProvider(), useTheme(), ParticleField()

### Community 34 - "Community 34"
Cohesion: 0.47
Nodes (4): CursorContext, CursorProvider(), useCursor(), ContextCursor()

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (6): fmt(), CURR_SYM, DEFAULT_INVOICE_DATA, DEFAULT_SETTINGS, InvoiceSystem(), PREDEFINED_SERVICES

### Community 38 - "Community 38"
Cohesion: 0.25
Nodes (5): techStack, allTech, row1, row2, row3

### Community 40 - "Community 40"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 41 - "Community 41"
Cohesion: 0.27
Nodes (6): channels, Message, messages, fadeUp, MessagesPage(), stagger

### Community 43 - "Community 43"
Cohesion: 0.16
Nodes (13): PageRouter(), pageVariants, allItems, CommandPalette(), recentItems, priorities, RequestModal(), requestTypes (+5 more)

### Community 45 - "Community 45"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 46 - "Community 46"
Cohesion: 0.20
Nodes (10): AnimatedCounter(), AnimatedCounterProps, invoices, paymentTimeline, project, BillingPage(), fadeUp, fmtFull() (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.20
Nodes (9): assetFiles, folders, AssetVaultPage(), fadeUp, FileCard(), FileRow(), FileType, getFileIcon() (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.17
Nodes (5): milestones, teamMembers, fadeUp, OverviewPage(), stagger

### Community 49 - "Community 49"
Cohesion: 0.17
Nodes (4): SettingsPage(), Tab, tabContent, tabs

### Community 50 - "Community 50"
Cohesion: 0.24
Nodes (7): containerVariants, itemVariants, navItems, Sidebar(), cn(), Button(), buttonVariants

### Community 52 - "Community 52"
Cohesion: 0.29
Nodes (6): colorMap, iconMap, NotificationPanel(), pageLabels, TopNavbar(), notifications

### Community 53 - "Community 53"
Cohesion: 0.33
Nodes (4): inter, jetbrainsMono, metadata, sora

## Knowledge Gaps
- **240 isolated node(s):** `__filename`, `__dirname`, `files`, `content`, `name` (+235 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `fmt()` connect `Community 36` to `Community 46`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 6` to `Community 9`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `files` to the rest of the system?**
  _240 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.11333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._