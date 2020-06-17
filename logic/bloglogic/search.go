package bloglogic

import (
	"database/sql"
	"fmt"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/utils/log"
	"time"
)

//	SearchArticle: search by words
func SearchArticle(db *sql.DB, words string) ([]blogmodel.Summary, error) {
	ql := fmt.Sprintf("SELECT id, title, abstract, created_time FROM summary WHERE id in (SELECT id FROM content WHERE MATCH(substance) AGAINST('%s' IN BOOLEAN MODE));", words)
	rows, err := db.Query(ql)
	defer func() {
		if rows != nil {
			// 可以关闭掉未scan连接一直占用
			rows.Close()
		}
	}()
	if err != nil {
		log.Error("query all err ", err)
		return []blogmodel.Summary{}, err
	}
	var res []blogmodel.Summary
	var summary blogmodel.Summary
	for rows.Next() {
		err = rows.Scan(&summary.SId, &summary.Title, &summary.Abstract, &summary.CreatedTime)
		if err != nil {
			log.Errorf("search Article error", err)
		}
		timeParse, terr := time.Parse("2006-01-02 15:04:05", summary.CreatedTime)
		if terr != nil {
			log.Error("Parser time error ")
		}
		summary.CreatedTime = fmt.Sprint(timeParse.Format("02 Jan 06"))
		res = append(res, summary)
	}
	timeParse, terr := time.Parse("2006-01-02 15:04:05", summary.CreatedTime)
	if terr != nil {
		log.Error("Parser time error ")
	}
	summary.CreatedTime = fmt.Sprint(timeParse.Format("02 Jan 06"))
	log.Print("Search article by words:", words)
	return res, nil
}
