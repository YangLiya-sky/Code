import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';
import { deviceType } from '../utils/responsive';

interface MobileContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* 玻璃效果背景 */}
      <View style={styles.glassBackground} />

      {/* 内容 */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    overflow: 'hidden',
    // 移除边距和圆角，让内容填满整个屏幕
    marginHorizontal: 0,
    borderRadius: 0,
  },
  glassBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    paddingTop: deviceType.isIOS ? theme.spacing.lg : theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
});

export default MobileContainer;
