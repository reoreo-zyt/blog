package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/reoreo-zyt/blog/backend/middleware/jwt"
	"github.com/reoreo-zyt/blog/backend/pkg/setting"
	"github.com/reoreo-zyt/blog/backend/routers/api"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	r.POST("/api/v1/auth", api.GetAuth)
	r.GET("/api/v1/captcha", api.GenerateCaptcha)
	r.GET("/api/v1/captcha/:captchaId", api.GetCaptcha)
	r.GET("/api/v1/verify/:captchaId/:value", api.VerifyCaptcha)
	// 查询文章列表
	r.GET("/api/v1/main/homeworkList", api.GetArticle)
	r.GET("/api/v1/main/GetArticleAllExceptContent", api.GetArticleAllExceptContent)
	// 根据id查询文章
	r.GET("/api/v1/main/homeworkListById", api.GetArticleById)
	// 查找tagid
	r.GET("/api/v1/main/findTagId", api.FindTagId)
	//
	r.GET("/api/v1/main/getArticleByTagId", api.GetArticleByTagId)
	// 查找demo
	r.GET("/api/v1/main/getDemo", api.FindDemo)
	apiv1 := r.Group("/api/v1")
	// jwt 鉴权
	apiv1.Use(jwt.JWT())
	{
		// TODO: 获取到当前用户的信息
		apiv1.GET("/user/info", api.GetUserInfo)
		// 登出
		apiv1.POST("/user/logout", api.LoginOut)
		// 增加文章列表
		apiv1.POST("/main/addHomeworkList", api.AddArticle)
		// 更新文章列表
		apiv1.POST("/main/updateHomeworkList", api.UpdateArticle)
		apiv1.POST("/mian/updateArticleWithContent", api.UpdateArticleWithContent)
		// 删除文章
		apiv1.POST("/main/deleteHomeworkList", api.DeleteArticle)
		// 新增标签
		apiv1.POST("/main/addTag", api.AddTag)
		// 更新标签
		apiv1.POST("/main/updateTag", api.UpdateTag)
		// 增加
		apiv1.POST("/main/addDemo", api.AddDemo)
		// 更新
		apiv1.POST("/main/updateDemo", api.UpdateDemo)
		// 删除
		apiv1.POST("/main/deleteDemo", api.RemoveDemo)
	}
	return r
}
