// 主题配置文件 - 基于原HTML项目的玻璃拟态设计风格
import { responsive, deviceType } from '../utils/responsive';

export const theme = {
  colors: {
    // 主色调 - 靛蓝到青色渐变
    primary: '#3b82f6',
    primaryLight: '#06b6d4',

    // 辅助色
    secondary: '#8b5cf6',
    accent: '#f59e0b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',

    // 背景色
    background: 'transparent', // 完全透明背景
    backgroundSecondary: 'transparent', // 完全透明背景
    backgroundTertiary: 'transparent', // 完全透明背景

    // 原始背景色（备用）
    backgroundOriginal: '#0f172a', // slate-950
    backgroundSecondaryOriginal: '#1e293b', // slate-800
    backgroundTertiaryOriginal: '#334155', // slate-700

    // 玻璃效果背景 - 针对移动端优化
    glassBackground: 'rgba(255, 255, 255, 0.08)',
    glassBackgroundHover: 'rgba(255, 255, 255, 0.15)',
    glassBorder: 'rgba(255, 255, 255, 0.15)',
    glassBackgroundStrong: 'rgba(255, 255, 255, 0.12)',
    glassBackgroundWeak: 'rgba(255, 255, 255, 0.04)',

    // 文字颜色
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1', // slate-300
    textTertiary: '#94a3b8', // slate-400
    textMuted: '#64748b', // slate-500

    // 渐变色
    gradients: {
      primary: ['#667eea', '#764ba2'], // 135度紫蓝色渐变
      secondary: ['#3b82f6', '#06b6d4'], // 靛蓝到青色
      accent: ['#f59e0b', '#ef4444'], // 橙色到红色
      purple: ['#8b5cf6', '#ec4899'], // 紫色到粉色
      green: ['#10b981', '#06b6d4'], // 绿色到青色
    },
  },

  spacing: {
    xs: responsive.spacing(4),
    sm: responsive.spacing(8),
    md: responsive.spacing(16),
    lg: responsive.spacing(24),
    xl: responsive.spacing(32),
    xxl: responsive.spacing(48),
  },

  borderRadius: {
    sm: responsive.borderRadius(8),
    md: responsive.borderRadius(12),
    lg: responsive.borderRadius(16),
    xl: responsive.borderRadius(20),
    xxl: responsive.borderRadius(24),
    full: 9999,
  },

  fontSize: {
    xs: responsive.fontSize(12),
    sm: responsive.fontSize(14),
    base: responsive.fontSize(16),
    lg: responsive.fontSize(18),
    xl: responsive.fontSize(20),
    '2xl': responsive.fontSize(24),
    '3xl': responsive.fontSize(30),
    '4xl': responsive.fontSize(36),
  },

  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // 字体家族配置
  fontFamily: {
    regular: deviceType.isIOS ? 'PingFang SC' : 'Roboto',
    medium: deviceType.isIOS ? 'PingFang SC' : 'Roboto-Medium',
    bold: deviceType.isIOS ? 'PingFang SC' : 'Roboto-Bold',
    // 备用字体
    fallback: deviceType.isIOS ? 'System' : 'sans-serif',
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: deviceType.isIOS ? 0.08 : 0.05,
      shadowRadius: responsive.shadowRadius(2),
      elevation: deviceType.isAndroid ? 2 : 0,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: deviceType.isIOS ? 0.12 : 0.08,
      shadowRadius: responsive.shadowRadius(6),
      elevation: deviceType.isAndroid ? 4 : 0,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: deviceType.isIOS ? 0.16 : 0.12,
      shadowRadius: responsive.shadowRadius(15),
      elevation: deviceType.isAndroid ? 6 : 0,
    },
    xl: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: deviceType.isIOS ? 0.20 : 0.15,
      shadowRadius: responsive.shadowRadius(25),
      elevation: deviceType.isAndroid ? 10 : 0,
    },
  },

  // 移动端尺寸配置
  dimensions: {
    mobileWidth: Math.min(responsive.screenWidth * 0.95, 414), // 限制最大宽度
    mobileHeight: Math.min(responsive.screenHeight * 0.95, 896), // 限制最大高度
    statusBarHeight: deviceType.isIOS ? responsive.height(44) : responsive.height(24),
    bottomTabHeight: responsive.height(deviceType.isSmallPhone ? 70 : 80),
    safeContainerWidth: Math.min(responsive.screenWidth * 0.9, 414),
    headerHeight: responsive.height(60),
    cardMinHeight: responsive.height(120),
  },
};

export type Theme = typeof theme;
