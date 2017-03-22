/**
 * Created by jwei on 2017/3/20.
 */
(function (window) {


    //入口函数
    $(function () {


        // 发送ajax获取数据
        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getbrandtitle",
            success: function ( data ) {
                console.log(data);
                var tmp = template( "category-tmp", data );
                $("#categoryList").html( tmp );
            },
        })

    });

})(window);