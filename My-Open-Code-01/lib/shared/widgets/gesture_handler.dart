import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/services/navigation_service.dart';

class GestureHandler extends StatefulWidget {
  final Widget child;
  final bool enableSwipeNavigation;

  const GestureHandler({
    super.key,
    required this.child,
    this.enableSwipeNavigation = true,
  });

  @override
  State<GestureHandler> createState() => _GestureHandlerState();
}

class _GestureHandlerState extends State<GestureHandler> {
  static const double _threshold = 50.0;
  final NavigationService _navigationService = NavigationService();

  void _handlePanStart(DragStartDetails details) {
    // Store start position for potential future use
  }

  void _handlePanEnd(DragEndDetails details) {
    if (!widget.enableSwipeNavigation) return;

    final velocity = details.velocity.pixelsPerSecond;
    final primaryVelocity = details.primaryVelocity ?? 0;

    // 检查是否是有效的水平滑动
    if (velocity.dx.abs() > velocity.dy.abs() && 
        velocity.dx.abs() > _threshold * 10) {
      
      if (primaryVelocity > 0) {
        // 向右滑动 - 后退
        _navigationService.goBack();
      } else {
        // 向左滑动 - 前进
        _navigationService.goForward();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanStart: widget.enableSwipeNavigation ? _handlePanStart : null,
      onPanEnd: widget.enableSwipeNavigation ? _handlePanEnd : null,
      child: widget.child,
    );
  }
}

// 类似于 travel_navigation.js 中的键盘快捷键支持
class KeyboardShortcutHandler extends StatefulWidget {
  final Widget child;
  final bool enableKeyboardShortcuts;

  const KeyboardShortcutHandler({
    super.key,
    required this.child,
    this.enableKeyboardShortcuts = true,
  });

  @override
  State<KeyboardShortcutHandler> createState() => _KeyboardShortcutHandlerState();
}

class _KeyboardShortcutHandlerState extends State<KeyboardShortcutHandler> {
  final NavigationService _navigationService = NavigationService();

  @override
  Widget build(BuildContext context) {
    if (!widget.enableKeyboardShortcuts) {
      return widget.child;
    }

    return Shortcuts(
      shortcuts: {
        // 后退快捷键
        LogicalKeySet(LogicalKeyboardKey.arrowLeft): const BackIntent(),
        LogicalKeySet(LogicalKeyboardKey.backspace): const BackIntent(),
        
        // 前进快捷键
        LogicalKeySet(LogicalKeyboardKey.arrowRight): const ForwardIntent(),
        
        // 底部导航快捷键
        LogicalKeySet(LogicalKeyboardKey.digit1): const NavigateToHomeIntent(),
        LogicalKeySet(LogicalKeyboardKey.digit2): const NavigateToSearchIntent(),
        LogicalKeySet(LogicalKeyboardKey.digit3): const NavigateToDestinationIntent(),
        LogicalKeySet(LogicalKeyboardKey.digit4): const NavigateToOrdersIntent(),
        LogicalKeySet(LogicalKeyboardKey.digit5): const NavigateToProfileIntent(),
      },
      child: Actions(
        actions: {
          BackIntent: CallbackAction<BackIntent>(
            onInvoke: (intent) => _navigationService.goBack(),
          ),
          ForwardIntent: CallbackAction<ForwardIntent>(
            onInvoke: (intent) => _navigationService.goForward(),
          ),
          NavigateToHomeIntent: CallbackAction<NavigateToHomeIntent>(
            onInvoke: (intent) => _navigationService.navigateToBottomNavPage(0),
          ),
          NavigateToSearchIntent: CallbackAction<NavigateToSearchIntent>(
            onInvoke: (intent) => _navigationService.navigateToBottomNavPage(1),
          ),
          NavigateToDestinationIntent: CallbackAction<NavigateToDestinationIntent>(
            onInvoke: (intent) => _navigationService.navigateToBottomNavPage(2),
          ),
          NavigateToOrdersIntent: CallbackAction<NavigateToOrdersIntent>(
            onInvoke: (intent) => _navigationService.navigateToBottomNavPage(3),
          ),
          NavigateToProfileIntent: CallbackAction<NavigateToProfileIntent>(
            onInvoke: (intent) => _navigationService.navigateToBottomNavPage(4),
          ),
        },
        child: Focus(
          autofocus: true,
          child: widget.child,
        ),
      ),
    );
  }
}

// Intent classes for keyboard shortcuts
class BackIntent extends Intent {
  const BackIntent();
}

class ForwardIntent extends Intent {
  const ForwardIntent();
}

class NavigateToHomeIntent extends Intent {
  const NavigateToHomeIntent();
}

class NavigateToSearchIntent extends Intent {
  const NavigateToSearchIntent();
}

class NavigateToDestinationIntent extends Intent {
  const NavigateToDestinationIntent();
}

class NavigateToOrdersIntent extends Intent {
  const NavigateToOrdersIntent();
}

class NavigateToProfileIntent extends Intent {
  const NavigateToProfileIntent();
}

// 组合手势和键盘处理器
class NavigationGestureWrapper extends StatelessWidget {
  final Widget child;
  final bool enableSwipeNavigation;
  final bool enableKeyboardShortcuts;

  const NavigationGestureWrapper({
    super.key,
    required this.child,
    this.enableSwipeNavigation = true,
    this.enableKeyboardShortcuts = true,
  });

  @override
  Widget build(BuildContext context) {
    return KeyboardShortcutHandler(
      enableKeyboardShortcuts: enableKeyboardShortcuts,
      child: GestureHandler(
        enableSwipeNavigation: enableSwipeNavigation,
        child: child,
      ),
    );
  }
}
