import { StyleSheet } from 'react-native';
import { theme } from './theme';
import { responsive, deviceType, createResponsiveStyle } from '../utils/responsive';

// 全局样式 - 基于原HTML项目的设计系统
export const globalStyles = StyleSheet.create({
  // 容器样式
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  mobileContainer: {
    width: theme.dimensions.mobileWidth,
    height: theme.dimensions.mobileHeight,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  // 玻璃拟态效果
  glassCard: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  glassCardHover: {
    backgroundColor: 'transparent',
  },

  // 文字样式
  textPrimary: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.regular,
  },

  textSecondary: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.regular,
  },

  textMuted: {
    color: theme.colors.textMuted,
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.normal,
    fontFamily: theme.fontFamily.regular,
  },

  // 标题样式
  title: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    fontFamily: theme.fontFamily.medium,
  },

  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.medium,
    fontFamily: theme.fontFamily.medium,
  },

  // 按钮样式
  button: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
  },

  // 输入框样式
  input: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.base,
  },

  // 布局样式
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  column: {
    flexDirection: 'column',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  // 间距样式
  marginXs: { margin: theme.spacing.xs },
  marginSm: { margin: theme.spacing.sm },
  marginMd: { margin: theme.spacing.md },
  marginLg: { margin: theme.spacing.lg },

  paddingXs: { padding: theme.spacing.xs },
  paddingSm: { padding: theme.spacing.sm },
  paddingMd: { padding: theme.spacing.md },
  paddingLg: { padding: theme.spacing.lg },

  // 滚动容器
  scrollContainer: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },

  // 状态栏样式
  statusBar: {
    height: theme.dimensions.statusBarHeight,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // 底部导航样式
  bottomTab: {
    height: theme.dimensions.bottomTabHeight,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: theme.spacing.sm,
  },
});

// 响应式样式辅助函数
export const responsiveStyles = {
  // 响应式文字大小
  getResponsiveText: (baseSize: number) => createResponsiveStyle({
    small: { fontSize: responsive.fontSize(baseSize * 0.9) },
    medium: { fontSize: responsive.fontSize(baseSize) },
    large: { fontSize: responsive.fontSize(baseSize * 1.1) },
    default: { fontSize: responsive.fontSize(baseSize) },
  }),

  // 响应式间距
  getResponsiveSpacing: (baseSpacing: number) => createResponsiveStyle({
    small: { padding: responsive.spacing(baseSpacing * 0.8) },
    medium: { padding: responsive.spacing(baseSpacing) },
    large: { padding: responsive.spacing(baseSpacing * 1.2) },
    default: { padding: responsive.spacing(baseSpacing) },
  }),

  // 响应式卡片样式
  getResponsiveCard: () => createResponsiveStyle({
    small: {
      padding: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    medium: {
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.lg,
    },
    large: {
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.xl,
    },
    default: {
      padding: theme.spacing.md,
      borderRadius: 0,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  }),
};

// 动画样式
export const animationStyles = {
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
  slideInRight: {
    transform: [{ translateX: 0 }],
  },
  slideOutRight: {
    transform: [{ translateX: responsive.width(300) }],
  },
  scaleIn: {
    transform: [{ scale: 1 }],
  },
  scaleOut: {
    transform: [{ scale: 0.95 }],
  },
};
