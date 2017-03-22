/**
 * Created by jwei on 2017/3/18.
 */


(function (window) {

    $(function () {

        // 发送 ajax请求获取数据

        var param = window.location.search;
        var couponid = param.split("&")[0];

        var couponTitle = (param.split("&")[1]).split("=")[1];
            couponTitle = decodeURI( couponTitle );



        console.log(couponid);
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getcouponproduct" +couponid ,
            success: function ( data ) {
                console.log(data);

                $("#coupontitle").html( couponTitle );

                template.config("escape",false);
                var tmp = template("couponsid" ,data );
                $("#coupons").html( tmp );
                $("#classifyid").html( couponTitle );

                var htmlPic = template("coupon-pic", data );
                $("#coupon-id").html( htmlPic );


            //    给每一个优惠券设置点击事件
                console.log($("#coupons li"));
                //申明一个变量
                var index = 0;

                var currentX;

                var lis = $("#coupons li").length-1;
                // 获取 包含图片 li 标签的宽度
                var liWidth = $("#coupon-id li").width();
                console.log(liWidth);


                $("#coupons li").on("click",function () {

                    // 点击任何一个 列表都显示遮罩

                    $("#galleryOverlay").show();

                    //获取 当前的自定义属性

                     index = $(this).attr("indexId");


                    currentX = -index*liWidth ;

                    // 设置ul 的 位置 显示当前的图片
                    $("#coupon-id").css({"left": currentX+ "px"});


                });

                $("#galleryOverlay").on("click",function ( e ) {
                    $(this).hide();
                });

            //    点击小图片来切换图片
                    $("#last").on("click",function ( e ) {

                        e.stopPropagation();

                        if ( index > 0 ){
                            index --
                            currentX = currentX + liWidth;

                        }else {
                            index = 0;
                            currentX = 0;
                        }

                        // 获取图片当前的位置
                        $("#coupon-id").css({"left": currentX+ "px"});


                    });

                $("#next").on("click",function( e ) {

                    e.stopPropagation();
                    if ( index < lis ){
                        currentX = currentX - liWidth;
                        index ++
                    }else {
                        index = lis;
                        currentX = - lis * liWidth ;
                    }

                    $("#coupon-id").css({"left": currentX+ "px"});

                })





            },
        })
    });

})(window);