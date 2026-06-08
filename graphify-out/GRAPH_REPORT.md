# Graph Report - Nexora  (2026-06-08)

## Corpus Check
- 96 files · ~2,066,153 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 357 nodes · 413 edges · 35 communities (28 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2e50cec5`
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
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 10 edges
2. `fadeUp` - 8 edges
3. `staggerContainer` - 8 edges
4. `getScroll()` - 7 edges
5. `scripts` - 5 edges
6. `ErrorBoundary` - 5 edges
7. `projects` - 4 edges
8. `CustomCursor()` - 3 edges
9. `MagneticButton()` - 3 edges
10. `services` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/utils/cn.js
- `GlowCard` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/GlowCard.jsx → src/utils/cn.js
- `AppContent()` --calls--> `useLenis()`  [EXTRACTED]
  src/App.jsx → src/hooks/useLenis.js
- `ContextCursor()` --calls--> `useCursor()`  [EXTRACTED]
  src/components/ui/ContextCursor.jsx → src/context/CursorContext.jsx
- `CustomCursor()` --calls--> `useMousePosition()`  [EXTRACTED]
  src/components/ui/CustomCursor.jsx → src/hooks/useMousePosition.js

## Communities (35 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (11): CursorContext, CursorProvider(), useCursor(), ThemeContext, ThemeProvider(), useTheme(), useLenis(), purposeOptions (+3 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (38): dependencies, animejs, canvas-confetti, clsx, @emailjs/browser, framer-motion, gsap, @gsap/react (+30 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (12): fadeDown, fadeLeft, fadeRight, fadeUp, pageTransition, scaleIn, staggerContainer, faqs (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (9): services, getServiceComparison(), iconMap, ServiceDetails(), bentoClasses, iconMap, destroyScroll(), getScroll() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (6): steps, PulseCard, showcaseProjects, StatCard, Stats, BentoCard

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (7): useMagneticEffect(), useMousePosition(), Navbar(), CustomCursor(), GlowCard, MagneticButton(), cn()

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (7): team, darkBgColors, hexColors, memberIntroductions, memberNotes, panelColors, posterMap

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (5): techStack, allTech, row1, row2, row3

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): docsData, faqs, steps

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

### Community 34 - "Community 34"
Cohesion: 0.33
Nodes (4): CURR_SYM, DEFAULT_INVOICE_DATA, DEFAULT_SETTINGS, PREDEFINED_SERVICES

## Knowledge Gaps
- **123 isolated node(s):** `__filename`, `__dirname`, `files`, `content`, `name` (+118 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 1` to `Community 5`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `__filename`, `__dirname`, `files` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05537098560354374 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08901515151515152 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08817204301075268 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._