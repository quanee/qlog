<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ .title }}</title>
    <style>
        .body {
            width: 450px;
            min-height: 600px;
            margin: 20px auto;
            border: 0;
            border-radius: 8px;
            -webkit-box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        }

        #expand-span {
            display: block;
            visibility: hidden;
            word-wrap: break-word;
            white-space: pre-wrap;
        }

        .context-box {
            font-size: 18px;
            font-weight: 400;
            line-height: 1.2;
            /*min-width: 450px;*/
            max-width: calc(100% - 16px);
            /*min-height: 96%;*/
            /*max-height: calc(100% - 16px);*/
            border: none;
            outline: none;
            -webkit-appearance: none;
            margin: 0;
            padding: 8px 8px 50px 8px;
        }

        #clip-content {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            resize: none;
            overflow: auto;
            background-color: transparent;
            border-radius: 8px;
            width: 100%;
        }

        .btn {
            border: none;
            padding: 5px 20px;
            outline: none;
            margin-left: 8px;
            background-color: rgba(234, 234, 234, 1);
            cursor: pointer;
        }

        .btn:hover {
            background-color: rgba(24, 24, 24, .2);
        }

        #clip-name {
            height: 25px;
            top: 0;
            float: right;
            margin-right: 10px;
            outline: none;
            border: 0;
            margin-top: 5px;
            line-height: 1.2;
            font-size: 17px;
        }

        .toolbar {
            background-color: rgba(234, 234, 234, 1);
            border-radius: 8px 8px 0 0;
        }
    </style>
    <title>Clip</title>
</head>
<body>
<div class="body">
    <div class="toolbar">
        <button id="save" class="btn" title="保存">
            <svg width="24" height="24" viewBox="0 0 24 24" x="72" y="120">
                <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path>
            </svg>
        </button>
        <button id="copy" class="btn" title="复制">
            <svg width="24" height="24" viewBox="0 0 24 24" x="48" y="48">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>
        </button>
        <label for="clip-name"></label><input id="clip-name" value="{{ .clip.ClipName }}" placeholder="剪切板名称">
    </div>
    <div style="position: relative;">
        <pre id="expand-span" class="context-box"><span></span><br></pre>
        <textarea placeholder="输入内容..." id="clip-content" class="context-box">{{ .clip.Content }}</textarea>
    </div>
    <input style="display: none" id="clip-id" value="">
</div>
</body>
<script>
    function expand() {
        document.getElementById("expand-span").innerText = document.getElementById("clip-content").value + "<br>";
    }

    function send() {
        let clip_content = document.getElementById("clip-content").value;
        let clip_id = document.getElementById("clip-id").value;
        let clip_name = document.getElementById("clip-name").value;
        if (clip_name === "") {
            clip_name = clip_id.toString().substring(0, 16);
            document.getElementById("clip_name").value = clip_id;
        }

        let req_id = (new Date()).valueOf();
        let timestamp = Math.round((new Date()).valueOf() / 1000);
        let payload = {
            "contid": clip_id,
            "reqid": req_id.toString(),
            "timestamp": timestamp.toString(),
            "clipname": clip_name,
            "content": clip_content
        }
        let data = JSON.stringify(payload)

        fetch("/clip/update", {
            method: "POST",
            headers: new Headers(),
            body: data,
        }).catch(
            (e) => {
                console.log(e)
            }
        ).then(
            (res) => {
                console.log(res)
            }
        )
    }

    function uuid(delimiter = "-") {
        let s = [];
        const hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = delimiter;

        return s.join("");
    }

    function copyClip() {
        copyToClipBord(document.getElementById("clipbord-box").value)
    }

    window.onload = () => {
        document.getElementById('clip-id').value = uuid("")
    }
    document.getElementById("clip-content").addEventListener('input', expand, false);
    document.getElementById("save").addEventListener('click', send, false);
    document.getElementById("copy").addEventListener('click', copyClip, false);
</script>
</html>