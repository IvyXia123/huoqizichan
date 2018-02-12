/**
 * Created by xiaxue on 2017/5/11.
 */
$(function () {
    var $headerHeight = $("header").outerHeight();   //header的高度宽
    var $contentNavWidth = $(".contentNav").width();
    var $windowHeight = $(window).height();      //可视区窗口的高度
    var $windowWidth = $(window).width();      //可视区窗口的宽度
    var $sectionHeight = $windowHeight - $headerHeight;
    var $graphBoxWidth = $windowWidth - $contentNavWidth;

    var $graphName;

    //点击导航切换展示图
        $(".contentNav li").click(function () {
            //激活当前点击项：
            $(this).addClass("navActive").siblings().removeClass("navActive");

            $(".graphBox").empty();
            $showBox = $('<div class="showBox">' +
                '<div class="graphDesc">' +
                '<span class="fa graphNameIcon"></span>' +
                '<span class="graphName"></span>' +
                '<div id="calendarBox">' +
                '<svg class="icon calendarIcon " aria-hidden="true">' +
                '<use xlink:href="#icon-rili"></use>' +
                '</svg>' +
                '<input type="text"  placeholder="请选择日期" id="calendar">' +
                ' </div>' +
                '</div>' +
                '</div>');
            $graphShow = $("<div class='graphShow'><div class='scrollBar scrollBarY'></div><div class='scrollBar scrollBarX'></div></div>");
            $showBox.append($graphShow);
            $(".graphBox").append($showBox);
            $(".showBox").css("height", $(".graphBox").height());
            $(".graphShow").outerHeight($(".showBox").outerHeight() - $(".graphDesc").outerHeight());


            $graphName = $(this).children().attr("data-href");

            //不同页面显示不同图标
            if ($graphName == "historyAsset" || $graphName == "order" || $graphName == "todayTotalScale" || $graphName == "statement") {
                var $tableIcon = $('<svg class="icon tableIcon" aria-hidden="true"> <use xlink:href="#icon-biaoge"></use> </svg>')
                $(".graphDesc .graphNameIcon").append($tableIcon);
                calendar();
                if ($graphName == "statement") {
                    $("#calendarBox").remove();
                }
            } else if ($graphName == "ratioCompare" || $graphName == "totalScale") {
                var $graphIcon = $('<svg class="icon graphIcon" aria-hidden="true"> <use xlink:href="#icon-cloud-chart"></use> </svg>')
                $(".graphDesc .graphNameIcon").append($graphIcon);
                $("#calendarBox").remove();
            }

            //表名匹配
            switch ($graphName) {
                case "historyAsset":
                    $(".graphName").html("历史资产规模");
                    break;
                case "order":
                    $(".graphName").html("TA当日申购赎回及指令");
                    break;
                case "todayTotalScale":
                    $(".graphName").html("今日资产规模");
                    break;
                case "ratioCompare":
                    $(".graphName").html("资产净申购及总规模及收益率对比");
                    break;
                case "statement":
                    $(".graphName").html("报表模块");
                    break;
                default:
                    $(".graphName").html("历史资产规模");
            }

            Ajax($graphName);
        });

        //Ajax请求：
    function Ajax(navHref){
        $.ajax({
            url: 'tpls/' + navHref + '.html',
            success: function (data) {
                $showArea = $("<div class='showArea'></div>");
                $showArea.append(data);
                $(".scrollBarY").before($showArea);

                scrollBar();
                order.load();

                if (navHref == "ratioCompare" && navHref) {
                    ratioCompare.showEcharts();
                }
            }
        })
    }

    // 日历插件
    function calendar() {
        $('#calendar').fdatepicker({
            format: "yyyy-mm-dd"
        });
    }

    //计算滚动条的比例
    function scrollBar() {
        var $graphHeight = $("." + $graphName).height();
        var $graphWidth = $("." + $graphName).width();
        var $graphShowHeight = $(".graphShow").height();
        var $graphShowWidth = $(".graphShow").width();
        var $scaleY = $graphShowHeight / $graphHeight;
        var $scaleX = $graphShowWidth / $graphWidth;

        //图表内容高度大于展示区高/宽度时有滚动条，否则无滚动条
        function scrollShow(graph, graphShow, scrollBar, attr, scale) {
            if (graph > graphShow) {
                $(scrollBar).css(attr, graphShow * scale);
            } else {
                $(scrollBar).remove();
            }
        }

        scrollShow($graphHeight, $graphShowHeight, ".scrollBarY", "height", $scaleY);
        scrollShow($graphWidth, $graphShowWidth, ".scrollBarX", "width", $scaleX);

        //Y轴滚动条移动：
        var $scrollTop = $graphHeight - $graphShowHeight; //内容可以滚动的最大高度
        var $scrollBarTop = $graphHeight - $(".scrollBarY").height();//滚动条可以滚动的最大高度
        $(".graphShow").scroll(function () {
            var $top = $(this).scrollTop() / $scrollTop * $scrollBarTop;
            $top = $top == 0 ? 0 : $top + 40;
            $(".scrollBarY").css("top", $top);
        })

        //X轴滚动条移动：
        var $scrollLeft = $graphWidth - $graphShowWidth;   //内容可以滚动的最大宽度
        var $scrollBarLeft = $graphWidth - $(".scrollBarX").width();
        $(".graphShow").scroll(function () {
            var $left = $(this).scrollLeft() / $scrollLeft * $scrollBarLeft;
            $left = $left == 0 ? 0 : $left + 60;
            $(".scrollBarX").css("left", $left);
        })

    }

    //平分表格：
    function tableStyle(tableName) {
        var $thLength = $(" '.'" + tableName + "' tr th'").length;   //th的长度
        var $thWidth = (1 / +$thLength) * 100 + "%";
        $("'.'" + tableName + "' tr th,.'" + historyAsset + "' tr td'").css("width", $thWidth);
    }

})