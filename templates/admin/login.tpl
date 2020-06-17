{{ define "admin/login.tpl" }}
    <!DOCTYPE html>
    <html class="js video" lang="en">
    <head>
        {{ template "header.tpl" . }}
        <link href="/static/admin/css/aquanee.css" media="screen, projection" rel="stylesheet" type="text/css">
    </head>
    <body>
    <div class="page">
        <div class="body">
            <div>
                <h1>登录</h1>
                <div>
                    <div>
                        <form>
                            <fieldset class="box">
                                <div id="useinfo" class="userinfo-form">
                                    <div class="form-textbox">
                                        <input class="form-userinfo-input" id="username" type="text">
                                        <span class="span-form" id="login-label-username">用户名</span>
                                    </div>
                                    <div class="form-textbox">
                                        <input class="form-userinfo-input" id="password" type="password">
                                        <span class="span-form" id="login-label-password">密码</span>
                                    </div>
                                </div>
                                <input id="token" value="">
                                <div>
                                    <button type="button" onclick="login()" class="form-button" id="form-button">登录</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </body>
    <script src="/static/admin/js/aquanee.js" type="text/javascript"></script>
    </html>

{{ end }}