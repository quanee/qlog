package main

import (
	"context"
	"fmt"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/handler/adminhd"
	"github.com/quanee/qlog/handler/bloghd"
	"github.com/quanee/qlog/handler/toolhd"
	"github.com/quanee/qlog/middleware/adminmw"
	"github.com/quanee/qlog/middleware/blogmw"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func onlyForV2() draft.HandlerFunc {
	return func(c *draft.Context) {
		// Start timer
		t := time.Now()
		// if a server error occurred
		c.Fail(500, "Internal Server Error")
		// Calculate resolution time
		log.Printf("[%d] %s in %v for group v2", c.StatusCode, c.Req.RequestURI, time.Since(t))
	}
}

func formatAsDate(t time.Time) string {
	year, month, day := t.Date()
	return fmt.Sprintf("%d-%02d-%02d", year, month, day)
}

func unescaped(x string) interface{} { return template.HTML(x) }

func main() {
	r := draft.New()
	r.Use(blogmw.Cookie(), blogmw.Logger(), blogmw.Gzip(), blogmw.Header(), blogmw.Statistic())

	r.SetFuncMap(template.FuncMap{
		"html": unescaped,
	})

	r.LoadHTMLGlob("templates/**/*")
	r.Static("/static", "./static")
	r.StaticFile("/service-worker.js", "./static/test/js/service-worker.js")

	r.GET("/blog/", bloghd.Index)
	r.GET("/", bloghd.AllIndex)
	r.GET("/about", bloghd.About)
	r.GET("/post/*", bloghd.Post)
	r.GET("/article", bloghd.GetArticle)
	r.GET("/search/*", bloghd.Search)
	r.POST("/search/*", bloghd.Search)

	r.GET("/tool/", toolhd.Tool)
	r.GET("/fq/", toolhd.Fq)
	r.GET("/uuid/", toolhd.UUID)
	r.GET("/json/", toolhd.Json)
	r.GET("/color/", toolhd.Color)
	r.GET("/timestamp/", toolhd.Timestamp)
	r.GET("/encdec/", toolhd.Encdec)
	r.GET("/icon/", toolhd.Icon)
	r.POST("/clip/update", toolhd.ClipUpdate)
	r.GET("/clip/", toolhd.Clip)
	r.GET("/clip/*", toolhd.ClipGet)

	admin := r.Group("/admin")
	admin.Use(adminmw.Auth())
	admin.GET("/signin/", adminhd.Signin)
	admin.POST("/signin/", adminhd.Signin)
	admin.GET("/posts", adminhd.Posts)
	admin.GET("/edit/*", adminhd.Edit)
	admin.PUT("/put", adminhd.Modify)
	admin.GET("/writer", adminhd.Writer)

	r.GET("/*", bloghd.NotFound)

	err := r.RunTLS(":8080", "server.crt", "server.key")
	if err != nil {
		log.Print("start server error: ", err)
	}
	log.Print("start server successful")
}

func shutdown() {
	mux := http.NewServeMux()
	mux.Handle("/", &helloHandler{})

	server := &http.Server{
		Addr:    ":8081",
		Handler: mux,
	}

	// 创建系统信号接收器
	done := make(chan os.Signal)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	go func() {
		<-done

		if err := server.Shutdown(context.Background()); err != nil {
			log.Fatal("Shutdown server:", err)
		}
	}()

	log.Print("Starting HTTP server...")
	err := server.ListenAndServe()
	if err != nil {
		if err == http.ErrServerClosed {
			log.Print("Server closed under request")
		} else {
			log.Fatal("Server closed unexpected")
		}
	}
}

type helloHandler struct{}

func (*helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World")
}
