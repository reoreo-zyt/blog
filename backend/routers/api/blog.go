package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reoreo-zyt/blog/backend/models"
	"github.com/unknwon/com"
)

// 查询文章列表
func GetArticle(c *gin.Context) {
	// 统一返回相关状态
	title := c.Query("title")
	sort := c.Query("sort")
	page := com.StrTo(c.Query("page")).MustInt()
	limit := com.StrTo(c.Query("limit")).MustInt()
	if sort == "+id" {
		sort = "asc"
	} else {
		sort = "desc"
	}
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "成功获取信息",
		"data":    models.GetArticle(title, sort, page, limit).Data,
		"total":   models.GetArticle(title, sort, page, limit).Total,
	})
}

// 根据id查询文章列表
func GetArticleById(c *gin.Context) {
	id := com.StrTo(c.Query("id")).MustInt()
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "成功获取信息",
		"data":    models.GetArticleById(id),
	})
}

// 根据tag_id查询
func GetArticleByTagId(c *gin.Context) {
	id := com.StrTo(c.Query("tag_id")).MustInt()
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "成功获取信息",
		"data":    models.GetArticleByTagId(id),
	})
}

// 新增文章
func AddArticle(c *gin.Context) {
	var article models.Article
	c.ShouldBindJSON(&article)
	result := models.AddArticle(article.TagId, article.CreatedOn, article.ModifiedOn, article.DeletedOn, article.State, article.Title, article.Content, article.Desc, article.CreateBy, article.ModifiedBy)
	c.JSON(http.StatusCreated, gin.H{
		"code":    200,
		"message": "成功创建文章",
		"data":    result,
	})
}

// 修改文章
func UpdateArticle(c *gin.Context) {
	var article models.Article
	c.ShouldBindJSON(&article)
	isOk := models.UpdateArticle(article.Id, article.TagId, article.CreatedOn, article.ModifiedOn, article.DeletedOn, article.State, article.Title, article.Content, article.Desc, article.CreateBy, article.ModifiedBy)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功修改文章",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "修改文章失败!",
		})
	}
}

func UpdateArticleWithContent(c *gin.Context) {
	var article models.Article
	c.ShouldBindJSON(&article)
	isOk := models.UpdateArticleWithContent(article.Id, article.Content)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功修改文章内容",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "修改文章内容失败!",
		})
	}
}

// 删除文章（软删除）
func DeleteArticle(c *gin.Context) {
	var article models.Article
	c.ShouldBindJSON(&article)
	isOk := models.DeleteArticle(article.Id)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功删除文章",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "删除文章失败!",
		})
	}
}
