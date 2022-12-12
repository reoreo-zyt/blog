package models

type Article struct {
	Id         int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	TagId      int    `gorm:"column:tag_id;NOT NULL" json:"tag_id"`           // 标签id
	Title      string `gorm:"column:title;NOT NULL" json:"title"`             // 文章标题
	Desc       string `gorm:"column:desc;NOT NULL" json:"desc"`               // 简述
	Content    string `gorm:"column:content;NOT NULL" json:"content"`         // 文章全文
	CreatedOn  int    `gorm:"column:created_on;NOT NULL" json:"created_on"`   // 创建时间
	CreateBy   string `gorm:"column:created_by;NOT NULL" json:"created_by"`   // 创建人
	ModifiedOn int    `gorm:"column:modified_on;NOT NULL" json:"modified_on"` // 修改时间
	ModifiedBy string `gorm:"column:modified_by;NOT NULL" json:"modified_by"` // 修改人
	DeletedOn  int    `gorm:"column:deleted_on;NOT NULL" json:"deleted_on"`   // 删除时间
	State      int    `gorm:"column:state;NOT NULL" json:"state"`             // 0 为禁用，1 为启用
}

// 联合查询文章列表和tag
type ArticleWithTag struct {
	Id         int    `gorm:"column:id;primary_key;AUTO_INCREMENT" json:"id"`
	TagId      int    `gorm:"column:tag_id;NOT NULL" json:"tag_id"`           // 标签id
	Title      string `gorm:"column:title;NOT NULL" json:"title"`             // 文章标题
	Desc       string `gorm:"column:desc;NOT NULL" json:"desc"`               // 简述
	Content    string `gorm:"column:content;NOT NULL" json:"content"`         // 文章全文
	CreatedOn  int    `gorm:"column:created_on;NOT NULL" json:"created_on"`   // 创建时间
	CreateBy   string `gorm:"column:created_by;NOT NULL" json:"created_by"`   // 创建人
	ModifiedOn int    `gorm:"column:modified_on;NOT NULL" json:"modified_on"` // 修改时间
	ModifiedBy string `gorm:"column:modified_by;NOT NULL" json:"modified_by"` // 修改人
	DeletedOn  int    `gorm:"column:deleted_on;NOT NULL" json:"deleted_on"`   // 删除时间
	State      int    `gorm:"column:state;NOT NULL" json:"state"`             // 0 为禁用，1 为启用
	Name       string `gorm:"column:name;NOT NULL" json:"name"`               // 标签
}

// 存放文章的数据和条数
type ArticleData struct {
	Data  interface{}
	Total int
}

// 查询文章列表
func GetArticle(title, sort string, page, limit int) ArticleData {
	// 定义结构体数据接收，否则返回的只是最后一条数据
	var articleWithTag []ArticleWithTag
	var articleData ArticleData
	// 条件查询
	if sort == "asc" {
		db.Raw("select * from blog_article as ba, blog_tag as bt where ba.state = 1 and ba.tag_id = bt.id and ba.title like ? order by ba.id asc limit ?,?", "%"+title+"%", (page-1)*limit, limit).Scan(&articleWithTag)
	} else {
		db.Raw("select * from blog_article as ba, blog_tag as bt where ba.state = 1 and ba.tag_id = bt.id and ba.title like ? order by ba.id desc limit ?,?", "%"+title+"%", (page-1)*limit, limit).Scan(&articleWithTag)
	}
	articleData.Data = articleWithTag
	articleData.Total = int(db.Raw("select * from blog_article as ba where ba.state = 1").Scan(&articleWithTag).RowsAffected)
	return articleData
}

// 查询文章，不包括内容
func GetArticleAllExceptContent() ArticleData {
	var articleWithTag []ArticleWithTag
	var articleData ArticleData

	db.Raw("select ba.id,ba.tag_id,ba.title,ba.desc,ba.created_on,bt.name,ba.state from blog_article as ba, blog_tag as bt where ba.state = 1 and ba.tag_id = bt.id").Scan(&articleWithTag)
	articleData.Data = articleWithTag
	articleData.Total = int(db.Raw("select * from blog_article as ba where ba.state = 1").Scan(&articleWithTag).RowsAffected)

	return articleData
}

// 根据tag_id查询文章
func GetArticleByTagId(tagId int) interface{} {
	var articleWithTag []ArticleWithTag
	return db.Raw("select * from blog_article as ba where ba.tag_id = ?", tagId).Scan(&articleWithTag).Value
}

// 根据id查询文章
func GetArticleById(id int) []ArticleWithTag {
	var article []ArticleWithTag
	db.Raw("select * from blog_article as ba, blog_tag as bt where ba.id = ? and ba.tag_id = bt.id", id).Scan(&article)
	return article
}

// TODO: （新增和修改都可以使用save()）增加文章列表
func AddArticle(tag_id, created_on, modified_on, deleted_on, state int, title, content, desc, created_by, modified_by string) interface{} {
	article := Article{TagId: tag_id, Title: title, Content: content, Desc: desc, CreatedOn: created_on, CreateBy: created_by, State: state, ModifiedOn: modified_on, ModifiedBy: modified_by, DeletedOn: deleted_on}
	result := db.Create(&article)
	return result.Value
}

// 修改文章列表
func UpdateArticle(id, tag_id, created_on, modified_on, deleted_on, state int, title, content, desc, created_by, modified_by string) bool {
	article := Article{Id: id, TagId: tag_id, Title: title, Content: content, Desc: desc, CreatedOn: created_on, CreateBy: created_by, State: state, ModifiedOn: modified_on, ModifiedBy: modified_by, DeletedOn: deleted_on}
	result := db.Save(&article)
	return result.RowsAffected != 0
}

// 修改文章内容
func UpdateArticleWithContent(id int, content string) bool {
	article := Article{Id: id}
	result := db.Model(&article).UpdateColumn("content", content)
	return result.RowsAffected != 0
}

// 删除文章列表
func DeleteArticle(id int) bool {
	article := Article{Id: id}
	result := db.Model(&article).UpdateColumn("state", 0)
	return result.RowsAffected != 0
}
