import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/constants/app_constants.dart';
import 'gesture_handler.dart';

class MobileContainer extends StatelessWidget {
  final Widget child;
  final bool showStatusBar;

  const MobileContainer({
    super.key,
    required this.child,
    this.showStatusBar = true,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(
          gradient: AppColors.backgroundGradient,
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(
              maxWidth: AppConstants.mobileWidth,
              maxHeight: AppConstants.mobileHeight,
            ),
            child: Container(
              width: AppConstants.mobileWidth,
              height: AppConstants.mobileHeight,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment(-0.707, -0.707),
                  end: Alignment(0.707, 0.707),
                  colors: [AppColors.background, AppColors.backgroundSecondary],
                ),
                borderRadius: BorderRadius.circular(AppConstants.radiusXl),
                border: Border.all(
                  color: AppColors.border,
                  width: 1,
                ),
                boxShadow: const [
                  BoxShadow(
                    color: Color(0x4D000000),
                    blurRadius: 32,
                    offset: Offset(0, 8),
                  ),
                ],
              ),
              clipBehavior: Clip.antiAlias,
              child: NavigationGestureWrapper(child: child),
            ),
          ),
        ),
      ),
    );
  }
}

// Responsive version matching travel_theme.css media query
class ResponsiveMobileContainer extends StatelessWidget {
  final Widget child;

  const ResponsiveMobileContainer({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    
    // CSS: @media (max-width: 414px) - use full screen with no border radius
    if (size.width <= 414) {
      return Scaffold(
        body: Container(
          width: double.infinity,
          height: double.infinity,
          decoration: const BoxDecoration(
            gradient: AppColors.backgroundGradient,
          ),
          child: NavigationGestureWrapper(child: child),
        ),
      );
    }
    
    // For larger screens, show desktop container with border radius
    return MobileContainer(child: child);
  }
}
