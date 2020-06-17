package session

type KV interface {
	Set(string)
	Exist(string) bool
}

type kv struct {
	dict map[string]struct{}
}

func (k *kv) Set(key string) {
	k.dict[key] = struct{}{}
}

func (k *kv) Exist(key string) bool {
	_, ok := k.dict[key]
	return ok
}

func NewSessions() KV {
	return &kv{make(map[string]struct{}, 10)}
}

var Session KV

func init() {
	Session = NewSessions()
}
