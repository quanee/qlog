// gzip
// enable gzip Compass media source

package middleware

import (
	"compress/gzip"
	"github.com/quanee/draft"
	"github.com/quanee/qlog/utils/log"
	"net/http"
	"path/filepath"
	"strings"
)

type gzipWriter struct {
	http.ResponseWriter
	writer *gzip.Writer
}

const (
	NoCompression      = 0
	BestSpeed          = 1
	BestCompression    = 9
	DefaultCompression = -1
	HuffmanOnly        = -2
)

func Gzip() draft.HandlerFunc {
	return func(c *draft.Context) {
		if x, lvl := compress(c.Req); x {
			c.SetHeader("Content-Encoding", "gzip")
			c.SetHeader("Vary", "Accept-Encoding")
			gz, err := gzip.NewWriterLevel(c.Writer, lvl)
			if err != nil {
				log.Error(err)
				return
			}
			defer func() {
				c.SetHeader("Content-Length", "0")
				gz.Close()
			}()
			c.Writer = &gzipWriter{c.Writer, gz}
		}

		c.Next()
	}
}

func (g *gzipWriter) WriteString(s string) (int, error) {
	return g.writer.Write([]byte(s))
}

func (g *gzipWriter) Write(data []byte) (int, error) {
	return g.writer.Write(data)
}

// Fix: https://github.com/mholt/caddy/issues/38
func (g *gzipWriter) WriteHeader(code int) {
	g.Header().Del("Content-Length")
	g.ResponseWriter.WriteHeader(code)
}

func compress(req *http.Request) (bool, int) {
	if !strings.Contains(req.Header.Get("Accept-Encoding"), "gzip") ||
		strings.Contains(req.Header.Get("Connection"), "Upgrade") ||
		strings.Contains(req.Header.Get("Content-Type"), "text/event-stream") {

		return false, NoCompression
	}

	ext := filepath.Ext(req.URL.Path)

	switch ext {
	case ".wasm", ".js", ".png", ".gif", ".jpeg", ".jpg":
		return true, BestCompression
	case ".ttf", ".eot", ".woff", ".woff2":
		return true, BestSpeed
	default:
		return false, NoCompression
	}
}
