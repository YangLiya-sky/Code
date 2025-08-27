/**
 * 测试开发者工具移除效果
 * 验证DevTools组件和相关引用是否完全移除
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 检查开发者工具移除效果...\n');

let totalChecks = 0;
let passedChecks = 0;

// 检查App.tsx中的DevTools引用
console.log('🔍 检查App.tsx:');
try {
  const appContent = fs.readFileSync('./App.tsx', 'utf8');
  
  const appChecks = [
    {
      name: '移除DevTools导入',
      test: () => !appContent.includes("import DevTools from './src/components/DevTools'"),
      expected: true
    },
    {
      name: '移除DevTools组件使用',
      test: () => !appContent.includes('<DevTools />'),
      expected: true
    },
    {
      name: '保留AppNavigator',
      test: () => appContent.includes('<AppNavigator />'),
      expected: true
    },
    {
      name: '保留SafeAreaProvider',
      test: () => appContent.includes('<SafeAreaProvider>'),
      expected: true
    }
  ];
  
  appChecks.forEach(check => {
    totalChecks++;
    const result = check.test();
    if (result === check.expected) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ App.tsx检查失败: ${error.message}`);
  totalChecks += 4;
}

// 检查DevTools.tsx文件是否已删除
console.log('\n🔍 检查DevTools.tsx文件:');
try {
  const devToolsPath = './src/components/DevTools.tsx';
  const exists = fs.existsSync(devToolsPath);
  
  totalChecks++;
  if (!exists) {
    console.log('  ✅ DevTools.tsx文件已成功删除');
    passedChecks++;
  } else {
    console.log('  ❌ DevTools.tsx文件仍然存在');
  }
  
} catch (error) {
  console.log(`  ❌ DevTools.tsx文件检查失败: ${error.message}`);
  totalChecks++;
}

// 检查components/index.ts中是否有DevTools导出
console.log('\n🔍 检查components/index.ts:');
try {
  const indexContent = fs.readFileSync('./src/components/index.ts', 'utf8');
  
  const indexChecks = [
    {
      name: '无DevTools导出',
      test: () => !indexContent.includes('DevTools'),
      expected: true
    },
    {
      name: '保留其他组件导出',
      test: () => indexContent.includes('export') && indexContent.includes('from'),
      expected: true
    }
  ];
  
  indexChecks.forEach(check => {
    totalChecks++;
    const result = check.test();
    if (result === check.expected) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ components/index.ts检查失败: ${error.message}`);
  totalChecks += 2;
}

// 检查所有页面是否有开发者工具按钮引用
console.log('\n🔍 检查页面中的开发者工具按钮:');
const screenFiles = [
  'SplashScreen.tsx',
  'HomeScreen.tsx',
  'LibraryScreen.tsx',
  'PlayerScreen.tsx',
  'SearchScreen.tsx',
  'PlaylistScreen.tsx',
  'ArtistScreen.tsx',
  'SettingsScreen.tsx',
  'ProfileScreen.tsx',
  'RankingScreen.tsx'
];

let devToolsReferences = [];

screenFiles.forEach(screenFile => {
  try {
    const screenPath = `./src/screens/${screenFile}`;
    if (fs.existsSync(screenPath)) {
      const screenContent = fs.readFileSync(screenPath, 'utf8');
      
      // 检查是否有开发者工具相关的引用
      const devToolsPatterns = [
        'DevTools',
        'developer-mode',
        'dev-tools',
        'debug-mode',
        '开发者工具',
        'developer tools'
      ];
      
      devToolsPatterns.forEach(pattern => {
        if (screenContent.toLowerCase().includes(pattern.toLowerCase())) {
          devToolsReferences.push(`${screenFile}: ${pattern}`);
        }
      });
    }
  } catch (error) {
    console.log(`  ⚠️  无法检查 ${screenFile}: ${error.message}`);
  }
});

totalChecks++;
if (devToolsReferences.length === 0) {
  console.log('  ✅ 所有页面都没有开发者工具引用');
  passedChecks++;
} else {
  console.log('  ❌ 发现开发者工具引用:');
  devToolsReferences.forEach(ref => {
    console.log(`    - ${ref}`);
  });
}

// 检查导航配置中是否有开发者工具路由
console.log('\n🔍 检查导航配置:');
try {
  const navContent = fs.readFileSync('./src/navigation/AppNavigator.tsx', 'utf8');
  
  const navChecks = [
    {
      name: '无开发者工具路由',
      test: () => !navContent.includes('DevTools') && !navContent.includes('Developer'),
      expected: true
    },
    {
      name: '保留正常页面路由',
      test: () => navContent.includes('Home') && navContent.includes('Library'),
      expected: true
    }
  ];
  
  navChecks.forEach(check => {
    totalChecks++;
    const result = check.test();
    if (result === check.expected) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ 导航配置检查失败: ${error.message}`);
  totalChecks += 2;
}

// 检查常量文件中是否有开发者工具相关配置
console.log('\n🔍 检查常量配置:');
try {
  const constantsContent = fs.readFileSync('./src/constants/index.ts', 'utf8');
  
  totalChecks++;
  if (!constantsContent.includes('DevTools') && !constantsContent.includes('DEVELOPER')) {
    console.log('  ✅ 常量文件中无开发者工具配置');
    passedChecks++;
  } else {
    console.log('  ❌ 常量文件中仍有开发者工具配置');
  }
  
} catch (error) {
  console.log(`  ❌ 常量配置检查失败: ${error.message}`);
  totalChecks++;
}

// 总结
console.log('\n📊 检查总结:');
console.log(`总检查项: ${totalChecks}`);
console.log(`通过检查: ${passedChecks}`);
console.log(`通过率: ${Math.round((passedChecks / totalChecks) * 100)}%`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 开发者工具已完全移除！');
  console.log('✅ DevTools组件已删除');
  console.log('✅ App.tsx中的引用已移除');
  console.log('✅ 所有页面都没有开发者工具按钮');
  console.log('✅ 导航配置已清理');
} else {
  console.log(`\n⚠️  还有 ${totalChecks - passedChecks} 个问题需要处理`);
}

console.log('\n🚀 预期效果:');
console.log('📱 应用启动后将不再显示开发者工具浮动按钮');
console.log('🎨 界面更加简洁，没有调试相关的UI元素');
console.log('⚡ 应用性能可能有轻微提升（减少了DevTools组件的渲染）');
console.log('🔒 生产环境更加纯净，没有开发调试功能暴露');

console.log('\n🧪 测试建议:');
console.log('1. 运行 npx react-native run-android 测试Android版本');
console.log('2. 运行 npx react-native run-ios 测试iOS版本');
console.log('3. 检查应用界面是否没有开发者工具按钮');
console.log('4. 测试所有页面的正常功能');
console.log('5. 确认应用启动和运行都正常');
