# 旅行助手 Flutter 应用

这是一个基于 Flutter 开发的旅行助手应用，复现了 My-Open-UI-03 文件夹中的 HTML 页面设计，采用液态玻璃主题风格。

## 功能特性

### 🎨 设计特点
- **液态玻璃主题**: 使用毛玻璃效果和半透明设计
- **渐变背景**: 美丽的色彩渐变背景
- **响应式设计**: 适配移动端和桌面端
- **现代UI**: 圆角设计和柔和阴影效果

### 📱 页面功能
1. **启动页面** - 应用介绍和启动动画
2. **首页** - 欢迎界面、快速预订、热门目的地
3. **搜索页面** - 目的地搜索、筛选标签、热门搜索
4. **目的地详情** - 景点信息、照片展示、用户评价
5. **订单管理** - 订单状态、订单详情、快捷服务
6. **个人中心** - 用户资料、账户设置、旅行偏好

### 🚀 技术栈

#### 核心框架
- **Flutter**: 跨平台移动应用开发框架
- **Dart**: 编程语言

#### 状态管理
- **Riverpod**: 现代化的状态管理解决方案
- **Riverpod Annotation**: 代码生成和注解支持

#### 路由导航
- **AutoRoute**: 类型安全的路由生成器

#### UI组件
- **Google Fonts**: 字体支持
- **Material 3**: 现代化的设计系统

#### 依赖注入
- **GetIt**: 服务定位器模式
- **Injectable**: 依赖注入代码生成

#### 代码生成
- **Freezed**: 不可变数据类
- **JSON Serializable**: JSON序列化
- **Build Runner**: 代码生成工具

## 项目结构

```
lib/
├── core/                    # 核心功能
│   ├── constants/          # 常量定义
│   ├── routing/            # 路由配置
│   ├── theme/              # 主题系统
│   ├── utils/              # 工具函数
│   └── extensions/         # 扩展方法
├── features/               # 功能模块
│   ├── splash/             # 启动页
│   ├── home/               # 首页
│   ├── search/             # 搜索
│   ├── destination/        # 目的地详情
│   ├── orders/             # 订单管理
│   └── profile/            # 个人中心
└── shared/                 # 共享组件
    ├── widgets/            # 通用组件
    └── components/         # 业务组件
```

## 运行项目

### 环境要求
- Flutter SDK 3.9.0 或更高版本
- Dart SDK 3.9.0 或更高版本

### 安装依赖
```bash
flutter pub get
```

### 生成代码
```bash
flutter packages pub run build_runner build
```

### 运行应用
```bash
flutter run
```

## 主要组件

### 玻璃卡片 (GlassCard)
实现液态玻璃效果的卡片组件，支持毛玻璃背景和边框效果。

### 移动容器 (MobileContainer)
模拟移动设备屏幕的容器组件，支持响应式布局。

### 状态栏 (CustomStatusBar)
自定义状态栏组件，显示时间、信号和电池状态。

### 底部导航 (BottomNavigation)
底部导航栏组件，支持页面切换和活跃状态显示。

## 设计原则

### Clean Architecture
- 按功能模块组织代码
- 分离业务逻辑和UI展示
- 依赖注入和控制反转

### 命名规范
- 类名使用 PascalCase
- 变量和方法使用 camelCase
- 文件名使用 snake_case
- 常量使用 UPPERCASE

### 代码规范
- 函数长度不超过20行
- 类的公共方法不超过10个
- 遵循 SOLID 原则
- 使用类型安全的代码

## 特色功能

### 液态玻璃主题
- 使用 `BackdropFilter` 实现毛玻璃效果
- 半透明背景和边框
- 柔和的阴影和光晕效果

### 响应式布局
- 桌面端显示移动设备模拟器
- 移动端使用全屏显示
- 自适应不同屏幕尺寸

### 平滑动画
- 页面切换动画
- 组件出现动画
- 交互反馈动画

## 页面对应关系

| HTML 文件 | Flutter 页面 | 功能描述 |
|----------|-------------|---------|
| index.html | SplashPage | 应用启动页 |
| travel_home_1.html | HomePage | 应用首页 |
| travel_search_2.html | SearchPage | 搜索页面 |
| travel_destination_3.html | DestinationPage | 目的地详情 |
| travel_orders_9.html | OrdersPage | 订单管理 |
| travel_profile_10.html | ProfilePage | 个人中心 |

## 开发注意事项

1. **代码生成**: 修改路由或数据模型后需要运行 `flutter packages pub run build_runner build`
2. **主题使用**: 所有颜色和样式应使用 `AppColors` 和 `AppTheme` 中定义的值
3. **响应式**: 使用 `ResponsiveMobileContainer` 确保在不同设备上的显示效果
4. **导航**: 使用 AutoRoute 进行页面导航，避免直接使用 Navigator

## 贡献指南

1. 遵循项目的代码规范和架构原则
2. 提交前运行代码生成和linting检查
3. 编写必要的单元测试
4. 更新相关文档

## 许可证

MIT License