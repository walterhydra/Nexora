import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../core/theme/app_theme.dart';

class LivingBackground extends StatelessWidget {
  const LivingBackground({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Main Black Base
        Container(color: Colors.black),
        
        // Animated Blobs
        _Orb(
          color: AppTheme.accentBlue.withValues(alpha: 0.15),
          size: 400,
          initialOffset: const Offset(-100, -100),
          duration: 20.seconds,
        ),
        _Orb(
          color: AppTheme.accentCyan.withValues(alpha: 0.1),
          size: 300,
          initialOffset: Offset(MediaQuery.of(context).size.width - 200, 200),
          duration: 15.seconds,
          reverse: true,
        ),
        _Orb(
          color: Colors.purple.withValues(alpha: 0.1),
          size: 500,
          initialOffset: Offset(100, MediaQuery.of(context).size.height - 300),
          duration: 25.seconds,
        ),

        // Noise Texture Simulation (Subtle)
        Opacity(
          opacity: 0.02,
          child: Image.asset(
            'assets/assets/noise.png', // Fallback to icon if not found
            repeat: ImageRepeat.repeat,
            errorBuilder: (context, error, stackTrace) => const SizedBox.shrink(),
          ),
        ),
      ],
    );
  }
}

class _Orb extends StatelessWidget {
  final Color color;
  final double size;
  final Offset initialOffset;
  final Duration duration;
  final bool reverse;

  const _Orb({
    required this.color,
    required this.size,
    required this.initialOffset,
    required this.duration,
    this.reverse = false,
  });

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: initialOffset.dx,
      top: initialOffset.dy,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          gradient: RadialGradient(
            colors: [color, Colors.transparent],
          ),
        ),
      )
      .animate(onPlay: (controller) => controller.repeat(reverse: true))
      .move(
        begin: Offset.zero,
        end: Offset(reverse ? -50 : 50, reverse ? 50 : -50),
        duration: duration,
        curve: Curves.easeInOutSine,
      )
      .scale(
        begin: const Offset(1, 1),
        end: const Offset(1.2, 1.2),
        duration: duration,
        curve: Curves.easeInOutSine,
      ),
    );
  }
}
