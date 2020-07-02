package database

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/quanee/qlog/config"
	"github.com/quanee/qlog/utils/log"
	"sync"
	"time"
)

func init() {
	var once sync.Once
	if config.GetKey("use_database") == "mysql" {
		once.Do(func() {
			dsn := fmt.Sprintf("%s:%s@%s(%s:%s)/%s",
				config.GetKey("mysql_user"),
				config.GetKey("mysql_passwd"),
				"tcp",
				config.GetKey("mysql_host"),
				config.GetKey("mysql_port"),
				config.GetKey("mysql_database"),
			)

			var err error
			DB, err = sql.Open("mysql", dsn)
			if err != nil {
				log.Error("connect err ", err)
				return
			}
			err = DB.Ping()
			if err != nil {
				log.Error("ping err ", err)
				return
			}

			DB.SetMaxOpenConns(8)
			DB.SetMaxIdleConns(4)
			DB.SetConnMaxLifetime(60 * time.Second)
		})
	}
}
