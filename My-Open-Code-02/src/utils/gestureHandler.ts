import { Animated, Dimensions } from 'react-native';
import navigationService from '../navigation/NavigationService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 手势配置
export const gestureConfig = {
  // 滑动阈值
  swipeThreshold: 50,

  // 速度阈值
  velocityThreshold: 500,

  // 边缘滑动区域
  edgeWidth: 20,

  // 滑动方向
  directions: {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
  } as const,
};

// 手势处理器类
export class GestureHandler {
  private translateX = new Animated.Value(0);
  private translateY = new Animated.Value(0);
  private opacity = new Animated.Value(1);

  // 处理水平滑动手势
  handleHorizontalSwipe = (event: any) => {
    const { translationX, velocityX, state } = event.nativeEvent;

    if (state === 'active') {
      // 更新动画值
      this.translateX.setValue(translationX);

      // 根据滑动距离调整透明度
      const progress = Math.abs(translationX) / SCREEN_WIDTH;
      this.opacity.setValue(1 - progress * 0.3);
    }

    if (state === 'end') {
      const shouldNavigate =
        Math.abs(translationX) > gestureConfig.swipeThreshold ||
        Math.abs(velocityX) > gestureConfig.velocityThreshold;

      if (shouldNavigate) {
        if (translationX > 0) {
          // 向右滑动 - 返回
          this.animateBack(() => {
            navigationService.goBack();
          });
        } else {
          // 向左滑动 - 前进（如果有的话）
          this.animateForward();
        }
      } else {
        // 恢复原位
        this.resetAnimation();
      }
    }
  };

  // 处理垂直滑动手势
  handleVerticalSwipe = (event: any) => {
    const { translationY, velocityY, state } = event.nativeEvent;

    if (state === 'active') {
      // 只允许向下滑动
      if (translationY > 0) {
        this.translateY.setValue(translationY);

        // 根据滑动距离调整透明度和缩放
        const progress = translationY / SCREEN_HEIGHT;
        this.opacity.setValue(1 - progress * 0.5);
      }
    }

    if (state === 'end') {
      const shouldDismiss =
        translationY > gestureConfig.swipeThreshold ||
        velocityY > gestureConfig.velocityThreshold;

      if (shouldDismiss && translationY > 0) {
        // 向下滑动关闭模态框
        this.animateDown(() => {
          navigationService.goBack();
        });
      } else {
        // 恢复原位
        this.resetAnimation();
      }
    }
  };

  // 边缘滑动检测
  isEdgeSwipe = (event: any): boolean => {
    const { x } = event.nativeEvent;
    return x <= gestureConfig.edgeWidth;
  };

  // 动画：返回
  private animateBack = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback?.();
      this.resetValues();
    });
  };

  // 动画：前进
  private animateForward = () => {
    Animated.parallel([
      Animated.timing(this.translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.resetValues();
    });
  };

  // 动画：向下滑动关闭
  private animateDown = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(this.translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback?.();
      this.resetValues();
    });
  };

  // 重置动画
  private resetAnimation = () => {
    Animated.parallel([
      Animated.spring(this.translateX, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(this.translateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(this.opacity, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // 重置数值
  private resetValues = () => {
    this.translateX.setValue(0);
    this.translateY.setValue(0);
    this.opacity.setValue(1);
  };

  // 获取动画样式
  getAnimatedStyle = () => ({
    transform: [
      { translateX: this.translateX },
      { translateY: this.translateY },
    ],
    opacity: this.opacity,
  });

  // 获取水平滑动样式
  getHorizontalSwipeStyle = () => ({
    transform: [{ translateX: this.translateX }],
    opacity: this.opacity,
  });

  // 获取垂直滑动样式
  getVerticalSwipeStyle = () => ({
    transform: [{ translateY: this.translateY }],
    opacity: this.opacity,
  });
}

// 创建全局手势处理器实例
export const globalGestureHandler = new GestureHandler();

// 手势辅助函数
export const gestureHelpers = {
  // 检查是否为有效滑动
  isValidSwipe: (translationX: number, translationY: number, velocityX: number, velocityY: number) => {
    const distance = Math.sqrt(translationX * translationX + translationY * translationY);
    const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

    return distance > gestureConfig.swipeThreshold || velocity > gestureConfig.velocityThreshold;
  },

  // 获取滑动方向
  getSwipeDirection: (translationX: number, translationY: number) => {
    const absX = Math.abs(translationX);
    const absY = Math.abs(translationY);

    if (absX > absY) {
      return translationX > 0 ? gestureConfig.directions.RIGHT : gestureConfig.directions.LEFT;
    } else {
      return translationY > 0 ? gestureConfig.directions.DOWN : gestureConfig.directions.UP;
    }
  },

  // 计算滑动进度
  getSwipeProgress: (translation: number, screenSize: number) => {
    return Math.min(Math.abs(translation) / screenSize, 1);
  },
};

export default GestureHandler;
