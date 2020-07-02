package toolhd

import (
	"encoding/json"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/logic/toollogic"
	"github.com/quanee/qlog/model/toolmodel"
	"github.com/quanee/qlog/utils/log"
	"net/http"
)

func Clip(context *draft.Context) {
	clip := toolmodel.Clip{}
	if context.QueryParam() == "" {
		context.HTML(http.StatusOK, "clip.tpl", draft.H{
			"title": "剪切板",
		})
	} else {
		res, err := toollogic.Get(context.QueryParam())
		if err != nil || res == "" {
			context.HTML(http.StatusOK, "clip.tpl", draft.H{
				"title": "剪切板",
			})
		} else {
			clip.Content = res
			context.HTML(http.StatusOK, "clip.tpl", draft.H{
				"title": "剪贴板",
				"clip":  clip,
			})
		}
	}
}

func ClipUpdate(context *draft.Context) {
	buf := make([]byte, 8192)
	n, err := context.Req.Body.Read(buf)
	if err != nil {
		log.Error("context body read error:", err)
	}
	clip := toolmodel.Clip{}
	err = json.Unmarshal(buf[:n], &clip)
	if err != nil {
		log.Error("unmarshal clip error:", err)
	}
	_, err = toollogic.Set(clip.ClipName, clip.Content)
	if err != nil {
		log.Error("set clip error:", err)
	}
	context.JSON(http.StatusOK, draft.H{"msg": "save successful"})
}

func ClipGet(context *draft.Context) {
	clip := toolmodel.Clip{}
	res, err := toollogic.Get(context.QueryParam())
	if err != nil || res == "" {
		context.HTML(http.StatusOK, "clip.tpl", draft.H{
			"title": "剪切板",
		})
	} else {
		clip.Content = res
		clip.ClipName = context.QueryParam()
		context.HTML(http.StatusOK, "clip.tpl", draft.H{
			"title": "剪贴板",
			"clip":  clip,
		})
	}
}
