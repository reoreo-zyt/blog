package main

import (
	"fmt"
	"net/http"

	"github.com/reoreo-zyt/blog/backend/pkg/setting"
	"github.com/reoreo-zyt/blog/backend/routers"
)

func main() {
	routersInit := routers.InitRouter()

	s := &http.Server{
		Addr:           fmt.Sprintf(":%d", setting.HTTPPort),
		Handler:        routersInit,
		ReadTimeout:    setting.ReadTimeout,
		WriteTimeout:   setting.WriteTimeout,
		MaxHeaderBytes: 1 << 20,
	}

	s.ListenAndServe()
}
