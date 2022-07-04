/*
 * @Author: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @Date: 2022-06-02 16:48:50
 * @LastEditors: reoreo 57691895+reoreo-zyt@users.noreply.github.com
 * @LastEditTime: 2022-07-04 23:01:17
 * @FilePath: \blog\backend\models\demo.go
 * @Description: 计划中的 demo
 *
 * Copyright (c) 2022 by reoreo 57691895+reoreo-zyt@users.noreply.github.com, All Rights Reserved.
 */
package models

type Demo struct {
	Id       int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	Name     string `gorm:"column:name;NOT NULL" json:"name"`           // demo名称
	Desc     string `gorm:"column:desc;NOT NULL" json:"desc"`           // 描述
	CreateOn int    `gorm:"column:create_on;NOT NULL" json:"create_on"` // 创建时间
	State    int    `gorm:"column:state;NOT NULL" json:"state"`         // 0 为已删除，1为demo，2为计划中
	ImgUrl   string `gorm:"column:imgUrl;NOT NULL" json:"imgUrl"`       // 图片链接
}

// 查询
func FindDemo() interface{} {
	var demo []Demo
	db.Raw("select * from blog_demo as ba where ba.state = 1").Scan(&demo)
	return demo
}

// 增加
func AddDemo(name, desc, imgUrl string, create_on, state int) interface{} {
	demo := Demo{Name: name, Desc: desc, CreateOn: create_on, State: state, ImgUrl: imgUrl}
	result := db.Create(&demo)
	return result.Value
}

// 更新
func UpdateDemo(name, desc, imgUrl string, create_on, state, id int) bool {
	// TODO: 按照id更新
	demo := Demo{Id: id, Name: name, Desc: desc, CreateOn: create_on, State: state, ImgUrl: imgUrl}
	result := db.Save(&demo)
	return result.RowsAffected != 0
}

// 删除
func RemoveDemo(id int) bool {
	demo := Demo{Id: id}
	result := db.Model(&demo).UpdateColumn("state", 0)
	return result.RowsAffected != 0
}
