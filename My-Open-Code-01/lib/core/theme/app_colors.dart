import 'package:flutter/material.dart';

class AppColors {
  // Liquid Glass Theme Colors (based on travel_theme.css)
  static const Color background = Color(0xFF667EEA);
  static const Color backgroundSecondary = Color(0xFF764BA2);
  static const Color foreground = Color(0xFFFFFFFF);
  
  // Glass Effect Colors (rgba(255, 255, 255, 0.1) etc.)
  static const Color card = Color(0x1AFFFFFF);
  static const Color cardForeground = Color(0xFFFFFFFF);
  static const Color popover = Color(0x26FFFFFF);
  static const Color popoverForeground = Color(0xFFFFFFFF);
  
  // Primary Colors
  static const Color primary = Color(0x33FFFFFF);
  static const Color primaryForeground = Color(0xFFFFFFFF);
  
  // Secondary Colors  
  static const Color secondary = Color(0x0DFFFFFF);
  static const Color secondaryForeground = Color(0xFFFFFFFF);
  
  // Muted Colors
  static const Color muted = Color(0x1AFFFFFF);
  static const Color mutedForeground = Color(0xB3FFFFFF);
  
  // Accent Colors
  static const Color accent = Color(0x26FFFFFF);
  static const Color accentForeground = Color(0xFFFFFFFF);
  
  // Destructive Colors
  static const Color destructive = Color(0xCCEF4444);
  static const Color destructiveForeground = Color(0xFFFFFFFF);
  
  // Border and Input Colors
  static const Color border = Color(0x33FFFFFF);
  static const Color input = Color(0x1AFFFFFF);
  static const Color ring = Color(0x4DFFFFFF);
  
  // Travel App Specific Colors (from CSS)
  static const Color travelBlue = Color(0xCC3B82F6);
  static const Color travelGreen = Color(0xCC22C55E);
  static const Color travelOrange = Color(0xCCFB923C);
  static const Color travelPurple = Color(0xCC9333EA);
  
  // Gradient Colors
  static const LinearGradient backgroundGradient = LinearGradient(
    begin: Alignment(-0.707, -0.707), // 135 degrees
    end: Alignment(0.707, 0.707),
    colors: [background, backgroundSecondary],
  );
  
  static const LinearGradient blueGradient = LinearGradient(
    begin: Alignment(-0.707, -0.707),
    end: Alignment(0.707, 0.707),
    colors: [travelBlue, travelPurple],
  );
  
  static const LinearGradient greenGradient = LinearGradient(
    begin: Alignment(-0.707, -0.707),
    end: Alignment(0.707, 0.707),
    colors: [travelGreen, travelBlue],
  );
  
  static const LinearGradient orangeGradient = LinearGradient(
    begin: Alignment(-0.707, -0.707),
    end: Alignment(0.707, 0.707),
    colors: [travelOrange, travelGreen],
  );
  
  static const LinearGradient purpleGradient = LinearGradient(
    begin: Alignment(-0.707, -0.707),
    end: Alignment(0.707, 0.707),
    colors: [travelPurple, travelOrange],
  );
}
