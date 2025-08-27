import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { responsive, deviceType, breakpoints } from '../utils/responsive';

interface ResponsiveInfo {
  screenWidth: number;
  screenHeight: number;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isTablet: boolean;
  orientation: 'portrait' | 'landscape';
  scale: number;
  fontScale: number;
}

export const useResponsive = (): ResponsiveInfo => {
  const [screenData, setScreenData] = useState(() => {
    const { width, height, scale, fontScale } = Dimensions.get('window');
    return {
      screenWidth: width,
      screenHeight: height,
      scale,
      fontScale,
    };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({
        screenWidth: window.width,
        screenHeight: window.height,
        scale: window.scale,
        fontScale: window.fontScale,
      });
    });

    return () => subscription?.remove();
  }, []);

  const isSmallScreen = screenData.screenWidth <= breakpoints.small;
  const isMediumScreen = screenData.screenWidth > breakpoints.small && screenData.screenWidth <= breakpoints.medium;
  const isLargeScreen = screenData.screenWidth > breakpoints.medium && screenData.screenWidth < breakpoints.large;
  const isTablet = screenData.screenWidth >= breakpoints.large;
  const orientation = screenData.screenWidth > screenData.screenHeight ? 'landscape' : 'portrait';

  return {
    screenWidth: screenData.screenWidth,
    screenHeight: screenData.screenHeight,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isTablet,
    orientation,
    scale: screenData.scale,
    fontScale: screenData.fontScale,
  };
};

// 响应式样式Hook
export const useResponsiveStyle = () => {
  const responsiveInfo = useResponsive();

  const getResponsiveValue = <T>(values: {
    small?: T;
    medium?: T;
    large?: T;
    tablet?: T;
    default: T;
  }): T => {
    if (responsiveInfo.isTablet && values.tablet !== undefined) {
      return values.tablet;
    }
    if (responsiveInfo.isLargeScreen && values.large !== undefined) {
      return values.large;
    }
    if (responsiveInfo.isMediumScreen && values.medium !== undefined) {
      return values.medium;
    }
    if (responsiveInfo.isSmallScreen && values.small !== undefined) {
      return values.small;
    }
    return values.default;
  };

  const getScaledSize = (size: number): number => {
    return responsive.fontSize(size);
  };

  const getScaledSpacing = (spacing: number): number => {
    return responsive.spacing(spacing);
  };

  return {
    ...responsiveInfo,
    getResponsiveValue,
    getScaledSize,
    getScaledSpacing,
  };
};

// 屏幕方向Hook
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return width > height ? 'landscape' : 'portrait';
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    });

    return () => subscription?.remove();
  }, []);

  return orientation;
};

// 安全区域Hook（简化版）
export const useSafeArea = () => {
  const { screenHeight, screenWidth } = useResponsive();
  
  // 简化的安全区域计算
  const top = deviceType.isIOS ? 44 : 24;
  const bottom = deviceType.isIOS ? 34 : 0;
  const left = 0;
  const right = 0;

  return {
    top: responsive.height(top),
    bottom: responsive.height(bottom),
    left: responsive.width(left),
    right: responsive.width(right),
    insets: {
      top: responsive.height(top),
      bottom: responsive.height(bottom),
      left: responsive.width(left),
      right: responsive.width(right),
    },
  };
};

export default useResponsive;
