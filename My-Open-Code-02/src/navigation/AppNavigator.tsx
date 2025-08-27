import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Animated } from 'react-native';

import { SCREEN_NAMES, TAB_NAMES, ICONS } from '../constants';
import { theme } from '../styles/theme';


import { navigationRef } from './NavigationService';

// 导入屏幕组件（稍后创建）
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlayerScreen from '../screens/PlayerScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import ArtistScreen from '../screens/ArtistScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RankingScreen from '../screens/RankingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 底部导航组件
function BottomTabNavigator() {

  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName: string;

          switch (route.name) {
            case TAB_NAMES.HOME:
              iconName = ICONS.home;
              break;
            case TAB_NAMES.LIBRARY:
              iconName = ICONS.library;
              break;
            case TAB_NAMES.SEARCH:
              iconName = ICONS.search;
              break;
            case TAB_NAMES.PROFILE:
              iconName = ICONS.user;
              break;
            default:
              iconName = ICONS.home;
          }

          const iconSize = 20; // 固定20px图标大小

          return (
            <Animated.View style={{
              transform: [{ scale: focused ? 1.05 : 1 }],
              opacity: focused ? 1 : 0.8,
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
            }}>
              <Icon name={iconName} size={iconSize} color={color} />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: 'transparent', // 完全透明背景
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          borderRadius: theme.borderRadius.lg,
          marginHorizontal: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
          height: theme.dimensions.bottomTabHeight,
          paddingBottom: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          position: 'absolute',
          elevation: 0,
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11, // 固定11px字体大小
          fontWeight: theme.fontWeight.medium as any,
          marginTop: 2,
          marginBottom: 0,
          fontFamily: theme.fontFamily.regular,
          textAlign: 'center',
        },
        tabBarItemStyle: {
          paddingVertical: theme.spacing.xs,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        },
        headerShown: false,
        // 添加标签栏动画
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name={TAB_NAMES.HOME}
        component={HomeScreen}
        options={{ tabBarLabel: '首页' }}
      />
      <Tab.Screen
        name={TAB_NAMES.LIBRARY}
        component={LibraryScreen}
        options={{ tabBarLabel: '音乐库' }}
      />
      <Tab.Screen
        name={TAB_NAMES.SEARCH}
        component={SearchScreen}
        options={{ tabBarLabel: '搜索' }}
      />
      <Tab.Screen
        name={TAB_NAMES.PROFILE}
        component={ProfileScreen}
        options={{ tabBarLabel: '我的' }}
      />
    </Tab.Navigator>
  );
}

// 主导航组件
export default function AppNavigator() {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: true,
        colors: {
          primary: theme.colors.primary,
          background: 'transparent',
          card: 'transparent',
          text: theme.colors.textPrimary,
          border: 'transparent',
          notification: theme.colors.accent,
        },
        fonts: {
          regular: {
            fontFamily: theme.fontFamily.regular,
            fontWeight: '400',
          },
          medium: {
            fontFamily: theme.fontFamily.medium,
            fontWeight: '500',
          },
          bold: {
            fontFamily: theme.fontFamily.bold,
            fontWeight: '700',
          },
          heavy: {
            fontFamily: theme.fontFamily.bold,
            fontWeight: '900',
          },
        },
      }}
      onReady={() => {
        // 导航容器准备就绪时的回调
        console.log('Navigation container is ready');
      }}
      onStateChange={(state) => {
        // 导航状态变化时的回调
        console.log('Navigation state changed:', state);
      }}
    >
      <Stack.Navigator
        id={undefined}
        initialRouteName={SCREEN_NAMES.SPLASH}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: 50,
        }}
      >
        {/* 启动页 */}
        <Stack.Screen
          name={SCREEN_NAMES.SPLASH}
          component={SplashScreen}
          options={{
            animationTypeForReplace: 'push',
          }}
        />

        {/* 主要导航（底部标签） */}
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{
            animationTypeForReplace: 'push',
          }}
        />

        {/* 播放器页面 - 模态框样式 */}
        <Stack.Screen
          name={SCREEN_NAMES.PLAYER}
          component={PlayerScreen}
          options={{
            presentation: 'modal',
            gestureDirection: 'vertical',
            gestureResponseDistance: 100,
          }}
        />

        {/* 其他页面 - 滑动动画 */}
        <Stack.Screen
          name={SCREEN_NAMES.PLAYLIST}
          component={PlaylistScreen}
        />

        <Stack.Screen
          name={SCREEN_NAMES.ARTIST}
          component={ArtistScreen}
        />

        <Stack.Screen
          name={SCREEN_NAMES.SETTINGS}
          component={SettingsScreen}
        />

        <Stack.Screen
          name={SCREEN_NAMES.RANKING}
          component={RankingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
