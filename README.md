# AI图像生成Web应用

> Git地址：https://github.com/xxx/project_ai_mern_image_generation_web

## 项目介绍

这是一个基于MERN栈的AI图像生成Web应用，用户可以通过输入文本描述（Prompt），使用AI技术生成创意图像，并将作品分享到社区展示。

## 技术架构

### 前端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | 18.3.1 | UI框架 |
| React Router | 6.23.1 | 路由管理 |
| Vite | 6.5.0 | 构建工具 |
| Tailwind CSS | 3.4.14 | 样式框架 |
| ESLint | 8.57.0 | 代码规范 |

### 后端技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Node.js | 18+ | 运行环境 |
| Express | 4.19.2 | Web框架 |
| MongoDB | 6+ | 数据库 |
| Mongoose | 8.4.4 | MongoDB ODM |
| Cloudinary | 2.2.0 | 图片存储 |
| Baidu AI | ERNIE-ViLG | 图像生成API |

## 项目结构

```
project_ai_mern_image_generation_web/
├── client/                    # 前端代码
│   ├── public/               # 静态资源
│   ├── src/
│   │   ├── assets/           # 图片资源
│   │   ├── components/       # 通用组件
│   │   │   ├── Card.jsx      # 卡片组件
│   │   │   ├── FormField.jsx # 表单字段组件
│   │   │   ├── Loader.jsx    # 加载动画组件
│   │   │   └── index.js      # 组件导出
│   │   ├── constant/         # 常量配置
│   │   │   └── index.js      # 预设提示词列表
│   │   ├── page/             # 页面组件
│   │   │   ├── Home.jsx      # 首页（社区展示）
│   │   │   ├── CreatePost.jsx # 创建页面（图像生成）
│   │   │   └── index.js      # 页面导出
│   │   ├── utils/            # 工具函数
│   │   │   └── index.js      # 下载图片、随机提示词
│   │   ├── App.jsx           # 根组件
│   │   ├── main.jsx          # 入口文件
│   │   └── index.css         # 全局样式
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.cjs
├── server/                   # 后端代码
│   ├── mongodb/              # 数据库配置
│   │   ├── connect.js        # MongoDB连接
│   │   └── models/
│   │       └── post.js       # Post数据模型
│   ├── routes/               # 路由
│   │   ├── dalleRoutes.js    # AI图像生成接口
│   │   └── postRoutes.js     # 帖子管理接口
│   ├── .env                  # 环境变量（需自行配置）
│   ├── .gitignore
│   ├── index.js              # 服务入口
│   └── package.json
└── README.md
```

## 功能模块

### 1. 首页（Home）

- **功能描述**：展示社区用户生成的所有图像作品
- **核心功能**：
  - 瀑布流布局展示图片卡片
  - 实时搜索过滤（按名称或提示词）
  - 卡片悬停显示详细信息（提示词、作者）
  - 点击下载图片到本地

### 2. 创建页面（CreatePost）

- **功能描述**：生成AI图像并发布到社区
- **核心功能**：
  - 输入作者名称
  - 输入图像描述提示词（Prompt）
  - "Surprise Me"随机推荐提示词
  - 调用AI API生成图像
  - 预览生成的图像
  - 发布到社区展示

## API接口设计

### 图像生成接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/v1/dalle | 健康检查 |
| POST | /api/v1/dalle | 生成图像 |

**POST 请求体**：
```json
{
  "prompt": "一只穿着宇航服的猫在火星上"
}
```

**POST 响应体**：
```json
{
  "photo": "base64编码的图片数据"
}
```

### 帖子管理接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/v1/post | 获取所有帖子 |
| POST | /api/v1/post | 创建新帖子 |

**POST 请求体**：
```json
{
  "name": "John Doe",
  "prompt": "一只穿着宇航服的猫在火星上",
  "photo": "base64编码的图片数据"
}
```

**POST 响应体**：
```json
{
  "success": true,
  "data": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "prompt": "一只穿着宇航服的猫在火星上",
    "photo": "https://res.cloudinary.com/xxx/image/upload/xxx.jpg",
    "__v": 0
  }
}
```

### 响应状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 500 | 服务器内部错误 |

## 环境配置

### 后端环境变量（server/.env）

```bash
# MongoDB连接地址
MONGODB_URL=mongodb://localhost:27017/ai-image-generation

# 百度AI API（需在百度智能云申请）
BAIDU_API_KEY=your_baidu_api_key
BAIDU_SECRET_KEY=your_baidu_secret_key

# Cloudinary配置（图片存储，可选）
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 获取百度AI API Key

1. 访问 [百度智能云](https://cloud.baidu.com/)
2. 注册并登录账号
3. 创建应用，选择"文心一言"服务
4. 获取 API Key 和 Secret Key

## 启动方式

### 前置条件

- Node.js 18+
- MongoDB 6+
- 百度AI API Key（用于图像生成）

### 启动后端服务

```bash
cd server
npm install
npm start
```

服务将在 http://localhost:8080 启动

### 启动前端开发服务器

```bash
cd client
npm install
npm run dev
```

前端将在 http://localhost:5173 启动

### 构建生产版本

```bash
cd client
npm run build
```

## 使用说明

1. 确保后端服务和MongoDB已启动
2. 在百度智能云申请API Key并配置到 `.env` 文件
3. 访问前端页面，点击"Create"按钮进入创建页面
4. 输入作者名称和图像描述，点击"Generate"生成图像
5. 生成满意后点击"Share with the Community"发布到社区
6. 返回首页浏览所有社区作品

## License

ISC