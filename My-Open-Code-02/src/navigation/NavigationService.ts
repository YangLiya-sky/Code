import { NavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';
import { createRef } from 'react';

// 导航引用
export const navigationRef = createRef<NavigationContainerRef<any>>();

// 导航服务类
class NavigationService {
  // 导航到指定屏幕
  navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params);
  }

  // 返回上一页
  goBack() {
    navigationRef.current?.goBack();
  }

  // 重置导航栈
  reset(state: any) {
    navigationRef.current?.reset(state);
  }

  // 推入新屏幕
  push(name: string, params?: any) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  }

  // 弹出屏幕
  pop(count?: number) {
    navigationRef.current?.dispatch(StackActions.pop(count));
  }

  // 弹出到顶部
  popToTop() {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }

  // 替换当前屏幕
  replace(name: string, params?: any) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }

  // 获取当前路由名称
  getCurrentRoute() {
    return navigationRef.current?.getCurrentRoute();
  }

  // 获取当前路由名称字符串
  getCurrentRouteName(): string | undefined {
    return navigationRef.current?.getCurrentRoute()?.name;
  }

  // 检查是否可以返回
  canGoBack(): boolean {
    return navigationRef.current?.canGoBack() ?? false;
  }

  // 导航到主页并重置栈
  navigateToHome() {
    this.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  }

  // 导航到播放器（模态框）
  navigateToPlayer(params?: any) {
    this.navigate('Player', params);
  }

  // 导航到设置页面
  navigateToSettings() {
    this.navigate('Settings');
  }

  // 导航到搜索页面
  navigateToSearch(params?: any) {
    this.navigate('Search', params);
  }

  // 导航到歌单页面
  navigateToPlaylist(playlistId?: string) {
    this.navigate('Playlist', { playlistId });
  }

  // 导航到歌手页面
  navigateToArtist(artistId?: string) {
    this.navigate('Artist', { artistId });
  }

  // 导航到排行榜页面
  navigateToRanking() {
    this.navigate('Ranking');
  }

  // 导航到音乐库页面
  navigateToLibrary() {
    this.navigate('Library');
  }

  // 导航到个人中心页面
  navigateToProfile() {
    this.navigate('Profile');
  }

  // 带动画的导航
  navigateWithAnimation(name: string, params?: any, animation?: 'slide' | 'fade' | 'modal' | 'scale') {
    // 这里可以根据动画类型设置不同的导航选项
    // 由于React Navigation的限制，我们主要在屏幕配置中设置动画
    this.navigate(name, params);
  }

  // 安全导航（检查路由是否存在）
  safeNavigate(name: string, params?: any) {
    try {
      if (navigationRef.current?.getRootState()) {
        this.navigate(name, params);
      }
    } catch (error) {
      console.warn('Navigation error:', error);
    }
  }

  // 延迟导航（用于动画完成后）
  delayedNavigate(name: string, params?: any, delay: number = 300) {
    setTimeout(() => {
      this.safeNavigate(name, params);
    }, delay);
  }

  // 条件导航（根据条件决定是否导航）
  conditionalNavigate(condition: boolean, name: string, params?: any, fallbackName?: string) {
    if (condition) {
      this.navigate(name, params);
    } else if (fallbackName) {
      this.navigate(fallbackName, params);
    }
  }

  // 获取导航历史
  getNavigationHistory() {
    return navigationRef.current?.getRootState();
  }

  // 检查特定路由是否在栈中
  isRouteInStack(routeName: string): boolean {
    const state = navigationRef.current?.getRootState();
    if (!state) return false;
    
    const findRoute = (routes: any[]): boolean => {
      return routes.some(route => {
        if (route.name === routeName) return true;
        if (route.state?.routes) return findRoute(route.state.routes);
        return false;
      });
    };
    
    return findRoute(state.routes);
  }

  // 导航到指定标签页
  navigateToTab(tabName: string) {
    navigationRef.current?.dispatch(
      CommonActions.navigate({
        name: 'MainTabs',
        params: {
          screen: tabName,
        },
      })
    );
  }
}

// 创建单例实例
const navigationService = new NavigationService();

export default navigationService;

// 导出常用的导航函数
export const {
  navigate,
  goBack,
  reset,
  push,
  pop,
  popToTop,
  replace,
  getCurrentRoute,
  getCurrentRouteName,
  canGoBack,
  navigateToHome,
  navigateToPlayer,
  navigateToSettings,
  navigateToSearch,
  navigateToPlaylist,
  navigateToArtist,
  navigateToRanking,
  navigateToLibrary,
  navigateToProfile,
  safeNavigate,
  delayedNavigate,
} = navigationService;
