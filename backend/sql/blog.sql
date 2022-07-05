CREATE TABLE `blog_article` ( 
  `id` INT AUTO_INCREMENT UNSIGNED NOT NULL,
  `tag_id` INT UNSIGNED NULL DEFAULT 0  COMMENT '标签ID' ,
  `title` VARCHAR(100) NULL COMMENT '文章标题' ,
  `desc` VARCHAR(255) NULL COMMENT '简述' ,
  `content` TEXT NULL,
  `created_on` INT NULL,
  `created_by` VARCHAR(100) NULL COMMENT '创建人' ,
  `modified_on` INT UNSIGNED NULL DEFAULT 0  COMMENT '修改时间' ,
  `modified_by` VARCHAR(255) NULL COMMENT '修改人' ,
  `deleted_on` INT UNSIGNED NULL DEFAULT 0 ,
  `state` TINYINT UNSIGNED NULL DEFAULT 1  COMMENT '状态 0为禁用1为启用' ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `blog_auth` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `account` VARCHAR(250) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `photo` VARCHAR(250) NOT NULL,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `blog_demo` ( 
  `id` INT AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(250) NOT NULL COMMENT 'demo名称' ,
  `desc` VARCHAR(250) NOT NULL COMMENT '描述' ,
  `create_on` INT NOT NULL COMMENT '创建时间' ,
  `state` INT NOT NULL COMMENT '0 为已删除，1为demo，2为计划中' ,
  `imgUrl` VARCHAR(250) NOT NULL COMMENT '图片链接' ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
CREATE TABLE `blog_tag` ( 
  `id` INT AUTO_INCREMENT UNSIGNED NOT NULL,
  `name` VARCHAR(100) NULL COMMENT '标签名称' ,
  `created_on` INT UNSIGNED NULL DEFAULT 0  COMMENT '创建时间' ,
  `created_by` VARCHAR(100) NULL COMMENT '创建人' ,
  `modified_on` INT UNSIGNED NULL DEFAULT 0  COMMENT '修改时间' ,
  `modified_by` VARCHAR(100) NULL COMMENT '修改人' ,
  `deleted_on` INT UNSIGNED NULL DEFAULT 0 ,
  `state` TINYINT UNSIGNED NULL DEFAULT 1  COMMENT '状态 0为禁用、1为启用' ,
  CONSTRAINT `PRIMARY` PRIMARY KEY (`id`)
);
INSERT INTO `blog_article` (`id`, `tag_id`, `title`, `desc`, `content`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (35, 31, '支持的markdown语法记录', '基本的markdown语法、数学公式、脑图、图表、流程图|甘特图|时序图、五线谱、代码高亮、', '## 1 基本语法

基本语法通过 `markdown-it` 及相关插件渲染

### 1.1 标题

**语法**

使用 # 号可表示 1-6 级标题，一级标题对应一个 # 号，二级标题对应两个 # 号，以此类推。

```text
# 一级标题
##  二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

**示例**

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

### 1.2 字体

**语法**

* 用1个星号*或底线_表示斜体
* 用2个星号*或底线_表示粗体
* 用3个星号*或底线_表示粗斜体

```text
*斜体文字*

_斜体文字_

**粗体文字**

__粗体文字__

***粗斜体文字***

___粗斜体文字___
```

**示例**

*斜体文字*

_斜体文字_

**粗体文字**

__粗体文字__

***粗斜体文字***

___粗斜体文字___

### 1.2 分隔线

**语法**

可以在一行中用三个以上的星号*、减号-、底线_来建立一个分隔线，行内不能有其他东西，你也可以在星号或减号蹭插入空格。下面这种写法都可以建立分隔线：

```text
***
* * *
******
- - -
------
```

**示例**

---

---

---

---

---

### 1.3 删除线

**语法**

如果段落上的文字要添加删除线，只需要在文字的两端加上两个波浪线~~即可。

```text
~~tentxun.com~~
```

**示例**

~~tentxun.com~~

### 1.4 下划线

**语法**

下划线可以通过HTML的标签来实现

```text
<u>带下划线文本</u>
```

**示例**

<u>带下划线文本</u>

### 1.5 脚注

```text
[^1]

在最后面写[^1]: 脚注的说明
```

**示例**

脚注[^1]

### 1.6 列表

**语法**

Markdown支持有序列表和无序列表，无序列表使用星号(*)、加号(+)或者减号(-)作为标记：

```text
* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项

- 第一项
- 第二项
- 第三项
```

**示例**

* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项

- 第一项
- 第二项
- 第三项

**语法**

有序列表直接在文字有加上1. 2. 3. 来表示，符号和文字之间加上一个空格字符，如：

```
1. 第一项
2. 第二项
3. 第三项
```

**示例**

1. 第一项
2. 第二项
3. 第三项

### 1.7 列表嵌套

**语法**

列表嵌套只需在子列表的选项前添加四个空格即可：

```
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

**示例**

1. 第一项：
   - 第一项嵌套的第一个元素
   - 第一项嵌套的第二个元素
2. 第二项：
   - 第二项嵌套的第一个元素
   - 第二项嵌套的第二个元素

### 1.8 区块

**语法**

Markdown区块引用是在段落开头使用>符号，然后后面紧跟一个空格符号：

```text
> 区块引用
> Markdown教程
> 学的不仅是技术更是梦想
```

**示例**

> 区块引用
> Markdown教程
> 学的不仅是技术更是梦想

另外区块是可以嵌套的，一个>符号是最外层，两个符号是第一层嵌套，以此类推：

```
> 最外层
>> 第一层嵌套
>>> 第二层嵌套
```

**示例**

> 最外层
>
>> 第一层嵌套
>>
>>> 第二层嵌套
>>>
>>

### 1.9 代码框

**语法**

如果是段落上的一个函数或片段的代码可以用两个\'把它包起来。

使用```可以使用代码块

**示例**

`console.log(\'code\')`

```javascript
console.log(\'code\')
```

### 1.10 链接

**语法**

```
[链接名称](链接地址)
或者
<链接地址>
```

```
[新浪新闻](https://news.sina.com.cn/)
<https://news.sina.com.cn/>
```

**示例**

[新浪新闻](https://news.sina.com.cn/)

[https://news.sina.com.cn/](https://news.sina.com.cn/)

### 1.11 图片

**语法**

```
![alt 属性文本](图片地址)
![alt 属性文本](图片地址 "可选标题")
```

```
![有问题上知乎 图标](https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png)

---

![通信人家园 图标](http://www.txrjy.com/static/image/common/logo.gif)
```

**示例**

![有问题上知乎 图标](https://pic4.zhimg.com/80/v2-a47051e92cf74930bedd7469978e6c08_hd.png)

---

![通信人家园 图标](http://www.txrjy.com/static/image/common/logo.gif)

### 1.12 表格

**语法**

```
|表头1|表头2|
|----|----|
|单元格11|单元格12|
|单元格21|单元格22|
```

**对齐方式**

```
|左对齐|居中对齐|右对齐|
|:----|:----:|----:|
|单元格11|单元格12|单元格13|
|单元格21|单元格22|单元格23|
```

**示例**


| 表头1    | 表头2    |
| ---------- | ---------- |
| 单元格11 | 单元格12 |
| 单元格21 | 单元格22 |


| 左对齐   | 居中对齐 |   右对齐 |
| :--------- | :--------: | ---------: |
| 单元格11 | 单元格12 | 单元格13 |
| 单元格21 | 单元格22 | 单元格23 |

## 2. 高级功能

### 2.1 表情

```text
:rocket:
:smile:
:smile_cat:
```

:rocket:

:smile:

:smile_cat:

[^1]: 脚注示例
', 1654089959, 'reoreo', 0, 'noname', 0, 1);
INSERT INTO `blog_article` (`id`, `tag_id`, `title`, `desc`, `content`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (37, 34, '使用docker安装minio', '环境为ubuntu，minio是一个对象存储服务', '', 1656955104, 'reoreo', 0, 'noname', 0, 1);
INSERT INTO `blog_article` (`id`, `tag_id`, `title`, `desc`, `content`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (38, 35, 'test', '环境为ubuntu，minio是一个对象存储服务', '', 1656955792, 'reoreo', 0, 'noname', 0, 0);
INSERT INTO `blog_article` (`id`, `tag_id`, `title`, `desc`, `content`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (39, 36, 'test', '1111111111111111111111111', '', 1657019737, 'reoreo', 0, 'noname', 0, 0);
INSERT INTO `blog_article` (`id`, `tag_id`, `title`, `desc`, `content`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (40, 37, 'test', '11111111111111111111111111111', '', 1657020014, 'reoreo', 0, 'noname', 0, 0);
INSERT INTO `blog_auth` (`id`, `account`, `password`, `email`, `photo`) VALUES (1, 'reoreo', '1540689086Zyt@', '768119359@qq.com', 'https://avatars.githubusercontent.com/u/57691895?v=4');
INSERT INTO `blog_demo` (`id`, `name`, `desc`, `create_on`, `state`, `imgUrl`) VALUES (1, '自制黑魂类动作游戏', '仿黑魂 3，使用 unity 开发。', 1653978740, 1, 'https://pic2.zhimg.com/80/eb18abb6e48d10d029ee546a75ccd4c9_1440w.jpg');
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (28, '3d建模;blender', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (29, '音乐', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (30, '音乐', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (31, 'markdown', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (32, 'blender;3d建模', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (34, 'docker;minio;linux', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (35, 'docker;minio;linux', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (36, '11111', 0, '', 0, '', 0, 1);
INSERT INTO `blog_tag` (`id`, `name`, `created_on`, `created_by`, `modified_on`, `modified_by`, `deleted_on`, `state`) VALUES (37, '111', 0, '', 0, '', 0, 1);
