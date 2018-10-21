function account_info(){
    // console.log(user_info);
    $('#username').attr("disabled", "disabled");
    $('#username').val(user_info['username']);

    $('#name').attr("disabled", "disabled");
    $('#name').val(user_info['name']);

    $('#sex').attr("disabled", "disabled");
    $('#sex').val(user_info['sex']);

    $('#age').attr("disabled", "disabled");
    $('#age').val(user_info['age']);

    $('#phone').attr("disabled", "disabled");
    $('#phone').val(user_info['phone']);

    $('#email').attr("disabled", "disabled");
    $('#email').val(user_info['email']);

    $('#regdate').attr("disabled", "disabled");
    $('#regdate').val(user_info['regdate']);

    $('#modify_info_btn').html("");

    $("#top-news").prop('checked', user_field_like[0]);
    $("#political").prop('checked', user_field_like[1]);
    $("#sports").prop('checked', user_field_like[2]);
    $("#entertainment").prop('checked', user_field_like[3]);
    $("#science").prop('checked', user_field_like[4]);
    $("#health").prop('checked', user_field_like[5]);
    $("#social").prop('checked', user_field_like[6]);

    $("#net-ease").prop('checked', user_web_like[0]);
    $("#sina").prop('checked', user_web_like[1]);
    $("#tencent").prop('checked', user_web_like[2]);
    $("#daily-top").prop('checked', user_web_like[3]);
    $("#renmin").prop('checked', user_web_like[4]);
    $("#souhu").prop('checked', user_web_like[6]);

}

function modify_info_pane() {
    $('#name').removeAttr("disabled");
    $('#name').removeAttr("disabled");
    $('#sex').removeAttr("disabled");
    $('#age').removeAttr("disabled");
    $('#phone').removeAttr("disabled");
    $('#email').removeAttr("disabled");
    $('#modify_info_btn').html('<div style="margin-top: 5mm">' +
        '<a class="btn btn-primary" data-toggle="modal" data-target="#modify_info_modal">确定</a>'
        + '&nbsp;&nbsp;&nbsp;&nbsp;<a class="btn btn-danger" onclick="change_info_cancel()">取消</a></div>');
}

function change_pwd_submit() {
    var old_pwd = $("#old_pwd").val();
    var new_pwd = $("#new_pwd").val();
    var new_pwd_confirm = $("#new_pwd_confirm").val();
    if(new_pwd !== new_pwd_confirm)
    {
        show_error("请确认密码是否输入正确！")
    }
    $.ajax({
        url: 'php/personal_center/change_pwd.php',
        type: 'POST',
        data: {username: user_info['username'], old_pwd: old_pwd, new_pwd: new_pwd},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if(res['success'] === 0)
            {
                show_error(res['err_msg']);
            }
            else
            {
                show_inform("密码修改成功啦！");
                user_info['pwd'] = new_pwd;
            }
        },
        error: function (err_msg) {
            show_error(err_msg.responseText);
        }
    });
    change_pwd_cancel();
}

function change_pwd_cancel() {
    $("#old_pwd").val("");
    $("#new_pwd").val("");
    $("#new_pwd_confirm").val("");
}

function change_info_submit() {
    var name = $("#name").val();
    var sex = $("#sex").val();
    var age = $("#age").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    if(name === "" || phone === "" || email === "")
    {
        show_error("请填写正确的信息哦!")
    }
    else if( check_unchanged(name, user_info['name']) &&
        check_unchanged(sex, user_info['sex']) &&
        check_unchanged(age, user_info['age']) &&
        check_unchanged(phone, user_info['phone']) &&
        check_unchanged(email, user_info['email']))
    {
        show_inform("修改成功！");
    }
    else{
        var pwd = $("#modify_info_pwd").val();
        $("#modify_info_pwd").val("");
        $.ajax({
            url: 'php/personal_center/change_info.php',
            type: 'POST',
            data: {username: user_info['username'], name: name, sex: sex,
                age: age, phone: phone, email: email, pwd: pwd},
            success: function (data) {
                var res = jQuery.parseJSON(data);
                if(res['success'] === 0)
                {
                    show_error(res['err_msg']);
                }
                else
                {
                    show_inform('修改成功！');
                }
            },
            error: function (err_msg) {
                show_error(err_msg.responseText);
            }
        });
    }
}

function check_unchanged(input, origin) {
    if(input === "" && (origin === "" || origin === null))
        return true;
    else
        return input === origin;
}

function change_info_cancel() {
    $("#modify_info_pwd").val("");
    $('#username').val(user_info['username']);
    $('#name').val(user_info['name']);
    $('#sex').val(user_info['sex']);
    $('#age').val(user_info['age']);
    $('#phone').val(user_info['phone']);
    $('#email').val(user_info['email']);
    $('#regdate').val(user_info['regdate']);
}

function change_like_submit(){
    var field_like = "0000000";
    field_like = field_like.setCharAt(0, $("#top-news").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(1, $("#political").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(2, $("#sports").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(3, $("#entertainment").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(4, $("#science").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(5, $("#health").is(':checked')? '1' : '0');
    field_like = field_like.setCharAt(6, $("#social").is(':checked')? '1' : '0');

    var web_like = "000000";
    web_like = web_like.setCharAt(0, $("#net-ease").is(':checked')? '1' : '0');
    web_like = web_like.setCharAt(1, $("#sina").is(':checked')? '1' : '0');
    web_like = web_like.setCharAt(2, $("#tencent").is(':checked')? '1' : '0');
    web_like = web_like.setCharAt(3, $("#daily-top").is(':checked')? '1' : '0');
    web_like = web_like.setCharAt(4, $("#renmin").is(':checked')? '1' : '0');
    web_like = web_like.setCharAt(5, $("#souhu").is(':checked')? '1' : '0');
    // console.log(field_like, web_like);

    var pwd = $("#modify_like_pwd").val();
    $("#modify_like_pwd").val("");
    $.ajax({
        url: 'php/personal_center/change_like.php',
        type: 'POST',
        data: {username: user_info['username'], pwd: pwd, field_like: field_like, web_like: web_like},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if(res['success'] === 0)
            {
                show_error(res['err_msg']);
            }
            else
            {
                show_inform("修改成功！");
                user_field_like[0] = $("#top-news").is(':checked');
                user_field_like[1] = $("#political").is(':checked');
                user_field_like[2] = $("#sports").is(':checked');
                user_field_like[3] = $("#entertainment").is(':checked');
                user_field_like[4] = $("#science").is(':checked');
                user_field_like[5] = $("#health").is(':checked');
                user_field_like[6] = $("#social").is(':checked');

                user_web_like[0] = $("#net-ease").is(':checked');
                user_web_like[1] = $("#sina").is(':checked');
                user_web_like[2] = $("#tencent").is(':checked');
                user_web_like[3] = $("#daily-top").is(':checked');
                user_web_like[4] = $("#renmin").is(':checked');
                user_web_like[5] = $("#souhu").is(':checked');
            }
        },
        error: function (err_msg) {
            show_error(err_msg.responseText);
        }
    })
}


function change_like_cancel() {
    $("#top-news").prop('checked', user_field_like[0]);
    $("#political").prop('checked', user_field_like[1]);
    $("#sports").prop('checked', user_field_like[2]);
    $("#entertainment").prop('checked', user_field_like[3]);
    $("#science").prop('checked', user_field_like[4]);
    $("#health").prop('checked', user_field_like[5]);
    $("#social").prop('checked', user_field_like[6]);

    $("#net-ease").prop('checked', user_web_like[0]);
    $("#sina").prop('checked', user_web_like[1]);
    $("#tencent").prop('checked', user_web_like[2]);
    $("#daily-top").prop('checked', user_web_like[3]);
    $("#renmin").prop('checked', user_web_like[4]);
    $("#souhu").prop('checked', user_web_like[5]);
}

$(document).ready(function () {
    $("#new_pwd_confirm").blur(function(){
        var new_pwd = $("#new_pwd").val();
        var new_pwd_confirm = $("#new_pwd_confirm").val();
        if(new_pwd !== new_pwd_confirm)
        {
            $("#pwd_confirm_div").html("<p style='color: #b92c28'>两次输入密码不一致！</p>");
        }
        else
        {
            $("#pwd_confirm_div").html("");
        }
    });

    if(user_info['username'] === null)
    {
        show_error("对不起，您尚未登录！");
    }
    else
    {
        account_info();
    }
});