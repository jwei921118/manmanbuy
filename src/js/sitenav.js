/**
 * Created by jwei on 2017/3/19.
 */

(function (window) {

    $(function () {

        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getsitenav",
            success:function ( data ) {
                console.log(data);
                var tmp = template( "nav-tmp", data );
                $("#navList").html( tmp );
            },
        })

    });

})(window)
