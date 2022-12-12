package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/reoreo-zyt/blog/backend/models"
	"github.com/reoreo-zyt/blog/backend/pkg/e"
	"github.com/reoreo-zyt/blog/backend/pkg/util"
)

var auth models.Auth

func GetAuth(c *gin.Context) {
	// ! 通过 json 交互前后端数据
	data := make(map[string]interface{})
	code := e.INVALID_PARAMS
	// 绑定 json 数据
	c.ShouldBindJSON(&auth)
	// 判断查询数据库是否有账号密码
	isExist := models.GetAuth(auth.Account, auth.Password)
	// 是则生成 token 作为登录凭证
	if isExist {
		token, err := util.GenerateToken(auth.Account, auth.Password)
		// 生成 token 失败
		if err != nil {
			code = e.ERROR_AUTH_TOKEN
		} else {
			// 成功
			data["token"] = token
			code = e.SUCCESS
		}
		// 查询失败
	} else {
		code = e.ERROR_AUTH
	}
	// 统一返回相关状态
	c.JSON(http.StatusOK, gin.H{
		"code":    code,
		"message": e.GetMsg(code),
		"data":    data,
	})
}

func GetUserInfo(c *gin.Context) {
	code := e.SUCCESS
	data := make(map[string]interface{})
	var name string = "管理员"
	var avatar string = ""
	data["name"] = name
	data["avatar"] = avatar
	data["imgUrl"] = "https://avatars.githubusercontent.com/u/57691895?s=400&u=cea5a8a6cc386615a5c59cf8fa709bb920ca543c&v=4"
	data["roles"] = [...]string{"admin"}
	c.JSON(http.StatusOK, gin.H{
		"code": code,
		"msg":  e.GetMsg(code),
		"data": data,
	})
}

// 登出
func LoginOut(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "用户成功登出",
		"data":    "success",
	})
}
