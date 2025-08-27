import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

interface StatusBarProps {
  // 保留接口以兼容现有代码，但不再使用
}

const StatusBar: React.FC<StatusBarProps> = () => {
  return (
    <View style={styles.container}>
      {/* 空的状态栏，只保留间距 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.spacing.md, // 保留一些顶部间距
  },
});

export default StatusBar;
