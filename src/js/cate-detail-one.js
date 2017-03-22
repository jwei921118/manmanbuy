/**
 * Created by jwei on 2017/3/16.
 */
$(function () {
    // 获取数据
    var productobj = window.location.search;
    // 从上一个页面获取数据
    productobj = decodeURI(productobj);
    productobj = productobj.replace(/\?obj=/,"");
    productobj = JSON.parse( productobj );

    $.ajax({
        type:"get",
        url:"http://192.168.15.144:3000/api/getproduct",
        data: {productid :productobj.productId },
        success: function ( data ) {
            /// 完成商品信息的数据
            data = data.result[0];
            $("#classify").html( productobj.brandName );
            $("#classify-detail").html( data.productName );
            $("#classify")[0].href ="category-detail.html?categoryid=" + data.categoryId;
            $("#productCom").html( productobj.productCom );
            $("#productName").html( data.productName );
            $(".good-pic").html( data.productImg );
            $("#moneny").html( productobj.productPrice );
        },
    });


    // 获取商品评价的数据
    $.ajax({
        type:"get",
        url:"http://192.168.15.144:3000/api/getproductcom",
        data:{productid: productobj.productId},
        success : function ( data ) {
            // 渲染数据
            var tmp = template("evaluate", data );
            $("#eval-tips").html( tmp );
        }
    });

});