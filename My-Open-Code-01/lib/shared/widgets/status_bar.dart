import 'dart:ui';
import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/constants/app_constants.dart';

class CustomStatusBar extends StatelessWidget {
  const CustomStatusBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: AppConstants.statusBarHeight,
      decoration: const BoxDecoration(
        color: Color(0x1A000000),
      ),
      child: ClipRRect(
        child: BackdropFilter(
          filter: ImageFilter.blur(
            sigmaX: AppConstants.glassBlur,
            sigmaY: AppConstants.glassBlur,
          ),
          child: const SizedBox.expand(),
        ),
      ),
    );
  }


}
