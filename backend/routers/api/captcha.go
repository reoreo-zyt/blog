package api

import (
	"bytes"
	"fmt"
	"net/http"
	"path"
	"strings"
	"time"

	"github.com/dchest/captcha"
	"github.com/gin-gonic/gin"
)

type CaptchaResponse struct {
	CaptchaId string `json:"captchaId"` //验证码Id
	ImageUrl  string `json:"imageUrl"`  //验证码图片url
}

// @Summary 获取验证码 id
// @Schemes
// @Description 通过 github.com/dchest/captcha 插件
// @Tags 验证码
// @Accept json
// @Produce json
// @Success 200
// @Router /captcha [get]
func GenerateCaptcha(c *gin.Context) {
	length := captcha.DefaultLen
	captchaId := captcha.NewLen(length)
	var captcha CaptchaResponse
	captcha.CaptchaId = captchaId
	captcha.ImageUrl = "/captcha/" + captchaId + ".png"
	// c.JSON(http.StatusOK, captcha)
	c.JSON(http.StatusOK, gin.H{
		"code":    200,
		"message": "产生验证码成功！",
		"data":    captcha,
	})
}

// TODO: param: path 出了问题，应该访问 /captcha/:captchaId.png（swagger使用）
// @Summary 获取验证码图片
// @Schemes
// @Description 通过 github.com/dchest/captcha 插件
// @Tags 验证码
// @Accept json
// @Produce json
// @Param captchaId path string true "验证码id"
// @Success 200
// @Router /captcha/:captchaId [get]
func GetCaptcha(c *gin.Context) {
	c.Request.Header.Add("Content-Type", "image/png")
	captchaId := c.Param("captchaId")
	fmt.Println("GetCaptchaPng : " + captchaId)
	ServeHTTP(c.Writer, c.Request)
}

// 验证
// http://localhost:8080/verify/dVCqYbq7r2olKZfEtTvo/647489
func VerifyCaptcha(c *gin.Context) {
	captchaId := c.Param("captchaId")
	value := c.Param("value")
	if captchaId == "" || value == "" {
		c.String(http.StatusBadRequest, "参数错误")
	}
	if captcha.VerifyString(captchaId, value) {
		c.JSON(http.StatusOK, gin.H{
			"code":    200,
			"message": "验证码验证成功！",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"code":    400,
			"message": "验证码验证失败！请重新输入验证码",
		})
	}
}

func ServeHTTP(w http.ResponseWriter, r *http.Request) {
	dir, file := path.Split(r.URL.Path)
	ext := path.Ext(file)
	id := file[:len(file)-len(ext)]
	fmt.Println("file : " + file)
	fmt.Println("ext : " + ext)
	fmt.Println("id : " + id)
	if ext == "" || id == "" {
		http.NotFound(w, r)
		return
	}
	fmt.Println("reload : " + r.FormValue("reload"))
	if r.FormValue("reload") != "" {
		captcha.Reload(id)
	}
	lang := strings.ToLower(r.FormValue("lang"))
	download := path.Base(dir) == "download"
	if Serve(w, r, id, ext, lang, download, captcha.StdWidth, captcha.StdHeight) == captcha.ErrNotFound {
		http.NotFound(w, r)
	}
}

func Serve(w http.ResponseWriter, r *http.Request, id, ext, lang string, download bool, width, height int) error {
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
	w.Header().Set("Pragma", "no-cache")
	w.Header().Set("Expires", "0")

	var content bytes.Buffer
	switch ext {
	case ".png":
		w.Header().Set("Content-Type", "image/png")
		captcha.WriteImage(&content, id, width, height)
	case ".wav":
		w.Header().Set("Content-Type", "audio/x-wav")
		captcha.WriteAudio(&content, id, lang)
	default:
		return captcha.ErrNotFound
	}

	if download {
		w.Header().Set("Content-Type", "application/octet-stream")
	}
	http.ServeContent(w, r, id+ext, time.Time{}, bytes.NewReader(content.Bytes()))
	return nil
}
