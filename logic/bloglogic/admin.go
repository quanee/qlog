package bloglogic

import (
	"database/sql"
	"fmt"
	"github.com/quanee/qlog/config"
	scrypt "github.com/quanee/qlog/utils/crpty"
	"github.com/quanee/qlog/utils/log"
)

func Author(db *sql.DB, username, passwd string) bool {
	passwd, err := scrypt.Encrypt([]byte(passwd), []byte(config.GetKey("passwd_salt")))
	if err != nil {
		log.Printf("password encrypt error %v", err)
	}
	ql := fmt.Sprintf("SELECT count(*) FROM user WHERE username='%s' AND password='%s'", username, passwd)
	row := db.QueryRow(ql)
	var x int
	if err := row.Scan(&x); err != nil {
		log.Printf("scan failed, err:%v", err)
		return false
	}
	if x < 1 {
		return false
	}
	return true
}
