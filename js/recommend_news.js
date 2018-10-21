$(document).ready(function () {
    $.ajax({
        url: "php/load_recommend_news.php",
        type: "POST",
        success: function (data) {
            var res = jQuery.parseJSON(data);
            console.log(res);
            show_default_recommend_news();

            if(res.length === 0){
                show_error("错误信息！");
                show_default_recommend_news();
            }
            else
            {
                var size = res.length;
                var title,
                    image,
                    content,
                    cite;
                if(size < 1)
                {
                    show_default_rec1();
                }
                else
                {
                    title = res[0].title;
                    image = res[0].image;
                    content = res[0].content;
                    cite = parse_source(res[0].source);
                    $("#rec1_image").attr("src", image);
                    $("#rec1_title").text(title);
                    $("#rec1_content").html(content);
                    $("#rec1_cite").text(cite);
                }
                if(size < 2)
                {
                    show_default_rec2();
                }
                else
                {
                    title = res[1].title;
                    image = res[1].image;
                    content = res[1].content;
                    cite = parse_source(res[0].source);
                    $("#rec2_image").attr("src", image);
                    $("#rec2_title").text(title);
                    $("#rec2_content").html(content);
                    $("#rec2_cite").text(cite);
                }
                if(size < 3)
                {
                    show_default_rec3();
                }
                else
                {
                    title = res[2].title;
                    image = res[2].image;
                    content = res[2].content;
                    cite = parse_source(res[0].source);
                    $("#rec3_image").attr("src", image);
                    $("#rec3_title").text(title);
                    $("#rec3_content").html(content);
                    $("#rec3_cite").text(cite);
                }
            }

        },
        error:function (err_msg) {
            show_error(err_msg.responseText);
            show_default_recommend_news();
        }
    });
});


function show_default_rec1() {
    $("#rec1_image").attr("src", "image/r1.jpg");
    $("#rec1_title").text("保罗交易至火箭 与哈登强强联手究竟会擦出怎样的火花？");
    $("#rec1_content").html("火箭官方今天宣布，他们送出帕德里克、萨姆、路易斯威廉姆斯、蒙特勒兹、凯尔维尔哲、德安德鲁、达伦、一个未来首轮选秀权以及部分现金，从快船得到克里斯保罗。火箭先是用部分现金从……");
    $("#rec1_cite").text("中国网");
}

function show_default_rec2() {
    $("#rec2_image").attr("src", "image/r2.jpg");
    $("#rec2_title").text("6.29财经要闻早知晓 早间要闻精选");
    $("#rec2_content").html("1.证监会回应小散能否自由炒股：并未限制投资者交易自由。  2.深交所：参与退市整理期股票买入交易的散户资产门槛50万。  3.央行表示积极支持香港经济发展，进一步巩固香港国际金融中心地位……");
    $("#rec2_cite").text("新浪财经");
}

function show_default_rec3() {
    $("#rec3_image").attr("src", "image/r3.jpg");
    $("#rec3_title").text("少女时代出道10周年 8月初将发行纪念专辑");
    $("#rec3_content").html("人气女团少女时代将于8月初发行专辑并举行粉丝见面会，开启出道10周年纪念活动。今年8月5日是少女时代出道10周年纪念日，原计划于7月发行的纪念专辑推迟至8月。新专辑主打歌目前已经确定……");
    $("#rec3_cite").text("腾讯新闻");
}

function show_default_recommend_news(){
    show_default_rec1();
    show_default_rec2();
    show_default_rec3();
}