import { TransitionSpecs, CardStyleInterpolators, HeaderStyleInterpolators } from '@react-navigation/stack';
import { Easing } from 'react-native';

// 动画配置
export const transitionConfig = {
  animation: 'timing' as const,
  config: {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
  },
};

export const fastTransitionConfig = {
  animation: 'timing' as const,
  config: {
    duration: 200,
    easing: Easing.out(Easing.quad),
  },
};

export const slowTransitionConfig = {
  animation: 'timing' as const,
  config: {
    duration: 400,
    easing: Easing.out(Easing.cubic),
  },
};

// 自定义卡片样式插值器
export const customCardStyleInterpolator = ({ current, next, layouts }: any) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.95],
            })
            : 1,
        },
      ],
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1],
      }),
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  };
};

// 模态框样式插值器
export const modalCardStyleInterpolator = ({ current, layouts }: any) => {
  return {
    cardStyle: {
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.height, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  };
};

// 淡入淡出插值器
export const fadeCardStyleInterpolator = ({ current }: any) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

// 缩放插值器
export const scaleCardStyleInterpolator = ({ current, next, layouts }: any) => {
  return {
    cardStyle: {
      transform: [
        {
          scale: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1],
          }),
        },
      ],
      opacity: current.progress,
    },
  };
};

// 导航动画预设
export const navigationAnimations = {
  // 默认滑动动画
  slide: {
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  },

  // 快速滑动
  slidefast: {
    transitionSpec: {
      open: fastTransitionConfig,
      close: fastTransitionConfig,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  },

  // 模态框动画
  modal: {
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: modalCardStyleInterpolator,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  },

  // 淡入淡出
  fade: {
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: fadeCardStyleInterpolator,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  },

  // 缩放动画
  scale: {
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: scaleCardStyleInterpolator,
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  },

  // 自定义动画
  custom: {
    transitionSpec: {
      open: transitionConfig,
      close: transitionConfig,
    },
    cardStyleInterpolator: customCardStyleInterpolator,
    headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
  },
};

// 底部标签栏动画配置
export const tabBarAnimationConfig = {
  animation: 'timing' as const,
  config: {
    duration: 200,
    easing: Easing.out(Easing.quad),
  },
};

export default navigationAnimations;
