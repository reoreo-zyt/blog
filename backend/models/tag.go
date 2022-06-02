package models

type Tag struct {
	Id   int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	Name string `gorm:"column:name;NOT NULL" json:"name"`
}

// 创建tag，返回对象
func AddTag(name string) interface{} {
	tag := Tag{Name: name}
	result := db.Create(&tag)
	return result.Value
}

// 模糊搜索tag.name

func FindTagId(name string) interface{} {
	tag := Tag{Name: name}
	db.Raw("select * from blog_tag as bt where bt.name like ?", "%"+name+"%").Scan(&tag)
	return tag
}

// 修改tag
func UpdateTag(id int, name string) bool {
	tag := Tag{Id: id, Name: name}
	result := db.Save(&tag)
	return result.RowsAffected != 0
}
