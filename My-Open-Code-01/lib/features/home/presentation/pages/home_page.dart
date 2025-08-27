import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/widgets/status_bar.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/routing/app_router.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveMobileContainer(
      child: Column(
        children: [
          // Status Bar
          const CustomStatusBar(),
          
          // Header
          Container(
            height: 60,
            padding: const EdgeInsets.symmetric(
              horizontal: AppConstants.contentPadding,
            ),
            decoration: const BoxDecoration(
              color: AppColors.card,
              border: Border(
                bottom: BorderSide(
                  color: AppColors.border,
                  width: 1,
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(
                      Icons.menu,
                      size: 24,
                      color: AppColors.foreground,
                    ),
                    const SizedBox(width: 12),
                    Text(
                      AppConstants.appName,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ],
                ),
                const Icon(
                  Icons.notifications,
                  size: 24,
                  color: AppColors.foreground,
                ),
              ],
            ),
          ),
          
          // Content
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(
                bottom: AppConstants.navBarHeight + 20,
              ),
              child: Column(
                children: [
                  // Welcome Section
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '你好，旅行者！',
                                    style: Theme.of(context).textTheme.titleLarge,
                                  ),
                                  const SizedBox(height: 8),
                                  Text(
                                    '发现世界的美好',
                                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                      color: AppColors.mutedForeground,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const GlassCardSmall(
                              width: 60,
                              height: 60,
                              margin: EdgeInsets.zero,
                              child: Icon(
                                Icons.place,
                                size: 32,
                                color: AppColors.travelBlue,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  
                  // Quick Actions
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '快速预订',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        Column(
                          children: [
                            Row(
                              children: [
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.flight,
                                    title: '机票',
                                    color: AppColors.travelBlue,
                                    onTap: () => Navigator.pushNamed(context, AppRouter.transport),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.hotel,
                                    title: '酒店',
                                    color: AppColors.travelGreen,
                                    onTap: () => Navigator.pushNamed(context, AppRouter.hotel),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Row(
                              children: [
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.directions_car,
                                    title: '租车',
                                    color: AppColors.travelOrange,
                                    onTap: () => Navigator.pushNamed(context, AppRouter.transport),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.restaurant,
                                    title: '美食',
                                    color: AppColors.travelPurple,
                                    onTap: () => Navigator.pushNamed(context, AppRouter.food),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  
                  // Featured Destinations
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '热门目的地',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        SizedBox(
                          height: 120,
                          child: ListView(
                            scrollDirection: Axis.horizontal,
                            children: [
                              _buildDestinationCard(
                                context,
                                title: '北京',
                                subtitle: '历史文化名城',
                                gradient: AppColors.blueGradient,
                              ),
                              _buildDestinationCard(
                                context,
                                title: '上海',
                                subtitle: '国际化大都市',
                                gradient: AppColors.greenGradient,
                              ),
                              _buildDestinationCard(
                                context,
                                title: '杭州',
                                subtitle: '人间天堂',
                                gradient: AppColors.orangeGradient,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  // Recent Activity
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '最近活动',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        _buildActivityItem(
                          context,
                          icon: Icons.bookmark,
                          title: '收藏了"西湖十景"',
                          subtitle: '2小时前',
                          color: AppColors.travelBlue,
                        ),
                        const Divider(color: AppColors.border),
                        _buildActivityItem(
                          context,
                          icon: Icons.calendar_month,
                          title: '创建了行程计划',
                          subtitle: '昨天',
                          color: AppColors.travelGreen,
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          // Bottom Navigation
          const BottomNavigation(currentIndex: 0),
        ],
      ),
    );
  }

  Widget _buildQuickActionCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GlassCardSmall(
      margin: EdgeInsets.zero,
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 28,
            color: color,
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: Theme.of(context).textTheme.labelLarge,
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildDestinationCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required LinearGradient gradient,
  }) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, AppRouter.destination),
      child: Container(
        width: 200,
        margin: const EdgeInsets.only(right: 12),
        decoration: BoxDecoration(
          gradient: gradient,
          borderRadius: BorderRadius.circular(AppConstants.radiusSm),
          border: Border.all(
            color: AppColors.border,
            width: 1,
          ),
        ),
        child: Stack(
          children: [
            Positioned(
              bottom: 12,
              left: 12,
              right: 12,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: const Color(0xCCFFFFFF),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
  }) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          GlassCardSmall(
            width: 40,
            height: 40,
            margin: EdgeInsets.zero,
            padding: const EdgeInsets.all(8),
            child: Icon(
              icon,
              size: 20,
              color: color,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.labelLarge,
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
