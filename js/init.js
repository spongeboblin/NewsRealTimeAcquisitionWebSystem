var user_info = {
    "username": null,
    "name": null,
    "sex":null,
    "age":null,
    "phone":null,
    "email":null,
    "regdate":null
};

var user_field_like = null;
var user_web_like = null;

var field_like_name = ["要闻", "时政", "体育", "娱乐", "科技", "健康", "社会"];
var web_like_name = ["网易", "新浪", "腾讯", "今日头条", "人民网", "搜狐"];

function parse_source(source) {
    if(source === null)
        return "";
    else
        return web_like_name[parseInt(source)];
}

function parse_field(i) {
    if(i === null)
        return "";
    else
        return field_like_name[parseInt(i)];
}

$(document).ready(function () {
    if(typeof $.session.get('user') === "undefined")
    {
        $('#top-right').html('<ul class="nav navbar-nav">' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#login">赞助</a></li>'+'<li><a></a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li role="presentation"><a data-toggle="modal" data-target="#search_news" ' +
            'role="menuitem" tabindex="-1">搜索</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">国际新闻</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">体坛咨询</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">娱乐八卦</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">社会民生</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">政法公安</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">经济热点</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">城建公交</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">科教文卫</a></li>' +
			'</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">时事政治</a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#find_pwd">猜你喜欢</a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#register">新用户注册</a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a data-toggle="modal" data-target="#login">登录</a></li>' +
            '</ul>');
    }
    else
    {
        user_info['username'] = $.session.get('user');
        $('#top-right').html('<ul class="nav navbar-nav">' +
            '<li><a>Copyright 2017@petecheng</a></li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li class="dropdown"><a class="dropdown-toggle" id="personal_center" role="button" ' +
            'data-toggle="dropdown">' + user_info['username'] + '<b class="caret"></b></a>' +
            '<ul class="dropdown-menu" role="menu" aria-labelledby="personal_center">' +
            '<li role="presentation"><a role="menuitem" tabindex="-1" href="index.html">首页</a></li>' +
            '<li role="presentation"><a role="menuitem" tabindex="-1" href="personal_center.html">个人中心</a></li>' +
            '<li role="presentation"><a role="menuitem" tabindex="-1" href="classified_news.html">分类新闻</a></li>' +
            '<li role="presentation"><a role="menuitem" data-toggle="modal" data-target="#logout" role="menuitem" tabindex="-1">注销</a></li>' +
            '<li role="presentation"><a role="menuitem" data-toggle="modal" data-target="#help">帮助</a></li>' +
            '</ul>' + '</li>' +
            '</ul>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li id="login"><a>欢迎使用聚合频道 ' + '</a></li>' +
            '</ul>');
        load_user_info();
    }
});

function logout(){
    $.session.remove('user');
    location.reload();
}

function search_news(){
}

function cancel_search_news(){
    $('#search_title').val("");
}

function show_error(msg){
    $("#error").text(msg);
    $("#error_msg").modal();
}

function end_error_msg() {
    if($("#error").text() === "请先登录再使用哦~")
    {
        $("#error").text("");
        location.href = "index.html";
    }
    else
        $("#error").text("");
}

function show_inform(msg) {
    $("#inform").text(msg);
    $("#inform_msg").modal();
}

function end_inform_msg() {
    if($("#inform").text() === "修改成功啦！")
    {
        $("#inform").text("");
        location.reload();
    }
    else
        $("#inform").text("");
}

function get_date() {
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0': '') + date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0': '') + date.getHours() + ':';
    var m = (date.getMinutes() < 10? '0': '') + date.getMinutes();
    return Y + M + D + h + m;
}

function load_user_info() {
    $.ajax({
        url: 'php/load_user_info.php',
        type: 'POST',
        data: {
            username: user_info['username']
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
                user_info['name'] = res['name'];
                user_info['sex'] = res['sex'];
                user_info['age'] = res['age'];
                user_info['phone'] = res['phone'];
                user_info['email'] = res['email'];
                user_info['regdate'] = res['regdate'];
                user_field_like = new Array(7);
                user_web_like = new Array(6);

                for(var i = 0; i < res['field_like'].length; i++)
                    user_field_like[i] = (res['field_like'].charAt(i) === '1');
                for(i = 0; i < res['web_like'].length; i++)
                    user_web_like[i] = (res['web_like'].charAt(i) === '1');
            }
        },
        error: function (error_msg) {
          show_error(error_msg.responseText);
        }
    });
}

String.prototype.setCharAt = function (index, character) {
  return this.substr(0, index) + character + this.substr(index + character.length);
};


function set_size(img, mode) {
    if(mode === 'top')
    {
        img.width = 800;
        img.height = 600;
    }
    else if(mode === 'rec')
    {
        img.width = 300;
        img.height = 400;
    }
    else if(mode === 'classified')
    {
        img.width = 300;
        img.height = 300;
    }
}

function set_single(index) {
    $.ajax({
        url: 'php/classified_news/load_single.php',
        type: 'POST',
        data: {id: index},
        success: function (data){
            var res = jQuery.parseJSON(data);
            if(res.length === 1)
            {
                show_error("错误信息\n" + res);
            }
            else
            {
                $("#single_title").html(res['title']);
                $("#single_date").html(res['news_date']);
                $("#single_content").html(res['content']);
                $("#single_cite").html(parse_source(res['source']) + ', ' + parse_field(res['type']));
                $("#single_news").modal();
            }
        },
        error: function (err_msg) {
            show_error("错误信息\n" + err_msg.responseText);
        }
    });
}