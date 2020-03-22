package database

import (
	"database/sql"
	"sync"
)

var DB *sql.DB
var once sync.Once
