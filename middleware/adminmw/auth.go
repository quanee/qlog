package adminmw

import (
	"github.com/quanee/draft"
	"github.com/quanee/qlog/session"
	"net/http"
)

func Auth() draft.HandlerFunc {
	return func(c *draft.Context) {
		cookie, err := c.Req.Cookie("token")
		if err == nil && cookie != nil && session.Session.Exist(cookie.Value) {
			c.Next()
		} else if c.Req.URL.String() == "/admin/signin/" /*&& c.Req.Method == "POST"*/ {
			//if err != nil &&cookie != nil && !session.Session.Exist(cookie.Value) {
			//	log.Debug("err")
			//}
			//c.SetHeader("Location", "https://localhost:8080/admin/posts")
			//c.Status(http.StatusMovedPermanently)
			c.Next()
		} else /* if cookie, err := c.Req.Cookie("token"); (err != nil || !session.Session.Exist(cookie.Value)) && c.Req.Method != "GET"  */ {
			c.SetHeader("Location", "https://localhost:8080/admin/signin/")
			c.Status(http.StatusMovedPermanently)
			//http.RedirectHandler("https://localhost:8080/admin/signin/", http.StatusOK)
			//http.Redirect(c.Writer, c.Req, "https://localhost:8080/admin/signin/", http.StatusOK)
		}
	}
}
