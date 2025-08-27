import React, { useState } from 'react';
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
  MobileContainer,
  GradientButton
} from '../components';

const PlaylistScreen: React.FC = () => {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState('recent');

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
        <Text style={styles.headerTitle}>我喜欢的音乐</Text>
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

  const renderPlaylistHeader = () => (
    <GlassCard style={styles.playlistHeader}>
      <View style={styles.playlistInfo}>
        <LinearGradient
          colors={['#ef4444', '#ec4899']}
          style={styles.playlistCover}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={ICONS.favorite} size={40} color={theme.colors.textPrimary} />
        </LinearGradient>

        <View style={styles.playlistDetails}>
          <Text style={styles.playlistTitle}>我喜欢的音乐</Text>
          <Text style={styles.playlistStats}>45首歌曲 • 3小时12分钟</Text>

          <View style={styles.playlistActions}>
            <GradientButton
              title="播放全部"
              size="small"
              onPress={playAll}
              style={styles.playAllButton}
            />
            <TouchableOpacity style={styles.shuffleButton}>
              <Icon name={ICONS.shuffle} size={16} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GlassCard>
  );

  const renderSortOptions = () => {
    const sortOptions = [
      { key: 'recent', label: '最近添加' },
      { key: 'artist', label: '歌手' },
      { key: 'title', label: '标题' },
    ];

    return (
      <View style={styles.sortContainer}>
        <View style={styles.sortOptions}>
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortOption,
                sortBy === option.key && styles.sortOptionActive,
              ]}
              onPress={() => setSortBy(option.key)}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortBy === option.key && styles.sortOptionTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.listViewButton}>
          <Icon name="view-list" size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSongList = () => {
    const songs = [
      { id: '1', title: '夜曲', artist: '周杰伦', duration: '3:52', colors: ['#3b82f6', '#06b6d4'] },
      { id: '2', title: '告白气球', artist: '周杰伦', duration: '3:35', colors: ['#8b5cf6', '#6366f1'] },
      { id: '3', title: '青花瓷', artist: '周杰伦', duration: '3:58', colors: ['#10b981', '#06b6d4'] },
      { id: '4', title: '稻香', artist: '周杰伦', duration: '3:43', colors: ['#f59e0b', '#ef4444'] },
      { id: '5', title: '七里香', artist: '周杰伦', duration: '4:05', colors: ['#ec4899', '#8b5cf6'] },
      { id: '6', title: '简单爱', artist: '周杰伦', duration: '4:30', colors: ['#06b6d4', '#3b82f6'] },
    ];

    return (
      <View style={styles.songList}>
        {songs.map((song) => (
          <TouchableOpacity
            key={song.id}
            style={styles.songItem}
            onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
          >
            <View style={styles.songCoverContainer}>
              <LinearGradient
                colors={song.colors}
                style={styles.songCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>
              <View style={styles.playOverlay}>
                <Icon name={ICONS.play} size={16} color={theme.colors.textPrimary} />
              </View>
            </View>

            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
              <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
            </View>

            <View style={styles.songActions}>
              <Text style={styles.songDuration}>{song.duration}</Text>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name={ICONS.favorite} size={12} color="#ef4444" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="more-horiz" size={12} color={theme.colors.textMuted} />
              </TouchableOpacity>
            </View>
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
        {renderPlaylistHeader()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderSortOptions()}
          {renderSongList()}
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
  playlistHeader: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  playlistInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  playlistCover: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistDetails: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  playlistStats: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  playlistActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  playAllButton: {
    paddingHorizontal: theme.spacing.lg,
  },
  shuffleButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  sortOption: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  sortOptionActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sortOptionText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
    fontWeight: theme.fontWeight.medium as any,
  },
  sortOptionTextActive: {
    color: theme.colors.textPrimary,
  },
  listViewButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
  songCoverContainer: {
    position: 'relative',
  },
  songCover: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
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
  actionButton: {
    padding: 4,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
});

export default PlaylistScreen;
