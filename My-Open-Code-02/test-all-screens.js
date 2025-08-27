/**
 * 测试所有10个页面的修复效果
 * 验证布局、导航和响应式设计
 */

const fs = require('fs');

console.log('📱 检查所有页面修复效果...\n');

// 页面映射关系
const screenMapping = {
  'SplashScreen.tsx': '01_splash.html',
  'HomeScreen.tsx': '02_home.html', 
  'LibraryScreen.tsx': '03_library.html',
  'PlayerScreen.tsx': '04_player.html',
  'SearchScreen.tsx': '05_search.html',
  'PlaylistScreen.tsx': '06_playlist.html',
  'ArtistScreen.tsx': '07_artist.html',
  'SettingsScreen.tsx': '08_settings.html',
  'ProfileScreen.tsx': '09_profile.html',
  'RankingScreen.tsx': '10_ranking.html'
};

let totalChecks = 0;
let passedChecks = 0;

// 检查每个页面
Object.keys(screenMapping).forEach(screenFile => {
  const htmlFile = screenMapping[screenFile];
  console.log(`🔍 检查 ${screenFile} (对应 ${htmlFile}):`);
  
  try {
    const screenContent = fs.readFileSync(`./src/screens/${screenFile}`, 'utf8');
    
    // 基础检查
    const checks = [
      {
        name: '导入必要组件',
        test: () => screenContent.includes('MobileContainer') && 
                   screenContent.includes('StatusBar') && 
                   screenContent.includes('BackgroundDecoration')
      },
      {
        name: '使用主题配置',
        test: () => screenContent.includes('theme.') && 
                   screenContent.includes('fontFamily')
      },
      {
        name: '响应式样式',
        test: () => screenContent.includes('theme.spacing') && 
                   screenContent.includes('theme.fontSize')
      },
      {
        name: '图标使用',
        test: () => screenContent.includes('Icon') && 
                   screenContent.includes('ICONS.')
      },
      {
        name: '玻璃拟态效果',
        test: () => screenContent.includes('GlassCard') || 
                   screenContent.includes('glassBackground')
      }
    ];
    
    checks.forEach(check => {
      totalChecks++;
      if (check.test()) {
        console.log(`  ✅ ${check.name}`);
        passedChecks++;
      } else {
        console.log(`  ❌ ${check.name}`);
      }
    });
    
  } catch (error) {
    console.log(`  ❌ 文件读取失败: ${error.message}`);
    totalChecks += 5; // 假设有5个检查项
  }
  
  console.log('');
});

// 检查导航配置
console.log('🧭 检查导航配置:');
try {
  const navContent = fs.readFileSync('./src/navigation/AppNavigator.tsx', 'utf8');
  
  const navChecks = [
    {
      name: '底部导航样式优化',
      test: () => navContent.includes('slate-900/60') && 
                 navContent.includes('borderRadius')
    },
    {
      name: '图标大小固定',
      test: () => navContent.includes('iconSize = 20')
    },
    {
      name: '字体配置应用',
      test: () => navContent.includes('fontFamily: theme.fontFamily')
    }
  ];
  
  navChecks.forEach(check => {
    totalChecks++;
    if (check.test()) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ 导航配置检查失败: ${error.message}`);
  totalChecks += 3;
}

// 检查MobileContainer优化
console.log('\n📱 检查MobileContainer优化:');
try {
  const containerContent = fs.readFileSync('./src/components/MobileContainer.tsx', 'utf8');
  
  const containerChecks = [
    {
      name: '填满屏幕布局',
      test: () => containerContent.includes('flex: 1') && 
                 containerContent.includes('width: \'100%\'')
    },
    {
      name: '移除不必要边距',
      test: () => containerContent.includes('marginHorizontal: 0')
    },
    {
      name: '移除圆角',
      test: () => containerContent.includes('borderRadius: 0')
    }
  ];
  
  containerChecks.forEach(check => {
    totalChecks++;
    if (check.test()) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ MobileContainer检查失败: ${error.message}`);
  totalChecks += 3;
}

// 总结
console.log('\n📊 检查总结:');
console.log(`总检查项: ${totalChecks}`);
console.log(`通过检查: ${passedChecks}`);
console.log(`通过率: ${Math.round((passedChecks / totalChecks) * 100)}%`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 所有检查都通过了！');
} else {
  console.log(`\n⚠️  还有 ${totalChecks - passedChecks} 个问题需要修复`);
}

console.log('\n🚀 下一步建议:');
console.log('1. 运行 npx tsc --noEmit --skipLibCheck 检查TypeScript');
console.log('2. 运行 npx react-native run-android 测试Android版本');
console.log('3. 运行 npx react-native run-ios 测试iOS版本');
console.log('4. 测试所有页面的导航和交互功能');
console.log('5. 验证在不同屏幕尺寸下的显示效果');
