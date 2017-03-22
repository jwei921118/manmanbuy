/**
 * Created by jwei on 2017/3/19.
 */


(function (window) {
     // juqery 入口函数
    $(function () {

        // 通过ajax 获取数据  店铺的信息

        var shopid =0, areaid = 0;
        var sStorage = window.sessionStorage;
        var productlist = {};

        //  对切换下拉框函数的封装
        function toggle ( dom ) {
            var I = $(dom).find("i").hasClass("icon-xiala");
            if ( I ){
                $(dom).find("i").removeClass("icon-xiala");
                $(dom).find("i").addClass("icon-shangla");
            } else {
                $(dom).find("i").removeClass("icon-shangla");
                $(dom).find("i").addClass("icon-xiala");
            }
        }
        // 对显示隐藏 下拉框函数的封装

        function palyBox( dom ) {

            if ( $( dom ).parent().css("display") =="none" ){
                $( dom ).parent().show().siblings(".drop").hide();
            } else {
                $( dom ).parent().hide();
            }
        }

        $.ajax({
           type:"get",
            url:"http://192.168.15.144:3000/api/getgsshop",
            success:function ( data ) {


                var tmp = template("sort-tmp", data );
                $("#sortList").html( tmp );


                $($("#sortList li")[0]).addClass("on");



                //     点击 店铺下拉框 显示
                $($("#filterList li")[0]).on("click",function () {

                    // 该表箭头方向
                    toggle( this );
                    //显示 下拉框
                    palyBox( "#sortList" );

                });


            //    给下拉框忠的每一个li 标签板绑定点击事件 来获取数据

                // 点击 每一个li 标签获取当前数据

                $("#sortList li").on("click",function () {
                    shopid = $(this).index();
                    $(this).addClass("on").siblings("li").removeClass("on");

                    // 点击之后发送请求获取数据
                    var obj =  sStorage["shopid" + shopid] ;
                    if ( !obj ) {
                        $.ajax({
                            type:"get",
                            url:"http://192.168.15.144:3000/api/getgsproduct",
                            data:{shopid:shopid,areaid:areaid},
                            success:function ( data ) {

                                productlist["areaid" + areaid ] = data;
                                sStorage["shopid" + shopid ] = JSON.stringify( productlist );

                                var tmp = template("product-tmp", data );
                                $("#productList").html( tmp );
                            },
                        });
                    } else {
                        var data = JSON.parse( obj )[ "äreaid"+ areaid];
                        var tmp = template("product-tmp", data );
                        $("#productList").html( tmp );

                    }

                    palyBox("#sortList");
                });


            },
        });


        // 通过ajax获取城市信息
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getgsshoparea",
            success:function ( data ) {

                var tmp = template("cat-tmp", data );
                $("#catList").html( tmp );

                $($("#catList li")[0]).addClass("on");

                $($("#filterList li")[1]).on("click",function () {

                    // 该表箭头方向
                    toggle( this );
                    //显示 下拉框
                    palyBox( "#catList" );

                });

                //点击获取城市 id 然后请求数据

                $("#catList li").on("click",function () {

                    areaid = $( this ).index();

                    $(this).addClass("on").siblings("li").removeClass("on");

                    // 点击获取 发送请求 获取数据
                    var obj =  JSON.parse( sStorage["shopid" + shopid] )["areaid" +areaid];
                    if ( !obj ){
                        $.ajax({
                            type:"get",
                            url:"http://192.168.15.144:3000/api/getgsproduct",
                            data:{shopid:shopid,areaid:areaid},
                            success:function ( data ) {

                                productlist["areaid" + areaid] = data;
                                sStorage["shopid" + shopid ] = JSON.stringify( productlist );

                                var tmp = template("product-tmp", data );
                                $("#productList").html( tmp );
                            },
                        });
                    } else {
                        var data = obj;
                        var tmp = template("product-tmp", data );
                        $("#productList").html( tmp );
                    }

                    palyBox("#catList");

                });

            },
        });

        // 1 元  js 效果

        $($("#priceList li")[0]).addClass("on");

        // 点击显示隐藏 下拉框
        $($("#filterList li")[2]).on("click",function () {

            // 该表箭头方向
            toggle( this );
            //显示 下拉框
            palyBox( "#priceList" );

        });

        // 点击 内部 条目改变样式

        $("#priceList li").on("click",function () {
            $(this).addClass("on").siblings("li").removeClass("on");
            palyBox("#priceList");
        });


        // 直接获取商品信息然后渲染到页面上
    //    通过ajax 获取 商品信息

        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getgsproduct",
            data:{shopid:0,areaid:0},
            success:function ( data ) {

                productlist["areaid" + areaid] = data;
                sStorage["shopid" + shopid ] = JSON.stringify( productlist );

                var tmp = template("product-tmp", data );
                $("#productList").html( tmp );
            },
        });


    });


})(window);