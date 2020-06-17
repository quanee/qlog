package adminhd

import (
	"encoding/json"
	"fmt"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/session"
	"github.com/quanee/qlog/utils/http2"
	"net/http"
	"strings"
)

func Signin(context *draft.Context) {
	http2.Push(context.Writer, "/static/css/aquanee.css", "/static/js/aquanee.js", "/static/favicon.webp")
	if strings.ToUpper(context.Method) != "POST" {
		context.HTML(http.StatusOK, "admin/login.tpl", draft.H{
			"title": "登录",
		})
	} else {
		buf := make([]byte, context.Req.ContentLength)
		context.Req.Body.Read(buf)
		user := blogmodel.User{}
		json.Unmarshal(buf, &user)
		if bloglogic.Author(database.DB, user.UserName, user.Password) {
			session.Session.Set(user.Token)
			context.SetHeader("Set-Cookie", fmt.Sprintf("token=%s;path=/", user.Token))
			//context.HTML(http.StatusOK, "admin/posts.tpl", draft.H{
			//	"title": "文章管理",
			//})
			context.SetHeader("Location", "https://localhost:8080/admin/posts")
			context.Status(http.StatusFound)
			//context.JSON(http.StatusOK, draft.H{
			//	"msg": "success",
			//	"path": "/admin/posts",
			//})
		} else {
			context.JSON(http.StatusOK, draft.H{
				"data": "failed",
			})
		}
	}

}
