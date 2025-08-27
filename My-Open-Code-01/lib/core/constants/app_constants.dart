class AppConstants {
  // Mobile Dimensions
  static const double mobileWidth = 412.0;
  static const double mobileHeight = 915.0;
  static const double statusBarHeight = 44.0;
  static const double navBarHeight = 80.0;
  static const double contentPadding = 20.0;

  // Border Radius Values - Mobile first design (no radius for container)
  static const double mobileContainerRadius = 0.0; // No radius for mobile
  static const double radiusXl = 32.0;
  static const double radiusLg = 28.0;
  static const double radiusMd = 20.0;
  static const double radiusSm = 16.0;
  static const double radius = 24.0;

  // Glass Effects
  static const double glassBlur = 20.0;
  static const double glassOpacity = 0.1;
  static const double glassBorderOpacity = 0.2;

  // Animation Durations
  static const Duration fastAnimation = Duration(milliseconds: 200);
  static const Duration normalAnimation = Duration(milliseconds: 300);
  static const Duration slowAnimation = Duration(milliseconds: 500);

  // App Name
  static const String appName = '旅行助手';
  static const String appDescription = '发现世界的美好\n让每一次旅行都充满惊喜';
}
