{{ define "login.tpl" }}
    <!DOCTYPE html>
    <html class="js video" lang="en">
    <head>
        {{ template "header.tpl" . }}
        <link href="../static/css/quanee.css" media="screen, projection" rel="stylesheet" type="text/css">
    </head>
    <body>
    <div class="body">
        <div>
            <div>
                <div>
                    <div id="login">
                        <input id="username" class="form-userinfo-input" type="text" name="username" required>
                        <label class="label">
                            <span>用户名</span>
                        </label>
                    </div>
                    {{/*<div>
                        <input id="password" class="login-input" type="password" name="password" placeholder="">
                        <label class="label">
                            <span>密码</span>
                        </label>
                    </div>*/}}
                    <div><input id="token" type="hidden" name="token" value="{{ .token }}"></div>
                    <div><input id="form-button" type="submit" value="登陆"></div>
                </div>
            </div>
        </div>
    </div>
    </body>
    <script>
        $("#login").click(function () {
            var data = {
                "username": $("#username").val(),
                "token": $("#token").val()
            };
            $.ajax({
                url: "/login",
                type: "POST",
                data: data,
                dataType: "json",
                success: function () {

                },
                error:function () {

                }
            })
        })

    </script>
    </html>

{{ end }}