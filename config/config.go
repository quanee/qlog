package config

import (
	"context"
	"github.com/quanee/qlog/utils/log"
	"go.etcd.io/etcd/clientv3"
	"strconv"
	"time"
)

var (
	config *clientv3.Client
	ctx    context.Context
)

func init() {
	var err error
	config, err = clientv3.New(clientv3.Config{
		Endpoints:   []string{"106.13.230.225:3533"},
		DialTimeout: 10 * time.Second,
	})
	ctx = context.Background()
	if err != nil {
		log.Error("etcd init error, ", err)
	}
	log.Info("etcd init successfully!")
}

func GetKey(key string) string {
	resp, err := config.Get(ctx, key)
	if err != nil {
		log.Error("etcd get key err", err)
	}
	var value string
	for _, v := range resp.Kvs {
		value = string(v.Value)
		log.Infof("get etcd key=%v, value=%v\n", key, value)
		return value
	}
	return value
}

func GetIntKey(key string) int {
	strval := GetKey(key)
	value, err := strconv.Atoi(strval)
	if err != nil {
		log.Error("convert key to in err", err)
	}
	return value
}
