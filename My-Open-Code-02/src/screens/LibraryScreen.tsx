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

const LibraryScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const goBack = () => {
    navigation.goBack();
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
        <Text style={styles.headerTitle}>我的音乐库</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigateToScreen(SCREEN_NAMES.SEARCH)}
        >
          <Icon name={ICONS.search} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name={ICONS.more} size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStatsCard = () => (
    <GlassCard style={styles.statsCard}>
      <View style={styles.statsContent}>
        <View style={styles.statsText}>
          <Text style={styles.statsLabel}>音乐统计</Text>
          <Text style={styles.statsNumber}>128首</Text>
          <Text style={styles.statsSubtitle}>总时长 8小时42分钟</Text>
        </View>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight]}
          style={styles.statsIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={ICONS.music} size={20} color={theme.colors.textPrimary} />
        </LinearGradient>
      </View>
    </GlassCard>
  );

  const renderCategories = () => (
    <View style={styles.categories}>
      <GlassCard
        style={styles.categoryCard}
        touchable
        onPress={() => navigateToScreen(SCREEN_NAMES.ARTIST)}
      >
        <View style={styles.categoryContent}>
          <LinearGradient
            colors={[theme.colors.secondary, theme.colors.primary]}
            style={styles.categoryIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="mic" size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>歌手</Text>
            <Text style={styles.categorySubtitle}>32位歌手</Text>
          </View>
        </View>
      </GlassCard>

      <GlassCard
        style={styles.categoryCard}
        touchable
        onPress={() => navigateToScreen(SCREEN_NAMES.PLAYLIST)}
      >
        <View style={styles.categoryContent}>
          <LinearGradient
            colors={[theme.colors.primaryLight, theme.colors.primary]}
            style={styles.categoryIcon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="album" size={20} color={theme.colors.textPrimary} />
          </LinearGradient>
          <View style={styles.categoryText}>
            <Text style={styles.categoryTitle}>专辑</Text>
            <Text style={styles.categorySubtitle}>18张专辑</Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />
        {renderHeader()}
        {renderStatsCard()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderCategories()}
          {renderRecentlyAdded()}
          {renderMyPlaylists()}
        </ScrollView>
      </MobileContainer>
    </View>
  );

  function renderRecentlyAdded() {
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>最近添加</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看全部</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.songList}>
          {MOCK_DATA.recentPlayed.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.songItem}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.songCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist} • {song.album}</Text>
              </View>
              <View style={styles.songActions}>
                <Text style={styles.songDuration}>{song.duration}</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name={ICONS.favorite_border} size={12} color={theme.colors.textMuted} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderMyPlaylists() {
    const playlists = [
      { id: '1', title: '我喜欢的音乐', count: '45首歌曲', icon: ICONS.favorite, colors: ['#ef4444', '#ec4899'] },
      { id: '2', title: '最近播放', count: '23首歌曲', icon: ICONS.playlist, colors: ['#8b5cf6', '#3b82f6'] },
      { id: '3', title: '华语经典', count: '67首歌曲', icon: ICONS.playlist, colors: ['#10b981', '#06b6d4'] },
    ];

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>我的歌单</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>管理</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.playlistList}>
          {playlists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              style={styles.playlistItem}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYLIST)}
            >
              <LinearGradient
                colors={playlist.colors}
                style={styles.playlistCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={playlist.icon} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistTitle}>{playlist.title}</Text>
                <Text style={styles.playlistCount}>{playlist.count}</Text>
              </View>
              <Icon name="chevron-right" size={16} color={theme.colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
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
  headerRight: {
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
  statsCard: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statsText: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  statsNumber: {
    fontSize: 26,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  statsSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categories: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  categoryCard: {
    flex: 1,
    padding: theme.spacing.md,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  categorySubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
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
  songList: {
    gap: theme.spacing.sm,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  songCover: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  songArtist: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  songDuration: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  favoriteButton: {
    padding: 4,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  playlistList: {
    gap: theme.spacing.sm,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  playlistCover: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  playlistCount: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
});

export default LibraryScreen;
