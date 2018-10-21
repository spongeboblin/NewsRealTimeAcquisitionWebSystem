function load_news(type) {
    $("#news").html('<ul class="thumbnails"><li class="thumbnail"> ' +
        '<table class="table table-hover" id="news_table"> ' +
        '</table></li></ul>');

    $("#news_table").html('<thead>' +
        '<tr><th width="44%">标题</th> ' +
        '<th width="44%">摘要</th>' +
        '<th width="12%">时间</th></tr> ' +
        '</thead> ' +
        '<tbody style="max-height: 10px"> ' +
        '</tbody>');

    $.ajax({
        url: 'php/classified_news/load_news.php',
        type: 'POST',
        data: {type: type},
        success: function (data) {
            var res = jQuery.parseJSON(data);
            for(var i = 0; i < res.length; i++)
            {
                if(res[i].image !== null)
                {
                    console.log(res[i]);
                    $("#news").html('<ul class="thumbnails" style="height: 100%"> ' +
                        '<li class="thumbnail"> ' +
                        '<a id="'+ res[i].id.toString() + '" class="row" data-toggle="modal" ' +
                        'data-target="#single_news" href="#" onclick="set_single(this.id)"> ' +
                            '<div class="span4"> ' +
                                '<img src="'+ res[i].image.toString()+ '" style="width: 100%" onload="set_size(this,\'classified\')"> ' +
                            '</div>' +
                            '<div class="span4" style="max-height: 300px; overflow-y: scroll"> ' +
                                '<h3>' + res[i].title.toString() + '</h3> ' +
                                '<p> '+ res[i].content.toString() + '</p> ' +
                                '<blockquote><small><cite>' + parse_source(res[i].source) + '</cite></small> ' +
                                '</blockquote>' +
                            '</div>' +
                        '</a>' +
                        '</li>' +
                        '</ul>' + $("#news").html())
                }
                else
                {
                    $("#news_table tr:last").after('<tr id="'+ res[i].id.toString() + '" ' +
                        'data-toggle="modal" data-target="#single_news" ' +
                        'href="#" onclick="set_single(this.id)">' +
                        '<th>' + res[i].title.toString() + '</th>' +
                        '<th>' + res[i].content.toString() + '</th>' +
                        '<th>' + res[i].news_date.toString() + '</th>' +
                        '</tr>');

                }
            }
        },
        error: function (err_msg) {
            show_error(err_msg.responseText);
        }
    })
}

function load_field_news() {
    var flag = false;
    var index = -1;
    for(var i = 0; i < user_field_like.length; i++)
    {
        if(user_field_like[i] === true)
        {
            if(!flag)
            {
                flag = true;
                index = i;
            }
            $("#classes").html($("#classes").html() + '<li id="field-' + i.toString() +
                '" class=""><a data-toggle="tab" href="#0" ' +
                'onclick="load_news(' + i.toString()+ ')">' + field_like_name[i] +  '</a></li>');
        }
    }
    $("#field-" + index.toString()).attr("class", "active");
    load_news(index);
}

$(document).ready(function () {
    // console.log(user_like['field_like']);
    if(user_info['username'] === null)
    {
        show_error("登录一下再使用哦~");
        // location.href = "index.html";
    }
    else {
        load_field_news();
    }
});