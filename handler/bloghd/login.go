package bloghd

import (
	"crypto/md5"
	"fmt"
	"github.com/quanee/draft"
	"io"
	"net/http"
	"strconv"
	"time"
)

func Login(c *draft.Context) {
	//err := context.Writer.(http.Pusher)
	fmt.Println("method:", c.Req.Method) //获取请求的方法
	if c.Req.Method == "GET" {
		crutime := time.Now().Unix()
		h := md5.New()
		io.WriteString(h, strconv.FormatInt(crutime, 10))
		token := fmt.Sprintf("%x", h.Sum(nil))

		c.HTML(http.StatusOK, "signin.tpl", draft.H{
			"title": "登录",
			"token": token,
		})
	} else {
		// 请求的是登陆数据，那么执行登陆的逻辑判断
		c.Req.ParseForm()
		token := c.Req.Form.Get("token")
		if token != "" {
			//验证token的合法性
		} else {
			//不存在token报错
		}
	}
	cookie := http.Cookie{
		Name:     "cookie",
		Value:    "",
		Path:     "/",
		Expires:  time.Now().Add(time.Second * 60),
		MaxAge:   0,
		Secure:   false,
		HttpOnly: true,
		//SameSite:   0,
		//Raw:        "",
		//Unparsed:   nil,
	}
	http.SetCookie(c.Writer, &cookie)
}
