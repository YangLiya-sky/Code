import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { SCREEN_NAMES, ICONS } from '../constants';
import {
  StatusBar,
  GlassCard,
  BackgroundDecoration,
  MobileContainer
} from '../components';

// 开关组件
interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.1)', theme.colors.primary],
  });

  return (
    <TouchableOpacity
      style={styles.toggleContainer}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.toggleTrack, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.toggleThumb,
            { transform: [{ translateX }] }
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  // 设置状态
  const [settings, setSettings] = useState({
    audioEnhancement: true,
    autoPlay: true,
    loopMode: false,
    crossfade: true,
    wifiOnlyDownload: true,
    privateMode: false,
    sharePlayingStatus: true,
  });

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={goBack}
        >
          <Icon name={ICONS.back} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>设置</Text>
      </View>
    </View>
  );

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle: string,
    colors: string[],
    hasToggle: boolean = false,
    toggleKey?: keyof typeof settings,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={hasToggle}
    >
      <View style={styles.settingContent}>
        <LinearGradient
          colors={colors}
          style={styles.settingIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={icon} size={20} color={theme.colors.textPrimary} />
        </LinearGradient>

        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>

      {hasToggle && toggleKey ? (
        <ToggleSwitch
          value={settings[toggleKey]}
          onValueChange={(value) => updateSetting(toggleKey, value)}
        />
      ) : (
        <Icon name="chevron-right" size={16} color={theme.colors.textMuted} />
      )}
    </TouchableOpacity>
  );

  const renderAudioSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>音频设置</Text>
      <View style={styles.settingsList}>
        {renderSettingItem(
          'volume-up',
          '音质',
          '高品质 (320kbps)',
          [theme.colors.primary, theme.colors.primaryLight]
        )}
        {renderSettingItem(
          'equalizer',
          '均衡器',
          '流行音乐',
          [theme.colors.secondary, theme.colors.primary]
        )}
        {renderSettingItem(
          'headset',
          '音效增强',
          '提升音质体验',
          ['#10b981', '#06b6d4'],
          true,
          'audioEnhancement'
        )}
      </View>
    </View>
  );

  const renderPlaybackSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>播放设置</Text>
      <View style={styles.settingsList}>
        {renderSettingItem(
          ICONS.shuffle,
          '自动播放',
          '歌曲结束后自动播放下一首',
          ['#f59e0b', '#ef4444'],
          true,
          'autoPlay'
        )}
        {renderSettingItem(
          ICONS.repeat,
          '循环播放',
          '单曲循环',
          ['#8b5cf6', '#ec4899'],
          true,
          'loopMode'
        )}
        {renderSettingItem(
          'tune',
          '淡入淡出',
          '歌曲切换时的过渡效果',
          ['#3b82f6', '#6366f1'],
          true,
          'crossfade'
        )}
      </View>
    </View>
  );

  const renderDownloadSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>下载设置</Text>
      <View style={styles.settingsList}>
        {renderSettingItem(
          'wifi',
          '仅WiFi下载',
          '节省移动数据流量',
          ['#10b981', '#059669'],
          true,
          'wifiOnlyDownload'
        )}
        {renderSettingItem(
          ICONS.download,
          '下载质量',
          '高品质 (320kbps)',
          ['#f59e0b', '#f97316']
        )}
        {renderSettingItem(
          'storage',
          '存储管理',
          '已使用 2.3GB / 32GB',
          ['#ef4444', '#ec4899']
        )}
      </View>
    </View>
  );

  const renderPrivacySettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>隐私设置</Text>
      <View style={styles.settingsList}>
        {renderSettingItem(
          'visibility-off',
          '私密模式',
          '不记录播放历史',
          ['#64748b', '#475569'],
          true,
          'privateMode'
        )}
        {renderSettingItem(
          ICONS.share,
          '分享播放状态',
          '让朋友看到你在听什么',
          ['#14b8a6', '#06b6d4'],
          true,
          'sharePlayingStatus'
        )}
      </View>
    </View>
  );

  const renderAboutSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>关于</Text>
      <View style={styles.settingsList}>
        {renderSettingItem(
          'info',
          '版本信息',
          'v2.1.0',
          ['#6366f1', '#8b5cf6']
        )}
        {renderSettingItem(
          ICONS.favorite,
          '反馈建议',
          '帮助我们改进产品',
          ['#ec4899', '#f43f5e']
        )}
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />
        {renderHeader()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderAudioSettings()}
          {renderPlaybackSettings()}
          {renderDownloadSettings()}
          {renderPrivacySettings()}
          {renderAboutSettings()}
        </ScrollView>
      </MobileContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  // 开关组件样式
  toggleContainer: {
    width: 44,
    height: 24,
  },
  toggleTrack: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.textPrimary,
    ...theme.shadows.sm,
  },

  // 页面样式
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xs,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  settingsList: {
    gap: theme.spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
});

export default SettingsScreen;
