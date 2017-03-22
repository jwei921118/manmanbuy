/**
 * Created by jwei on 2017/3/18.
 */


(function (window) {

//    jquery 的入口函数
    $(function () {

        var param = window.location.search;
        console.log(param);
        $.ajax({
          type:"get",
           url:"http://192.168.15.144:3000/api/getmoneyctrlproduct" +param ,
           success: function ( data ) {
               console.log(data);
               var tmp = template("productDetail",data);
               $(".good-detail").html( tmp );

           },
       });

    });

})(window);