// 应用常量配置

// 屏幕名称
export const SCREEN_NAMES = {
  SPLASH: 'Splash',
  HOME: 'Home',
  LIBRARY: 'Library',
  PLAYER: 'Player',
  SEARCH: 'Search',
  PLAYLIST: 'Playlist',
  ARTIST: 'Artist',
  SETTINGS: 'Settings',
  PROFILE: 'Profile',
  RANKING: 'Ranking',
} as const;

// 底部导航标签
export const TAB_NAMES = {
  HOME: 'Home',
  LIBRARY: 'Library',
  SEARCH: 'Search',
  PROFILE: 'Profile',
} as const;

// 图标名称映射 (使用react-native-vector-icons/MaterialIcons)
export const ICONS = {
  // 导航图标
  home: 'home',
  library: 'library-music',
  search: 'search',
  user: 'account-circle',

  // 播放控制图标
  play: 'play-arrow',
  pause: 'pause',
  skip_next: 'skip-next',
  skip_previous: 'skip-previous',
  shuffle: 'shuffle',
  repeat: 'repeat',

  // 功能图标
  music: 'music-note',
  playlist: 'playlist-play',
  favorite: 'favorite',
  favorite_border: 'favorite-border',
  more: 'more-vert',
  settings: 'settings',
  back: 'arrow-back',
  close: 'close',

  // 状态图标
  wifi: 'wifi',
  signal: 'signal-cellular-4-bar',
  battery: 'battery-full',

  // 其他图标
  trending: 'trending-up',
  star: 'star',
  download: 'file-download',
  share: 'share',

  // 额外的常用图标
  add: 'add',
  remove: 'remove',
  edit: 'edit',
  delete: 'delete',
  refresh: 'refresh',
  volume_up: 'volume-up',
  volume_down: 'volume-down',
  volume_off: 'volume-off',
} as const;

// 模拟数据
export const MOCK_DATA = {
  // 最近播放
  recentPlayed: [
    {
      id: '1',
      title: '夜曲',
      artist: '周杰伦',
      album: '十一月的萧邦',
      duration: '3:36',
      cover: 'https://via.placeholder.com/60x60/667eea/ffffff?text=夜曲',
    },
    {
      id: '2',
      title: '青花瓷',
      artist: '周杰伦',
      album: '我很忙',
      duration: '3:58',
      cover: 'https://via.placeholder.com/60x60/764ba2/ffffff?text=青花瓷',
    },
    {
      id: '3',
      title: '稻香',
      artist: '周杰伦',
      album: '魔杰座',
      duration: '3:43',
      cover: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=稻香',
    },
  ],

  // 推荐歌单
  recommendedPlaylists: [
    {
      id: '1',
      title: '华语经典',
      description: '经典华语歌曲精选',
      cover: 'https://via.placeholder.com/120x120/8b5cf6/ffffff?text=华语',
      songCount: 50,
    },
    {
      id: '2',
      title: '流行热歌',
      description: '最新流行音乐',
      cover: 'https://via.placeholder.com/120x120/10b981/ffffff?text=流行',
      songCount: 30,
    },
    {
      id: '3',
      title: '怀旧金曲',
      description: '经典怀旧歌曲',
      cover: 'https://via.placeholder.com/120x120/f59e0b/ffffff?text=怀旧',
      songCount: 40,
    },
  ],

  // 热门搜索
  hotSearches: [
    '周杰伦', '邓紫棋', '林俊杰', '陈奕迅', '薛之谦',
    '毛不易', '李荣浩', '张学友', '王菲', '刘德华'
  ],

  // 排行榜
  rankings: [
    {
      id: '1',
      title: '热歌榜',
      description: '最热门的歌曲',
      cover: 'https://via.placeholder.com/80x80/ef4444/ffffff?text=热歌',
    },
    {
      id: '2',
      title: '新歌榜',
      description: '最新发布的歌曲',
      cover: 'https://via.placeholder.com/80x80/06b6d4/ffffff?text=新歌',
    },
    {
      id: '3',
      title: '原创榜',
      description: '优秀原创音乐',
      cover: 'https://via.placeholder.com/80x80/8b5cf6/ffffff?text=原创',
    },
  ],

  // 用户统计
  userStats: {
    totalSongs: 128,
    totalPlaylists: 12,
    totalArtists: 45,
    listeningTime: '156小时',
  },
};

// 动画配置
export const ANIMATION_CONFIG = {
  duration: {
    short: 200,
    medium: 300,
    long: 500,
  },
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// 应用配置
export const APP_CONFIG = {
  name: '音乐播放器',
  version: '1.0.0',
  splashDuration: 3000, // 启动页显示时间（毫秒）
};
