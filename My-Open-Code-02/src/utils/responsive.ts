import { Dimensions, PixelRatio, Platform } from 'react-native';

// 获取屏幕尺寸
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 设计稿基准尺寸（基于原HTML项目的移动端尺寸）
const DESIGN_WIDTH = 375; // 更标准的iPhone设计基准
const DESIGN_HEIGHT = 812; // iPhone X基准高度

// 最小和最大缩放比例限制
const MIN_SCALE = 0.8;
const MAX_SCALE = 1.3;

// 响应式工具函数
export const responsive = {
  // 屏幕信息
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // 宽度比例
  widthRatio: SCREEN_WIDTH / DESIGN_WIDTH,

  // 高度比例
  heightRatio: SCREEN_HEIGHT / DESIGN_HEIGHT,

  // 响应式宽度
  width: (size: number): number => {
    return Math.round(PixelRatio.roundToNearestPixel(size * (SCREEN_WIDTH / DESIGN_WIDTH)));
  },

  // 响应式高度
  height: (size: number): number => {
    return Math.round(PixelRatio.roundToNearestPixel(size * (SCREEN_HEIGHT / DESIGN_HEIGHT)));
  },

  // 响应式字体大小
  fontSize: (size: number): number => {
    const scale = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, SCREEN_HEIGHT / DESIGN_HEIGHT);
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    return Math.round(PixelRatio.roundToNearestPixel(size * clampedScale));
  },

  // 响应式间距
  spacing: (size: number): number => {
    const scale = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, 1.2); // 限制间距缩放
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
    return Math.round(PixelRatio.roundToNearestPixel(size * clampedScale));
  },

  // 判断是否为小屏幕
  isSmallScreen: (): boolean => {
    return SCREEN_WIDTH < 375 || SCREEN_HEIGHT < 667;
  },

  // 判断是否为大屏幕
  isLargeScreen: (): boolean => {
    return SCREEN_WIDTH > 414 || SCREEN_HEIGHT > 896;
  },

  // 判断是否为平板
  isTablet: (): boolean => {
    return SCREEN_WIDTH > 768;
  },

  // 获取安全的容器宽度（考虑最大宽度限制）
  getSafeContainerWidth: (): number => {
    const maxWidth = 450; // 最大宽度限制
    return Math.min(SCREEN_WIDTH, maxWidth);
  },

  // 获取适配后的移动端容器尺寸
  getMobileContainerSize: () => {
    const containerWidth = Math.min(SCREEN_WIDTH * 0.95, DESIGN_WIDTH);
    const containerHeight = Math.min(SCREEN_HEIGHT * 0.95, DESIGN_HEIGHT);

    return {
      width: containerWidth,
      height: containerHeight,
    };
  },

  // 根据屏幕尺寸调整圆角
  borderRadius: (size: number): number => {
    const scale = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, 1.2); // 限制最大缩放
    return Math.round(size * scale);
  },

  // 根据屏幕尺寸调整阴影
  shadowRadius: (size: number): number => {
    const scale = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, 1.1);
    return Math.round(size * scale);
  },
};

// 屏幕尺寸断点
export const breakpoints = {
  small: 375,
  medium: 414,
  large: 768,
  xlarge: 1024,
};

// 响应式样式辅助函数
export const createResponsiveStyle = (styles: {
  small?: any;
  medium?: any;
  large?: any;
  default: any;
}) => {
  if (SCREEN_WIDTH <= breakpoints.small && styles.small) {
    return { ...styles.default, ...styles.small };
  }

  if (SCREEN_WIDTH <= breakpoints.medium && styles.medium) {
    return { ...styles.default, ...styles.medium };
  }

  if (SCREEN_WIDTH >= breakpoints.large && styles.large) {
    return { ...styles.default, ...styles.large };
  }

  return styles.default;
};

// 设备类型检测
export const deviceType = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isSmallPhone: SCREEN_WIDTH <= 375,
  isMediumPhone: SCREEN_WIDTH > 375 && SCREEN_WIDTH <= 414,
  isLargePhone: SCREEN_WIDTH > 414 && SCREEN_WIDTH < 768,
  isTablet: SCREEN_WIDTH >= 768,
};

export default responsive;
