!function(t){$(function(){var a=t.location.search;console.log(a),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getbrand"+a,success:function(t){var a=template("brandlist-tmp",t);$("#brandList").html(a),$("#brandList em").eq(0).addClass("top1"),$("#brandList em").eq(1).addClass("top2"),$("#brandList em").eq(2).addClass("top3"),console.log(t)}});var e=a+"&pagesize=4";$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getbrandproductlist"+e,success:function(t){console.log(t);var a=template("consider-tmp",t);$("#consider").html(a),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getproductcom",data:{productid:0},success:function(t){console.log(t);var a=template("evalute-tmp",t);$("#evalute").html(a)}})}})})}(window);