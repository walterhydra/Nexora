# Graph Report - Nexora  (2026-11-10)

## Corpus Check
- 177 files · ~3,395,749 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1020 nodes · 1173 edges · 103 communities (78 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7713fee8`
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
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
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
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 86|Community 86]]
- [[_COMMUNITY_Community 87|Community 87]]
- [[_COMMUNITY_Community 88|Community 88]]
- [[_COMMUNITY_Community 89|Community 89]]
- [[_COMMUNITY_Community 90|Community 90]]
- [[_COMMUNITY_Community 91|Community 91]]
- [[_COMMUNITY_Community 92|Community 92]]
- [[_COMMUNITY_Community 93|Community 93]]
- [[_COMMUNITY_Community 94|Community 94]]
- [[_COMMUNITY_Community 95|Community 95]]
- [[_COMMUNITY_Community 97|Community 97]]
- [[_COMMUNITY_Community 120|Community 120]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 11 edges
3. `cn()` - 10 edges
4. `usePortal()` - 10 edges
5. `Nexoraa WebView App - Setup Guide` - 9 edges
6. `usePortal()` - 8 edges
7. `Nexoraa WebView App - Setup Guide` - 8 edges
8. `WindowClassRegistrar` - 7 edges
9. `Create()` - 7 edges
10. `Destroy()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `InvoiceSystem()` --calls--> `fmt()`  [INFERRED]
  src/pages/InvoiceSystem.jsx → apps/portal-prototype/components/pages/billing-page.tsx
- `my_application_activate()` --calls--> `fl_register_plugins()`  [INFERRED]
  apps/mobile/linux/runner/my_application.cc → apps/mobile/linux/flutter/generated_plugin_registrant.cc
- `main()` --calls--> `my_application_new()`  [INFERRED]
  apps/mobile/linux/runner/main.cc → apps/mobile/linux/runner/my_application.cc
- `OnCreate()` --calls--> `RegisterPlugins()`  [INFERRED]
  apps/mobile/windows/runner/flutter_window.cpp → apps/mobile/windows/flutter/generated_plugin_registrant.cc
- `OnCreate()` --calls--> `GetClientArea()`  [INFERRED]
  apps/mobile/windows/runner/flutter_window.cpp → apps/mobile/windows/runner/win32_window.cpp

## Communities (103 total, 25 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (21): useLenis(), About, Agreement, AppContent(), CaseStudyDetail, ClientPortal, CompanyPortal, Contact (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (39): dependencies, animejs, canvas-confetti, clsx, @emailjs/browser, framer-motion, gsap, @gsap/react (+31 more)

### Community 2 - "Community 2"
Cohesion: 0.14
Nodes (10): fadeDown, fadeLeft, fadeRight, fadeUp, pageTransition, scaleIn, staggerContainer, bentoClasses (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (12): ThemeContext, ThemeProvider(), useTheme(), getTerminalContent(), getTerminalTitle(), SystemBoot(), HERO_PHRASES, LaptopScreenContent (+4 more)

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (6): steps, Industries, LiveClock, LiveSystemClock, PulseCard, BentoCard

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (48): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, postcss (+40 more)

### Community 6 - "Community 6"
Cohesion: 0.21
Nodes (5): services, getServiceComparison(), iconMap, ServiceDetails(), iconMap

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (5): supabase, DEFAULT_PROJECT_DATA, LOG_POOL, MOCK_DATA, portalNavItems

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (7): team, darkBgColors, hexColors, memberIntroductions, memberNotes, panelColors, posterMap

### Community 9 - "Community 9"
Cohesion: 0.15
Nodes (8): OverviewPage(), PortalContext, PortalProvider(), usePortal(), containerVariants, itemVariants, navItems, SidebarContent()

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (31): dependencies, @base-ui/react, class-variance-authority, clsx, framer-motion, lucide-react, next, react (+23 more)

### Community 12 - "Community 12"
Cohesion: 0.24
Nodes (3): projects, ProjectCard, FeaturedCard

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (5): ABOUT_PARAGRAPH_SEGMENTS, containerVariants, itemVariants, STUDIO_FACTS, TOTAL_ABOUT_CHARS

### Community 16 - "Community 16"
Cohesion: 0.08
Nodes (24): 1. "Mixed Content" or Cleartext Traffic Issues, 1. Prerequisites, 2. External Links or Downloads Not Working, 2. Opening the Project in Android Studio, 3. Installing Dependencies, 3. Login Session Not Saving, 4. Blank White Screen on Launch, 4. Connecting a Device or Emulator (+16 more)

### Community 17 - "Community 17"
Cohesion: 0.30
Nodes (5): useMagneticEffect(), Navbar(), GlowCard, MagneticButton(), cn()

### Community 20 - "Community 20"
Cohesion: 0.20
Nodes (9): assetFiles, channels, folders, invoices, messages, milestones, paymentTimeline, project (+1 more)

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 22 - "Community 22"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 24 - "Community 24"
Cohesion: 0.31
Nodes (4): destroyScroll(), getScroll(), initScroll(), nativeScrollController

### Community 25 - "Community 25"
Cohesion: 0.40
Nodes (4): images, info, author, version

### Community 29 - "Community 29"
Cohesion: 0.11
Nodes (14): __dirname, envContent, envPath, __filename, key, parts, val, __dirname (+6 more)

### Community 30 - "Community 30"
Cohesion: 0.40
Nodes (4): images, info, author, version

### Community 32 - "Community 32"
Cohesion: 0.18
Nodes (13): leftPageVariants, mobilePageVariants, navigation, nonRefundable, pageVariants, RefundPolicy(), renderPageContent(), renderPageHeader() (+5 more)

### Community 33 - "Community 33"
Cohesion: 0.29
Nodes (5): colorMap, iconMap, NotificationPanel(), notifications, pageLabels

### Community 34 - "Community 34"
Cohesion: 0.21
Nodes (8): CursorContext, CursorProvider(), useCursor(), architectureDetails, RealtimeWork(), selectedWorkProjects, showcaseProjects, ContextCursor()

### Community 36 - "Community 36"
Cohesion: 0.29
Nodes (6): fmt(), CURR_SYM, DEFAULT_INVOICE_DATA, DEFAULT_SETTINGS, InvoiceSystem(), PREDEFINED_SERVICES

### Community 37 - "Community 37"
Cohesion: 0.40
Nodes (3): backgroundGlows, purposeOptions, slideVariants

### Community 38 - "Community 38"
Cohesion: 0.15
Nodes (14): channels, invoices, Message, messages, paymentTimeline, project, BillingPage(), fadeUp (+6 more)

### Community 41 - "Community 41"
Cohesion: 0.31
Nodes (8): leftPageVariants, mobilePageVariants, pageVariants, PrivacyPolicy(), renderPageContent(), renderPageHeader(), renderSignatureBlock(), rightPageVariants

### Community 42 - "Community 42"
Cohesion: 0.31
Nodes (8): leftPageVariants, mobilePageVariants, pageVariants, renderPageContent(), renderPageHeader(), renderSignatureBlock(), rightPageVariants, Terms()

### Community 43 - "Community 43"
Cohesion: 0.15
Nodes (14): PageRouter(), pageVariants, allItems, CommandPalette(), recentItems, priorities, RequestModal(), requestTypes (+6 more)

### Community 44 - "Community 44"
Cohesion: 0.40
Nodes (3): docsData, faqs, steps

### Community 47 - "Community 47"
Cohesion: 0.20
Nodes (9): assetFiles, folders, AssetVaultPage(), fadeUp, FileCard(), FileRow(), FileType, getFileIcon() (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.15
Nodes (6): AnimatedCounter(), AnimatedCounterProps, milestones, teamMembers, fadeUp, stagger

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

### Community 54 - "Community 54"
Cohesion: 0.38
Nodes (3): pricing, pricingTiers, tiers

### Community 59 - "Community 59"
Cohesion: 0.24
Nodes (5): faqCategories, faqs, FAQ_KEYWORDS, iconMap, INITIAL_MESSAGES

### Community 61 - "Community 61"
Cohesion: 0.07
Nodes (26): RegisterPlugins(), OnCreate(), wWinMain(), CreateAndAttachConsole(), GetCommandLineArguments(), Utf8FromUtf16(), Create(), Destroy() (+18 more)

### Community 64 - "Community 64"
Cohesion: 0.07
Nodes (29): dependencies, canvas-confetti, clsx, @emailjs/browser, framer-motion, gsap, @gsap/react, jwt-decode (+21 more)

### Community 65 - "Community 65"
Cohesion: 0.08
Nodes (25): ../core/constants/app_constants.dart, ../core/theme/colors.dart, package:flutter/material.dart, package:flutter_native_splash/flutter_native_splash.dart, dart:async, dart:io, error_screen.dart, no_internet_screen.dart (+17 more)

### Community 66 - "Community 66"
Cohesion: 0.08
Nodes (24): 1. "Mixed Content" or Cleartext Traffic Issues, 1. Prerequisites, 2. External Links or Downloads Not Working, 2. Opening the Project in Android Studio, 3. Installing Dependencies, 3. Login Session Not Saving, 4. Blank White Screen on Launch, 4. Connecting a Device or Emulator (+16 more)

### Community 67 - "Community 67"
Cohesion: 0.11
Nodes (7): fl_register_plugins(), main(), my_application_activate(), my_application_new(), _MyApplication, dart_entrypoint_arguments, parent_instance

### Community 69 - "Community 69"
Cohesion: 0.17
Nodes (11): core/constants/app_constants.dart, core/theme/colors.dart, package:flutter/material.dart, package:flutter_native_splash/flutter_native_splash.dart, core/theme/app_theme.dart, build, main, MaterialApp (+3 more)

### Community 70 - "Community 70"
Cohesion: 0.18
Nodes (10): background_color, description, display, icons, name, orientation, prefer_related_applications, short_name (+2 more)

### Community 71 - "Community 71"
Cohesion: 0.20
Nodes (4): AppDelegate, AppDelegate, FlutterAppDelegate, FlutterImplicitEngineDelegate

### Community 72 - "Community 72"
Cohesion: 0.22
Nodes (8): ../core/theme/colors.dart, package:flutter/material.dart, build, ErrorScreen, Icon, Scaffold, SizedBox, Text

### Community 73 - "Community 73"
Cohesion: 0.22
Nodes (8): ../core/theme/colors.dart, package:flutter/material.dart, build, Icon, NoInternetScreen, Scaffold, SizedBox, Text

### Community 74 - "Community 74"
Cohesion: 0.31
Nodes (8): leftPageVariants, mobilePageVariants, pageVariants, PaymentPolicy(), renderPageContent(), renderPageHeader(), renderSignatureBlock(), rightPageVariants

### Community 75 - "Community 75"
Cohesion: 0.29
Nodes (3): RunnerTests, RunnerTests, XCTestCase

### Community 76 - "Community 76"
Cohesion: 0.25
Nodes (6): code:block1 (You already have full access to my existing website project ), code:block2, Extra Tips, Iske baad aapko kya karna hai (short version), PROMPT (Antigravity ko ye exact text de dena), Prompt for Antigravity — Convert nexoraa.works (React/Next.js) into a Native Flutter App

### Community 77 - "Community 77"
Cohesion: 0.25
Nodes (6): code:block1 (You already have full access to my existing website project ), code:block2, Important Notes, Iske baad aapko kya karna hai (short version), PROMPT (Antigravity ko ye exact text de dena), Prompt for Antigravity — Convert nexoraa.works into a WebView-based Flutter App

### Community 78 - "Community 78"
Cohesion: 0.33
Nodes (5): handle_new_rx_page(), __lldb_init_module(), Intercept NOTIFY_DEBUGGER_ABOUT_RX_PAGES and touch the pages., SBDebugger, SBFrame

### Community 79 - "Community 79"
Cohesion: 0.33
Nodes (3): RegisterGeneratedPlugins(), NSWindow, MainFlutterWindow

### Community 80 - "Community 80"
Cohesion: 0.40
Nodes (4): package:flutter/material.dart, colors.dart, AppTheme, ThemeData

### Community 82 - "Community 82"
Cohesion: 0.40
Nodes (4): images, info, author, version

### Community 83 - "Community 83"
Cohesion: 0.40
Nodes (4): images, info, author, version

### Community 85 - "Community 85"
Cohesion: 0.40
Nodes (4): package:flutter/material.dart, package:flutter_test/flutter_test.dart, package:flutter_webview_app/main.dart, main

### Community 87 - "Community 87"
Cohesion: 0.12
Nodes (8): techStack, services, StatCard, statsData, allTech, row1, row2, row3

## Knowledge Gaps
- **485 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+480 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `fmt()` connect `Community 36` to `Community 38`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `cn()` connect `Community 17` to `Community 88`, `Community 9`, `Community 33`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _486 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08923076923076922 - nodes in this community are weakly interconnected._