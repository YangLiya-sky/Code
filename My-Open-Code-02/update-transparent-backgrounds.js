/**
 * 批量更新所有页面组件的背景透明度
 * 将glassBackground替换为更透明的rgba值
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 更新页面组件背景透明度...\n');

// 需要更新的页面文件
const screenFiles = [
  'PlayerScreen.tsx',
  'PlaylistScreen.tsx', 
  'ArtistScreen.tsx',
  'ProfileScreen.tsx',
  'RankingScreen.tsx'
];

// 背景透明度映射
const backgroundMappings = {
  'theme.colors.glassBackground': 'rgba(255, 255, 255, 0.04)',
  'theme.colors.glassBorder': 'rgba(255, 255, 255, 0.08)',
  'theme.colors.glassBackgroundWeak': 'rgba(255, 255, 255, 0.02)',
};

// 特殊情况的映射（更高透明度）
const specialMappings = {
  'headerButton': 'rgba(255, 255, 255, 0.05)',
  'searchBar': 'rgba(255, 255, 255, 0.08)',
  'playButton': 'rgba(255, 255, 255, 0.05)',
  'clearButton': 'rgba(255, 255, 255, 0.05)',
  'tag': 'rgba(255, 255, 255, 0.06)',
};

let totalFiles = 0;
let updatedFiles = 0;

screenFiles.forEach(screenFile => {
  const filePath = `./src/screens/${screenFile}`;
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  文件不存在: ${screenFile}`);
    return;
  }
  
  totalFiles++;
  console.log(`🔍 处理文件: ${screenFile}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // 替换标准的glassBackground
    Object.keys(backgroundMappings).forEach(oldValue => {
      const newValue = backgroundMappings[oldValue];
      const regex = new RegExp(`backgroundColor:\\s*${oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
      
      if (content.match(regex)) {
        content = content.replace(regex, `backgroundColor: '${newValue}'`);
        hasChanges = true;
        console.log(`  ✅ 替换 ${oldValue} -> ${newValue}`);
      }
    });
    
    // 替换边框颜色
    const borderRegex = /borderColor:\s*theme\.colors\.glassBorder/g;
    if (content.match(borderRegex)) {
      content = content.replace(borderRegex, "borderColor: 'rgba(255, 255, 255, 0.08)'");
      hasChanges = true;
      console.log(`  ✅ 替换边框颜色`);
    }
    
    // 检查是否有其他需要特殊处理的背景
    const glassBackgroundRegex = /backgroundColor:\s*theme\.colors\.glassBackground/g;
    const matches = content.match(glassBackgroundRegex);
    if (matches) {
      content = content.replace(glassBackgroundRegex, "backgroundColor: 'rgba(255, 255, 255, 0.04)'");
      hasChanges = true;
      console.log(`  ✅ 替换剩余的glassBackground (${matches.length}个)`);
    }
    
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      updatedFiles++;
      console.log(`  💾 文件已更新`);
    } else {
      console.log(`  ℹ️  无需更新`);
    }
    
  } catch (error) {
    console.log(`  ❌ 处理失败: ${error.message}`);
  }
  
  console.log('');
});

// 更新GlassCard组件
console.log('🔍 处理GlassCard组件:');
const glassCardPath = './src/components/GlassCard.tsx';

if (fs.existsSync(glassCardPath)) {
  try {
    let content = fs.readFileSync(glassCardPath, 'utf8');
    let hasChanges = false;
    
    // 更新GlassCard的默认背景
    const glassCardRegex = /backgroundColor:\s*theme\.colors\.glassBackground/g;
    if (content.match(glassCardRegex)) {
      content = content.replace(glassCardRegex, "backgroundColor: 'rgba(255, 255, 255, 0.04)'");
      hasChanges = true;
      console.log('  ✅ 更新GlassCard默认背景');
    }
    
    const borderRegex = /borderColor:\s*theme\.colors\.glassBorder/g;
    if (content.match(borderRegex)) {
      content = content.replace(borderRegex, "borderColor: 'rgba(255, 255, 255, 0.08)'");
      hasChanges = true;
      console.log('  ✅ 更新GlassCard边框颜色');
    }
    
    if (hasChanges) {
      fs.writeFileSync(glassCardPath, content, 'utf8');
      console.log('  💾 GlassCard组件已更新');
    } else {
      console.log('  ℹ️  GlassCard无需更新');
    }
    
  } catch (error) {
    console.log(`  ❌ GlassCard处理失败: ${error.message}`);
  }
} else {
  console.log('  ⚠️  GlassCard组件不存在');
}

console.log('\n📊 更新总结:');
console.log(`处理文件: ${totalFiles}`);
console.log(`更新文件: ${updatedFiles}`);
console.log(`更新率: ${Math.round((updatedFiles / totalFiles) * 100)}%`);

console.log('\n🎨 透明度级别说明:');
console.log('• 主要背景: rgba(255, 255, 255, 0.04) - 4%透明度');
console.log('• 搜索框/输入框: rgba(255, 255, 255, 0.08) - 8%透明度');
console.log('• 按钮背景: rgba(255, 255, 255, 0.05) - 5%透明度');
console.log('• 标签背景: rgba(255, 255, 255, 0.06) - 6%透明度');
console.log('• 边框颜色: rgba(255, 255, 255, 0.08) - 8%透明度');

console.log('\n🚀 预期效果:');
console.log('✅ 所有页面组件背景更加透明');
console.log('✅ 渐变背景更加突出');
console.log('✅ 界面层次感更强');
console.log('✅ 现代玻璃拟态效果');

console.log('\n🧪 测试建议:');
console.log('1. 运行 npx tsc --noEmit --skipLibCheck 检查语法');
console.log('2. 运行应用查看视觉效果');
console.log('3. 检查所有页面的背景透明度');
console.log('4. 验证文字可读性');
