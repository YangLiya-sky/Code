import 'package:flutter/material.dart';
import '../routing/app_router.dart';

class NavigationService {
  static final NavigationService _instance = NavigationService._internal();
  factory NavigationService() => _instance;
  NavigationService._internal();

  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();
  final List<String> _navigationHistory = [AppRouter.splash];
  int _currentIndex = 0;
  bool _isNavigating = false;

  // 页面映射，类似于 travel_navigation.js 中的 pages 对象
  static const Map<String, String> pages = {
    'home': AppRouter.home,
    'search': AppRouter.search,
    'destination': AppRouter.destination,
    'planning': AppRouter.planning,
    'hotel': AppRouter.hotel,
    'transport': AppRouter.transport,
    'food': AppRouter.food,
    'guides': AppRouter.guides,
    'orders': AppRouter.orders,
    'profile': AppRouter.profile,
  };

  // 底部导航栏页面映射
  static const Map<int, String> bottomNavPages = {
    0: AppRouter.home,
    1: AppRouter.search,
    2: AppRouter.destination,
    3: AppRouter.orders,
    4: AppRouter.profile,
  };

  // 获取当前页面
  String get currentPage => _navigationHistory.isNotEmpty 
    ? _navigationHistory[_currentIndex] 
    : AppRouter.splash;

  // 获取导航历史
  List<String> get navigationHistory => List.unmodifiable(_navigationHistory);

  // 导航到指定页面
  Future<void> navigateTo(String route, {bool addToHistory = true}) async {
    if (route == currentPage || _isNavigating) return;

    _isNavigating = true;

    try {
      if (addToHistory) {
        // 清理当前索引之后的历史记录
        _currentIndex++;
        _navigationHistory.removeRange(_currentIndex, _navigationHistory.length);
        _navigationHistory.add(route);
      }

      // 使用页面切换动画
      await _navigateWithAnimation(route, addToHistory);
    } finally {
      _isNavigating = false;
    }
  }

  // 底部导航栏导航
  Future<void> navigateToBottomNavPage(int index) async {
    final route = bottomNavPages[index];
    if (route == null) return;

    await navigateTo(route, addToHistory: true);
  }

  // 返回上一页
  Future<void> goBack() async {
    if (_currentIndex > 0) {
      _currentIndex--;
      final previousRoute = _navigationHistory[_currentIndex];
      await navigateTo(previousRoute, addToHistory: false);
    } else {
      // 如果没有历史记录，返回首页
      await navigateTo(AppRouter.home);
    }
  }

  // 前进到下一页
  Future<void> goForward() async {
    if (_currentIndex < _navigationHistory.length - 1) {
      _currentIndex++;
      final nextRoute = _navigationHistory[_currentIndex];
      await navigateTo(nextRoute, addToHistory: false);
    }
  }

  // 清理导航历史
  void clearHistory() {
    _navigationHistory.clear();
    _navigationHistory.add(AppRouter.splash);
    _currentIndex = 0;
  }

  // 重置到首页
  Future<void> resetToHome() async {
    clearHistory();
    await navigateTo(AppRouter.home);
  }

  // 带动画的导航
  Future<void> _navigateWithAnimation(String route, bool addToHistory) async {
    final context = navigatorKey.currentContext;
    if (context == null) return;

    if (addToHistory) {
      await Navigator.pushNamedAndRemoveUntil(
        context,
        route,
        (routeItem) => false,
      );
    } else {
      await Navigator.pushReplacementNamed(context, route);
    }
  }

  // 获取当前底部导航索引
  int getCurrentBottomNavIndex() {
    final currentRoute = currentPage;
    for (final entry in bottomNavPages.entries) {
      if (entry.value == currentRoute) {
        return entry.key;
      }
    }
    return 0; // 默认返回首页索引
  }

  // 检查是否可以返回
  bool canGoBack() {
    return _currentIndex > 0;
  }

  // 检查是否可以前进
  bool canGoForward() {
    return _currentIndex < _navigationHistory.length - 1;
  }

  // 处理系统返回按钮
  Future<bool> onWillPop() async {
    if (canGoBack()) {
      await goBack();
      return false; // 阻止系统默认返回行为
    }
    return true; // 允许退出应用
  }

  // 添加页面切换监听器
  void addRouteObserver(RouteObserver<PageRoute> observer) {
    // 可以在这里添加路由观察者来跟踪页面变化
  }

  // 调试信息
  void printNavigationState() {
    debugPrint('Navigation History: $_navigationHistory');
    debugPrint('Current Index: $_currentIndex');
    debugPrint('Current Page: $currentPage');
    debugPrint('Can Go Back: ${canGoBack()}');
    debugPrint('Can Go Forward: ${canGoForward()}');
  }
}