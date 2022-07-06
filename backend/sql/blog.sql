-- MySQL dump 10.13  Distrib 5.7.34, for Win64 (x86_64)
--
-- Host: localhost    Database: blog
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog_article`
--

DROP TABLE IF EXISTS `blog_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_article` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_id` int(10) unsigned DEFAULT '0' COMMENT '标签ID',
  `title` varchar(100) DEFAULT '' COMMENT '文章标题',
  `desc` varchar(255) DEFAULT '' COMMENT '简述',
  `content` text,
  `created_on` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT '' COMMENT '创建人',
  `modified_on` int(10) unsigned DEFAULT '0' COMMENT '修改时间',
  `modified_by` varchar(255) DEFAULT '' COMMENT '修改人',
  `deleted_on` int(10) unsigned DEFAULT '0',
  `state` tinyint(3) unsigned DEFAULT '1' COMMENT '状态 0为禁用1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='文章管理';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_article`
--

LOCK TABLES `blog_article` WRITE;
/*!40000 ALTER TABLE `blog_article` DISABLE KEYS */;
INSERT INTO `blog_article` VALUES (35,31,'支持的markdown语法记录','基本的markdown语法、数学公式、脑图、图表、流程图|甘特图|时序图、五线谱、代码高亮、','## 1 基本语法\n\n基本语法通过 `markdown-it` 及相关插件渲染\n\n### 1.1 标题\n\n**语法**\n\n使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。\n\n```text\n# 一级标题\n##  二级标题\n### 三级标题\n#### 四级标题\n##### 五级标题\n###### 六级标题\n```\n\n**示例**\n\n# 一级标题\n\n## 二级标题\n\n### 三级标题\n\n#### 四级标题\n\n##### 五级标题\n\n###### 六级标题\n\n### 1.2 字体\n\n**语法**\n\n* 用1个星号*或底线_表示斜体\n* 用2个星号*或底线_表示粗体\n* 用3个星号*或底线_表示粗斜体\n\n```text\n*斜体文字*\n\n_斜体文字_\n\n**粗体文字**\n\n__粗体文字__\n\n***粗斜体文字***\n\n___粗斜体文字___\n```\n\n**示例**\n\n*斜体文字*\n\n_斜体文字_\n\n**粗体文字**\n\n__粗体文字__\n\n***粗斜体文字***\n\n___粗斜体文字___\n\n### 1.2 分隔线\n\n**语法**\n\n可以在一行中用三个以上的星号*、减号-、底线_来建立一个分隔线，行内不能有其他东西，你也可以在星号或减号蹭插入空格。下面这种写法都可以建立分隔线：\n\n```text\n***\n* * *\n******\n- - -\n------\n```\n\n**示例**\n\n---\n\n---\n\n---\n\n---\n\n---\n\n### 1.3 删除线\n\n**语法**\n\n如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线~~即可。\n\n```text\n~~tentxun.com~~\n```\n\n**示例**\n\n~~tentxun.com~~\n\n### 1.4 下划线\n\n**语法**\n\n下划线可以通过HTML的标签来实现\n\n```text\n<u>带下划线文本</u>\n```\n\n**示例**\n\n<u>带下划线文本</u>\n\n### 1.5 脚注\n\n```text\n[^1]\n\n在最后面写[^1]: 脚注的说明\n```\n\n**示例**\n\n脚注[^1]\n\n### 1.6 列表\n\n**语法**\n\nMarkdown支持有序列表和无序列表，无序列表使用星号(*)、加号(+)或者减号(-)作为标记：\n\n```text\n* 第一项\n* 第二项\n* 第三项\n\n+ 第一项\n+ 第二项\n+ 第三项\n\n- 第一项\n- 第二项\n- 第三项\n```\n\n**示例**\n\n* 第一项\n* 第二项\n* 第三项\n\n+ 第一项\n+ 第二项\n+ 第三项\n\n- 第一项\n- 第二项\n- 第三项\n\n**语法**\n\n有序列表直接在文字有加上1. 2. 3. 来表示，符号和文字之间加上一个空格字符，如：\n\n```\n1. 第一项\n2. 第二项\n3. 第三项\n```\n\n**示例**\n\n1. 第一项\n2. 第二项\n3. 第三项\n\n### 1.7 列表嵌套\n\n**语法**\n\n列表嵌套只需在子列表的选项前添加四个空格即可：\n\n```\n1. 第一项：\n    - 第一项嵌套的第一个元素\n    - 第一项嵌套的第二个元素\n2. 第二项：\n    - 第二项嵌套的第一个元素\n    - 第二项嵌套的第二个元素\n```\n\n**示例**\n\n1. 第一项：\n   - 第一项嵌套的第一个元素\n   - 第一项嵌套的第二个元素\n2. 第二项：\n   - 第二项嵌套的第一个元素\n   - 第二项嵌套的第二个元素\n\n### 1.8 区块\n\n**语法**\n\nMarkdown区块引用是在段落开头使用>符号，然后后面紧跟一个空格符号：\n\n```text\n> 区块引用\n> Markdown教程\n> 学的不仅是技术更是梦想\n```\n\n**示例**\n\n> 区块引用\n> Markdown教程\n> 学的不仅是技术更是梦想\n\n另外区块是可以嵌套的，一个>符号是最外层，两个符号是第一层嵌套，以此类推：\n\n```\n> 最外层\n>> 第一层嵌套\n>>> 第二层嵌套\n```\n\n**示例**\n\n> 最外层\n>\n>> 第一层嵌套\n>>\n>>> 第二层嵌套\n>>>\n>>\n\n### 1.9 代码框\n\n**语法**\n\n如果是段落上的一个函数或片段的代码可以用两个\'把它包起来。\n\n使用```可以使用代码块\n\n**示例**\n\n`console.log(\'code\')`\n\n```javascript\nconsole.log(\'code\')\n```\n\n### 1.10 链接\n\n**语法**\n\n```\n[链接名称](链接地址)\n或者\n<链接地址>\n```\n\n```\n[新浪新闻](https://news.sina.com.cn/)\n<https://news.sina.com.cn/>\n```\n\n**示例**\n\n[新浪新闻](https://news.sina.com.cn/)\n\n[https://news.sina.com.cn/](https://news.sina.com.cn/)\n\n### 1.11 图片\n\n**语法**\n\n```\n![alt 属性文本](图片地址)\n![alt 属性文本](图片地址 \"可选标题\")\n```\n\n```\n![有问题上知乎 图标](https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png)\n\n---\n\n![通信人家园 图标](http://www.txrjy.com/static/image/common/logo.gif)\n```\n\n**示例**\n\n![有问题上知乎 图标](https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png)\n\n---\n\n![通信人家园 图标](http://www.txrjy.com/static/image/common/logo.gif)\n\n### 1.12 表格\n\n**语法**\n\n```\n|表头1|表头2|\n|----|----|\n|单元格11|单元格12|\n|单元格21|单元格22|\n```\n\n**对齐方式**\n\n```\n|左对齐|居中对齐|右对齐|\n|:----|:----:|----:|\n|单元格11|单元格12|单元格13|\n|单元格21|单元格22|单元格23|\n```\n\n**示例**\n\n\n| 表头1    | 表头2    |\n| ---------- | ---------- |\n| 单元格11 | 单元格12 |\n| 单元格21 | 单元格22 |\n\n\n| 左对齐   | 居中对齐 |   右对齐 |\n| :--------- | :--------: | ---------: |\n| 单元格11 | 单元格12 | 单元格13 |\n| 单元格21 | 单元格22 | 单元格23 |\n\n## 2. 高级功能\n\n### 2.1 表情\n\n```text\n:rocket:\n:smile:\n:smile_cat:\n```\n\n:rocket:\n:smile:\n:smile_cat:\n\n### 2.2 数学公式\n\n行内公式\n\n`$\\sum_{i=0}^N\\int_{a}^{b}g(t,i)\\text{d}t$`\n\n$\\sum_{i=0}^N\\int_{a}^{b}g(t,i)\\text{d}t$\n\n行间公式\n\n`$$\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.$$`\n\n$$\n\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.\n\n$$\n\n更多书写可以查看：[MARKDOWN中的KETEX公式用法](https://www.freesion.com/article/23931139514/)\n',1654089959,'reoreo',0,'noname',0,1),(37,34,'使用docker安装minio','环境为ubuntu，minio是一个对象存储服务','',1656955104,'reoreo',0,'noname',0,0),(38,35,'test','环境为ubuntu，minio是一个对象存储服务','',1656955792,'reoreo',0,'noname',0,0),(39,36,'test','1111111111111111111111111','',1657019737,'reoreo',0,'noname',0,0),(40,37,'test','11111111111111111111111111111','',1657020014,'reoreo',0,'noname',0,0),(41,38,'DARK SOULS EP.1 移动','创建平台移动；导入角色模型；下载 input package；设置 input system...','## 1. 开发目录\n\n* 创建一个可以移动的平台\n* 导入玩家角色\n* 下载 unity 的 input package\n* 配置 unity 的 input system\n* 玩家的 Collider 和 Rigidbody\n* 编写脚本：PlayerLocomotion 和 InputHandler\n* 编写脚本：AnimatorHandler\n* 动画\n* 测试移动\n* 解决bug\n\n## 2. 开发记录\n',1657030622,'reoreo',0,'noname',0,1),(42,39,'111111','tqqqqqqqqqqqqqqqqqqqqqqqqqqqq','',1657039769,'reoreo',0,'noname',0,0),(43,40,'test','1111111111111111111111111111111111111','',1657116884,'reoreo',0,'noname',0,0),(44,41,'docker配置minio','minio：对象存储服务，linux 配置环境为 ubuntu','## 1. 安装 docker minio\n\n*切换为管理员模式*\n\n```bash\nsudo su\n```\n\n*安装docker*\n\n![blog-44-1](http://110.40.253.20:9002/blog-44/blog-44-1.png)\n\n*安装minio*\n\n```bash\ndocker pull quay.io/minio/minio\n```\n\n![blog-44-2](http://110.40.253.20:9002/blog-44/blog-44-2.png)\n\n\n*启动minio*\n\n```bash\ndocker run -d  -p 9001:9001   -p 9002:9002   -e \"MINIO_ROOT_USER=yourUser\"   -e \"MINIO_ROOT_PASSWORD=yourPassword\"   quay.io/minio/minio server /data --console-address \":9001\" -address \":9002\"\n```\n\n* `-d` 表示持久运行\n* `MINIO_ROOT_USER` 客户端账号\n* `MINIO_ROOT_PASSWORD` 客户端密码\n* `--console-address` 客户端端口\n* `-address` api端口\n\n以上步骤如有出错请查看注意事项，一般问题通过百度也可轻松解决。\n\n\n## 2. 注意事项\n\n1. 如果你使用的是云服务器，要记得开放安全组。本人使用的是腾讯云服务器，开放安全组直接在其官网上配置即可。\n2. 在你的服务器中，如果设置了防火墙，需要开放对应的端口。\n3. 开放了对应的端口一定记得要重启 docker。\n\n\n## 3. 参考文章\n\n[Ubuntu16.04minio部署](https://blog.csdn.net/weixin_56332948/article/details/120054285)\n\n[ubuntu 安装docker](https://www.jianshu.com/p/c4c6d1196156)\n\n[Linux开放指定端口具体方法](https://www.lxlinux.net/2490.html)\n',1657117039,'reoreo',0,'noname',0,1);
/*!40000 ALTER TABLE `blog_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_auth`
--

DROP TABLE IF EXISTS `blog_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `photo` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_auth`
--

LOCK TABLES `blog_auth` WRITE;
/*!40000 ALTER TABLE `blog_auth` DISABLE KEYS */;
INSERT INTO `blog_auth` VALUES (1,'reoreo','1540689086Zyt@','768119359@qq.com','https://avatars.githubusercontent.com/u/57691895?v=4');
/*!40000 ALTER TABLE `blog_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_demo`
--

DROP TABLE IF EXISTS `blog_demo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_demo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL COMMENT 'demo名称',
  `desc` varchar(250) NOT NULL COMMENT '描述',
  `create_on` int(11) NOT NULL COMMENT '创建时间',
  `state` int(11) NOT NULL COMMENT '0 为已删除，1为demo，2为计划中',
  `imgUrl` varchar(250) NOT NULL COMMENT '图片链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_demo`
--

LOCK TABLES `blog_demo` WRITE;
/*!40000 ALTER TABLE `blog_demo` DISABLE KEYS */;
INSERT INTO `blog_demo` VALUES (1,'自制黑魂类动作游戏','仿黑魂 3，使用 unity 开发。',1653978740,1,'https://pic2.zhimg.com/80/eb18abb6e48d10d029ee546a75ccd4c9_1440w.jpg');
/*!40000 ALTER TABLE `blog_demo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_tag`
--

DROP TABLE IF EXISTS `blog_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT '' COMMENT '标签名称',
  `created_on` int(10) unsigned DEFAULT '0' COMMENT '创建时间',
  `created_by` varchar(100) DEFAULT '' COMMENT '创建人',
  `modified_on` int(10) unsigned DEFAULT '0' COMMENT '修改时间',
  `modified_by` varchar(100) DEFAULT '' COMMENT '修改人',
  `deleted_on` int(10) unsigned DEFAULT '0',
  `state` tinyint(3) unsigned DEFAULT '1' COMMENT '状态 0为禁用、1为启用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='文章标签管理';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_tag`
--

LOCK TABLES `blog_tag` WRITE;
/*!40000 ALTER TABLE `blog_tag` DISABLE KEYS */;
INSERT INTO `blog_tag` VALUES (28,'3d建模;blender',0,'',0,'',0,1),(29,'音乐',0,'',0,'',0,1),(30,'音乐',0,'',0,'',0,1),(31,'markdown',0,'',0,'',0,1),(32,'blender;3d建模',0,'',0,'',0,1),(34,'docker;minio;linux',0,'',0,'',0,1),(35,'docker;minio;linux',0,'',0,'',0,1),(36,'11111',0,'',0,'',0,1),(37,'111',0,'',0,'',0,1),(38,'unity;dark souls',0,'',0,'',0,1),(39,'1',0,'',0,'',0,1),(40,'111111111',0,'',0,'',0,1),(41,'linux;docker;minio',0,'',0,'',0,1);
/*!40000 ALTER TABLE `blog_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-06 23:30:20
