/**
 * 测试底部导航栏居中对齐和页面背景透明度
 * 验证所有修改是否正确应用
 */

const fs = require('fs');

console.log('🎨 检查导航栏对齐和背景透明度修改...\n');

let totalChecks = 0;
let passedChecks = 0;

// 检查底部导航栏配置
console.log('🧭 检查底部导航栏配置:');
try {
  const navContent = fs.readFileSync('./src/navigation/AppNavigator.tsx', 'utf8');
  
  const navChecks = [
    {
      name: '图标容器居中对齐',
      test: () => navContent.includes('alignItems: \'center\'') && 
                 navContent.includes('justifyContent: \'center\'') &&
                 navContent.includes('width: 24') &&
                 navContent.includes('height: 24')
    },
    {
      name: '标签文字居中对齐',
      test: () => navContent.includes('textAlign: \'center\'')
    },
    {
      name: '导航项居中配置',
      test: () => navContent.includes('justifyContent: \'center\'') &&
                 navContent.includes('alignItems: \'center\'') &&
                 navContent.includes('flex: 1')
    },
    {
      name: '图标大小固定',
      test: () => navContent.includes('iconSize = 20')
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
  console.log(`  ❌ 导航栏配置检查失败: ${error.message}`);
  totalChecks += 4;
}

// 检查页面背景透明度
console.log('\n🎨 检查页面背景透明度:');
const screenFiles = [
  'SearchScreen.tsx',
  'SettingsScreen.tsx', 
  'LibraryScreen.tsx',
  'PlayerScreen.tsx',
  'PlaylistScreen.tsx',
  'ArtistScreen.tsx',
  'ProfileScreen.tsx',
  'RankingScreen.tsx'
];

let transparentBackgrounds = 0;
let totalBackgrounds = 0;

screenFiles.forEach(screenFile => {
  try {
    const screenPath = `./src/screens/${screenFile}`;
    if (fs.existsSync(screenPath)) {
      const screenContent = fs.readFileSync(screenPath, 'utf8');
      
      // 检查是否使用了透明背景
      const rgbaMatches = screenContent.match(/backgroundColor:\s*'rgba\(255,\s*255,\s*255,\s*0\.\d+\)'/g);
      const glassMatches = screenContent.match(/backgroundColor:\s*theme\.colors\.glassBackground/g);
      
      totalBackgrounds++;
      
      if (rgbaMatches && rgbaMatches.length > 0 && (!glassMatches || glassMatches.length === 0)) {
        console.log(`  ✅ ${screenFile}: ${rgbaMatches.length}个透明背景`);
        transparentBackgrounds++;
      } else if (glassMatches && glassMatches.length > 0) {
        console.log(`  ⚠️  ${screenFile}: 仍有${glassMatches.length}个非透明背景`);
      } else {
        console.log(`  ℹ️  ${screenFile}: 无背景样式或已优化`);
        transparentBackgrounds++;
      }
    }
  } catch (error) {
    console.log(`  ❌ ${screenFile}: 检查失败 - ${error.message}`);
    totalBackgrounds++;
  }
});

totalChecks++;
if (transparentBackgrounds === totalBackgrounds) {
  console.log(`  ✅ 所有页面背景透明度已优化`);
  passedChecks++;
} else {
  console.log(`  ⚠️  ${totalBackgrounds - transparentBackgrounds}个页面需要进一步优化`);
}

// 检查GlassCard组件
console.log('\n🔍 检查GlassCard组件:');
try {
  const glassCardContent = fs.readFileSync('./src/components/GlassCard.tsx', 'utf8');
  
  const glassCardChecks = [
    {
      name: '默认背景透明度',
      test: () => glassCardContent.includes("backgroundColor: 'rgba(255, 255, 255, 0.04)'")
    },
    {
      name: '强调背景透明度',
      test: () => glassCardContent.includes("backgroundColor: 'rgba(255, 255, 255, 0.06)'")
    },
    {
      name: '弱化背景透明度',
      test: () => glassCardContent.includes("backgroundColor: 'rgba(255, 255, 255, 0.02)'")
    },
    {
      name: '悬停背景透明度',
      test: () => glassCardContent.includes("backgroundColor: 'rgba(255, 255, 255, 0.08)'")
    },
    {
      name: '边框透明度',
      test: () => glassCardContent.includes("borderColor: 'rgba(255, 255, 255, 0.08)'")
    }
  ];
  
  glassCardChecks.forEach(check => {
    totalChecks++;
    if (check.test()) {
      console.log(`  ✅ ${check.name}`);
      passedChecks++;
    } else {
      console.log(`  ❌ ${check.name}`);
    }
  });
  
} catch (error) {
  console.log(`  ❌ GlassCard组件检查失败: ${error.message}`);
  totalChecks += 5;
}

// 检查特殊组件透明度
console.log('\n🔍 检查特殊组件透明度:');
const specialChecks = [
  {
    file: 'SearchScreen.tsx',
    name: '搜索框背景',
    pattern: /searchBar:[\s\S]*?backgroundColor:\s*'rgba\(255,\s*255,\s*255,\s*0\.08\)'/
  },
  {
    file: 'SearchScreen.tsx', 
    name: '标签背景',
    pattern: /tag:[\s\S]*?backgroundColor:\s*'rgba\(255,\s*255,\s*255,\s*0\.06\)'/
  }
];

specialChecks.forEach(check => {
  try {
    const filePath = `./src/screens/${check.file}`;
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      totalChecks++;
      if (check.pattern.test(content)) {
        console.log(`  ✅ ${check.name}`);
        passedChecks++;
      } else {
        console.log(`  ❌ ${check.name}`);
      }
    }
  } catch (error) {
    console.log(`  ❌ ${check.name}: 检查失败`);
    totalChecks++;
  }
});

// 总结
console.log('\n📊 检查总结:');
console.log(`总检查项: ${totalChecks}`);
console.log(`通过检查: ${passedChecks}`);
console.log(`通过率: ${Math.round((passedChecks / totalChecks) * 100)}%`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 所有修改都已正确应用！');
} else {
  console.log(`\n⚠️  还有 ${totalChecks - passedChecks} 个问题需要检查`);
}

console.log('\n🎨 预期视觉效果:');
console.log('✅ 底部导航栏: 图标和文字完美居中对齐');
console.log('✅ 搜索框: 半透明背景，渐变色更突出');
console.log('✅ 卡片组件: 不同透明度层次，现代玻璃效果');
console.log('✅ 按钮背景: 轻微透明，保持可点击感');
console.log('✅ 整体效果: 更强的层次感和现代感');

console.log('\n🚀 测试建议:');
console.log('1. 运行 npx react-native run-android 查看Android效果');
console.log('2. 运行 npx react-native run-ios 查看iOS效果');
console.log('3. 检查底部导航栏的对齐效果');
console.log('4. 测试搜索页面的透明背景效果');
console.log('5. 验证所有页面的视觉一致性');
