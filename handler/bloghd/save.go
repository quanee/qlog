package bloghd

import (
	"encoding/json"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/utils/log"
	"net/http"
)

func Save(context *draft.Context) {
	//err := context.Writer.(http.Pusher)
	buf := make([]byte, 8192)
	n, err := context.Req.Body.Read(buf)
	log.Info("context.Req.Body ", string(buf))
	if err != nil {
		log.Error("body read err: ", err)
	}
	log.Info("read body ", n)
	article := blogmodel.Article{}
	err = json.Unmarshal(buf[:n], &article)
	if err != nil {
		log.Error("json Unmarshal err: ", err)
	}
	log.Info("content ", article)
	err = bloglogic.Publish(database.DB, &article)
	if err != nil {
		context.HTML(http.StatusOK, "blog/edit.tpl", draft.H{
			"title": "失败",
		})
	}
	context.HTML(http.StatusOK, "blog/edit.tpl", draft.H{
		"title": "成功",
	})
}
