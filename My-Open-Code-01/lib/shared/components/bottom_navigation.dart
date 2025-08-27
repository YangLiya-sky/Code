import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import '../../core/constants/app_constants.dart';
import '../../core/routing/app_router.dart';

class BottomNavigation extends StatelessWidget {
  final int currentIndex;

  const BottomNavigation({
    super.key,
    required this.currentIndex,
  });

  void _navigateToPage(BuildContext context, int targetIndex) {
    if (currentIndex == targetIndex) return;
    
    String route;
    switch (targetIndex) {
      case 0:
        route = AppRouter.home;
        break;
      case 1:
        route = AppRouter.search;
        break;
      case 2:
        route = AppRouter.destination;
        break;
      case 3:
        route = AppRouter.orders;
        break;
      case 4:
        route = AppRouter.profile;
        break;
      default:
        route = AppRouter.home;
    }
    
    Navigator.pushReplacementNamed(context, route);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: AppConstants.navBarHeight,
      decoration: const BoxDecoration(
        color: AppColors.card,
        border: Border(
          top: BorderSide(
            color: AppColors.border,
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        top: false,
        child: Row(
          children: [
            _buildNavItem(
              context,
              icon: Icons.home,
              label: '首页',
              index: 0,
              onTap: () => _navigateToPage(context, 0),
            ),
            _buildNavItem(
              context,
              icon: Icons.search,
              label: '搜索',
              index: 1,
              onTap: () => _navigateToPage(context, 1),
            ),
            _buildNavItem(
              context,
              icon: Icons.place,
              label: '目的地',
              index: 2,
              onTap: () => _navigateToPage(context, 2),
            ),
            _buildNavItem(
              context,
              icon: Icons.receipt_long,
              label: '订单',
              index: 3,
              onTap: () => _navigateToPage(context, 3),
            ),
            _buildNavItem(
              context,
              icon: Icons.person,
              label: '我的',
              index: 4,
              onTap: () => _navigateToPage(context, 4),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required int index,
    required VoidCallback onTap,
  }) {
    final isActive = currentIndex == index;
    
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                icon,
                size: 20,
                color: isActive 
                  ? AppColors.foreground 
                  : AppColors.mutedForeground,
              ),
              const SizedBox(height: 4),
              Flexible(
                child: Text(
                  label,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: isActive 
                      ? AppColors.foreground 
                      : AppColors.mutedForeground,
                    fontWeight: isActive 
                      ? FontWeight.w500 
                      : FontWeight.w400,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 1,
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}