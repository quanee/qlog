package main

import (
	"context"
	"fmt"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/handler"
	"github.com/quanee/qlog/middleware"
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
	//gin.New()
	r := draft.New()
	//r.Use(middleware.Pprof())
	r.Use(middleware.Cookie())
	r.Use(middleware.Logger())
	r.Use(middleware.Gzip())
	r.Use(middleware.Header())
	r.Use(middleware.Statistic())
	//r.Use(middleware.Cache())

	r.SetFuncMap(template.FuncMap{
		"html": unescaped,
	})
	/*r.SetFuncMap(template.FuncMap{
		"formatAsDate": formatAsDate,
	})*/

	r.LoadHTMLGlob("templates/*")
	r.Static("/static", "./static")
	//r.Static("/wasm", "./webassembly")
	//r.StaticFile("/favicon.png", "./static/favicon.png")

	r.GET("/index", handler.Index)
	r.GET("/about", handler.About)
	r.GET("/post/*", handler.Post)
	//r.GET("/edit", handler.Edit)
	r.GET("/demo", handler.Demo)
	r.GET("/article", handler.GetArticle)
	r.GET("/search/*", handler.Search)
	r.POST("/search/*", handler.Search)
	r.GET("/", handler.Index)

	/*v1 := r.Group("/v1")
	{
		v1.GET("/", func(c *draft.Context) {
			c.HTML(http.StatusOK, "", "<h1>Hello draft</h1>")
		})

		v1.GET("/hello", func(c *draft.Context) {
			// expect /hello?name=quanee
			c.String(http.StatusOK, "hello %s, you're at %s\n", c.Query("name"), c.Path)
		})
	}
	v2 := r.Group("/v2")
	{
		v2.GET("/hello/:name", func(c *draft.Context) {
			// expect /hello/quanee
			c.String(http.StatusOK, "hello %s, you're at %s\n", c.Param("name"), c.Path)
		})
		v2.POST("/login", func(c *draft.Context) {
			c.JSON(http.StatusOK, draft.H{
				"username": c.PostForm("username"),
				"password": c.PostForm("password"),
			})
		})
	}
	v2.Use(onlyForV2()) // v2 group middleware
	{
		v2.GET("/hello/:name", func(c *draft.Context) {
			// expect /hello/quanee
			c.String(http.StatusOK, "hello %s, you're at %s\n", c.Param("name"), c.Path)
		})
	}*/

	//err := r.Run(":9999")
	err := r.RunTLS(":"+os.Getenv("DRAFT_PORT"), "server.crt", "server.key")
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
