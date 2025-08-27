import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/widgets/status_bar.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key});

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
                  onTap: () => Navigator.maybePop(context),
                  child: const Icon(
                    Icons.arrow_back,
                    size: 24,
                    color: AppColors.foreground,
                  ),
                ),
                const SizedBox(width: 12),
                Text(
                  '我的订单',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                const Icon(
                  Icons.search,
                  size: 24,
                  color: AppColors.foreground,
                ),
                const SizedBox(width: 12),
                const Icon(
                  Icons.more_horiz,
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
                  // Order Status Tabs
                  GlassCard(
                    child: Row(
                      children: [
                        Expanded(
                          child: _buildStatusTab(
                            context,
                            icon: Icons.access_time,
                            label: '待付款',
                            count: 1,
                            color: AppColors.travelOrange,
                            isActive: true,
                          ),
                        ),
                        Expanded(
                          child: _buildStatusTab(
                            context,
                            icon: Icons.pending_actions,
                            label: '待确认',
                            count: 0,
                            color: AppColors.mutedForeground,
                            isActive: false,
                          ),
                        ),
                        Expanded(
                          child: _buildStatusTab(
                            context,
                            icon: Icons.flight_takeoff,
                            label: '待出行',
                            count: 2,
                            color: AppColors.travelGreen,
                            isActive: false,
                          ),
                        ),
                        Expanded(
                          child: _buildStatusTab(
                            context,
                            icon: Icons.star,
                            label: '待评价',
                            count: 0,
                            color: AppColors.mutedForeground,
                            isActive: false,
                          ),
                        ),
                      ],
                    ),
                  ),
                  
                  // Order List
                  _buildOrderCard(
                    context,
                    type: '机票订单',
                    icon: Icons.flight,
                    iconColor: AppColors.travelBlue,
                    status: '待付款',
                    statusColor: AppColors.travelOrange,
                    title: '上海 → 杭州',
                    subtitle: '东方航空 MU5137',
                    detail: '4月15日 08:30-09:45',
                    price: '¥428',
                    priceColor: AppColors.travelOrange,
                    priceSubtitle: '经济舱',
                    orderNumber: 'TK202404150001',
                    actions: [
                      {'text': '取消订单', 'isPrimary': false},
                      {'text': '立即付款', 'isPrimary': true},
                    ],
                  ),
                  
                  _buildOrderCard(
                    context,
                    type: '酒店订单',
                    icon: Icons.hotel,
                    iconColor: AppColors.travelGreen,
                    status: '已确认',
                    statusColor: AppColors.travelGreen,
                    title: '杭州西湖国宾馆',
                    subtitle: '豪华大床房',
                    detail: '4月15日-4月17日 (2晚)',
                    price: '¥1,376',
                    priceColor: AppColors.travelGreen,
                    priceSubtitle: '含早餐',
                    orderNumber: 'HT202404150002',
                    actions: [
                      {'text': '查看详情', 'isPrimary': false},
                      {'text': '联系酒店', 'isPrimary': true},
                    ],
                  ),
                  
                  _buildOrderCard(
                    context,
                    type: '火车票订单',
                    icon: Icons.train,
                    iconColor: AppColors.travelPurple,
                    status: '已完成',
                    statusColor: AppColors.mutedForeground,
                    title: '北京 → 上海',
                    subtitle: 'G103 二等座',
                    detail: '3月28日 08:00-12:28',
                    price: '¥553',
                    priceColor: AppColors.mutedForeground,
                    priceSubtitle: '已出行',
                    orderNumber: 'TR202403280003',
                    actions: [
                      {'text': '再次购买', 'isPrimary': false},
                      {'text': '评价服务', 'isPrimary': true},
                    ],
                  ),
                  
                  // Order Statistics
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '订单统计',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildStatItem(
                                context,
                                icon: Icons.shopping_bag,
                                value: '12',
                                label: '总订单',
                                color: AppColors.travelBlue,
                              ),
                            ),
                            Expanded(
                              child: _buildStatItem(
                                context,
                                icon: Icons.check_circle,
                                value: '9',
                                label: '已完成',
                                color: AppColors.travelGreen,
                              ),
                            ),
                            Expanded(
                              child: _buildStatItem(
                                context,
                                icon: Icons.account_balance_wallet,
                                value: '¥8,642',
                                label: '总消费',
                                color: AppColors.travelOrange,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  
                  // Quick Services
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '快捷服务',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildServiceCard(
                                context,
                                icon: Icons.headset_mic,
                                title: '客服中心',
                                subtitle: '在线咨询',
                                color: AppColors.travelBlue,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildServiceCard(
                                context,
                                icon: Icons.description,
                                title: '退改政策',
                                subtitle: '查看规则',
                                color: AppColors.travelGreen,
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
          ),
          
          // Bottom Navigation
          const BottomNavigation(currentIndex: 3),
        ],
      ),
    );
  }

  Widget _buildStatusTab(
    BuildContext context, {
    required IconData icon,
    required String label,
    required int count,
    required Color color,
    required bool isActive,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: isActive ? AppColors.travelBlue : Colors.transparent,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
      ),
      child: Column(
        children: [
          Icon(
            icon,
            size: 20,
            color: isActive ? AppColors.foreground : color,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: Theme.of(context).textTheme.bodySmall?.copyWith(
              color: isActive ? AppColors.foreground : color,
              fontWeight: isActive ? FontWeight.w500 : FontWeight.w400,
            ),
          ),
          if (count > 0) ...[
            const SizedBox(height: 4),
            Container(
              width: 16,
              height: 16,
              decoration: BoxDecoration(
                color: isActive ? AppColors.travelOrange : color,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Center(
                child: Text(
                  '$count',
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w600,
                    fontSize: 10,
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildOrderCard(
    BuildContext context, {
    required String type,
    required IconData icon,
    required Color iconColor,
    required String status,
    required Color statusColor,
    required String title,
    required String subtitle,
    required String detail,
    required String price,
    required Color priceColor,
    required String priceSubtitle,
    required String orderNumber,
    required List<Map<String, dynamic>> actions,
  }) {
    return GlassCard(
      child: Column(
        children: [
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    icon,
                    size: 16,
                    color: iconColor,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    type,
                    style: Theme.of(context).textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  status,
                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(color: AppColors.border, height: 1),
          const SizedBox(height: 12),
          
          // Content
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [iconColor, iconColor.withValues(alpha: 0.7)],
                  ),
                  borderRadius: BorderRadius.circular(AppConstants.radiusSm),
                ),
                child: Icon(
                  icon,
                  size: 28,
                  color: AppColors.foreground,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: Theme.of(context).textTheme.labelMedium?.copyWith(
                        color: AppColors.mutedForeground,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      detail,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  Text(
                    price,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                      color: priceColor,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    priceSubtitle,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          
          // Footer
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '订单号: $orderNumber',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: actions.map((action) {
                  final isPrimary = action['isPrimary'] as bool;
                  return ElevatedButton(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('${action['text']} 功能开发中...')),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isPrimary 
                        ? statusColor 
                        : AppColors.secondary,
                      foregroundColor: AppColors.foreground,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 6,
                      ),
                      textStyle: Theme.of(context).textTheme.bodySmall,
                    ),
                    child: Text(action['text'] as String),
                  );
                }).toList(),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(
    BuildContext context, {
    required IconData icon,
    required String value,
    required String label,
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
          value,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }

  Widget _buildServiceCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
  }) {
    return GlassCardSmall(
      margin: EdgeInsets.zero,
      child: Column(
        children: [
          Icon(
            icon,
            size: 24,
            color: color,
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: Theme.of(context).textTheme.labelLarge?.copyWith(
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    );
  }
}
