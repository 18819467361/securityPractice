# 安全防范实践练习项目


### 目录结构
```
├── README.md 说明文档
├── index.js 网站主入口文件
├── static  页面静态资源
├── model 页面数据相关（这里数据都是存在内存中的）
├── routers 路由相关
├── node_modules  依赖包
├── package.json
├── .editorconfig
└── .gitignore
```

博客网站共有两个页面：
* 文章列表页 (http://localhost:3000/index.html)
* 文章详情页 (http://localhost:3000/detail.html?id=文章ID)

### 默认用户账号密码
用户数据记录在 `/model/user.js` 中
- 用户1 账号: cover 密码: 123456
- 用户2 账号: kevin 密码: 123456

### 项目运行
* 通过 `npm install` 安装依赖
* 通过 `node index` 运行服务


## 具体实现

### 1.XSS 防范
 XSS 防范：
* 展示在文章详情页的文章内容（富文本），需要使用白名单的方式 (使用工具库 [js-xss](https://github.com/leizongmin/js-xss)) 设置合法的标签和属性：
  * 白名单标签： `p`、`a`、`img`、`h1`、`h2`、`h3`、`ul`、`li`
  * 白名单属性：`src`、`href`、`alt`、`title`
* 展示在文章列表页的文章简介去除富文本内容的标签字符使其变成纯文本
  
* 对于获取到的评论信息（纯文本）使用 `HtmlEncode`进行转义

### 2.referer 验证
评论接口和登陆接口增加 `referer` 校验逻辑。

### 3.token 验证
评论接口增加 token 参数来防范 CSRF 攻击，具体要求如下：

- 使用 [MD5 工具库](https://github.com/blueimp/JavaScript-MD5) 根据 userkey 来计算 token 的值

### 4.DDOS 防御
实现 DDOS 防御，使用下面工具包实现：
* [koa-limit](https://github.com/cnpm/koa-limit)

