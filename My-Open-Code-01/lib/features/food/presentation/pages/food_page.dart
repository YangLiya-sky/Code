import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/components/status_bar.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class FoodPage extends StatelessWidget {
  const FoodPage({super.key});

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
            const BottomNavigation(currentIndex: -1), // No specific index for food
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
              children: [
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
                  '美食推荐',
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
                  Icons.search,
                  color: AppColors.foreground,
                  size: 24,
                ),
                SizedBox(width: 12),
                Icon(
                  Icons.favorite_border,
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
          _buildLocationHeader(),
          const SizedBox(height: 16),
          _buildCategories(),
          const SizedBox(height: 16),
          _buildFeaturedRestaurant(),
          const SizedBox(height: 16),
          _buildRestaurantList(),
          const SizedBox(height: 16),
          _buildSpecialDishes(),
          const SizedBox(height: 16),
          _buildFoodMap(),
        ],
      ),
    );
  }

  Widget _buildLocationHeader() {
    return GlassCard(
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: const BoxDecoration(
              color: AppColors.travelOrange,
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.place,
              size: 24,
              color: Colors.white,
            ),
          ),
          const SizedBox(width: 12),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
                                Text(
                    '杭州美食',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w600,
                  color: AppColors.foreground,
                ),
              ),
              SizedBox(height: 8),
              Text(
                '发现地道杭帮菜',
                style: TextStyle(
                  fontSize: 16,
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCategories() {
    return GlassCard(
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            _buildCategoryTag('杭帮菜', Icons.restaurant, isSelected: true),
            const SizedBox(width: 8),
            _buildCategoryTag('茶餐厅', Icons.local_cafe),
            const SizedBox(width: 8),
            _buildCategoryTag('甜品店', Icons.cake),
            const SizedBox(width: 8),
            _buildCategoryTag('海鲜', Icons.set_meal),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryTag(String label, IconData icon, {bool isSelected = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.travelOrange : AppColors.primary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 16,
            color: AppColors.primaryForeground,
          ),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.primaryForeground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeaturedRestaurant() {
    return GlassCard(
      margin: EdgeInsets.zero,
      child: Stack(
        children: [
          Container(
            height: 160,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment(-0.707, -0.707),
                end: Alignment(0.707, 0.707),
                colors: [AppColors.travelOrange, AppColors.travelPurple],
              ),
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
          ),
          Positioned(
            top: 12,
            right: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.black.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                '今日推荐',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                ),
              ),
            ),
          ),
          Positioned(
            bottom: 16,
            left: 16,
            right: 16,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '楼外楼',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 4),
                const Text(
                  '百年老店 · 正宗杭帮菜',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(
                      Icons.star,
                      size: 14,
                      color: Colors.amber,
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      '4.8',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(width: 16),
                    Text(
                      '人均 ¥128',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.white.withValues(alpha: 0.8),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRestaurantList() {
    return Column(
      children: [
        _buildRestaurantCard(
          name: '知味观',
          rating: 4.6,
          cuisine: '杭帮菜',
          avgPrice: '¥85',
          distance: '0.8km',
          tags: ['招牌菜', '老字号'],
          isHot: true,
        ),
        const SizedBox(height: 16),
        _buildRestaurantCard(
          name: '外婆家',
          rating: 4.4,
          cuisine: '家常菜',
          avgPrice: '¥68',
          distance: '1.2km',
          tags: ['性价比高', '环境好'],
          isFavorite: true,
        ),
        const SizedBox(height: 16),
        _buildRestaurantCard(
          name: '西湖春天',
          rating: 4.7,
          cuisine: '精品杭菜',
          avgPrice: '¥168',
          distance: '2.1km',
          tags: ['高档餐厅', '湖景'],
        ),
      ],
    );
  }

  Widget _buildRestaurantCard({
    required String name,
    required double rating,
    required String cuisine,
    required String avgPrice,
    required String distance,
    required List<String> tags,
    bool isHot = false,
    bool isFavorite = false,
  }) {
    return GlassCard(
      margin: EdgeInsets.zero,
      child: Row(
        children: [
          Stack(
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    begin: Alignment(-0.707, -0.707),
                    end: Alignment(0.707, 0.707),
                    colors: [AppColors.travelBlue, AppColors.travelGreen],
                  ),
                  borderRadius: BorderRadius.circular(AppConstants.radiusSm),
                ),
              ),
              if (isHot)
                Positioned(
                  top: 4,
                  right: 4,
                  child: Container(
                    width: 16,
                    height: 16,
                    decoration: const BoxDecoration(
                      color: AppColors.travelOrange,
                      shape: BoxShape.circle,
                    ),
                    child: const Center(
                      child: Text(
                        '热',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 8,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            name,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: AppColors.foreground,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              const Icon(
                                Icons.star,
                                size: 12,
                                color: Colors.amber,
                              ),
                              const SizedBox(width: 2),
                              Text(
                                rating.toString(),
                                style: const TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.foreground,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                cuisine,
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                '人均$avgPrice',
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              const Icon(
                                Icons.place,
                                size: 12,
                                color: AppColors.mutedForeground,
                              ),
                              const SizedBox(width: 4),
                              Text(
                                '距离 $distance',
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: AppColors.mutedForeground,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Icon(
                      isFavorite ? Icons.favorite : Icons.favorite_border,
                      size: 20,
                      color: isFavorite ? AppColors.travelOrange : AppColors.mutedForeground,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 6,
                  children: tags.map((tag) => Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: tag == '招牌菜' ? AppColors.travelGreen : 
                             tag == '性价比高' ? AppColors.travelOrange :
                             tag == '高档餐厅' ? AppColors.travelPurple : AppColors.travelBlue,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      tag,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                      ),
                    ),
                  )).toList(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSpecialDishes() {
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '必尝美食',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 16),
          Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: _buildDishCard('西湖醋鱼', '酸甜可口', [AppColors.travelOrange, AppColors.travelPurple]),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _buildDishCard('龙井虾仁', '茶香清淡', [AppColors.travelGreen, AppColors.travelBlue]),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: _buildDishCard('东坡肉', '肥而不腻', [AppColors.travelBlue, AppColors.travelOrange]),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: _buildDishCard('叫化鸡', '香嫩入味', [AppColors.travelPurple, AppColors.travelGreen]),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDishCard(String name, String description, List<Color> colors) {
    return Container(
      height: 120,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: const Alignment(-0.707, -0.707),
                end: const Alignment(0.707, 0.707),
                colors: colors,
              ),
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            name,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
              color: AppColors.foreground,
            ),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
          ),
          const SizedBox(height: 2),
          Text(
            description,
            style: const TextStyle(
              fontSize: 10,
              color: AppColors.mutedForeground,
            ),
            textAlign: TextAlign.center,
            overflow: TextOverflow.ellipsis,
            maxLines: 1,
          ),
        ],
      ),
    );
  }

  Widget _buildFoodMap() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                '美食地图',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.foreground,
                ),
              ),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.map, size: 16),
                label: const Text('查看地图'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.primaryForeground,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Container(
            height: 120,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment(-0.707, -0.707),
                end: Alignment(0.707, 0.707),
                colors: [AppColors.travelBlue, AppColors.travelGreen],
              ),
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.place,
                    size: 32,
                    color: Colors.white,
                  ),
                  SizedBox(height: 8),
                  Text(
                    '发现附近美食',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  Text(
                    '128家餐厅等你探索',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
