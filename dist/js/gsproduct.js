!function(t){$(function(){function i(t){$(t).find("i").hasClass("icon-xiala")?($(t).find("i").removeClass("icon-xiala"),$(t).find("i").addClass("icon-shangla")):($(t).find("i").removeClass("icon-shangla"),$(t).find("i").addClass("icon-xiala"))}function s(t){"none"==$(t).parent().css("display")?$(t).parent().show().siblings(".drop").hide():$(t).parent().hide()}var a=0,e=0,o=t.sessionStorage,n={};$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getgsshop",success:function(t){var c=template("sort-tmp",t);$("#sortList").html(c),$($("#sortList li")[0]).addClass("on"),$($("#filterList li")[0]).on("click",function(){i(this),s("#sortList")}),$("#sortList li").on("click",function(){a=$(this).index(),$(this).addClass("on").siblings("li").removeClass("on");var t=o["shopid"+a];if(t){var i=JSON.parse(t)["äreaid"+e],c=template("product-tmp",i);$("#productList").html(c)}else $.ajax({type:"get",url:"http://192.168.15.144:3000/api/getgsproduct",data:{shopid:a,areaid:e},success:function(t){n["areaid"+e]=t,o["shopid"+a]=JSON.stringify(n);var i=template("product-tmp",t);$("#productList").html(i)}});s("#sortList")})}}),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getgsshoparea",success:function(t){var c=template("cat-tmp",t);$("#catList").html(c),$($("#catList li")[0]).addClass("on"),$($("#filterList li")[1]).on("click",function(){i(this),s("#catList")}),$("#catList li").on("click",function(){e=$(this).index(),$(this).addClass("on").siblings("li").removeClass("on");var t=JSON.parse(o["shopid"+a])["areaid"+e];if(t){var i=t,c=template("product-tmp",i);$("#productList").html(c)}else $.ajax({type:"get",url:"http://192.168.15.144:3000/api/getgsproduct",data:{shopid:a,areaid:e},success:function(t){n["areaid"+e]=t,o["shopid"+a]=JSON.stringify(n);var i=template("product-tmp",t);$("#productList").html(i)}});s("#catList")})}}),$($("#priceList li")[0]).addClass("on"),$($("#filterList li")[2]).on("click",function(){i(this),s("#priceList")}),$("#priceList li").on("click",function(){$(this).addClass("on").siblings("li").removeClass("on"),s("#priceList")}),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getgsproduct",data:{shopid:0,areaid:0},success:function(t){n["areaid"+e]=t,o["shopid"+a]=JSON.stringify(n);var i=template("product-tmp",t);$("#productList").html(i)}})})}(window);