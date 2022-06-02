package api

import (
	"context"
	"net/http"

	"github.com/astaxie/beego/validation"
	"github.com/gin-gonic/gin"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"github.com/reoreo-zyt/blog/backend/pkg/logging"
)

const (
	endpoint        = "110.40.253.20:9002"
	accessKeyID     = "admin"
	secretAccessKey = "510614zyt"
	useSSL          = false
)

// 初始化 minio sdk
func connetMinio(endpoint string, accessKeyID string, secretAccessKey string) (*minio.Client, error) {
	minioClient, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKeyID, secretAccessKey, ""),
		Secure: useSSL,
	})

	return minioClient, err
}

// 创建桶
func CreateBucket(c *gin.Context) {
	bucketName := c.Query("bucketName")
	ctx := context.Background()
	// 参数校验
	valid := validation.Validation{}
	valid.Required(bucketName, "bucketName").Message("桶名不能为空")
	valid.MinSize(bucketName, 3, "bucketName").Message("桶名不能少于3个字符")
	valid.MaxSize(bucketName, 30, "bucketName").Message("桶名最长为30个字符")

	if !valid.HasErrors() {
		// 初始化 minio sdk
		minioClient, err := connetMinio(endpoint, accessKeyID, secretAccessKey)
		if err != nil {
			logging.Error("minio客户端连接错误，请检查端口、账号、密码和ssl是否开启", err)
		}

		err = minioClient.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{Region: "cn-north-1"})
		if err != nil {
			exists, errBucketExists := minioClient.BucketExists(ctx, bucketName)
			if errBucketExists == nil && exists {
				logging.Info("该桶已经存在" + bucketName)
				c.JSON(http.StatusBadRequest, gin.H{
					"code": 204,
					"msg":  "桶" + bucketName + "已经存在！请换一个名字",
				})
			} else {
				logging.Error(err)
			}
		} else {
			logging.Info("成功创建桶" + bucketName)
			c.JSON(http.StatusOK, gin.H{
				"code": 200,
				"msg":  bucketName + "已成功创建",
			})
		}
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"code": 304,
			"msg":  valid.Errors,
		})
	}
}

// 配置桶的权限为 public
func ChangePolice(c *gin.Context) {
	bucketName := c.Query("bucketName")

	// 参数校验
	valid := validation.Validation{}
	valid.Required(bucketName, "bucketName").Message("桶名不能为空")
	valid.MinSize(bucketName, 3, "bucketName").Message("桶名不能少于3个字符")
	valid.MaxSize(bucketName, 30, "bucketName").Message("桶名最长为30个字符")

	minioClient, err := connetMinio(endpoint, accessKeyID, secretAccessKey)
	if err != nil {
		logging.Error("minio客户端连接错误，请检查端口、账号、密码和ssl是否开启", err)
	}

	publicPolicy := `{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:ListBucket","s3:ListBucketMultipartUploads","s3:GetBucketLocation"],"Resource":["arn:aws:s3:::*"]},{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject","s3:ListMultipartUploadParts","s3:PutObject"],"Resource":["arn:aws:s3:::*"]}]}`

	err = minioClient.SetBucketPolicy(context.Background(), bucketName, publicPolicy)

	if err != nil {
		logging.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": err,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"msg": bucketName + "权限设置为public,你可以通过 ip+端口(9002)+桶名+文件名 访问文件",
		})
	}
}

// 查看 bucket 列表
func ListBucket(c *gin.Context) {
	minioClient, err := connetMinio(endpoint, accessKeyID, secretAccessKey)
	ctx := context.Background()

	if err != nil {
		logging.Error("minio客户端连接错误，请检查端口、账号、密码和ssl是否开启", err)
	}
	buckets, _ := minioClient.ListBuckets(ctx)

	c.JSON(http.StatusOK, gin.H{
		"msg":    "获取bucket成功",
		"bucket": buckets,
	})
}

// 上传文件到本地
func FileUpload(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"code": 200,
		"msg":  "上传成功",
		"data": c.Request.Body,
	})
}

// 上传文件到 bucket
func FileUploader(c *gin.Context) {
	ctx := context.Background()
	bucketName := c.Query("bucketName")
	objectName := c.Query("title")
	filePath := c.Query("path") // "D:/projects/students-system/backend/tmp/golden-oldies.zip"
	contextType := "binary/octet-stream"
	println(bucketName, objectName, filePath)
	minioClient, err := connetMinio(endpoint, accessKeyID, secretAccessKey)

	if err != nil {
		logging.Error("minio客户端连接错误，请检查端口、账号、密码和ssl是否开启", err)
	}
	object, err := minioClient.FPutObject(ctx, bucketName, objectName, filePath, minio.PutObjectOptions{ContentType: contextType})
	if err != nil {
		logging.Error("上传错误", err)
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":           200,
			"msg":            "上传成功",
			"objectLocation": object,
			"objectName":     objectName,
		})
	}
}
