package model

type Summary struct {
	SId         string `json:"id,omitempty"`
	Title       string `json:"title,omitempty"`
	Abstract    string `json:"abstract,omitempty"`
	Tags        string `json:"tags,omitempty"`
	CreatedTime string `json:"createdtime,omitempty"`
	UpdatedTime string `json:"updatedtime,omitempty"`
}

type Content struct {
	CId       string `json:"id,omitempty"`
	Substance string `json:"substance,omitempty"`
}

type Article struct {
	Summary
	Content
}
