package toollogic

import (
	"context"
	"fmt"
	"github.com/quanee/qlog/database"
)

func Get(key string) (string, error) {
	var ctx = context.Background()
	reply := database.RedisDB.Get(ctx, key)
	return reply.Result()
}

func Set(key, value string) (string, error) {
	var ctx = context.Background()
	fmt.Println(database.RedisDB)
	reply := database.RedisDB.Set(ctx, key, value, 0)
	return reply.Result()
}
