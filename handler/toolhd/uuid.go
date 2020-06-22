package toolhd

import (
	"encoding/hex"
	"github.com/quanee/draft"
	"net/http"
)

func UUID(context *draft.Context) {
	/*uuid := [16]byte{}
	_, err := io.ReadFull(rand.Reader, uuid[:])
	if err != nil {
		log.Print(err)
	}
	uuid[6] &= 0x0f
	uuid[6] |= 0x40
	uuid[8] &= 0x3f
	uuid[8] |= 0x80*/
	context.HTML(http.StatusOK, "uuid.tpl", draft.H{
		"title": "UUID",
		//"uuid":  toUUID(uuid),
	})
}

func toUUID(u [16]byte) string {
	buf := make([]byte, 36)

	hex.Encode(buf[0:8], u[0:4])
	buf[8] = '-'
	hex.Encode(buf[9:13], u[4:6])
	buf[13] = '-'
	hex.Encode(buf[14:18], u[6:8])
	buf[18] = '-'
	hex.Encode(buf[19:23], u[8:10])
	buf[23] = '-'
	hex.Encode(buf[24:], u[10:])

	return string(buf)
}
