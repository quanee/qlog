package adminhd

import (
	"encoding/json"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/database"
	"github.com/quanee/qlog/logic/bloglogic"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/utils/log"
	"net/http"
)

func Modify(context *draft.Context) {
	buf := make([]byte, context.Req.ContentLength+1)
	n, err := context.Req.Body.Read(buf)
	if err != nil {
		log.Errorf("QueryLimitSummary", err)
	}
	article := blogmodel.Article{}
	err = json.Unmarshal(buf[:n], &article)
	if article.SId == "" {
		err = bloglogic.Publish(database.DB, &article)
		if err != nil {
			log.Error("publish article err: ", err)
		}
	} else {
		err = bloglogic.ModifyArticle(database.DB, &article)
		if err != nil {
			context.Status(http.StatusExpectationFailed)
		}
	}

	context.Status(http.StatusOK)
}
