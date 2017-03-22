/**
 * Created by jwei on 2017/3/20.
 */

(function (window) {

    // 入口函数
    $(function () {


        var param = window.location.search;
        console.log(param);

        // 异步获取 排行
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getbrand"+param,
            success: function ( data ) {

                var tmp = template("brandlist-tmp", data );
                $("#brandList").html( tmp );

                $("#brandList em").eq(0).addClass("top1");
                $("#brandList em").eq(1).addClass("top2");
                $("#brandList em").eq(2).addClass("top3");
                console.log(data);
            },
        });

        var products = param + "&pagesize=4";
        // 异步获取 商品信息
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getbrandproductlist" +products,
            success: function ( data ) {
                console.log(data);
                var tmp = template("consider-tmp", data );
                $("#consider").html( tmp );



                $.ajax({
                    type:"get",
                    url:"http://192.168.15.144:3000/api/getproductcom",
                    data:{productid:0},
                    success: function ( data ) {
                        console.log(data);
                        var tmp = template("evalute-tmp" , data );
                        $("#evalute").html( tmp );
                    },
                });

            },
        });






    });

})(window);