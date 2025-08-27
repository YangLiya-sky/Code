/**
 * 测试修复效果的脚本
 * 验证图标、响应式布局、字体和玻璃拟态效果
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 开始验证修复效果...\n');

// 1. 检查图标配置
console.log('1. 检查图标配置...');
try {
  // 检查Android配置
  const androidBuildGradle = fs.readFileSync('./android/app/build.gradle', 'utf8');
  if (androidBuildGradle.includes('react-native-vector-icons/fonts.gradle')) {
    console.log('✅ Android图标配置正确');
  } else {
    console.log('❌ Android图标配置缺失');
  }

  // 检查iOS配置
  const iosPlist = fs.readFileSync('./ios/MusicPlayerApp/Info.plist', 'utf8');
  if (iosPlist.includes('UIAppFonts') && iosPlist.includes('MaterialIcons.ttf')) {
    console.log('✅ iOS图标配置正确');
  } else {
    console.log('❌ iOS图标配置缺失');
  }
} catch (error) {
  console.log('❌ 图标配置检查失败:', error.message);
}

// 2. 检查响应式工具函数
console.log('\n2. 检查响应式工具函数...');
try {
  const responsiveFile = fs.readFileSync('./src/utils/responsive.ts', 'utf8');
  if (responsiveFile.includes('MIN_SCALE') && responsiveFile.includes('MAX_SCALE')) {
    console.log('✅ 响应式缩放限制已添加');
  }
  if (responsiveFile.includes('DESIGN_WIDTH = 375')) {
    console.log('✅ 设计基准尺寸已优化');
  }
} catch (error) {
  console.log('❌ 响应式工具函数检查失败:', error.message);
}

// 3. 检查字体配置
console.log('\n3. 检查字体配置...');
try {
  const themeFile = fs.readFileSync('./src/styles/theme.ts', 'utf8');
  if (themeFile.includes('fontFamily') && themeFile.includes('PingFang SC')) {
    console.log('✅ 字体家族配置已添加');
  }
  
  const globalStylesFile = fs.readFileSync('./src/styles/globalStyles.ts', 'utf8');
  if (globalStylesFile.includes('fontFamily: theme.fontFamily')) {
    console.log('✅ 全局样式字体配置已更新');
  }
} catch (error) {
  console.log('❌ 字体配置检查失败:', error.message);
}

// 4. 检查玻璃拟态效果
console.log('\n4. 检查玻璃拟态效果...');
try {
  const themeFile = fs.readFileSync('./src/styles/theme.ts', 'utf8');
  if (themeFile.includes('glassBackgroundStrong') && themeFile.includes('glassBackgroundWeak')) {
    console.log('✅ 玻璃拟态变体已添加');
  }
  
  const glassCardFile = fs.readFileSync('./src/components/GlassCard.tsx', 'utf8');
  if (glassCardFile.includes('variant') && glassCardFile.includes('cardStrong')) {
    console.log('✅ GlassCard组件已优化');
  }
} catch (error) {
  console.log('❌ 玻璃拟态效果检查失败:', error.message);
}

// 5. 检查图标常量
console.log('\n5. 检查图标常量...');
try {
  const constantsFile = fs.readFileSync('./src/constants/index.ts', 'utf8');
  if (constantsFile.includes('file-download') && constantsFile.includes('volume-up')) {
    console.log('✅ 图标常量已更新和扩展');
  }
} catch (error) {
  console.log('❌ 图标常量检查失败:', error.message);
}

console.log('\n🎉 修复验证完成！');
console.log('\n📱 建议下一步操作：');
console.log('1. 运行 npx react-native run-android 测试Android版本');
console.log('2. 运行 npx react-native run-ios 测试iOS版本');
console.log('3. 检查所有页面的布局和图标显示效果');
console.log('4. 测试不同屏幕尺寸的适配效果');
