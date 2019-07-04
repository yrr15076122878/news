function paged($count, currPage) {
    layui.use(['laypage', 'element'], function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'pages',
            count: $count, //数据总数，从服务端得到
            limits: true,
            limit: 4,
            curr: currPage,
            theme: '#012e67',
            jump: function (obj, first) {
                if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr  ajax 再次请求
                    newList(obj.curr);
                }
            }
        });
    });
}

$(function () {
    // 选择类别
    $(".search .choice-btn").click(function () {
        if ($(this).hasClass('btn-bg btn-color')) {
            $(this).removeClass('btn-bg btn-color')
        } else {
            $(this).addClass('btn-bg btn-color')
        }
    })

    /* ------ 循环跑卡片 ------ */
    $("#tempCard").html(createCard())
    // 初始化数据
    $.ajax({
        url: "../data/ExhibitorInfo.ashx",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            $count = data[0].Count
            paged($count)
            for (let i = 0; i < data.length; i++) {
                // 创建卡片
                var template = $("#card").clone().removeAttr("id")
                var tLogo = template.find(".card-logo")
                var tTitle = template.find(".card-title")
                var tContent = template.find(".card-content")
                tLogo.attr('src', data[i].Uplogosrc)
                tTitle.text(data[i].CompanyCn)
                tContent.text(data[i].IntroCn)

                $("#listCard").append(template)
            }

            $("#tempCard").html("")

        },
        error: function () {
            confirm("请求错误！")
        }

    })

})

// 切换页
function newList(currPage) {
    $("#listCard").html("")
    /* ------ 循环跑卡片 ------ */
    $("#tempCard").html(createCard())
    // 获取数据
    $.ajax({
        url: "../data/ExhibitorInfo.ashx",
        dataType: "json",
        type: "GET",
        data: {
            page: currPage
        },
        success: function (data) {
            console.log(data)
            $count = data[0].Count
            paged($count, currPage)
            for (let i = 0; i < data.length; i++) {
                // 创建卡片
                var template = $("#card").clone().removeAttr("id")
                var tLogo = template.find(".card-logo")
                var tTitle = template.find(".card-title")
                var tContent = template.find(".card-content")
                tLogo.attr('src', data[i].Uplogosrc)
                tTitle.text(data[i].CompanyCn)
                tContent.text(data[i].IntroCn)

                $("#listCard").append(template)
            }

            $("#tempCard").html("")

        },
        error: function () {
            confirm("请求错误！")
        }
    })
}