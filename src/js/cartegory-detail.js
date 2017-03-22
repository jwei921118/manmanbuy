
//

// 入口函数
$(function () {

    /// 异步获取数据
    //       定义变量存储 跳转过来的数据
    var sStorage = window.sessionStorage;
    var categoryid  = window.location.search;
    categoryid = categoryid.split("=")[1];
    var categoryObj = {}, classify , page , p=1;

    function getDate( ) {
        var obj = JSON.parse( sStorage["categoryid" + categoryid ] )[ "productList" + p ];

        if ( !obj ){
            $.ajax({
                type:"get",
                url:"http://192.168.15.144:3000/api/getproductlist",
                data:{categoryid : categoryid, pageid: p },
                success : function ( data ) {

                    categoryObj[ "productList" + p ]  = data;

                    sStorage[ "categoryid" + categoryid ] = JSON.stringify( categoryObj );

                    template.config("escape",false);
                    var htmlStr = template("product-list",data);
                    $("#product-info").html( htmlStr );

                },
            });
        } else {
            var data = obj ;
            template.config("escape",false);
            var htmlStr = template("product-list",data);
            $("#product-info").html( htmlStr );
        }
    }

    // 发送ajax 请求
    $.ajax({
        type:"get",
        url:"http://192.168.15.144:3000/api/getcategorybyid",
        data:{categoryid : categoryid },
        success: function ( data ) {

            // 将商品类名存储再变量中
            classify = data.result[0].category;

            // 将或的的数据 渲染到视图中
            $("#classify-detail").html( classify );

            //  再次发送 ajax请求 获取商品列表的信息
            $.ajax({
                type:"get",
                url:"http://192.168.15.144:3000/api/getproductlist",
                data:{categoryid : categoryid, pageid: 1 },
                success:function ( data ) {

                    // 给数据 添加 类的属性名

                    categoryObj[ "productList" + p ]  = data;

                    sStorage[ "categoryid" + categoryid ] = JSON.stringify( categoryObj );


                    data.classifyName =  classify;

                    // 条用template 的 helper 函数 来自定以个函数 以便再模板中使用
                    template.helper( "toJson" ,function ( obj ) {
                        return JSON.stringify( obj );
                    });

                    //  配置模板引擎
                    template.config("escape",false);
                    // 同过模板引擎渲染页面
                    var htmlStr = template("product-list",data);
                    $("#product-info").html( htmlStr );



                    //   根据获取的数据来确定要页面数  给选择页面的 赋值
                    page = Math.ceil( data.totalCount/10 );

                    // 循环生成对应的 option 数
                    for ( var i= 1 ;i <=page; i++){
                        var option = document.createElement("option");
                        // 给option 定义一个自定义属性
                        option.value = i;
                        option.innerHTML = i + "/" +page;
                        $("#select").append( option );
                    }

                    // 先默认给赋值为1



                    // 添加点击事件 来翻页
                    $("#btn-next").on("click",function () {

                        // 判断是否需要获取数据
                        // 获取当前的页面数

                        p++;

                        if( p <=page ){

                            // 点击改变 option 哪一个会被选中
                            $("#select option")[ p-1 ].selected = "selected";

                            getDate();

                        } else {
                            alert( "已经到最后一页了" );
                            p=page;
                        }

                    });


                    $("#btn-before").on("click",function () {
                        p--;
                        if ( p >=1 ){

                            $("#select option")[ p-1 ].selected = "selected";

                            getDate();

                        } else {
                            alert( "已经是最前一页了" );
                            p=1;
                        }

                    });


                    //     改变页面直接跳转
                    $("#select").change(function () {

                        $(this).children().each( function ( i , v ) {
                            if ( v.selected ){
                                var obj = JSON.parse( sStorage["categoryid" + categoryid ] )[ "productList" + v.value ];
                                if ( !obj ) {
                                    $.ajax({
                                        type:"get",
                                        url:"http://192.168.15.144:3000/api/getproductlist",
                                        data:{categoryid:categoryid, pageid:v.value },
                                        success : function ( data ) {

                                            //需要存储数据

                                            categoryObj[ "productList" + v.value ]  = data;

                                            sStorage[ "categoryid" + categoryid ] = JSON.stringify( categoryObj );
                                            template.config("escape",false);
                                            var htmlStr = template("product-list",data);
                                            $("#product-info").html( htmlStr );
                                            p =v.value;
                                        },
                                    });
                                } else {

                                    // 需要转换数据
                                    var data = obj ;
                                    template.config("escape",false);
                                    var htmlStr = template("product-list",data);
                                    $("#product-info").html( htmlStr );
                                    p =v.value;
                                }
                            }
                        });
                    });

                }
            });

        }
    });


});