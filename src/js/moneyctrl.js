/**
 * Created by jwei on 2017/3/17.
 */

// 沙箱模式
(function (window) {

    // 导入入口函数
    $(function () {
        // 发送请求 获取数据
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getmoneyctrl",
            data:{pageid:0},
            success :function ( data ) {
                console.log(data);
                template.config("escape",false);
                var tmp = template("cargo",data);
                $("#ul_li").html( tmp );

                //生成 分页数 的option
                var page = Math.ceil(data.totalCount/10);
                console.log(page);
                for ( var i= 1 ;i <=page; i++){
                    var option = document.createElement("option");
                    option.value = i-1;
                    option.innerHTML = i + "/" +page;
                    $("#select").append( option );
                }


            //    添加点击事件 var p =1;

                var p=0;
                // 添加点击事件 来翻页
                $("#btn-next").on("click",function () {

                    // 判断是否需要获取数据
                    // 获取当前的页面数

                    p++;

                    if( p <page ){
                        $("#select option")[ p ].selected = "selected";

                        $.ajax({
                            type:"get",
                            url:"http://192.168.15.144:3000/api/getmoneyctrl",
                            data:{pageid:p},
                            success : function ( data ) {

                                template.config("escape",false);

                                var tmp = template("cargo",data);
                                $("#ul_li").html( tmp );
                            },
                        });
                    } else {
                        alert( "已经到最后一页了" );
                        p=page-1;
                    }

                });


                $("#btn-before").on("click",function () {
                    p--;
                    if ( p >=0 ){

                        $("#select option")[ p ].selected = "selected";
                        $.ajax({
                            type:"get",
                            url:"http://192.168.15.144:3000/api/getmoneyctrl",
                            data:{pageid:p},
                            success : function ( data ) {

                                template.config("escape",false);

                                var tmp = template("cargo",data);
                                $("#ul_li").html( tmp );
                            },
                        });
                    } else {
                        alert( "已经是最前一页了" );
                        p=0;
                    }

                });


                //     改变页面直接跳转
                console.log($("#select option"));
                $("#select").change(function () {


                    $(this).children().each( function ( i , v ) {
                        if ( v.selected ){
                            $.ajax({
                                type:"get",
                                url:"http://192.168.15.144:3000/api/getmoneyctrl",
                                data:{pageid:v.value},
                                success : function ( data ) {

                                    template.config("escape",false);

                                    var tmp = template("cargo",data);
                                    $("#ul_li").html( tmp );
                                    p =v.value;
                                },
                            });
                        }
                    });
                })


            },
        })

    });

})(window);