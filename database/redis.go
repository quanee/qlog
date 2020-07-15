package database

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/quanee/qlog/config"
	"log"
	"sync"
)

var ctx = context.Background()

func init() {
	var once sync.Once
	once.Do(func() {
		RedisDB = redis.NewClient(&redis.Options{
			Addr:     fmt.Sprintf("%s:%s", config.GetKey("REDIS_HOST"), config.GetKey("REDIS_PORT")),
			Password: "", // no password set
			DB:       0,  // use default DB
		})

		pong, err := RedisDB.Ping(ctx).Result()
		log.Println(pong, err)
	})

}
