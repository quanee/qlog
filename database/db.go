package database

import (
	"database/sql"
	"github.com/go-redis/redis/v8"
)

var DB *sql.DB
var RedisDB *redis.Client
