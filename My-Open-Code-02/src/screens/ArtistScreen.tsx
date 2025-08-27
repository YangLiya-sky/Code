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
  MobileContainer,
  GradientButton
} from '../components';

const ArtistScreen: React.FC = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const playAll = () => {
    navigateToScreen(SCREEN_NAMES.PLAYER);
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
        <Text style={styles.headerTitle}>歌手</Text>
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

  const renderArtistHeader = () => (
    <GlassCard style={styles.artistHeader}>
      <View style={styles.artistInfo}>
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.primary]}
          style={styles.artistAvatar}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={ICONS.user} size={64} color={theme.colors.textPrimary} />
        </LinearGradient>

        <Text style={styles.artistName}>周杰伦</Text>
        <Text style={styles.artistDescription}>华语流行歌手 • 1,234万粉丝</Text>

        <View style={styles.artistActions}>
          <GradientButton
            title="播放热门"
            size="small"
            onPress={playAll}
            style={styles.playButton}
          />
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>关注</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GlassCard>
  );

  const renderStats = () => {
    const stats = [
      { label: '歌曲', value: '128' },
      { label: '专辑', value: '18' },
      { label: '播放量', value: '1.2亿' },
    ];

    return (
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <GlassCard key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </GlassCard>
        ))}
      </View>
    );
  };

  const renderPopularSongs = () => {
    const songs = [
      { id: '1', title: '夜曲', album: '十一月的萧邦 • 2005', duration: '3:52', rank: 1, colors: ['#3b82f6', '#06b6d4'], liked: true },
      { id: '2', title: '告白气球', album: '周杰伦的床边故事 • 2016', duration: '3:35', rank: 2, colors: ['#8b5cf6', '#6366f1'], liked: false },
      { id: '3', title: '青花瓷', album: '我很忙 • 2007', duration: '3:58', rank: 3, colors: ['#10b981', '#06b6d4'], liked: true },
    ];

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>热门歌曲</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看全部</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.songList}>
          {songs.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.songItem}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
            >
              <Text style={styles.songRank}>{song.rank}</Text>

              <LinearGradient
                colors={song.colors}
                style={styles.songCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>

              <View style={styles.songInfo}>
                <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                <Text style={styles.songAlbum} numberOfLines={1}>{song.album}</Text>
              </View>

              <View style={styles.songActions}>
                <Text style={styles.songDuration}>{song.duration}</Text>
                <TouchableOpacity style={styles.likeButton}>
                  <Icon
                    name={song.liked ? ICONS.favorite : ICONS.favorite_border}
                    size={12}
                    color={song.liked ? '#ef4444' : theme.colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderAlbums = () => {
    const albums = [
      { id: '1', title: '十一月的萧邦', year: '2005', colors: ['#3b82f6', '#8b5cf6'] },
      { id: '2', title: '我很忙', year: '2007', colors: ['#10b981', '#06b6d4'] },
      { id: '3', title: '魔杰座', year: '2008', colors: ['#f59e0b', '#ef4444'] },
    ];

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>专辑</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看全部</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.albumList}>
            {albums.map((album) => (
              <TouchableOpacity key={album.id} style={styles.albumItem}>
                <LinearGradient
                  colors={album.colors}
                  style={styles.albumCover}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Icon name="album" size={32} color={theme.colors.textPrimary} />
                </LinearGradient>
                <Text style={styles.albumTitle} numberOfLines={2}>{album.title}</Text>
                <Text style={styles.albumYear}>{album.year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />
        {renderHeader()}
        {renderArtistHeader()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderStats()}
          {renderPopularSongs()}
          {renderAlbums()}
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    marginRight: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
  },
  artistHeader: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  artistInfo: {
    alignItems: 'center',
  },
  artistAvatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  artistName: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  artistDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  artistActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  playButton: {
    paddingHorizontal: theme.spacing.lg,
  },
  followButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  followButtonText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: theme.spacing.sm,
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
    gap: theme.spacing.sm,
  },
  songRank: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textMuted,
    width: 24,
    textAlign: 'center',
  },
  songCover: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songInfo: {
    flex: 1,
    minWidth: 0,
  },
  songTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  songAlbum: {
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
  likeButton: {
    padding: 4,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  albumList: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    paddingHorizontal: theme.spacing.xs,
  },
  albumItem: {
    width: 120,
    alignItems: 'center',
  },
  albumCover: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  albumTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 18,
  },
  albumYear: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});

export default ArtistScreen;
