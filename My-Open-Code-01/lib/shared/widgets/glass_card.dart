import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/constants/app_constants.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? borderRadius;
  final Color? color;
  final Border? border;
  final bool hasBlur;
  final double? width;
  final double? height;

  const GlassCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.borderRadius,
    this.color,
    this.border,
    this.hasBlur = true,
    this.width,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      margin: margin ?? const EdgeInsets.all(12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(
          borderRadius ?? AppConstants.radius,
        ),
        border: border ?? Border.all(
          color: AppColors.border,
          width: 1,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x4D000000),
            blurRadius: 32,
            offset: Offset(0, 8),
          ),
          BoxShadow(
            color: Color(0x33FFFFFF),
            blurRadius: 1,
            offset: Offset(0, 1),
            blurStyle: BlurStyle.inner,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(
          borderRadius ?? AppConstants.radius,
        ),
        child: BackdropFilter(
          filter: hasBlur 
            ? ImageFilter.blur(sigmaX: AppConstants.glassBlur, sigmaY: AppConstants.glassBlur)
            : ImageFilter.blur(sigmaX: 0, sigmaY: 0),
          child: Container(
            decoration: BoxDecoration(
              color: color ?? AppColors.card,
            ),
            padding: padding ?? const EdgeInsets.all(AppConstants.contentPadding),
            child: child,
          ),
        ),
      ),
    );
  }
}

class GlassCardSmall extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final double? borderRadius;
  final Color? color;
  final bool hasBlur;
  final double? width;
  final double? height;
  final VoidCallback? onTap;

  const GlassCardSmall({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.borderRadius,
    this.color,
    this.hasBlur = true,
    this.width,
    this.height,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    Widget cardWidget = Container(
      width: width,
      height: height,
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(
          borderRadius ?? AppConstants.radiusSm,
        ),
        border: Border.all(
          color: AppColors.border,
          width: 1,
        ),
        boxShadow: const [
          BoxShadow(
            color: Color(0x33000000),
            blurRadius: 16,
            offset: Offset(0, 4),
          ),
          BoxShadow(
            color: Color(0x33FFFFFF),
            blurRadius: 1,
            offset: Offset(0, 1),
            blurStyle: BlurStyle.inner,
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(
          borderRadius ?? AppConstants.radiusSm,
        ),
        child: BackdropFilter(
          filter: hasBlur 
            ? ImageFilter.blur(sigmaX: AppConstants.glassBlur, sigmaY: AppConstants.glassBlur)
            : ImageFilter.blur(sigmaX: 0, sigmaY: 0),
          child: Container(
            decoration: BoxDecoration(
              color: color ?? AppColors.card,
            ),
            padding: padding ?? const EdgeInsets.all(16),
            child: child,
          ),
        ),
      ),
    );

    if (onTap != null) {
      return GestureDetector(
        onTap: onTap,
        child: cardWidget,
      );
    }

    return cardWidget;
  }
}
