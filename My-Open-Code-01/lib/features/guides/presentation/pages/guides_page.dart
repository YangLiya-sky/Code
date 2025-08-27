import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/components/status_bar.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class GuidesPage extends StatelessWidget {
  const GuidesPage({super.key});

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
            const BottomNavigation(currentIndex: -1), // No specific index for guides
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
                  '攻略分享',
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
                  Icons.edit,
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
          _buildCategories(),
          const SizedBox(height: 16),
          _buildFeaturedGuide(),
          const SizedBox(height: 16),
          _buildGuideList(),
          const SizedBox(height: 16),
          _buildPopularTags(),
          const SizedBox(height: 16),
          _buildCreateGuide(),
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
            _buildCategoryTag('热门攻略', Icons.trending_up, isSelected: true),
            const SizedBox(width: 8),
            _buildCategoryTag('摄影攻略', Icons.camera_alt),
            const SizedBox(width: 8),
            _buildCategoryTag('美食攻略', Icons.restaurant),
            const SizedBox(width: 8),
            _buildCategoryTag('省钱攻略', Icons.account_balance_wallet),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoryTag(String label, IconData icon, {bool isSelected = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.travelBlue : AppColors.primary,
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

  Widget _buildFeaturedGuide() {
    return GlassCard(
      margin: EdgeInsets.zero,
      child: Stack(
        children: [
          Container(
            height: 180,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment(-0.707, -0.707),
                end: Alignment(0.707, 0.707),
                colors: [AppColors.travelBlue, AppColors.travelPurple],
              ),
              borderRadius: BorderRadius.circular(AppConstants.radiusSm),
            ),
          ),
          Positioned(
            top: 12,
            left: 12,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: Colors.black.withValues(alpha: 0.6),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                '精选攻略',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                ),
              ),
            ),
          ),
          const Positioned(
            top: 12,
            right: 12,
            child: Icon(
              Icons.bookmark_border,
              size: 20,
              color: Colors.white,
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
                  '杭州西湖三日游完整攻略',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Container(
                      width: 24,
                      height: 24,
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Center(
                        child: Text(
                          '李',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 4),
                    const Text(
                      '旅行达人李小姐',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    _buildStatIcon(Icons.visibility, '2.3k'),
                    const SizedBox(width: 16),
                    _buildStatIcon(Icons.favorite_border, '456'),
                    const SizedBox(width: 16),
                    _buildStatIcon(Icons.chat_bubble_outline, '89'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatIcon(IconData icon, String count) {
    return Row(
      children: [
        Icon(
          icon,
          size: 14,
          color: Colors.white.withValues(alpha: 0.8),
        ),
        const SizedBox(width: 4),
        Text(
          count,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.8),
            fontSize: 12,
          ),
        ),
      ],
    );
  }

  Widget _buildGuideList() {
    return Column(
      children: [
        _buildGuideCard(
          title: '上海到杭州高铁攻略，省钱又省时',
          author: '旅行小王子',
          authorAvatar: '王',
          avatarColor: AppColors.travelGreen,
          imageCount: '5图',
          views: '1.8k',
          likes: '234',
          timeAgo: '2天前',
          gradient: [AppColors.travelGreen, AppColors.travelBlue],
        ),
        const SizedBox(height: 16),
        _buildGuideCard(
          title: '西湖最佳拍照点位大全',
          author: '摄影师小明',
          authorAvatar: '摄',
          avatarColor: AppColors.travelOrange,
          imageCount: '8图',
          views: '3.2k',
          likes: '567',
          timeAgo: '1周前',
          gradient: [AppColors.travelOrange, AppColors.travelGreen],
          isBookmarked: true,
        ),
        const SizedBox(height: 16),
        _buildGuideCard(
          title: '杭州美食探店，本地人推荐',
          author: '美食家小红',
          authorAvatar: '美',
          avatarColor: AppColors.travelPurple,
          imageCount: '12图',
          views: '2.7k',
          likes: '389',
          timeAgo: '3天前',
          gradient: [AppColors.travelPurple, AppColors.travelBlue],
        ),
      ],
    );
  }

  Widget _buildGuideCard({
    required String title,
    required String author,
    required String authorAvatar,
    required Color avatarColor,
    required String imageCount,
    required String views,
    required String likes,
    required String timeAgo,
    required List<Color> gradient,
    bool isBookmarked = false,
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
                  gradient: LinearGradient(
                    begin: const Alignment(-0.707, -0.707),
                    end: const Alignment(0.707, 0.707),
                    colors: gradient,
                  ),
                  borderRadius: BorderRadius.circular(AppConstants.radiusSm),
                ),
              ),
              Positioned(
                bottom: 4,
                right: 4,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.6),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    imageCount,
                    style: const TextStyle(
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
                            title,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: AppColors.foreground,
                              height: 1.3,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Container(
                                width: 20,
                                height: 20,
                                decoration: BoxDecoration(
                                  color: avatarColor,
                                  shape: BoxShape.circle,
                                ),
                                child: Center(
                                  child: Text(
                                    authorAvatar,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.w600,
                                      fontSize: 10,
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                author,
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
                      isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                      size: 16,
                      color: isBookmarked ? AppColors.travelOrange : AppColors.mutedForeground,
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        _buildGuideStatIcon(Icons.visibility, views),
                        const SizedBox(width: 12),
                        _buildGuideStatIcon(Icons.favorite_border, likes),
                      ],
                    ),
                    Text(
                      timeAgo,
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
        ],
      ),
    );
  }

  Widget _buildGuideStatIcon(IconData icon, String count) {
    return Row(
      children: [
        Icon(
          icon,
          size: 12,
          color: AppColors.mutedForeground,
        ),
        const SizedBox(width: 4),
        Text(
          count,
          style: const TextStyle(
            fontSize: 12,
            color: AppColors.mutedForeground,
          ),
        ),
      ],
    );
  }

  Widget _buildPopularTags() {
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '热门标签',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              '#西湖十景',
              '#杭帮菜',
              '#春季赏花',
              '#亲子游',
              '#情侣约会',
              '#省钱攻略',
            ].map((tag) => Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.secondary,
                borderRadius: BorderRadius.circular(AppConstants.radiusSm),
              ),
              child: Text(
                tag,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.foreground,
                ),
              ),
            )).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCreateGuide() {
    return GlassCard(
      child: Column(
        children: [
          Container(
            width: 60,
            height: 60,
            decoration: const BoxDecoration(
              color: AppColors.travelBlue,
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.edit,
              size: 28,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            '分享你的旅行故事',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            '记录美好时光，帮助更多旅行者',
            style: TextStyle(
              color: AppColors.mutedForeground,
              height: 1.5,
            ),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          ElevatedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.add, size: 16),
            label: const Text('写攻略'),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.travelBlue,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
          ),
        ],
      ),
    );
  }
}
