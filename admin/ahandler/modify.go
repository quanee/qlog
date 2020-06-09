package ahandler

import (
	"encoding/json"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic"
	"github.com/quanee/qlog/model"
	"github.com/quanee/qlog/utils/log"
	"net/http"
)

func Modify(context *draft.Context) {
	buf := make([]byte, context.Req.ContentLength+1)
	n, err := context.Req.Body.Read(buf)
	if err != nil {
		log.Errorf("QueryLimitSummary", err)
	}
	article := model.Article{}
	err = json.Unmarshal(buf[:n], &article)
	if article.SId == "" {
		err = logic.Publish(database.DB, &article)
		if err != nil {
			log.Error("publish article err: ", err)
		}
	} else {
		err = logic.ModifyArticle(database.DB, &article)
		if err != nil {
			context.Status(http.StatusExpectationFailed)
		}
	}

	context.Status(http.StatusOK)
}
