package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/reoreo-zyt/blog/backend/models"
)

func FindDemo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "成功获取信息",
		"data":    models.FindDemo(),
	})
}

func AddDemo(c *gin.Context) {
	var demo models.Demo
	c.ShouldBindJSON(&demo)
	result := models.AddDemo(demo.Name, demo.Desc, demo.ImgUrl, demo.CreateOn, demo.State)
	c.JSON(http.StatusCreated, gin.H{
		"code":    200,
		"message": "成功创建",
		"data":    result,
	})
}

func UpdateDemo(c *gin.Context) {
	var demo models.Demo
	c.ShouldBindJSON(&demo)
	isOk := models.UpdateDemo(demo.Name, demo.Desc, demo.ImgUrl, demo.CreateOn, demo.State, demo.Id)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功修改",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "修改失败!",
		})
	}
}

func RemoveDemo(c *gin.Context) {
	var demo models.Demo
	c.ShouldBindJSON(&demo)
	isOk := models.RemoveDemo(demo.Id)
	if isOk {
		c.JSON(http.StatusCreated, gin.H{
			"code":    200,
			"message": "成功删除",
		})
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    304,
			"message": "删除失败!",
		})
	}
}
