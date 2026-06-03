# Graph Report - Nexora  (2026-06-03)

## Corpus Check
- 89 files · ~1,405,994 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 306 nodes · 359 edges · 31 communities (25 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e036838`
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
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 26|Community 26]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 10 edges
2. `fadeUp` - 8 edges
3. `staggerContainer` - 8 edges
4. `getScroll()` - 6 edges
5. `scripts` - 5 edges
6. `ErrorBoundary` - 5 edges
7. `CustomCursor()` - 3 edges
8. `MagneticButton()` - 3 edges
9. `services` - 3 edges
10. `useCursor()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --calls--> `cn()`  [EXTRACTED]
  src/components/layout/Navbar.jsx → src/utils/cn.js
- `GlowCard()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/GlowCard.jsx → src/utils/cn.js
- `AppContent()` --calls--> `useLenis()`  [EXTRACTED]
  src/App.jsx → src/hooks/useLenis.js
- `ContextCursor()` --calls--> `useCursor()`  [EXTRACTED]
  src/components/ui/ContextCursor.jsx → src/context/CursorContext.jsx
- `CustomCursor()` --calls--> `useMousePosition()`  [EXTRACTED]
  src/components/ui/CustomCursor.jsx → src/hooks/useMousePosition.js

## Communities (31 total, 6 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (6): CursorContext, CursorProvider(), useCursor(), useLenis(), AppContent(), ContextCursor()

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (34): dependencies, animejs, canvas-confetti, clsx, @emailjs/browser, framer-motion, gsap, @gsap/react (+26 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (12): fadeDown, fadeLeft, fadeRight, fadeUp, pageTransition, scaleIn, staggerContainer, faqs (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (9): services, getServiceComparison(), iconMap, ServiceDetails(), bentoClasses, iconMap, destroyScroll(), getScroll() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (4): projects, steps, showcaseProjects, Stats

### Community 5 - "Community 5"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (7): useMagneticEffect(), useMousePosition(), Navbar(), CustomCursor(), GlowCard(), MagneticButton(), cn()

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (3): team, darkBgColors, hexColors

### Community 9 - "Community 9"
Cohesion: 0.25
Nodes (5): techStack, allTech, row1, row2, row3

### Community 11 - "Community 11"
Cohesion: 0.40
Nodes (3): docsData, faqs, steps

### Community 12 - "Community 12"
Cohesion: 0.47
Nodes (4): ThemeContext, ThemeProvider(), useTheme(), ParticleField()

### Community 13 - "Community 13"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **87 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+82 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 1` to `Community 5`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _87 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06156156156156156 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.058823529411764705 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08901515151515152 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08602150537634409 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._