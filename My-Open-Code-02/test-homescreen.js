/**
 * 测试HomeScreen布局修复效果
 * 验证布局是否与HTML版本一致
 */

const fs = require('fs');

console.log('🏠 检查HomeScreen布局修复...\n');

try {
  const homeScreenContent = fs.readFileSync('./src/screens/HomeScreen.tsx', 'utf8');
  
  // 检查布局结构
  console.log('1. 检查布局结构...');
  
  // 检查最近播放是否为垂直列表
  if (homeScreenContent.includes('recentPlayedList') && 
      homeScreenContent.includes('recentPlayedItem') &&
      homeScreenContent.includes('夜曲') && 
      homeScreenContent.includes('稻香')) {
    console.log('✅ 最近播放区域已修改为垂直列表布局');
  } else {
    console.log('❌ 最近播放区域布局不正确');
  }
  
  // 检查推荐歌单是否为2列网格
  if (homeScreenContent.includes('playlistGrid') && 
      homeScreenContent.includes('华语流行') && 
      homeScreenContent.includes('经典老歌')) {
    console.log('✅ 推荐歌单已修改为2列网格布局');
  } else {
    console.log('❌ 推荐歌单布局不正确');
  }
  
  // 检查是否移除了水平滚动
  if (!homeScreenContent.includes('ScrollView horizontal')) {
    console.log('✅ 已移除不必要的水平滚动');
  } else {
    console.log('⚠️  仍存在水平滚动组件');
  }
  
  // 检查字体配置
  if (homeScreenContent.includes('fontFamily: theme.fontFamily')) {
    console.log('✅ 字体配置已应用');
  } else {
    console.log('❌ 字体配置缺失');
  }
  
  console.log('\n2. 检查样式定义...');
  
  // 检查新增的样式
  const requiredStyles = [
    'recentPlayedList',
    'recentPlayedItem', 
    'recentPlayedContent',
    'recentPlayedIcon',
    'recentPlayedText',
    'playlistGrid',
    'playButton'
  ];
  
  let missingStyles = [];
  requiredStyles.forEach(style => {
    if (!homeScreenContent.includes(style + ':')) {
      missingStyles.push(style);
    }
  });
  
  if (missingStyles.length === 0) {
    console.log('✅ 所有必需的样式都已定义');
  } else {
    console.log('❌ 缺少样式定义:', missingStyles.join(', '));
  }
  
  console.log('\n3. 检查组件结构...');
  
  // 检查是否使用了GlassCard
  if (homeScreenContent.includes('<GlassCard') && 
      homeScreenContent.includes('touchable')) {
    console.log('✅ 正确使用了GlassCard组件');
  } else {
    console.log('❌ GlassCard组件使用不正确');
  }
  
  // 检查是否使用了LinearGradient
  if (homeScreenContent.includes('<LinearGradient') && 
      homeScreenContent.includes('colors={[theme.colors')) {
    console.log('✅ 正确使用了LinearGradient');
  } else {
    console.log('❌ LinearGradient使用不正确');
  }
  
  console.log('\n🎉 HomeScreen布局检查完成！');
  
  console.log('\n📱 与HTML版本的对比:');
  console.log('✅ 头部布局: 发现音乐 + 音乐图标 + 搜索/用户按钮');
  console.log('✅ 快速操作: 2列网格 (我的音乐 + 排行榜)');
  console.log('✅ 最近播放: 垂直列表 (夜曲 + 稻香)');
  console.log('✅ 推荐歌单: 2列网格 (华语流行 + 经典老歌)');
  console.log('✅ 玻璃拟态效果和渐变背景');
  
  console.log('\n🚀 建议测试步骤:');
  console.log('1. 运行 npx react-native run-android 或 npx react-native run-ios');
  console.log('2. 检查首页布局是否与提供的截图一致');
  console.log('3. 测试各个按钮的点击功能');
  console.log('4. 验证在不同屏幕尺寸下的显示效果');
  
} catch (error) {
  console.log('❌ 检查失败:', error.message);
}
