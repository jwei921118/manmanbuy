$(function(){var t,i=window.sessionStorage;$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getbaicaijiatitle",success:function(e){var n=template("nav-info",e);$("#nav-con").html(n);var a=0;$("#nav-con li").each(function(t,i){a+=$(i).width()}),$("#nav-con").width(a);var s=$("#nav-con")[0],o=s.parentNode,c=o.offsetWidth,l=$("#nav-con li").last().width(),r=$("#nav-con").width(),d=c-r-l,u=0,p=0,f=0,h=0,v=function(){s.style.webkitTransition="all .2s",s.style.transition="all .2s"},g=function(){s.style.webkitTransition="none",s.style.transition="none"},m=function(t){s.style.webkitTransform="translateX("+t+"px)",s.style.transform="translateX("+t+"px)"};s.addEventListener("touchstart",function(t){u=t.touches[0].clientX}),s.addEventListener("touchmove",function(t){f=t.touches[0].clientX,p=f-u,g(),m(h+p)}),s.addEventListener("touchend",function(){h+p>0?(h=0,v(),m(h)):h+p<d?(h=d,v(),m(h)):(v(),m(h+p)),h+=p,u=0,p=0,f=0}),$("#nav-con a").on("click",function(){$(this).addClass("borderbt"),$(this).parent().siblings().children().removeClass("borderbt"),t=$(this).attr("titleid");var e=i["titleid"+t];if(e){var n=JSON.parse(e),a=template("productLists",n);$("#good-list").html(a)}else $.ajax({type:"get",url:"http://192.168.15.144:3000/api/getbaicaijiaproduct",data:{titleid:t},success:function(e){i["titleid"+t]=JSON.stringify(e);var n=template("productLists",e);$("#good-list").html(n)}});console.log($(this).parent().offset());var s=$(this).parent().offset().left;h-s<d&&(h=d,v(),m(h)),0==h&&(h=0,v(),m(h)),h>d&&h<0&&(h-=s,v(),m(h))}),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getbaicaijiaproduct",data:{titleid:0},success:function(t){template.config("escape",!1);var i=template("productLists",t);$("#good-list").html(i)}})}})});