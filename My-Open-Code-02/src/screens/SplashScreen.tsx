import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { APP_CONFIG, ICONS } from '../constants';
import {
  StatusBar,
  BackgroundDecoration,
  MobileContainer
} from '../components';



const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    // 淡入动画
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // 滑入动画（延迟1秒）
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    // 脉冲动画
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // 自动跳转到主页面（5秒后）
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' as never }],
      });
    }, 5000);

    return () => {
      clearTimeout(timer);
      pulseAnimation.stop();
    };
  }, [navigation, fadeAnim, slideAnim, pulseAnim]);

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' as never }],
    });
  };

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />

        <View style={styles.content}>
          {/* Logo和应用名称 */}
          <Animated.View style={[styles.logoSection, { opacity: fadeAnim }]}>
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.logoBackground}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={64} color={theme.colors.textPrimary} />
              </LinearGradient>
            </Animated.View>
            <Text style={styles.appName}>音乐播放器</Text>
            <Text style={styles.appSlogan}>发现你的音乐世界</Text>
          </Animated.View>

          {/* 功能特色 */}
          <Animated.View
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name="headset" size={24} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>高品质音乐</Text>
                <Text style={styles.featureSubtitle}>享受无损音质体验</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name="favorite" size={24} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>个性推荐</Text>
                <Text style={styles.featureSubtitle}>智能推荐你喜欢的音乐</Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <Icon name={ICONS.download} size={24} color={theme.colors.textSecondary} />
              </View>
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>离线播放</Text>
                <Text style={styles.featureSubtitle}>随时随地享受音乐</Text>
              </View>
            </View>
          </Animated.View>

          {/* 开始按钮 */}
          <Animated.View
            style={[
              styles.startButtonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity style={styles.startButton} onPress={navigateToHome}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.startButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.startButtonText}>开始音乐之旅</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </MobileContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  logoContainer: {
    marginBottom: theme.spacing.lg,
  },
  logoBackground: {
    width: 128,
    height: 128,
    borderRadius: theme.borderRadius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.xl,
  },
  appName: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    fontFamily: theme.fontFamily.bold,
  },
  appSlogan: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
  },
  featuresContainer: {
    width: '100%',
    gap: theme.spacing.lg,
    marginBottom: theme.spacing.xxl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
    fontFamily: theme.fontFamily.medium,
  },
  featureSubtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.regular,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: theme.spacing.lg,
    left: theme.spacing.lg,
    right: theme.spacing.lg,
  },
  startButton: {
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  startButtonGradient: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.medium,
  },
});

export default SplashScreen;
