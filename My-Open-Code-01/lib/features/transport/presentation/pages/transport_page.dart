import 'package:flutter/material.dart';
import '../../../../shared/widgets/mobile_container.dart';
import '../../../../shared/components/status_bar.dart';
import '../../../../shared/components/bottom_navigation.dart';
import '../../../../shared/widgets/glass_card.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/constants/app_constants.dart';

class TransportPage extends StatelessWidget {
  const TransportPage({super.key});

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
            const BottomNavigation(currentIndex: -1), // No specific index for transport
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
                  '交通出行',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: AppColors.foreground,
                  ),
                ),
              ],
            ),
            const Icon(
              Icons.calendar_today,
              color: AppColors.foreground,
              size: 24,
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
          _buildTransportTypes(),
          const SizedBox(height: 16),
          _buildSearchForm(),
          const SizedBox(height: 16),
          _buildFlightResults(),
          const SizedBox(height: 16),
          _buildTrainResults(),
          const SizedBox(height: 16),
          _buildOtherServices(),
        ],
      ),
    );
  }

  Widget _buildTransportTypes() {
    return GlassCard(
      child: Row(
        children: [
          Expanded(
            child: _buildTransportType(
              icon: Icons.flight,
              label: '机票',
              color: AppColors.travelBlue,
              isSelected: true,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _buildTransportType(
              icon: Icons.train,
              label: '火车',
              color: AppColors.travelGreen,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: _buildTransportType(
              icon: Icons.directions_bus,
              label: '大巴',
              color: AppColors.travelOrange,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTransportType({
    required IconData icon,
    required String label,
    required Color color,
    bool isSelected = false,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isSelected ? color : AppColors.card,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
      child: Column(
        children: [
                        Icon(
            icon,
            size: 28,
            color: isSelected ? Colors.white : color,
          ),
          const SizedBox(height: 8),
          Text(
            label,
                            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: isSelected ? Colors.white : AppColors.foreground,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSearchForm() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            children: <Widget>[
              Expanded(
                child: _buildCityInput('上海'),
              ),
              Container(
                width: 32,
                height: 32,
                margin: const EdgeInsets.symmetric(horizontal: 12),
                decoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.swap_horiz,
                  size: 16,
                  color: Colors.white,
                ),
              ),
              Expanded(
                child: _buildCityInput('杭州'),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: <Widget>[
              Expanded(
                child: _buildInputField('出发日期', '4月15日 周一'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildInputField('乘客', '1成人'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildCityInput(String city) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.input,
        border: Border.all(color: AppColors.border),
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
      ),
      child: Text(
        city,
        style: const TextStyle(
          fontSize: 16,
          color: AppColors.foreground,
        ),
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

  Widget _buildFlightResults() {
    return GlassCard(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              const Text(
                '航班信息',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.foreground,
                ),
              ),
              Row(
                children: <Widget>[
                  _buildSortButton('价格', isSelected: true),
                  const SizedBox(width: 8),
                  _buildSortButton('时间'),
                ],
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildFlightCard(
            airline: '东方航空',
            flightNumber: 'MU5137',
            aircraft: '空客A320 · 经济舱',
            price: '¥428',
            departureTime: '08:30',
            arrivalTime: '09:45',
            departureAirport: '上海虹桥',
            arrivalAirport: '杭州萧山',
            duration: '1h 15m',
            color: AppColors.travelBlue,
          ),
          const SizedBox(height: 12),
          _buildFlightCard(
            airline: '国航',
            flightNumber: 'CA1563',
            aircraft: '波音737 · 经济舱',
            price: '¥468',
            departureTime: '14:20',
            arrivalTime: '15:40',
            departureAirport: '上海浦东',
            arrivalAirport: '杭州萧山',
            duration: '1h 20m',
            color: AppColors.travelGreen,
          ),
        ],
      ),
    );
  }

  Widget _buildSortButton(String label, {bool isSelected = false}) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: isSelected ? AppColors.travelBlue : AppColors.secondary,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        label,
                        style: TextStyle(
          fontSize: 12,
          color: isSelected ? Colors.white : AppColors.mutedForeground,
        ),
      ),
    );
  }

  Widget _buildFlightCard({
    required String airline,
    required String flightNumber,
    required String aircraft,
    required String price,
    required String departureTime,
    required String arrivalTime,
    required String departureAirport,
    required String arrivalAirport,
    required String duration,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: color,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Center(
                      child: Text(
                        airline == '东方航空' ? 'MU' : 'CA',
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        '$airline $flightNumber',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        aircraft,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: <Widget>[
                  Text(
                    price,
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppColors.travelOrange,
                    ),
                  ),
                  const Text(
                    '含税费',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: <Widget>[
              Column(
                children: <Widget>[
                  Text(
                    departureTime,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  Text(
                    departureAirport,
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
              Expanded(
                child: Stack(
                  alignment: Alignment.center,
                  children: <Widget>[
                    Container(
                      height: 2,
                      decoration: BoxDecoration(
                        color: color,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.card,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        duration,
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ),
                    Positioned(
                      right: 0,
                      child: Icon(
                        Icons.flight,
                        size: 16,
                        color: color,
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                children: <Widget>[
                  Text(
                    arrivalTime,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  Text(
                    arrivalAirport,
                    style: const TextStyle(
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
    );
  }

  Widget _buildTrainResults() {
    return GlassCard(
      child: Column(
        children: [
          const Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                '高铁动车',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.foreground,
                ),
              ),
              Text(
                '查看全部 >',
                style: TextStyle(
                  fontSize: 14,
                  color: AppColors.mutedForeground,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          _buildTrainCard(),
        ],
      ),
    );
  }

  Widget _buildTrainCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.secondary,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: AppColors.travelBlue,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: const Center(
                      child:                       Text(
                        'G',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const Text(
                        'G7325',
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          color: AppColors.foreground,
                        ),
                      ),
                      Text(
                        '复兴号 · 二等座',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: <Widget>[
                  const Text(
                    '¥73',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w700,
                      color: AppColors.travelOrange,
                    ),
                  ),
                  Text(
                    '二等座',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: <Widget>[
              Column(
                children: <Widget>[
                  const Text(
                    '09:15',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  Text(
                    '上海虹桥',
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.mutedForeground,
                    ),
                  ),
                ],
              ),
              Expanded(
                child: Stack(
                  alignment: Alignment.center,
                  children: <Widget>[
                    Container(
                      height: 2,
                      decoration: BoxDecoration(
                        color: AppColors.travelBlue,
                        borderRadius: BorderRadius.circular(1),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.card,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        '1h 3m',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.mutedForeground,
                        ),
                      ),
                    ),
                    const Positioned(
                      right: 0,
                      child: Icon(
                        Icons.train,
                        size: 16,
                        color: AppColors.travelBlue,
                      ),
                    ),
                  ],
                ),
              ),
              Column(
                children: <Widget>[
                  const Text(
                    '10:18',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                      color: AppColors.foreground,
                    ),
                  ),
                  Text(
                    '杭州东',
                    style: const TextStyle(
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
    );
  }

  Widget _buildOtherServices() {
    return GlassCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            '其他服务',
                            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.foreground,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: <Widget>[
              Expanded(
                child: _buildServiceCard(
                  icon: Icons.car_rental,
                  title: '租车服务',
                  subtitle: '自驾出行',
                  color: AppColors.travelOrange,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildServiceCard(
                  icon: Icons.local_taxi,
                  title: '接送机',
                  subtitle: '专车接送',
                  color: AppColors.travelPurple,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildServiceCard({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.card,
        borderRadius: BorderRadius.circular(AppConstants.radiusSm),
        border: Border.all(color: AppColors.border),
      ),
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
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w500,
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
    );
  }
}
