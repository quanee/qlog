package toolmodel

type Clip struct {
	ContId    string `json:"contid,omitempty"`
	ReqId     string `json:"reqid,omitempty"`
	Timestamp string `json:"timestamp,omitempty"`
	ClipName  string `json:"clipname,omitempty"`
	Content   string `json:"content,omitempty"`
}
