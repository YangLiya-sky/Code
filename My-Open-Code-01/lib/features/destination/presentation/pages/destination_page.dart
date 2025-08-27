import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/widgets/status_bar.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class DestinationPage extends StatelessWidget {
  const DestinationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveMobileContainer(
      child: Column(
        children: [
          // Status Bar
          const CustomStatusBar(),
          
          // Hero Section with Header
          Container(
            height: 200,
            decoration: const BoxDecoration(
              gradient: AppColors.blueGradient,
            ),
            child: Stack(
              children: [
                // Header
                Positioned(
                  top: 12,
                  left: 0,
                  right: 0,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppConstants.contentPadding,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () => Navigator.pushNamed(context, '/home'),
                          child: Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: const Color(0x4D000000),
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: const Icon(
                              Icons.arrow_back,
                              size: 24,
                              color: AppColors.foreground,
                            ),
                          ),
                        ),
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: const Color(0x4D000000),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Icon(
                                Icons.share,
                                size: 24,
                                color: AppColors.foreground,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: const Color(0x4D000000),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: const Icon(
                                Icons.favorite_border,
                                size: 24,
                                color: AppColors.foreground,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                // Destination Info
                Positioned(
                  bottom: 20,
                  left: 20,
                  right: 20,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '杭州西湖',
                        style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: AppColors.foreground,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          const Icon(
                            Icons.place,
                            size: 16,
                            color: Color(0xCCFFFFFF),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            '浙江省杭州市',
                            style: Theme.of(context).textTheme.labelMedium?.copyWith(
                              color: const Color(0xCCFFFFFF),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
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
              child: Transform.translate(
                offset: const Offset(0, -40),
                child: Column(
                  children: [
                    // Info Card
                    GlassCard(
                      child: Column(
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  const Icon(
                                    Icons.star,
                                    size: 16,
                                    color: Color(0xFFFFC107),
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    '4.8',
                                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    '(2.3k 评价)',
                                    style: Theme.of(context).textTheme.bodySmall,
                                  ),
                                ],
                              ),
                              Row(
                                children: [
                                  const Icon(
                                    Icons.visibility,
                                    size: 16,
                                    color: AppColors.mutedForeground,
                                  ),
                                  const SizedBox(width: 4),
                                  Text(
                                    '今日 1.2k 人浏览',
                                    style: Theme.of(context).textTheme.bodySmall,
                                  ),
                                ],
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          Text(
                            '西湖，位于浙江省杭州市西湖区龙井路1号，杭州市区西部，景区总面积49平方千米，汇水面积21.22平方千米，湖面面积6.38平方千米。',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: AppColors.mutedForeground,
                              height: 1.6,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Row(
                            children: [
                              Expanded(
                                child: _buildInfoItem(
                                  context,
                                  icon: Icons.access_time,
                                  title: '游玩时长',
                                  value: '3-4小时',
                                  color: AppColors.travelBlue,
                                ),
                              ),
                              Expanded(
                                child: _buildInfoItem(
                                  context,
                                  icon: Icons.confirmation_number,
                                  title: '门票价格',
                                  value: '免费',
                                  color: AppColors.travelGreen,
                                ),
                              ),
                              Expanded(
                                child: _buildInfoItem(
                                  context,
                                  icon: Icons.calendar_month,
                                  title: '最佳时节',
                                  value: '四季皆宜',
                                  color: AppColors.travelOrange,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    
                    // Highlights
                    GlassCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '景点亮点',
                            style: Theme.of(context).textTheme.titleSmall,
                          ),
                          const SizedBox(height: 16),
                          _buildHighlightItem(
                            context,
                            text: '西湖十景：苏堤春晓、曲院风荷、平湖秋月等',
                            color: AppColors.travelBlue,
                          ),
                          const SizedBox(height: 12),
                          _buildHighlightItem(
                            context,
                            text: '世界文化遗产，国家5A级旅游景区',
                            color: AppColors.travelGreen,
                          ),
                          const SizedBox(height: 12),
                          _buildHighlightItem(
                            context,
                            text: '可乘坐游船欣赏湖光山色',
                            color: AppColors.travelOrange,
                          ),
                        ],
                      ),
                    ),
                    
                    // Photos
                    GlassCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '精彩照片',
                                style: Theme.of(context).textTheme.titleSmall,
                              ),
                              Text(
                                '查看全部 >',
                                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          SizedBox(
                            height: 120,
                            child: Row(
                              children: [
                                Expanded(
                                  flex: 2,
                                  child: Container(
                                    decoration: const BoxDecoration(
                                      gradient: AppColors.blueGradient,
                                      borderRadius: BorderRadius.all(
                                        Radius.circular(AppConstants.radiusSm),
                                      ),
                                    ),
                                    child: Stack(
                                      children: [
                                        Positioned(
                                          bottom: 8,
                                          left: 8,
                                          child: Container(
                                            padding: const EdgeInsets.symmetric(
                                              horizontal: 8,
                                              vertical: 4,
                                            ),
                                            decoration: BoxDecoration(
                                              color: const Color(0x80000000),
                                              borderRadius: BorderRadius.circular(12),
                                            ),
                                            child: Text(
                                              '断桥残雪',
                                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                                color: AppColors.foreground,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Column(
                                    children: [
                                      Expanded(
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            gradient: AppColors.greenGradient,
                                            borderRadius: BorderRadius.all(
                                              Radius.circular(AppConstants.radiusSm),
                                            ),
                                          ),
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      Expanded(
                                        child: Container(
                                          decoration: const BoxDecoration(
                                            gradient: AppColors.orangeGradient,
                                            borderRadius: BorderRadius.all(
                                              Radius.circular(AppConstants.radiusSm),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Actions
                    GlassCard(
                      child: Row(
                        children: [
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () {
                                Navigator.pushNamed(context, '/planning');
                              },
                              icon: const Icon(Icons.route, size: 20),
                              label: const Text('规划行程'),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: AppColors.travelBlue,
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: () {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(content: Text('正在打开地图导航...')),
                                );
                              },
                              icon: const Icon(Icons.navigation, size: 20),
                              label: const Text('导航前往'),
                            ),
                          ),
                        ],
                      ),
                    ),
                    
                    // Reviews
                    GlassCard(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                '游客评价',
                                style: Theme.of(context).textTheme.titleSmall,
                              ),
                              Text(
                                '查看全部 >',
                                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          _buildReviewItem(context),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
          
          // Bottom Navigation
          const BottomNavigation(currentIndex: 2),
        ],
      ),
    );
  }

  Widget _buildInfoItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String value,
    required Color color,
  }) {
    return Column(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(24),
          ),
          child: Icon(
            icon,
            size: 24,
            color: AppColors.foreground,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          title,
          style: Theme.of(context).textTheme.bodySmall,
          textAlign: TextAlign.center,
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
        ),
        const SizedBox(height: 2),
        Text(
          value,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
            fontWeight: FontWeight.w600,
          ),
          textAlign: TextAlign.center,
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
        ),
      ],
    );
  }

  Widget _buildHighlightItem(
    BuildContext context, {
    required String text,
    required Color color,
  }) {
    return Row(
      children: [
        Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Text(
            text,
            style: Theme.of(context).textTheme.labelMedium,
            overflow: TextOverflow.ellipsis,
            maxLines: 2,
          ),
        ),
      ],
    );
  }

  Widget _buildReviewItem(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(
          color: AppColors.border,
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Container(
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: AppColors.travelBlue,
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Center(
                      child: Text(
                        '张',
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                          color: AppColors.foreground,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    '张三',
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  const Icon(
                    Icons.star,
                    size: 14,
                    color: Color(0xFFFFC107),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    '5.0',
                    style: Theme.of(context).textTheme.labelMedium,
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            '西湖真的很美，特别是春天的时候，柳絮飞舞，湖光山色令人陶醉。建议早上去，人少景美。',
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
              color: AppColors.mutedForeground,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '2天前',
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
