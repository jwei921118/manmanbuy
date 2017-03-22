/**
 * Created by jwei on 2017/3/18.
 */

// 入口函数
$(function () {

    // 获取数据
    $.ajax({
        type:"get",
        url:"http://192.168.15.144:3000/api/getcoupon",
        success :function ( data ) {
            template.config("escape",false);
            var tmp = template("coupons",data );
            $("#kfc-list").html( tmp );
        },
    })
});
