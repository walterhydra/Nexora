import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

class Navbar extends StatelessWidget {
  const Navbar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      padding: const EdgeInsets.symmetric(horizontal: 24),
      decoration: BoxDecoration(
        color: AppTheme.background.withValues(alpha: 0.8),
        border: Border(bottom: BorderSide(color: Colors.white.withValues(alpha: 0.1))),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => context.go('/'),
            child: const Text(
              'NEXORA',
              style: TextStyle(
                color: Colors.white,
                fontSize: 20,
                fontWeight: FontWeight.w900,
                letterSpacing: 2,
              ),
            ),
          ),
          const Spacer(),
          if (MediaQuery.of(context).size.width > 800)
            Row(
              children: [
                _NavLink(title: 'SERVICES', route: '/services'),
                _NavLink(title: 'PROJECTS', route: '/projects'),
                _NavLink(title: 'ABOUT', route: '/about'),
                _NavLink(title: 'CONTACT', route: '/contact'),
                const SizedBox(width: 24),
                ElevatedButton(
                  onPressed: () => context.go('/portal'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.accentBlue.withValues(alpha: 0.1),
                    side: BorderSide(color: AppTheme.accentBlue.withValues(alpha: 0.3)),
                  ),
                  child: const Text('CLIENT PORTAL', style: TextStyle(fontSize: 12)),
                ),
              ],
            )
          else
            IconButton(
              icon: const Icon(Icons.menu, color: Colors.white),
              onPressed: () => Scaffold.of(context).openDrawer(),
            ),
        ],
      ),
    );
  }
}

class _NavLink extends StatelessWidget {
  final String title;
  final String route;

  const _NavLink({required this.title, required this.route});

  @override
  Widget build(BuildContext context) {
    final bool isActive = GoRouterState.of(context).uri.path == route;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: InkWell(
        onTap: () => context.go(route),
        child: Text(
          title,
          style: TextStyle(
            color: isActive ? AppTheme.accentBlue : Colors.grey,
            fontSize: 12,
            fontWeight: FontWeight.bold,
            letterSpacing: 1,
          ),
        ),
      ),
    );
  }
}
