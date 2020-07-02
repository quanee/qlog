package database

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/quanee/qlog/config"
	"github.com/quanee/qlog/utils/log"
	"sync"
	"time"
)

func init() {
	var once sync.Once
	if config.GetKey("use_database") == "postgresql" {
		once.Do(func() {
			dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
				config.GetKey("postgres_host"),
				config.GetKey("postgres_port"),
				config.GetKey("postgres_user"),
				config.GetKey("postgres_passwd"),
				config.GetKey("postgres_database"),
			)

			var err error
			DB, err = sql.Open("postgres", dsn)
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
