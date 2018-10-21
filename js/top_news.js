$(document).ready(function () {
    var top_index = ["top1", "top2", "top3"];
    $.ajax({
        url: "php/load_top_news.php",
        type: "POST",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            if(res.length === 1){
                show_error("错误信息！");
                show_default_top_news();
            }
            else {
                var size = res.length;
                var i;
                for (i = 0; i < size; i++) {
                    if (i >= 3)
                        break;
                    else {
                        $("#" + top_index[i]).attr("name", res[i].id);
                        $("#" + top_index[i] + "_image").attr("src", res[i].image);
                        $("#" + top_index[i] + "_title").text(res[i].title);
                        $("#" + top_index[i] + "_content").html(res[i].content);
                        $("#" + top_index[i] + "_cite").text(parse_source(res[i].source));
                    }
                }
                for(var j = i; j < 3; j++)
                    show_default_top_news(top_index[j]);
            }
        },
        error:function (err_msg) {
            show_error(err_msg.responseText);
            show_default_top_news();
        }
    });
});

function show_default_top_news(name){
    $("#"+ name + "_image").attr("src", "image/poster_3.jpg");
    $("#"+ name + "_title").text("Default News");
    $("#"+ name + "_content").html("<p>Default News Content</p>");
    $("#"+ name + "_cite").text("Default News Cite");
}