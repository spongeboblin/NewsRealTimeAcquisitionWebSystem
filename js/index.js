$(document).ready(function () {
    $("#new_find_pwd_confirm").blur = function () {
        var new_pwd = $("#new_find_pwd").val();
        var new_pwd_confirm = $("#new_find_pwd_confirm").val();
        if(new_pwd !== new_pwd_confirm)
        {
            $("#find_pwd_div").html("<p style='color: #b92c28'>请确认密码是否输入正确！</p>");
        }
        else
        {
            $("#find_pwd_div").html("");
        }
    };

    $("#register_pwd_confirm").blur(function(){
        var pwd = $("#register_pwd").val();
        var pwd_confirm = $("#register_pwd_confirm").val();
        if(pwd !== pwd_confirm)
        {
            $("#register_pwd_div").html("<p style='color: #b92c28'>请确认密码是否输入正确！</p>");
        }
        else
        {
            $("#register_pwd_div").html("");
        }
    });
});


function login(){
    var username = $("#login_username").val();
    var pwd = $("#login_pwd").val();
    $.ajax(
        {
            url: "php/index/login.php",
            type: "POST",
            data: {
                username: username,
                pwd: pwd
            },
            async: false,
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if(res['success'] === 0)
                {
                    show_error(res['err_msg']);
                }
                else
                {
                    $.session.set('user', username);
                    location.reload();
                }
            },
            error: function (err_msg) {
                show_error(err_msg.responseText);
            }
        }
    );
    cancel_login();
}

function cancel_login() {
    $("#login_username").val("");
    $("#login_pwd").val("");
}

function register() {
    var username = $("#register_username").val();
    var name = $("#register_name").val();
    var pwd = $("#register_pwd").val();
    var pwd_confirm = $("#register_pwd_confirm").val();
    var phone = $("#register_phone").val();
    var email = $("#register_email").val();
    if(pwd !== pwd_confirm)
    {
        show_error("请确认密码是否输入正确！");
    }
    else if(username === "" || pwd === "" || name === "" || phone === "" || email === "")
    {
        show_error("注册信息还未填写完整哦~")
    }else
    {
        $.ajax({
            url:"php/index/register.php",
            type: "POST",
            data: {username: username, pwd: pwd,
                name: name, phone: phone, email: phone},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if(res['success'] === 0)
                {
                    show_error(res['err_msg']);
                }
                else
                {
                    show_inform("注册成功啦！欢迎使用聚合频道！");
                    cancel_register();
                }
            },
            error: function (err_msg) {
                show_error(err_msg.responseText);
            }
        });
    }
}

function cancel_register() {
    $("#register_username").val("");
    $("#register_pwd").val("");
    $("#register_email").val("");
    $("#register_phone").val("");
    $("#register_pwd_confirm").val("");
    $("#register_name").val("");
}

function find_pwd() {
    var username = $("#find_username").val();
    var name = $("#find_name").val();
    var phone = $("#find_phone").val();
    var email = $("#find_email").val();
    if(username === "" || name === "" || phone === "" || email === "")
    {
        show_error("验证信息不得为空！");
    }
    var pwd = $("#new_find_pwd").val();
    var pwd_confirm = $("#new_find_pwd_confirm").val();
    if(pwd !== pwd_confirm)
    {
        show_error("请确认密码是否输入正确！");
    }
    else if(pwd === "" || pwd_confirm === "")
    {
        show_error("请确认密码是否输入正确！");
    }
    else
    {
        $.ajax({
            url: "php/index/find_pwd.php",
            type: "POST",
            data: {username: username, name: name, email:email, phone:phone, pwd: pwd},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if(res['success'] === 0)
                {
                    show_error(res['err_msg']);
                }
                else
                {
                    show_inform("密码修改好啦~");
                    cancel_find_pwd();
                }
            },
            error: function (err_msg) {
                show_error(err_msg.responseText);
            }
        });
    }
}

function cancel_find_pwd(){
    $("#find_username").val("");
    $("#find_phone").val("");
    $("#find_email").val("");
    $("#new_find_pwd").val("");
    $("#new_find_pwd_confirm").val("");
}
