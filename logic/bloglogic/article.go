package bloglogic

import (
	"database/sql"
	"fmt"
	"github.com/quanee/qlog/model/blogmodel"
	"github.com/quanee/qlog/utils/log"
	"time"
)

// publish article
func Publish(db *sql.DB, article *blogmodel.Article) error {
	tx, err := db.Begin()
	if err != nil {
		log.Error("tx err ", err)
		return err
	}
	ql := fmt.Sprintf("INSERT INTO summary (title, abstract, created_time) VALUES ('%s', '%s', '%s')", article.Title, article.Abstract, article.CreatedTime)
	res, err := tx.Exec(ql)
	if err != nil {
		log.Error("insert summary err ", err)
		tx.Rollback()
		return err
	}
	id, err := res.LastInsertId()
	if err != nil {
		log.Error("get last insert id err ", err)
		tx.Rollback()
		return err
	}
	ql = fmt.Sprintf("INSERT INTO content (id, substance) VALUES (%d, '%s')", id, article.Substance)
	_, err = tx.Exec(ql)
	if err != nil {
		log.Error("insert content err ", err)
		tx.Rollback()
		return err
	}
	return tx.Commit()
}

// query all summary
func QueryAllSummary(db *sql.DB) ([]blogmodel.Summary, error) {
	var res []blogmodel.Summary
	ql := "SELECT id, title, abstract, created_time FROM summary"
	rows, err := db.Query(ql)
	defer func() {
		if rows != nil {
			rows.Close() //可以关闭掉未scan连接一直占用
		}
	}()
	if err != nil {
		log.Error("query all err ", err)
		return nil, err
	}

	var summary blogmodel.Summary
	for rows.Next() {
		err = rows.Scan(&summary.SId, &summary.Title, &summary.Abstract, &summary.CreatedTime)
		res = append(res, summary)
	}
	return res, nil
}

// query summary by limit and offset
func QueryLimitSummary(db *sql.DB, id, limit string) ([]blogmodel.Summary, error) {
	var res []blogmodel.Summary
	//Cache.Query()
	ql := fmt.Sprintf("SELECT id, title, abstract, created_time FROM summary ORDER BY created_time DESC LIMIT %s OFFSET %s", limit, id)
	log.Debug(ql)
	rows, err := db.Query(ql)
	defer func() {
		if rows != nil {
			// 可以关闭掉未scan连接一直占用
			rows.Close()
		}
	}()
	if err != nil {
		log.Error("query all err ", err)
		return nil, err
	}

	var summary blogmodel.Summary
	for rows.Next() {
		err = rows.Scan(&summary.SId, &summary.Title, &summary.Abstract, &summary.CreatedTime)
		timeParse, terr := time.Parse("2006-01-02 15:04:05", summary.CreatedTime)
		if terr != nil {
			log.Error("Parser time error ")
		}
		summary.CreatedTime = fmt.Sprint(timeParse.Format("02 Jan 06"))
		tags, err := db.Query(fmt.Sprintf("SELECT tag FROM tags WHERE tags.id IN (SELECT tag_id FROM tsid WHERE tsid.summary_id=%s);", summary.SId))
		if err != nil {
			log.Error("Query tags error ")
		}
		tagsarr := make([]string, 0)
		for tags.Next() {
			tag := ""
			err = tags.Scan(&tag)
			if err != nil {
				log.Error("Query tags error ")
			}
			tagsarr = append(tagsarr, tag)
		}
		summary.Tags = tagsarr

		res = append(res, summary)
		//serres, err := json.Marshal(summary)
		//if err != nil {
		//	log.Error("json.Marshal error ", err)
		//}
		//reply, err := database.RedisDB.Do("SET", summary.SId, serres)
		//if err != nil {
		//	log.Error("Redis Set key error ", err)
		//}
		//log.Info("set key reply ", reply)
	}
	return res, nil
}

// query article by id
func QueryOneArticleById(db *sql.DB, id string) blogmodel.Article {
	var article blogmodel.Article
	ql := fmt.Sprintf("SELECT c.id, c.substance, s.title, s.created_time FROM content AS c, summary AS s WHERE c.id = %s AND c.id = s.id", id)
	row := db.QueryRow(ql)
	if err := row.Scan(&article.CId, &article.Substance, &article.Title, &article.CreatedTime); err != nil {
		log.Printf("scan failed, err:%v", err)
	}
	timeParse, terr := time.Parse("2006-01-02 15:04:05", article.CreatedTime)
	if terr != nil {
		log.Error("Parser time error ")
	}

	tagsarr := make([]string, 0)
	tags, err := db.Query(fmt.Sprintf("SELECT tag FROM tags WHERE tags.id IN (SELECT tag_id FROM tsid WHERE tsid.summary_id=%s);", id))
	if err != nil {
		log.Error("Query tags error ")
	} else {
		for tags.Next() {
			tag := ""
			err = tags.Scan(&tag)
			if err != nil {
				log.Error("Query tags error ")
			}
			tagsarr = append(tagsarr, tag)
		}
	}
	article.Tags = tagsarr
	article.CreatedTime = fmt.Sprint(timeParse.Format("02 Jan 06"))
	log.Print("Query One Article By Id = ", id)
	return article
}

// modify article
func ModifyArticle(db *sql.DB, article *blogmodel.Article) error {
	tx, err := db.Begin()
	if err != nil {
		log.Error("tx err ", err)
		return err
	}
	ql := fmt.Sprintf("UPDATE content SET substance='%s' WHERE id='%s'", article.Substance, article.CId)
	result, err := tx.Exec(ql)
	result.RowsAffected()
	ql = fmt.Sprintf("UPDATE summary SET title='%s', abstract='%s', updated_time='%s' WHERE id='%s'", article.Title, article.Abstract, article.UpdatedTime, article.SId)
	result, err = tx.Exec(ql)

	return nil
}
