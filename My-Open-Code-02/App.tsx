/**
 * 中文音乐播放器 React Native App
 * 基于原HTML项目的玻璃拟态设计风格
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        translucent={true}
      />
      <View style={{ flex: 1 }}>
        <AppNavigator />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
