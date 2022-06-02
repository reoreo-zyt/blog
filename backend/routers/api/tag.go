package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reoreo-zyt/blog/backend/models"
)

// 新增标签
func AddTag(c *gin.Context) {
	var tag models.Tag
	c.ShouldBindJSON(&tag)
	result := models.AddTag(tag.Name)
	c.JSON(http.StatusCreated, gin.H{
		"code":    200,
		"message": "成功创建标签",
		"data":    result,
	})
}

// 查找
func FindTagId(c *gin.Context) {
	name := c.Query("name")
	result := models.FindTagId(name)
	c.JSON(http.StatusCreated, gin.H{
		"code":    200,
		"message": "成功查找标签",
		"data":    result,
	})
}

// 更新标签
func UpdateTag(c *gin.Context) {
	var tag models.Tag
	c.ShouldBindJSON(&tag)
	isOk := models.UpdateTag(tag.Id, tag.Name)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功修改标签",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "修改标签失败!",
		})
	}
}
