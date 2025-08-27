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
import { SCREEN_NAMES, ICONS } from '../constants';
import {
  StatusBar,
  GlassCard,
  BackgroundDecoration,
  MobileContainer
} from '../components';



const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const renderStatusBar = () => <StatusBar />;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerTitle}>发现音乐</Text>
        <View style={styles.musicIcon}>
          <LinearGradient
            colors={[theme.colors.primaryLight, theme.colors.primary]}
            style={styles.musicIconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.music} size={12} color={theme.colors.textPrimary} />
          </LinearGradient>
        </View>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigateToScreen(SCREEN_NAMES.SEARCH)}
        >
          <Icon name={ICONS.search} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigateToScreen(SCREEN_NAMES.PROFILE)}
        >
          <Icon name={ICONS.user} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <GlassCard
        style={styles.quickActionCard}
        touchable
        onPress={() => navigateToScreen(SCREEN_NAMES.LIBRARY)}
      >
        <View style={styles.quickActionContent}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            style={styles.quickActionIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.library} size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.quickActionText}>
            <Text style={styles.quickActionTitle}>我的音乐</Text>
            <Text style={styles.quickActionSubtitle}>128首歌曲</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard
        style={styles.quickActionCard}
        touchable
        onPress={() => navigateToScreen(SCREEN_NAMES.RANKING)}
      >
        <View style={styles.quickActionContent}>
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.primary]}
            style={styles.quickActionIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.trending} size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.quickActionText}>
            <Text style={styles.quickActionTitle}>排行榜</Text>
            <Text style={styles.quickActionSubtitle}>热门歌曲</Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );

  const renderRecentPlayed = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>最近播放</Text>
      <View style={styles.recentPlayedList}>
        <GlassCard
          style={styles.recentPlayedItem}
          touchable
          onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
        >
          <View style={styles.recentPlayedContent}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryLight]}
              style={styles.recentPlayedIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
            </LinearGradient>
            <View style={styles.recentPlayedText}>
              <Text style={styles.recentPlayedTitle}>夜曲</Text>
              <Text style={styles.recentPlayedArtist}>周杰伦</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Icon name={ICONS.play} size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </GlassCard>

        <GlassCard
          style={styles.recentPlayedItem}
          touchable
          onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
        >
          <View style={styles.recentPlayedContent}>
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.primary]}
              style={styles.recentPlayedIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
            </LinearGradient>
            <View style={styles.recentPlayedText}>
              <Text style={styles.recentPlayedTitle}>稻香</Text>
              <Text style={styles.recentPlayedArtist}>周杰伦</Text>
            </View>
            <TouchableOpacity style={styles.playButton}>
              <Icon name={ICONS.play} size={16} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </View>
  );

  const renderRecommendedPlaylists = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>推荐歌单</Text>
      <View style={styles.playlistGrid}>
        <GlassCard
          style={styles.playlistCard}
          touchable
          onPress={() => navigateToScreen(SCREEN_NAMES.PLAYLIST)}
        >
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            style={styles.playlistCover}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.music} size={32} color={theme.colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.playlistTitle}>华语流行</Text>
          <Text style={styles.playlistSubtitle}>50首歌曲</Text>
        </GlassCard>

        <GlassCard
          style={styles.playlistCard}
          touchable
          onPress={() => navigateToScreen(SCREEN_NAMES.PLAYLIST)}
        >
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.primary]}
            style={styles.playlistCover}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.music} size={32} color={theme.colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.playlistTitle}>经典老歌</Text>
          <Text style={styles.playlistSubtitle}>80首歌曲</Text>
        </GlassCard>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        {renderStatusBar()}
        {renderHeader()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderQuickActions()}
          {renderRecentPlayed()}
          {renderRecommendedPlaylists()}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
    fontFamily: theme.fontFamily.medium,
  },
  musicIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  musicIconGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.glassBackground,
    marginLeft: theme.spacing.sm,
  },
  quickActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  quickActionCard: {
    flex: 1,
    padding: theme.spacing.md,
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
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
    fontFamily: theme.fontFamily.medium,
  },
  quickActionSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.regular,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    fontFamily: theme.fontFamily.medium,
  },

  // 最近播放样式
  recentPlayedList: {
    gap: theme.spacing.sm,
  },
  recentPlayedItem: {
    padding: theme.spacing.sm,
  },
  recentPlayedContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentPlayedIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  recentPlayedText: {
    flex: 1,
  },
  recentPlayedTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
    fontFamily: theme.fontFamily.medium,
  },
  recentPlayedArtist: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.regular,
  },
  playButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'transparent',
  },
  // 推荐歌单样式
  playlistGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  playlistCard: {
    flex: 1,
    padding: theme.spacing.md,
  },
  playlistCover: {
    width: '100%',
    height: 96,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  playlistTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
    fontFamily: theme.fontFamily.medium,
  },
  playlistSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontFamily: theme.fontFamily.regular,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
});

export default HomeScreen;
