import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/widgets/status_bar.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _recentSearches = ['杭州西湖', '北京故宫', '上海外滩'];
  final List<String> _filterTags = ['自然风光', '历史文化', '网红打卡', '美食天堂'];
  int _selectedFilterIndex = 0;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

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
                  '搜索目的地',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                const Icon(
                  Icons.filter_list,
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
                  // Search Bar
                  GlassCard(
                    child: TextField(
                      controller: _searchController,
                      decoration: const InputDecoration(
                        hintText: '搜索城市、景点、酒店...',
                        prefixIcon: Icon(
                          Icons.search,
                          color: AppColors.mutedForeground,
                        ),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.all(16),
                      ),
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                  ),
                  
                  // Filter Tags
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '热门筛选',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: _filterTags.asMap().entries.map((entry) {
                            final index = entry.key;
                            final tag = entry.value;
                            final isSelected = index == _selectedFilterIndex;
                            
                            return GestureDetector(
                              onTap: () {
                                setState(() {
                                  _selectedFilterIndex = index;
                                });
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 16,
                                  vertical: 8,
                                ),
                                decoration: BoxDecoration(
                                  color: isSelected 
                                    ? AppColors.travelBlue 
                                    : AppColors.secondary,
                                  borderRadius: BorderRadius.circular(
                                    AppConstants.radiusSm,
                                  ),
                                  border: Border.all(
                                    color: AppColors.border,
                                    width: 1,
                                  ),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(
                                      _getFilterIcon(index),
                                      size: 16,
                                      color: AppColors.foreground,
                                    ),
                                    const SizedBox(width: 4),
                                    Text(
                                      tag,
                                      style: Theme.of(context).textTheme.labelMedium,
                                    ),
                                  ],
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),
                  
                  // Popular Searches
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '热门搜索',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 16),
                        ..._buildPopularSearchItems(),
                      ],
                    ),
                  ),
                  
                  // Recent Searches
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '最近搜索',
                              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            GestureDetector(
                              onTap: () {
                                setState(() {
                                  _recentSearches.clear();
                                });
                              },
                              child: Text(
                                '清除',
                                style: Theme.of(context).textTheme.labelMedium?.copyWith(
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        if (_recentSearches.isNotEmpty)
                          Wrap(
                            spacing: 8,
                            runSpacing: 8,
                            children: _recentSearches.map((search) {
                              return Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 8,
                                ),
                                decoration: BoxDecoration(
                                  color: AppColors.secondary,
                                  borderRadius: BorderRadius.circular(
                                    AppConstants.radiusSm,
                                  ),
                                  border: Border.all(
                                    color: AppColors.border,
                                    width: 1,
                                  ),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Text(
                                      search,
                                      style: Theme.of(context).textTheme.labelMedium,
                                    ),
                                    const SizedBox(width: 8),
                                    GestureDetector(
                                      onTap: () {
                                        setState(() {
                                          _recentSearches.remove(search);
                                        });
                                      },
                                      child: const Icon(
                                        Icons.close,
                                        size: 14,
                                        color: AppColors.mutedForeground,
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }).toList(),
                          )
                        else
                          Text(
                            '暂无搜索记录',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                      ],
                    ),
                  ),
                  
                  // Suggestions
                  GlassCard(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '为你推荐',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildSuggestionCard(
                                icon: Icons.wb_sunny,
                                title: '春季赏花',
                                subtitle: '樱花、桃花盛开',
                                color: AppColors.travelBlue,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildSuggestionCard(
                                icon: Icons.waves,
                                title: '海滨度假',
                                subtitle: '阳光沙滩海浪',
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
          const BottomNavigation(currentIndex: 1),
        ],
      ),
    );
  }

  IconData _getFilterIcon(int index) {
    switch (index) {
      case 0:
        return Icons.landscape;
      case 1:
        return Icons.account_balance;
      case 2:
        return Icons.camera_alt;
      case 3:
        return Icons.restaurant;
      default:
        return Icons.star;
    }
  }

  List<Widget> _buildPopularSearchItems() {
    final popularItems = [
      {'title': '三亚', 'subtitle': '海南省 · 热带海滨城市', 'rank': 1, 'color': AppColors.travelBlue},
      {'title': '丽江', 'subtitle': '云南省 · 古城风情', 'rank': 2, 'color': AppColors.travelGreen},
      {'title': '西安', 'subtitle': '陕西省 · 千年古都', 'rank': 3, 'color': AppColors.travelOrange},
    ];

    return popularItems.map((item) {
      return Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: AppColors.secondary,
          borderRadius: BorderRadius.circular(AppConstants.radiusSm),
          border: Border.all(
            color: AppColors.border,
            width: 1,
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: item['color'] as Color,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Center(
                child: Text(
                  '${item['rank']}',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: AppColors.foreground,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item['title'] as String,
                    style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    item['subtitle'] as String,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
            const Icon(
              Icons.trending_up,
              size: 16,
              color: AppColors.travelGreen,
            ),
          ],
        ),
      );
    }).toList();
  }

  Widget _buildSuggestionCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
  }) {
    return Container(
      height: 120,
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
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(
              icon,
              size: 20,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: Theme.of(context).textTheme.labelMedium?.copyWith(
              fontWeight: FontWeight.w500,
            ),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: Theme.of(context).textTheme.bodySmall,
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            maxLines: 2,
          ),
        ],
      ),
    );
  }
}
