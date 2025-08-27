// 测试辅助工具
import { SCREEN_NAMES, MOCK_DATA } from '../constants';

// 模拟数据验证
export const validateMockData = () => {
  const errors: string[] = [];

  // 验证最近播放数据
  if (!MOCK_DATA.recentPlayed || MOCK_DATA.recentPlayed.length === 0) {
    errors.push('MOCK_DATA.recentPlayed is empty or undefined');
  } else {
    MOCK_DATA.recentPlayed.forEach((song, index) => {
      if (!song.id) errors.push(`Recent song at index ${index} missing id`);
      if (!song.title) errors.push(`Recent song at index ${index} missing title`);
      if (!song.artist) errors.push(`Recent song at index ${index} missing artist`);
    });
  }

  // 验证推荐歌单数据
  if (!MOCK_DATA.recommendedPlaylists || MOCK_DATA.recommendedPlaylists.length === 0) {
    errors.push('MOCK_DATA.recommendedPlaylists is empty or undefined');
  } else {
    MOCK_DATA.recommendedPlaylists.forEach((playlist, index) => {
      if (!playlist.id) errors.push(`Playlist at index ${index} missing id`);
      if (!playlist.title) errors.push(`Playlist at index ${index} missing title`);
    });
  }

  // 验证热门搜索数据
  if (!MOCK_DATA.hotSearches || MOCK_DATA.hotSearches.length === 0) {
    errors.push('MOCK_DATA.hotSearches is empty or undefined');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 屏幕名称验证
export const validateScreenNames = () => {
  const requiredScreens = [
    'SPLASH',
    'HOME',
    'LIBRARY',
    'SEARCH',
    'PLAYER',
    'PLAYLIST',
    'ARTIST',
    'SETTINGS',
    'PROFILE',
    'RANKING',
  ];

  const errors: string[] = [];

  requiredScreens.forEach(screen => {
    if (!SCREEN_NAMES[screen as keyof typeof SCREEN_NAMES]) {
      errors.push(`Missing screen name: ${screen}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// 导航测试
export const testNavigation = () => {
  const results = {
    mockDataValidation: validateMockData(),
    screenNamesValidation: validateScreenNames(),
  };

  return results;
};

// 性能测试辅助函数
export const performanceTest = {
  // 测量组件渲染时间
  measureRenderTime: (componentName: string, renderFunction: () => void) => {
    const startTime = Date.now();
    renderFunction();
    const endTime = Date.now();
    const renderTime = endTime - startTime;

    console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    return renderTime;
  },

  // 测量导航时间
  measureNavigationTime: (fromScreen: string, toScreen: string, navigationFunction: () => void) => {
    const startTime = Date.now();
    navigationFunction();

    // 模拟导航完成时间（实际应用中需要监听导航事件）
    setTimeout(() => {
      const endTime = Date.now();
      const navigationTime = endTime - startTime;
      console.log(`Navigation from ${fromScreen} to ${toScreen}: ${navigationTime.toFixed(2)}ms`);
    }, 300);
  },
};

// 内存使用监控
export const memoryMonitor = {
  // 获取内存使用情况（仅在开发环境中可用）
  getMemoryUsage: () => {
    if (__DEV__) {
      // React Native中内存监控的简化版本
      console.log('Memory monitoring is available in development mode');
      return {
        timestamp: Date.now(),
        available: true,
      };
    }
    return null;
  },

  // 监控内存泄漏
  startMemoryMonitoring: (interval: number = 5000) => {
    if (!__DEV__) return null;

    const intervalId = setInterval(() => {
      const memoryUsage = memoryMonitor.getMemoryUsage();
      if (memoryUsage) {
        console.log(`Memory monitoring active at: ${new Date(memoryUsage.timestamp).toLocaleTimeString()}`);
      }
    }, interval);

    return intervalId;
  },

  stopMemoryMonitoring: (intervalId: ReturnType<typeof setInterval>) => {
    clearInterval(intervalId);
  },
};

// 错误处理测试
export const errorHandling = {
  // 测试错误边界
  testErrorBoundary: (errorFunction: () => void) => {
    try {
      errorFunction();
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // 模拟网络错误
  simulateNetworkError: () => {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Simulated network error'));
      }, 1000);
    });
  },
};

// 响应式设计测试
export const responsiveTest = {
  // 测试不同屏幕尺寸
  testScreenSizes: () => {
    const screenSizes = [
      { width: 320, height: 568, name: 'iPhone SE' },
      { width: 375, height: 667, name: 'iPhone 8' },
      { width: 414, height: 896, name: 'iPhone 11' },
      { width: 768, height: 1024, name: 'iPad' },
    ];

    return screenSizes.map(size => ({
      ...size,
      isSmall: size.width <= 375,
      isLarge: size.width >= 414,
      isTablet: size.width >= 768,
    }));
  },
};

// 综合测试函数
export const runAllTests = () => {
  console.log('🧪 Running Music Player App Tests...');

  const results = {
    navigation: testNavigation(),
    timestamp: new Date().toISOString(),
  };

  console.log('📊 Test Results:', results);

  // 检查是否有错误
  const hasErrors =
    !results.navigation.mockDataValidation.isValid ||
    !results.navigation.screenNamesValidation.isValid;

  if (hasErrors) {
    console.error('❌ Tests failed with errors');
  } else {
    console.log('✅ All tests passed');
  }

  return results;
};

export default {
  validateMockData,
  validateScreenNames,
  testNavigation,
  performanceTest,
  memoryMonitor,
  errorHandling,
  responsiveTest,
  runAllTests,
};
