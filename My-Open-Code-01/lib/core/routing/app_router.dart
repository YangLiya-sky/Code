import 'package:flutter/material.dart';

import '../../features/splash/presentation/pages/splash_page.dart';
import '../../features/home/presentation/pages/home_page.dart';
import '../../features/search/presentation/pages/search_page.dart';
import '../../features/destination/presentation/pages/destination_page.dart';
import '../../features/orders/presentation/pages/orders_page.dart';
import '../../features/profile/presentation/pages/profile_page.dart';
import '../../features/planning/presentation/pages/planning_page.dart';
import '../../features/hotel/presentation/pages/hotel_page.dart';
import '../../features/transport/presentation/pages/transport_page.dart';
import '../../features/food/presentation/pages/food_page.dart';
import '../../features/guides/presentation/pages/guides_page.dart';

class AppRouter {
  static const String splash = '/';
  static const String home = '/home';
  static const String search = '/search';
  static const String destination = '/destination';
  static const String orders = '/orders';
  static const String profile = '/profile';
  static const String planning = '/planning';
  static const String hotel = '/hotel';
  static const String transport = '/transport';
  static const String food = '/food';
  static const String guides = '/guides';

  static Map<String, WidgetBuilder> get routes => {
        splash: (context) => const SplashPage(),
        home: (context) => const HomePage(),
        search: (context) => const SearchPage(),
        destination: (context) => const DestinationPage(),
        orders: (context) => const OrdersPage(),
        profile: (context) => const ProfilePage(),
        planning: (context) => const PlanningPage(),
        hotel: (context) => const HotelPage(),
        transport: (context) => const TransportPage(),
        food: (context) => const FoodPage(),
        guides: (context) => const GuidesPage(),
      };

  static Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    final builder = routes[settings.name];
    if (builder != null) {
      return MaterialPageRoute(
        builder: builder,
        settings: settings,
      );
    }
    return null;
  }
}