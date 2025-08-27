import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../styles/theme';
import { globalStyles } from '../styles/globalStyles';
import { SCREEN_NAMES, ICONS } from '../constants';
import {
  StatusBar,
  BackgroundDecoration,
  MobileContainer
} from '../components';

const { width } = Dimensions.get('window');

const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(35);
  const [currentTime, setCurrentTime] = useState(83); // 1:23 in seconds
  const totalTime = 232; // 3:52 in seconds

  // 旋转动画
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 启动旋转动画
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    if (isPlaying) {
      rotateAnimation.start();
    } else {
      rotateAnimation.stop();
    }

    return () => rotateAnimation.stop();
  }, [isPlaying, rotateAnim]);

  useEffect(() => {
    // 模拟播放进度
    const interval = setInterval(() => {
      if (isPlaying && progress < 100) {
        setProgress(prev => prev + 0.1);
        setCurrentTime(prev => prev + 0.1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const goBack = () => {
    navigation.goBack();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

    // 播放按钮缩放动画
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={goBack}>
        <Icon name="keyboard-arrow-down" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>正在播放</Text>
        <Text style={styles.headerSubtitle}>来自 我喜欢的音乐</Text>
      </View>
      <TouchableOpacity style={styles.headerButton}>
        <Icon name="more-horiz" size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  const renderAlbumArt = () => (
    <View style={styles.albumContainer}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary, theme.colors.primaryLight]}
        style={styles.albumBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View
          style={[
            styles.albumArt,
            {
              transform: [{ rotate: spin }],
            },
          ]}
        >
          <LinearGradient
            colors={[theme.colors.backgroundSecondary, theme.colors.background]}
            style={styles.albumInner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name={ICONS.music} size={96} color="rgba(255, 255, 255, 0.8)" />
          </LinearGradient>
        </Animated.View>

        {/* 黑胶唱片中心 */}
        <View style={styles.vinylCenter}>
          <View style={styles.vinylHole} />
        </View>
      </LinearGradient>
    </View>
  );

  const renderSongInfo = () => (
    <View style={styles.songInfo}>
      <Text style={styles.songTitle}>夜曲</Text>
      <Text style={styles.songArtist}>周杰伦</Text>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryLight]}
          style={[styles.progressFill, { width: `${progress}%` }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
        <View style={[styles.progressThumb, { left: `${progress}%` }]} />
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
      </View>
    </View>
  );

  const renderControls = () => (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.controlButton}>
        <Icon name={ICONS.shuffle} size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButtonLarge}>
        <Icon name={ICONS.skip_previous} size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryLight]}
            style={styles.playButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Icon
              name={isPlaying ? ICONS.pause : ICONS.play}
              size={32}
              color={theme.colors.textPrimary}
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.controlButtonLarge}>
        <Icon name={ICONS.skip_next} size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlButton}>
        <Icon name={ICONS.repeat} size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  const renderBottomActions = () => (
    <View style={styles.bottomActions}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name={ICONS.favorite} size={20} color="#ef4444" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate(SCREEN_NAMES.PLAYLIST as never)}
      >
        <Icon name={ICONS.playlist} size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Icon name={ICONS.share} size={20} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <View style={styles.content}>
          <StatusBar />
          {renderHeader()}
          {renderAlbumArt()}
          {renderSongInfo()}
          {renderProgressBar()}
          {renderControls()}
          {renderBottomActions()}
        </View>
      </MobileContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xs,
  },
  headerButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textTertiary,
  },
  albumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  },
  albumBorder: {
    width: 288,
    height: 288,
    borderRadius: 144,
    padding: 4,
    position: 'relative',
  },
  albumArt: {
    width: '100%',
    height: '100%',
    borderRadius: 140,
    overflow: 'hidden',
  },
  albumInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vinylCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -32 }, { translateY: -32 }],
  },
  vinylHole: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  songTitle: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  songArtist: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.textMuted,
  },
  progressContainer: {
    marginBottom: theme.spacing.xl,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.textPrimary,
    ...theme.shadows.sm,
    transform: [{ translateX: -6 }],
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  controlButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  controlButtonLarge: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  playButton: {
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  playButtonGradient: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
});

export default PlayerScreen;
