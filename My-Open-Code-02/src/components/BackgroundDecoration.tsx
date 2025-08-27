import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../styles/theme';

interface BackgroundDecorationProps {
  variant?: 'primary' | 'secondary' | 'accent';
}

const BackgroundDecoration: React.FC<BackgroundDecorationProps> = ({
  variant = 'primary'
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return theme.colors.gradients.secondary;
      case 'accent':
        return theme.colors.gradients.accent;
      default:
        return theme.colors.gradients.primary;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BackgroundDecoration;
