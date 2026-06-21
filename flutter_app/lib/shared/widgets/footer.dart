import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_theme.dart';

class Footer extends StatelessWidget {
  const Footer({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(60),
      decoration: BoxDecoration(
        color: Colors.black,
        border: Border(top: BorderSide(color: Colors.white.withValues(alpha: 0.05))),
      ),
      child: Column(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                flex: 2,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'NEXORA STUDIO',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 2,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Elite digital engineering. We build the future of the web, one pixel at a time.',
                      style: TextStyle(color: Colors.grey[500], height: 1.6),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 40),
              _buildFooterCol(context, 'PLATFORM', [
                {'title': 'Services', 'route': '/services'},
                {'title': 'Projects', 'route': '/projects'},
                {'title': 'About', 'route': '/about'},
                {'title': 'Contact', 'route': '/contact'},
              ]),
              _buildFooterCol(context, 'LEGAL', [
                {'title': 'Terms', 'route': '/terms'},
                {'title': 'Privacy', 'route': '/privacy'},
                {'title': 'Refund', 'route': '/refund-policy'},
              ]),
            ],
          ),
          const SizedBox(height: 60),
          const Divider(color: Colors.white10),
          const SizedBox(height: 24),
          Text(
            '© 2024 NEXORA STUDIO. ALL RIGHTS RESERVED.',
            style: TextStyle(color: Colors.grey[700], fontSize: 10, letterSpacing: 2),
          ),
        ],
      ),
    );
  }

  Widget _buildFooterCol(BuildContext context, String title, List<Map<String, String>> items) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 10,
              fontWeight: FontWeight.bold,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 24),
          ...items.map((item) => Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: InkWell(
              onTap: () => context.go(item['route']!),
              child: Text(
                item['title']!,
                style: const TextStyle(color: Colors.grey, fontSize: 13),
              ),
            ),
          )),
        ],
      ),
    );
  }
}
