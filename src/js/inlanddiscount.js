/**
 * Created by jwei on 2017/3/22.
 */


    // 入口函数
    $(function () {

        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getinlanddiscount",
            success: function ( data ) {
                console.log(data);

                template.config("escape",false);
                var tmp = template("product-tmp" ,data );
                $("#productList").html( tmp );


                var totalHeight = 0;
                var m = 0; // 请求的次数
                var maxm = 5;

                $(window).scroll(function () {
                   var scrollTop = $(window).scrollTop();

                    totalHeight = $(window).height() + parseFloat( scrollTop );

                    if ( $("#productList").height() <totalHeight && m <=maxm ){
                        m ++;

                        $("#productList").append( tmp );
                    }

                });



            },
        });

    });