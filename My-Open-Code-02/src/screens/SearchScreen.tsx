import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setShowResults(text.length > 0);
  };

  const searchFor = (query: string) => {
    setSearchText(query);
    setShowResults(true);
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
        <Text style={styles.headerTitle}>搜索音乐</Text>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Icon name={ICONS.search} size={20} color={theme.colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜索歌曲、歌手、专辑..."
          placeholderTextColor={theme.colors.textMuted}
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => handleSearch('')}
          >
            <Icon name={ICONS.close} size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHotSearches = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>热门搜索</Text>
      <View style={styles.tagContainer}>
        {MOCK_DATA.hotSearches.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tag}
            onPress={() => searchFor(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRecentSearches = () => {
    const recentSearches = ['告白气球', '青花瓷', '稻香'];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近搜索</Text>
        <View style={styles.recentList}>
          {recentSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() => searchFor(search)}
            >
              <Icon name="history" size={16} color={theme.colors.textMuted} />
              <Text style={styles.recentText}>{search}</Text>
              <TouchableOpacity style={styles.removeButton}>
                <Icon name={ICONS.close} size={12} color={theme.colors.textMuted} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderCategories = () => {
    const categories = [
      {
        title: '华语流行',
        subtitle: '最新热门',
        icon: ICONS.favorite,
        colors: ['#ef4444', '#ec4899']
      },
      {
        title: '经典老歌',
        subtitle: '怀旧金曲',
        icon: ICONS.music,
        colors: ['#3b82f6', '#6366f1']
      },
      {
        title: '欧美流行',
        subtitle: '国际热门',
        icon: 'language',
        colors: ['#10b981', '#06b6d4']
      },
      {
        title: '民谣摇滚',
        subtitle: '独立音乐',
        icon: 'music-note',
        colors: ['#f59e0b', '#ef4444']
      },
    ];

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>音乐分类</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryCard}>
              <LinearGradient
                colors={category.colors}
                style={styles.categoryIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={category.icon} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderSearchResults = () => (
    <View style={styles.resultsContainer}>
      {/* 歌曲结果 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>歌曲</Text>
        <View style={styles.resultsList}>
          {MOCK_DATA.recentPlayed.map((song) => (
            <TouchableOpacity
              key={song.id}
              style={styles.resultItem}
              onPress={() => navigateToScreen(SCREEN_NAMES.PLAYER)}
            >
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryLight]}
                style={styles.resultIcon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name={ICONS.music} size={24} color={theme.colors.textPrimary} />
              </LinearGradient>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>{song.title}</Text>
                <Text style={styles.resultSubtitle}>{song.artist} • {song.album}</Text>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Icon name={ICONS.play} size={16} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 歌手结果 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>歌手</Text>
        <View style={styles.resultsList}>
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigateToScreen(SCREEN_NAMES.ARTIST)}
          >
            <LinearGradient
              colors={[theme.colors.secondary, theme.colors.primary]}
              style={[styles.resultIcon, { borderRadius: theme.borderRadius.full }]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name={ICONS.user} size={24} color={theme.colors.textPrimary} />
            </LinearGradient>
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>周杰伦</Text>
              <Text style={styles.resultSubtitle}>华语流行歌手</Text>
            </View>
            <Icon name="chevron-right" size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 专辑结果 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>专辑</Text>
        <View style={styles.resultsList}>
          <TouchableOpacity style={styles.resultItem}>
            <LinearGradient
              colors={['#10b981', '#06b6d4']}
              style={styles.resultIcon}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Icon name="album" size={24} color={theme.colors.textPrimary} />
            </LinearGradient>
            <View style={styles.resultInfo}>
              <Text style={styles.resultTitle}>十一月的萧邦</Text>
              <Text style={styles.resultSubtitle}>周杰伦 • 2005</Text>
            </View>
            <Icon name="chevron-right" size={16} color={theme.colors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <BackgroundDecoration />

      <MobileContainer>
        <StatusBar />
        {renderHeader()}
        {renderSearchBar()}

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {showResults ? renderSearchResults() : (
            <>
              {renderHotSearches()}
              {renderRecentSearches()}
              {renderCategories()}
            </>
          )}
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
  searchContainer: {
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.fontSize.base,
    color: theme.colors.textPrimary,
  },
  clearButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tagText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
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
  recentText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  removeButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  categoryCard: {
    width: '48%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
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
  resultsContainer: {
    gap: theme.spacing.lg,
  },
  resultsList: {
    gap: theme.spacing.sm,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    gap: theme.spacing.sm,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold as any,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.textMuted,
  },
  playButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export default SearchScreen;
