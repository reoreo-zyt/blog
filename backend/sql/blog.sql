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
