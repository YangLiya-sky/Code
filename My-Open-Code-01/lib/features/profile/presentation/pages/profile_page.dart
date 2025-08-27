import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/widgets/status_bar.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';
import '../../../../core/routing/app_router.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool _notificationsEnabled = true;

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
              children: [
                GestureDetector(
                  onTap: () => Navigator.pushNamed(context, AppRouter.home),
                  child: const Icon(
                    Icons.arrow_back,
                    size: 24,
                    color: AppColors.foreground,
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  '个人中心',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                const Icon(
                  Icons.settings,
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
                  // Profile Header
                  GlassCard(
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Stack(
                              children: [
                                Container(
                                  width: 80,
                                  height: 80,
                                  decoration: BoxDecoration(
                                    gradient: AppColors.blueGradient,
                                    borderRadius: BorderRadius.circular(
                                      AppConstants.radiusSm,
                                    ),
                                    border: Border.all(
                                      color: AppColors.border,
                                      width: 1,
                                    ),
                                  ),
                                  child: Center(
                                    child: Text(
                                      '张',
                                      style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.foreground,
                                      ),
                                    ),
                                  ),
                                ),
                                Positioned(
                                  bottom: -4,
                                  right: -4,
                                  child: Container(
                                    width: 24,
                                    height: 24,
                                    decoration: BoxDecoration(
                                      color: AppColors.travelGreen,
                                      borderRadius: BorderRadius.circular(12),
                                      border: Border.all(
                                        color: AppColors.border,
                                        width: 2,
                                      ),
                                    ),
                                    child: const Icon(
                                      Icons.camera_alt,
                                      size: 12,
                                      color: AppColors.foreground,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    '张小明',
                                    style: Theme.of(context).textTheme.titleLarge,
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '旅行达人 · 已游览 15 个城市',
                                    style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                      color: AppColors.mutedForeground,
                                    ),
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      const Icon(
                                        Icons.star,
                                        size: 16,
                                        color: AppColors.travelOrange,
                                      ),
                                      const SizedBox(width: 4),
                                      Text(
                                        '4.8',
                                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                      const SizedBox(width: 8),
                                      Container(
                                        width: 1,
                                        height: 12,
                                        color: AppColors.border,
                                      ),
                                      const SizedBox(width: 8),
                                      Text(
                                        'VIP会员',
                                        style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                          color: AppColors.mutedForeground,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        // Stats
                        Row(
                          children: [
                            Expanded(
                              child: _buildStatCard(
                                context,
                                value: '15',
                                label: '已游城市',
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildStatCard(
                                context,
                                value: '32',
                                label: '收藏景点',
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildStatCard(
                                context,
                                value: '8',
                                label: '旅行计划',
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
                          '快捷功能',
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
                                    icon: Icons.receipt_long,
                                    title: '我的订单',
                                    subtitle: '查看订单',
                                    color: AppColors.travelBlue,
                                    onTap: () => Navigator.pushNamed(context, AppRouter.orders),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.favorite,
                                    title: '我的收藏',
                                    subtitle: '32个景点',
                                    color: AppColors.travelGreen,
                                    onTap: () {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text('收藏功能开发中...')),
                                      );
                                    },
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
                                    icon: Icons.map,
                                    title: '旅行足迹',
                                    subtitle: '15个城市',
                                    color: AppColors.travelOrange,
                                    onTap: () {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text('旅行足迹功能开发中...')),
                                      );
                                    },
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: _buildQuickActionCard(
                                    context,
                                    icon: Icons.card_giftcard,
                                    title: '积分商城',
                                    subtitle: '1,280积分',
                                    color: AppColors.travelPurple,
                                    onTap: () {
                                      ScaffoldMessenger.of(context).showSnackBar(
                                        const SnackBar(content: Text('积分商城功能开发中...')),
                                      );
                                    },
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  
                  // Account Settings
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '账户设置',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        _buildMenuItem(
                          context,
                          icon: Icons.person,
                          title: '个人信息',
                          color: AppColors.travelBlue,
                        ),
                        _buildMenuItem(
                          context,
                          icon: Icons.security,
                          title: '安全设置',
                          color: AppColors.travelGreen,
                        ),
                        _buildMenuItem(
                          context,
                          icon: Icons.credit_card,
                          title: '支付管理',
                          color: AppColors.travelOrange,
                        ),
                        _buildNotificationMenuItem(context),
                      ],
                    ),
                  ),
                  
                  // Travel Preferences
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '旅行偏好',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            _buildPreferenceTag('文化古迹', AppColors.travelBlue),
                            _buildPreferenceTag('自然风光', AppColors.travelGreen),
                            _buildPreferenceTag('美食体验', AppColors.travelOrange),
                            _buildPreferenceTag('购物娱乐', AppColors.travelPurple),
                          ],
                        ),
                        const SizedBox(height: 16),
                        _buildPreferenceItem('预算范围', '¥2000 - ¥5000'),
                        const SizedBox(height: 12),
                        _buildPreferenceItem('出行方式', '自由行'),
                      ],
                    ),
                  ),
                  
                  // Help & Support
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '帮助与支持',
                          style: Theme.of(context).textTheme.titleSmall,
                        ),
                        const SizedBox(height: 16),
                        _buildMenuItem(
                          context,
                          icon: Icons.help_center,
                          title: '帮助中心',
                          color: AppColors.travelBlue,
                        ),
                        _buildMenuItem(
                          context,
                          icon: Icons.chat,
                          title: '在线客服',
                          color: AppColors.travelGreen,
                          hasIndicator: true,
                        ),
                        _buildMenuItem(
                          context,
                          icon: Icons.info,
                          title: '关于我们',
                          color: AppColors.travelOrange,
                          isLast: true,
                        ),
                      ],
                    ),
                  ),
                  
                  // Logout Button
                  GlassCard(
                    margin: const EdgeInsets.fromLTRB(12, 12, 12, 100),
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          _showLogoutDialog(context);
                        },
                        icon: const Icon(Icons.logout, size: 20),
                        label: const Text('退出登录'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0x33EF4444),
                          foregroundColor: const Color(0xFFFF6B6B),
                          side: const BorderSide(
                            color: Color(0x4DEF4444),
                            width: 1,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          
          // Bottom Navigation
          const BottomNavigation(currentIndex: 4),
        ],
      ),
    );
  }

  Widget _buildStatCard(
    BuildContext context, {
    required String value,
    required String label,
  }) {
    return GlassCardSmall(
      margin: EdgeInsets.zero,
      child: Column(
        children: [
          Text(
            value,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActionCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 80,
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.card,
          borderRadius: BorderRadius.circular(AppConstants.radiusSm),
          border: Border.all(
            color: AppColors.border,
            width: 1,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: color,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(
                icon,
                size: 18,
                color: AppColors.foreground,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                fontWeight: FontWeight.w500,
              ),
              overflow: TextOverflow.ellipsis,
              maxLines: 1,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required Color color,
    bool hasIndicator = false,
    bool isLast = false,
  }) {
    return Container(
      decoration: BoxDecoration(
        border: !isLast
          ? const Border(
              bottom: BorderSide(
                color: AppColors.border,
                width: 1,
              ),
            )
          : null,
      ),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: Icon(
          icon,
          size: 20,
          color: color,
        ),
        title: Text(
          title,
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (hasIndicator) ...[
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: AppColors.travelGreen,
                  borderRadius: BorderRadius.circular(4),
                ),
              ),
              const SizedBox(width: 8),
            ],
            const Icon(
              Icons.chevron_right,
              size: 20,
              color: AppColors.mutedForeground,
            ),
          ],
        ),
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('$title 功能开发中...')),
          );
        },
      ),
    );
  }

  Widget _buildNotificationMenuItem(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: AppColors.border,
            width: 1,
          ),
        ),
      ),
      child: ListTile(
        contentPadding: EdgeInsets.zero,
        leading: const Icon(
          Icons.notifications,
          size: 20,
          color: AppColors.travelPurple,
        ),
        title: Text(
          '消息通知',
          style: Theme.of(context).textTheme.bodyLarge,
        ),
        trailing: GestureDetector(
          onTap: () {
            setState(() {
              _notificationsEnabled = !_notificationsEnabled;
            });
          },
          child: Container(
            width: 44,
            height: 24,
            decoration: BoxDecoration(
              color: _notificationsEnabled 
                ? AppColors.travelGreen 
                : const Color(0x33FFFFFF),
              borderRadius: BorderRadius.circular(12),
            ),
            child: AnimatedAlign(
              alignment: _notificationsEnabled 
                ? Alignment.centerRight 
                : Alignment.centerLeft,
              duration: AppConstants.fastAnimation,
              child: Container(
                width: 20,
                height: 20,
                margin: const EdgeInsets.all(2),
                decoration: BoxDecoration(
                  color: AppColors.foreground,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPreferenceTag(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Text(
        text,
        style: Theme.of(context).textTheme.bodySmall?.copyWith(
          color: AppColors.foreground,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }

  Widget _buildPreferenceItem(String title, String value) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.labelMedium,
        ),
        Text(
          value,
          style: Theme.of(context).textTheme.labelMedium?.copyWith(
            color: AppColors.mutedForeground,
          ),
        ),
      ],
    );
  }

  void _showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: AppColors.card,
        title: Text(
          '退出登录',
          style: Theme.of(context).textTheme.titleMedium,
        ),
        content: Text(
          '确定要退出登录吗？',
          style: Theme.of(context).textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              '取消',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: AppColors.mutedForeground,
              ),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.pushReplacementNamed(context, AppRouter.splash);
            },
            child: Text(
              '确定',
              style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: const Color(0xFFFF6B6B),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
