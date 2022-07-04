package routers

import (
	// "time"

	"github.com/gin-gonic/gin"
	// cors "github.com/itsjamie/gin-cors"
	_ "github.com/reoreo-zyt/blog/backend/docs"
	"github.com/reoreo-zyt/blog/backend/middleware/jwt"
	"github.com/reoreo-zyt/blog/backend/pkg/setting"
	"github.com/reoreo-zyt/blog/backend/routers/api"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

func InitRouter() *gin.Engine {
	// 在这里写不需要跨域的API
	// c := gin.New()
	// c.Use(cors.Middleware(cors.Config{
	// 	Origins:         "*",
	// 	Methods:         "GET, PUT, POST, DELETE",
	// 	RequestHeaders:  "Origin, Authorization, Content-Type",
	// 	ExposedHeaders:  "",
	// 	MaxAge:          50 * time.Second,
	// 	Credentials:     false,
	// 	ValidateHeaders: false,
	// }))

	// 上传到本地
	// c.POST("/cors/file/fileUploadLocal", api.FileUpload)

	// 需要跨域API
	r := gin.New()

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.POST("/api/v1/auth", api.GetAuth)
	r.GET("/api/v1/captcha", api.GenerateCaptcha)
	r.GET("/api/v1/captcha/:captchaId", api.GetCaptcha)
	r.GET("/api/v1/verify/:captchaId/:value", api.VerifyCaptcha)
	// 查询文章列表
	r.GET("/api/v1/main/homeworkList", api.GetArticle)
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
		// 创建桶
		apiv1.POST("/file/CreateBucket", api.CreateBucket)
		// 设置桶为 public
		apiv1.POST("/file/ChangePolice", api.ChangePolice)
		// 获取所有桶的名称
		apiv1.GET("/file/getListBucket", api.ListBucket)
		// 上传文件
		apiv1.POST("/file/fileUpload", api.FileUploader)
		apiv1.POST("/cors/file/fileUploadLocal", api.FileUpload)
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
