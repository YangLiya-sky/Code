// 类型定义文件

import { TextStyle } from 'react-native';

// 扩展TextStyle以支持我们的fontWeight类型
export interface CustomTextStyle extends Omit<TextStyle, 'fontWeight'> {
  fontWeight?: '300' | '400' | '500' | '600' | '700' | 'normal' | 'bold' | 'light' | 'medium' | 'semibold';
}

// 导航参数类型
export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Player: undefined;
  Playlist: { playlistId?: string };
  Artist: { artistId?: string };
  Settings: undefined;
  Ranking: undefined;
};

export type TabParamList = {
  Home: undefined;
  Library: undefined;
  Search: undefined;
  Profile: undefined;
};

// 数据模型类型
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  songCount: number;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  followerCount: number;
  songCount: number;
}

export interface Ranking {
  id: string;
  title: string;
  description: string;
  cover: string;
}
