import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../styles/theme';
import { useResponsiveStyle } from '../hooks/useResponsive';

interface GradientButtonProps extends TouchableOpacityProps {
  title?: string;
  icon?: string;
  iconSize?: number;
  colors?: string[];
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'accent';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  icon,
  iconSize = 20,
  colors,
  size = 'medium',
  variant = 'primary',
  style,
  textStyle,
  ...props
}) => {
  const { getScaledSize, isSmallScreen } = useResponsiveStyle();
  const getColors = () => {
    if (colors) return colors;

    switch (variant) {
      case 'secondary':
        return theme.colors.gradients.secondary;
      case 'accent':
        return theme.colors.gradients.accent;
      default:
        return theme.colors.gradients.primary;
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.borderRadius.sm,
        };
      case 'large':
        return {
          paddingHorizontal: theme.spacing.xl,
          paddingVertical: theme.spacing.md,
          borderRadius: theme.borderRadius.lg,
        };
      default:
        return {
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.borderRadius.md,
        };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return theme.fontSize.sm;
      case 'large':
        return theme.fontSize.lg;
      default:
        return theme.fontSize.base;
    }
  };

  const responsiveIconSize = getScaledSize(isSmallScreen ? iconSize * 0.9 : iconSize);

  return (
    <TouchableOpacity style={[styles.button, getSize(), style]} {...props}>
      <LinearGradient
        colors={getColors()}
        style={[styles.gradient, getSize()]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {icon && (
          <Icon
            name={icon}
            size={responsiveIconSize}
            color={theme.colors.textPrimary}
            style={title ? styles.iconWithText : undefined}
          />
        )}
        {title && (
          <Text style={[styles.text, { fontSize: getFontSize() }, textStyle]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    ...theme.shadows.sm,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeight.medium,
    textAlign: 'center',
  },
  iconWithText: {
    marginRight: theme.spacing.xs,
  },
});

export default GradientButton;
