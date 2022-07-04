## 个人博客（使用 go 以及 vue 开发）

### 预览

*登录验证*

![](./README_images/1.png)

*管理系统*

![](./README_images/2.png)

![](./README_images/4.png)

*网站前端*

![](./README_images/3.png)

![](./README_images/5.png)

### 目前支持如下：

**admin**

* 管理员页面 token 权限
* 验证码
* 文章的增删改查

**前端**

* 展示文章

### 计划中...

* 评论
* markdown 渲染支持更多...

## 运行项目

*运行管理员前端项目：*

```bash
cd admin
# 安装依赖
yarn
# 运行项目
yarn dev
```

*运行后端项目*

由于后端配置项写在 `app.ini` 文件中，且被忽略提交，要运行后端项目，你应该在  `backend` 文件夹的 `conf` 文件夹下新建 `app.ini` 文件，并配置你的后端配置项，配置相关注释已给出：

```ini
#debug or release
RUN_MODE = debug

# random value
[app]
JWT_SECRET = ?

[server]
HTTP_PORT = 5200
READ_TIMEOUT = 60
WRITE_TIMEOUT = 60

[database]
TYPE = mysql
USER = your user name
PASSWORD = your user password
#127.0.0.1:3306
HOST = 127.0.0.1:3306
#数据库名
NAME = blog
#表名 blog_auth
TABLE_PREFIX = blog_
```

运行后端项目（air 是 go 项目的热更新运行包，可通过go get安装到全局中使用）：

```bash
cd backend
air
```

*运行前端项目*

```bash
cd fronend
yarn
yarn serve
```

