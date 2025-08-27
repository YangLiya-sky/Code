import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { SCREEN_NAMES, ICONS, MOCK_DATA } from '../constants';
import {
  StatusBar,
  GlassCard,
  BackgroundDecoration,
  MobileContainer
} from '../components';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>我的</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigateToScreen(SCREEN_NAMES.SETTINGS)}
        >
          <Icon name={ICONS.settings} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name={ICONS.more} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProfileHeader = () => (
    <GlassCard style={styles.profileCard}>
      <View style={styles.profileInfo}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight]}
          style={styles.avatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={ICONS.user} size={32} color={theme.colors.textPrimary} />
        </LinearGradient>

        <View style={styles.userInfo}>
          <Text style={styles.userName}>音乐爱好者</Text>
          <Text style={styles.userId}>ID: 123456789</Text>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>编辑</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statLabel}>收藏歌曲</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>创建歌单</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>关注歌手</Text>
        </View>
      </View>
    </GlassCard>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.quickActionCard}
        onPress={() => navigateToScreen(SCREEN_NAMES.LIBRARY)}
      >
        <View style={styles.quickActionContent}>
          <LinearGradient
            colors={['#ef4444', '#ec4899']}
            style={styles.quickActionIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.favorite} size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.quickActionText}>
            <Text style={styles.quickActionTitle}>我喜欢的</Text>
            <Text style={styles.quickActionSubtitle}>45首歌曲</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.quickActionCard}>
        <View style={styles.quickActionContent}>
          <LinearGradient
            colors={['#3b82f6', '#6366f1']}
            style={styles.quickActionIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.download} size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.quickActionText}>
            <Text style={styles.quickActionTitle}>已下载</Text>
            <Text style={styles.quickActionSubtitle}>23首歌曲</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderRecentlyPlayed = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>最近播放</Text>
        <TouchableOpacity>
          <Text style={styles.sectionMore}>查看全部</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentList}>
        {MOCK_DATA.recentPlayed.slice(0, 2).map((song, index) => (
          <TouchableOpacity
            key={song.id}
            style={styles.recentItem}
            onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
          >
            <LinearGradient
              colors={index === 0 ? ['#3b82f6', '#06b6d4'] : ['#8b5cf6', '#6366f1']}
              style={styles.recentCover}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
            </LinearGradient>

            <View style={styles.recentInfo}>
              <Text style={styles.recentTitle}>{song.title}</Text>
              <Text style={styles.recentSubtitle}>
                {song.artist} • {index === 0 ? '2小时前' : '昨天'}
              </Text>
            </View>

            <TouchableOpacity style={styles.playButton}>
              <Icon name={ICONS.play} size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMenuItems = () => {
    const menuItems = [
      {
        icon: ICONS.playlist,
        title: '我的歌单',
        subtitle: '管理你的音乐收藏',
        colors: ['#8b5cf6', '#ec4899'],
        onPress: () => navigateToScreen(SCREEN_NAMES.PLAYLIST),
      },
      {
        icon: 'history',
        title: '播放历史',
        subtitle: '查看播放记录',
        colors: ['#10b981', '#059669'],
        onPress: () => { },
      },
      {
        icon: 'trending-up',
        title: '我的排行',
        subtitle: '个人音乐统计',
        colors: ['#f59e0b', '#ef4444'],
        onPress: () => navigateToScreen(SCREEN_NAMES.RANKING),
      },
      {
        icon: 'cloud-download',
        title: '离线音乐',
        subtitle: '管理下载内容',
        colors: ['#06b6d4', '#3b82f6'],
        onPress: () => { },
      },
    ];

    return (
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <LinearGradient
              colors={item.colors}
              style={styles.menuIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={item.icon} size={20} color={theme.colors.textPrimary} />
            </LinearGradient>

            <View style={styles.menuText}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>

            <Icon name="chevron-right" size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

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
          {renderProfileHeader()}
          {renderQuickActions()}
          {renderRecentlyPlayed()}
          {renderMenuItems()}
        </ScrollView>
      </MobileContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xs,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginLeft: theme.spacing.sm,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  profileCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  userId: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  editButton: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  editButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium as any,
    color: theme.colors.textPrimary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  quickActionCard: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quickActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
  },
  sectionMore: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
  },
  recentList: {
    gap: theme.spacing.sm,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: theme.spacing.sm,
  },
  recentCover: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  recentSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  playButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  menuList: {
    gap: theme.spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: theme.spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
});

export default ProfileScreen;
