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
import { SCREEN_NAMES, ICONS } from '../constants';
import {
  StatusBar,
  GlassCard,
  BackgroundDecoration,
  MobileContainer
} from '../components';

const RankingScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedChart, setSelectedChart] = useState('hot');

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
        <Text style={styles.headerTitle}>音乐排行榜</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="refresh" size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderChartSelector = () => {
    const charts = [
      { key: 'hot', label: '热歌榜' },
      { key: 'new', label: '新歌榜' },
      { key: 'rising', label: '飙升榜' },
      { key: 'original', label: '原创榜' },
    ];

    return (
      <View style={styles.chartSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartTabs}>
            {charts.map((chart) => (
              <TouchableOpacity
                key={chart.key}
                style={[
                  styles.chartTab,
                  selectedChart === chart.key && styles.chartTabActive,
                ]}
                onPress={() => setSelectedChart(chart.key)}
              >
                {selectedChart === chart.key ? (
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryLight]}
                    style={styles.chartTabGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.chartTabTextActive}>{chart.label}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.chartTabText}>{chart.label}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderChartInfo = () => (
    <GlassCard style={styles.chartInfo}>
      <View style={styles.chartInfoContent}>
        <View style={styles.chartInfoText}>
          <Text style={styles.chartInfoLabel}>热歌榜</Text>
          <Text style={styles.chartInfoTitle}>Top 100</Text>
          <Text style={styles.chartInfoSubtitle}>每日更新 • 最后更新: 今天 06:00</Text>
        </View>
        <LinearGradient
          colors={['#f59e0b', '#ef4444']}
          style={styles.chartInfoIcon}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Icon name={ICONS.trending} size={20} color={theme.colors.textPrimary} />
        </LinearGradient>
      </View>
    </GlassCard>
  );

  const renderTopThree = () => {
    const topThree = [
      {
        rank: 1,
        title: '夜曲',
        artist: '周杰伦',
        change: '+2',
        changeType: 'up',
        colors: ['#3b82f6', '#06b6d4'],
        bgColors: ['rgba(251, 191, 36, 0.2)', 'rgba(245, 158, 11, 0.2)'],
        borderColor: 'rgba(251, 191, 36, 0.3)',
      },
      {
        rank: 2,
        title: '告白气球',
        artist: '周杰伦',
        change: '0',
        changeType: 'same',
        colors: ['#8b5cf6', '#6366f1'],
        bgColors: ['rgba(156, 163, 175, 0.2)', 'rgba(100, 116, 139, 0.2)'],
        borderColor: 'rgba(156, 163, 175, 0.3)',
      },
      {
        rank: 3,
        title: '青花瓷',
        artist: '周杰伦',
        change: '-1',
        changeType: 'down',
        colors: ['#10b981', '#06b6d4'],
        bgColors: ['rgba(217, 119, 6, 0.2)', 'rgba(251, 191, 36, 0.2)'],
        borderColor: 'rgba(217, 119, 6, 0.3)',
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>前三名</Text>
        <View style={styles.topThreeList}>
          {topThree.map((song) => (
            <TouchableOpacity
              key={song.rank}
              style={[
                styles.topThreeItem,
                {
                  backgroundColor: `rgba(${song.rank === 1 ? '251, 191, 36' : song.rank === 2 ? '156, 163, 175' : '217, 119, 6'}, 0.1)`,
                  borderColor: song.borderColor,
                }
              ]}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
            >
              <View style={styles.rankContainer}>
                <Text style={[
                  styles.rankNumber,
                  song.rank <= 3 && styles.rankNumberTop3
                ]}>
                  {song.rank}
                </Text>
              </View>

              <LinearGradient
                colors={song.colors}
                style={styles.songCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>

              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </View>

              <View style={styles.songActions}>
                <View style={styles.changeIndicator}>
                  <Icon
                    name={
                      song.changeType === 'up' ? 'trending-up' :
                        song.changeType === 'down' ? 'trending-down' : 'remove'
                    }
                    size={12}
                    color={
                      song.changeType === 'up' ? '#10b981' :
                        song.changeType === 'down' ? '#ef4444' : theme.colors.textMuted
                    }
                  />
                  <Text style={[
                    styles.changeText,
                    {
                      color: song.changeType === 'up' ? '#10b981' :
                        song.changeType === 'down' ? '#ef4444' : theme.colors.textMuted
                    }
                  ]}>
                    {song.change}
                  </Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Icon name={ICONS.play} size={16} color={theme.colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderRankingList = () => {
    const rankings = [
      { rank: 4, title: '稻香', artist: '周杰伦', change: '+3', changeType: 'up', colors: ['#f97316', '#ef4444'] },
      { rank: 5, title: '七里香', artist: '周杰伦', change: '-2', changeType: 'down', colors: ['#8b5cf6', '#ec4899'] },
      { rank: 6, title: '简单爱', artist: '周杰伦', change: '0', changeType: 'same', colors: ['#3b82f6', '#6366f1'] },
      { rank: 7, title: '东风破', artist: '周杰伦', change: '+1', changeType: 'up', colors: ['#10b981', '#06d6a0'] },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4-20名</Text>
        <View style={styles.rankingList}>
          {rankings.map((song) => (
            <TouchableOpacity
              key={song.rank}
              style={styles.rankingItem}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rankNumber}>{song.rank}</Text>
              </View>

              <LinearGradient
                colors={song.colors}
                style={styles.rankingSongCover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={20} color={theme.colors.textPrimary} />
              </LinearGradient>

              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.title}</Text>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </View>

              <View style={styles.songActions}>
                <View style={styles.changeIndicator}>
                  <Icon
                    name={
                      song.changeType === 'up' ? 'trending-up' :
                        song.changeType === 'down' ? 'trending-down' : 'remove'
                    }
                    size={12}
                    color={
                      song.changeType === 'up' ? '#10b981' :
                        song.changeType === 'down' ? '#ef4444' : theme.colors.textMuted
                    }
                  />
                  <Text style={[
                    styles.changeText,
                    {
                      color: song.changeType === 'up' ? '#10b981' :
                        song.changeType === 'down' ? '#ef4444' : theme.colors.textMuted
                    }
                  ]}>
                    {song.change}
                  </Text>
                </View>
                <TouchableOpacity style={styles.smallPlayButton}>
                  <Icon name={ICONS.play} size={12} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.viewMoreContainer}>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>查看完整榜单</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />
        {renderHeader()}
        {renderChartSelector()}
        {renderChartInfo()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderTopThree()}
          {renderRankingList()}
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
    fontFamily: theme.fontFamily.medium,
  },
  chartSelector: {
    marginBottom: theme.spacing.lg,
  },
  chartTabs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  chartTab: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  chartTabActive: {
    // Active tab styling handled by gradient
  },
  chartTabGradient: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  chartTabText: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium as any,
    color: theme.colors.textMuted,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.full,
    fontFamily: theme.fontFamily.regular,
  },
  chartTabTextActive: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    fontFamily: theme.fontFamily.medium,
  },
  chartInfo: {
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  chartInfoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chartInfoText: {
    flex: 1,
  },
  chartInfoLabel: {
    fontSize: 13,
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  chartInfoTitle: {
    fontSize: 22,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  chartInfoSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  chartInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  topThreeList: {
    gap: theme.spacing.sm,
  },
  topThreeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    gap: theme.spacing.sm,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankNumber: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textMuted,
  },
  rankNumberTop3: {
    fontSize: theme.fontSize['2xl'],
    color: '#fbbf24', // Golden color for top 3
    // Note: React Native doesn't support gradient text like CSS
    // This would need a custom implementation or library
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
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium as any,
  },
  playButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rankingList: {
    gap: theme.spacing.sm,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: theme.spacing.sm,
  },
  rankingSongCover: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallPlayButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  viewMoreContainer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  viewMoreButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  viewMoreText: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily.regular,
  },
});

export default RankingScreen;
