package adminhd

import (
	"encoding/json"
	"fmt"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/session"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"strings"
)

func Signin(context *draft.Context) {
	//http2.Push(context.Writer, "/static/css/aquanee.css", "/static/js/aquanee.js", "/static/favicon.webp")
	if strings.ToUpper(context.Method) != "POST" {
		context.HTML(http.StatusOK, "admin/login.tpl", draft.H{
			"title": "登录",
		})
	} else {
		buf := make([]byte, context.Req.ContentLength)
		_, err := context.Req.Body.Read(buf)
		if err != nil {
			log.Error("context request body error:", err)
		}
		user := blogmodel.User{}
		err = json.Unmarshal(buf, &user)
		if err != nil {
			log.Error("json marshal err:", err)
		}
		if bloglogic.Author(database.DB, user.UserName, user.Password) {
			session.Session.Set(user.Token)
			context.SetHeader("Set-Cookie", fmt.Sprintf("token=%s;path=/", user.Token))
			context.SetHeader("Location", "https://localhost:8080/admin/posts")
			context.JSON(http.StatusOK, draft.H{
				"path": "/admin/posts/",
				"token": user.Token,
				"msg": "success",
			})
		} else {
			context.JSON(http.StatusOK, draft.H{
				"data": "failed",
			})
		}
	}

}
