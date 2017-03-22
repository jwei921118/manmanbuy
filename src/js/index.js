

//沙箱 模式

    $(function () {

        //异步回去菜单栏的数据
        setTimeout(function () {
            $.ajax({
                url:"http://192.168.15.144:3000/api/getindexmenu",
                datatype :"json",
                type:"get",
                beforeSend:function () {
                    $(".gory").show();
                },
                success:function ( data ) {
                    data = data.result;

                    // 定义一个 模板字符串




                    var html ="";

                    // 循环遍历 拼接字符串
                    for ( var j =1;j<4;j++){
                        html += '<div class="row clearfix">';
                        for ( var i=(j-1)*4;i<j*4;i++){
                            html+='<div class="area-item f_left">'
                                +'<a href='+data[i].titlehref+'>'
                                +'<div class="pic">'
                                +data[i].img
                                +'</div>'
                                +'<div class="name">'
                                +data[i].name
                                +'</div>'
                                +'</a>'
                                +'</div>';
                        }
                        html+='</div>';
                    }
                    // 将拼接好的字符串放入到 盒子里面

                    $("#classify-box").html( html );





                    // 获取页面导航栏的最后一列的dom 对象
                    var moreCart = $("#classify-box>.row:eq(2)")[0];
                    // 让器默认为 不显示
                    moreCart.style.display ='none';
                    // 给更多添加点击事件 控制最后一行的显示与 隐藏

                    $("#classify-box>.row:eq(1)").children().eq(3).on("click",function () {
                        if( moreCart.style.display == "block") {
                            moreCart.style.display = "none";
                        } else {
                            moreCart.style.display = "block";
                        }
                    })
                },
                complete:function ( ) {
                    $(".gory").hide();
                },
            });

            //    异步获取商品的信息
            $.ajax({
                type:"get",
                url:"http://192.168.15.144:3000/api/getmoneyctrl",
                dataTpye:"jsonp",
                success:function (data) {

                    // 配置模板 让其不解析 标签
                    template.config("escape",false);
                    var tmp = template("cargo",data);
                    $("#ul_li").html( tmp );
                }
            });
        },1000);



    });





