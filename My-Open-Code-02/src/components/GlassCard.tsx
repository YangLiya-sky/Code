import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps
} from 'react-native';
import { theme } from '../styles/theme';
import { deviceType } from '../utils/responsive';

interface GlassCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  touchable?: boolean;
  hover?: boolean;
  variant?: 'default' | 'strong' | 'weak';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  touchable = false,
  hover = false,
  variant = 'default',
  ...props
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'strong':
        return styles.cardStrong;
      case 'weak':
        return styles.cardWeak;
      default:
        return styles.card;
    }
  };

  const cardStyle = [
    getVariantStyle(),
    hover && styles.cardHover,
    style,
  ];

  if (touchable) {
    return (
      <TouchableOpacity style={cardStyle} {...props}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  cardStrong: {
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
  cardWeak: {
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
  cardHover: {
    backgroundColor: 'transparent',
  },
});

export default GlassCard;
