import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/components/status_bar.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class PlanningPage extends StatelessWidget {
  const PlanningPage({super.key});

  @override
  Widget build(BuildContext context) {
    return ResponsiveMobileContainer(
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Column(
          children: [
            const CustomStatusBar(),
            _buildHeader(context),
            Expanded(
              child: _buildContent(),
            ),
            const BottomNavigation(currentIndex: -1), // No specific index for planning
          ],
        ),
      ),
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Container(
      height: 60,
      decoration: const BoxDecoration(
        color: AppColors.card,
        border: Border(
          bottom: BorderSide(
            color: AppColors.border,
            width: 1,
          ),
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: AppConstants.contentPadding),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: <Widget>[
                GestureDetector(
                  onTap: () => Navigator.of(context).pop(),
                  child: const Icon(
                    Icons.arrow_back,
                    color: AppColors.foreground,
                    size: 24,
                  ),
                ),
                const SizedBox(width: 12),
                const Text(
                  '行程规划',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: AppColors.foreground,
                  ),
                ),
              ],
            ),
            const Row(
              children: <Widget>[
                Icon(
                  Icons.calendar_today,
                  color: AppColors.foreground,
                  size: 24,
                ),
                SizedBox(width: 12),
                Icon(
                  Icons.more_horiz,
                  color: AppColors.foreground,
                  size: 24,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppConstants.contentPadding),
      child: Column(
        children: [
          _buildTripHeader(),
          const SizedBox(height: 16),
          _buildDay1(),
          const SizedBox(height: 16),
          _buildDay2(),
          const SizedBox(height: 16),
          _buildDay3(),
          const SizedBox(height: 16),
          _buildQuickActions(),
          const SizedBox(height: 16),
          _buildTips(),
        ],
      ),
    );
  }

  Widget _buildTripHeader() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    '杭州3日游',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  SizedBox(height: 8),
                  Text(
                    '2024年4月15日 - 4月17日',
                    style: TextStyle(
                      fontSize: 16,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.card,
                  borderRadius: BorderRadius.circular(AppConstants.radiusSm),
                  border: Border.all(color: AppColors.border),
                ),
                child: const Text(
                  '● 进行中',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppColors.travelGreen,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  _buildStatItem('总天数', '3天'),
                  const SizedBox(width: 16),
                  _buildStatItem('预算', '¥1,200'),
                  const SizedBox(width: 16),
                  _buildStatItem('景点', '8个'),
                ],
              ),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.edit, size: 16),
                label: const Text('编辑'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.primaryForeground,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            color: AppColors.mutedForeground,
          ),
        ),
        Text(
          value,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: AppColors.foreground,
          ),
        ),
      ],
    );
  }

  Widget _buildDay1() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            children: <Widget>[
              Container(
                width: 32,
                height: 32,
                decoration: const BoxDecoration(
                  color: AppColors.travelBlue,
                  shape: BoxShape.circle,
                ),
                child: const Center(
                  child: Text(
                    '1',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w600,
                      fontSize: 14,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text(
                    '第一天',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  Text(
                    '4月15日 周一',
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.only(left: 24),
            child: Column(
              children: <Widget>[
                _buildTimelineItem(
                  time: '09:00',
                  title: '西湖风景区',
                  subtitle: '断桥残雪、苏堤春晓',
                  duration: '预计游玩 3小时',
                  icon: Icons.schedule,
                  color: AppColors.travelBlue,
                ),
                const SizedBox(height: 20),
                _buildTimelineItem(
                  time: '12:30',
                  title: '楼外楼',
                  subtitle: '品尝正宗杭帮菜',
                  duration: '午餐时间',
                  icon: Icons.restaurant,
                  color: AppColors.travelGreen,
                ),
                const SizedBox(height: 20),
                _buildTimelineItem(
                  time: '14:00',
                  title: '雷峰塔',
                  subtitle: '登塔俯瞰西湖全景',
                  duration: '预计游玩 2小时',
                  icon: Icons.landscape,
                  color: AppColors.travelOrange,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTimelineItem({
    required String time,
    required String title,
    required String subtitle,
    required String duration,
    required IconData icon,
    required Color color,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Column(
          children: [
            Container(
              width: 12,
              height: 12,
              decoration: BoxDecoration(
                color: color,
                shape: BoxShape.circle,
                border: Border.all(color: Colors.white, width: 2),
              ),
            ),
            if (duration != '预计游玩 2小时') // Don't show line after last item
              Container(
                width: 2,
                height: 40,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [color, AppColors.travelGreen],
                  ),
                ),
              ),
          ],
        ),
        const SizedBox(width: 12),
        Expanded(
          child: GlassCardSmall(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            title,
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: AppColors.foreground,
                            ),
                          ),
                          Text(
                            subtitle,
                            style: const TextStyle(
                              fontSize: 14,
                              color: AppColors.mutedForeground,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Text(
                      time,
                      style: const TextStyle(
                        fontSize: 12,
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: <Widget>[
                    Icon(
                      icon,
                      size: 14,
                      color: AppColors.mutedForeground,
                    ),
                    const SizedBox(width: 8),
                    Text(
                      duration,
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppColors.mutedForeground,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildDay2() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    width: 32,
                    height: 32,
                    decoration: const BoxDecoration(
                      color: AppColors.travelGreen,
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child:                       Text(
                        '2',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        '第二天',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        '4月16日 周二',
                        style: TextStyle(
                          fontSize: 14,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const Icon(
                Icons.keyboard_arrow_down,
                color: AppColors.mutedForeground,
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.secondary,
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
            child: Row(
              children: <Widget>[
                const Icon(
                  Icons.place,
                  size: 20,
                  color: AppColors.travelGreen,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const Text(
                        '灵隐寺 → 龙井茶园 → 宋城',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        '3个景点，预计游玩8小时',
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppColors.mutedForeground,
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
    );
  }

  Widget _buildDay3() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    width: 32,
                    height: 32,
                    decoration: const BoxDecoration(
                      color: AppColors.travelOrange,
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child: Text(
                        '3',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const Text(
                        '第三天',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        '4月17日 周三',
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const Icon(
                Icons.keyboard_arrow_down,
                color: AppColors.mutedForeground,
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppColors.secondary,
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
            child: Row(
              children: <Widget>[
                const Icon(
                  Icons.shopping_bag,
                  size: 20,
                  color: AppColors.travelOrange,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const Text(
                        '河坊街 → 南宋御街',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        '购物休闲，下午返程',
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppColors.mutedForeground,
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
    );
  }

  Widget _buildQuickActions() {
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '快捷操作',
                          style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: <Widget>[
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.share, size: 16),
                  label: const Text('分享行程'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryForeground,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.download, size: 16),
                  label: const Text('导出PDF'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: AppColors.primaryForeground,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTips() {
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: <Widget>[
              const Icon(
                Icons.lightbulb,
                size: 20,
                color: AppColors.travelBlue,
              ),
              const SizedBox(width: 12),
              const Text(
                '贴心提醒',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                  color: AppColors.foreground,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                '• 建议提前预订雷峰塔门票，避免排队',
                style: const TextStyle(
                  fontSize: 14,
                  color: AppColors.mutedForeground,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                '• 龙井茶园最佳参观时间为上午9-11点',
                style: const TextStyle(
                  fontSize: 14,
                  color: AppColors.mutedForeground,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                '• 记得带好身份证和充电宝',
                style: const TextStyle(
                  fontSize: 14,
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
