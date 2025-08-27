import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/components/status_bar.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class HotelPage extends StatelessWidget {
  const HotelPage({super.key});

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
            const BottomNavigation(currentIndex: -1), // No specific index for hotel
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
                  '酒店预订',
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
                  Icons.map,
                  color: AppColors.foreground,
                  size: 24,
                ),
                SizedBox(width: 12),
                Icon(
                  Icons.filter_list,
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
          _buildSearchForm(),
          const SizedBox(height: 16),
          _buildFilterTags(),
          const SizedBox(height: 16),
          _buildHotelList(),
          const SizedBox(height: 16),
          _buildLoadMore(),
        ],
      ),
    );
  }

  Widget _buildSearchForm() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            children: [
              Expanded(
                child: _buildInputField('目的地', '杭州'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildInputField('入住日期', '4月15日'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildInputField('退房日期', '4月17日'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildInputField('房间/客人', '1间 2客人'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInputField(String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 12,
            color: AppColors.mutedForeground,
          ),
        ),
        const SizedBox(height: 4),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppColors.input,
            border: Border.all(color: AppColors.border),
            borderRadius: BorderRadius.circular(AppConstants.radiusSm),
          ),
          child: Text(
            value,
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.foreground,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFilterTags() {
    return GlassCard(
      child: Wrap(
        spacing: 8,
        runSpacing: 8,
        children: [
          _buildFilterTag('价格优先', isSelected: true),
          _buildFilterTag('距离优先'),
          _buildFilterTag('评分优先'),
          _buildFilterTagWithIcon('免费WiFi', Icons.wifi),
        ],
      ),
    );
  }

  Widget _buildFilterTag(String label, {bool isSelected = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.travelBlue : AppColors.primary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: 12,
          color: AppColors.primaryForeground,
        ),
      ),
    );
  }

  Widget _buildFilterTagWithIcon(String label, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            icon,
            size: 12,
            color: AppColors.primaryForeground,
          ),
          const SizedBox(width: 4),
          Text(
            label,
            style: const TextStyle(
              fontSize: 12,
              color: AppColors.primaryForeground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHotelList() {
    return Column(
      children: [
        _buildHotelCard(
          name: '杭州西湖国宾馆',
          rating: 4.8,
          distance: '距西湖 0.5km',
          price: '¥688',
          tags: ['免费WiFi', '免费早餐'],
          isRecommended: true,
        ),
        const SizedBox(height: 16),
        _buildHotelCard(
          name: '杭州凯悦酒店',
          rating: 4.6,
          distance: '距西湖 1.2km',
          price: '¥528',
          tags: ['免费WiFi', '健身房'],
        ),
        const SizedBox(height: 16),
        _buildHotelCard(
          name: '如家酒店(西湖店)',
          rating: 4.2,
          distance: '距西湖 0.8km',
          price: '¥268',
          tags: ['免费WiFi', '经济实惠'],
        ),
      ],
    );
  }

  Widget _buildHotelCard({
    required String name,
    required double rating,
    required String distance,
    required String price,
    required List<String> tags,
    bool isRecommended = false,
  }) {
    return GlassCard(
      margin: EdgeInsets.zero,
      child: Row(
        children: [
          Stack(
            children: [
              Container(
                width: 100,
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
              if (isRecommended)
                Positioned(
                  top: 6,
                  left: 6,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Text(
                      '推荐',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 10,
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
                              ...List.generate(5, (index) => Icon(
                                Icons.star,
                                size: 12,
                                color: index < rating.floor() ? Colors.amber : AppColors.mutedForeground,
                              )),
                              const SizedBox(width: 4),
                              Text(
                                '$rating分',
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
                                distance,
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
                    const Icon(
                      Icons.favorite_border,
                      size: 20,
                      color: AppColors.mutedForeground,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Wrap(
                      spacing: 6,
                      children: tags.take(2).map((tag) => Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: tag == '免费WiFi' ? AppColors.travelGreen : AppColors.travelBlue,
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
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          price,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w700,
                            color: AppColors.travelOrange,
                          ),
                        ),
                        const Text(
                          '每晚',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.mutedForeground,
                          ),
                        ),
                      ],
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

  Widget _buildLoadMore() {
    return GlassCard(
      child: SizedBox(
        width: double.infinity,
        child: ElevatedButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.refresh, size: 16),
          label: const Text('加载更多酒店'),
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: AppColors.primaryForeground,
            padding: const EdgeInsets.symmetric(vertical: 12),
          ),
        ),
      ),
    );
  }
}
