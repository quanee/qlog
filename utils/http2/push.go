package http2

import (
	"github.com/quanee/qlog/utils/log"
	"net/http"
)

func Push(writer http.ResponseWriter, ps ...string) {
	if pusher, ok := writer.(http.Pusher); ok {
		for _, s := range ps {
			err := pusher.Push(s, nil)
			if err != nil {
				log.Errorf("Push %v err: %v", s, err)
			}
		}
	}
}
