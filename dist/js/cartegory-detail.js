$(function(){function t(){var t=JSON.parse(e["categoryid"+a])["productList"+r];if(t){var c=t;template.config("escape",!1);var i=template("product-list",c);$("#product-info").html(i)}else $.ajax({type:"get",url:"http://192.168.15.144:3000/api/getproductlist",data:{categoryid:a,pageid:r},success:function(t){o["productList"+r]=t,e["categoryid"+a]=JSON.stringify(o),template.config("escape",!1);var c=template("product-list",t);$("#product-info").html(c)}})}var e=window.sessionStorage,a=window.location.search;a=a.split("=")[1];var c,i,o={},r=1;$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getcategorybyid",data:{categoryid:a},success:function(l){c=l.result[0].category,$("#classify-detail").html(c),$.ajax({type:"get",url:"http://192.168.15.144:3000/api/getproductlist",data:{categoryid:a,pageid:1},success:function(l){o["productList"+r]=l,e["categoryid"+a]=JSON.stringify(o),l.classifyName=c,template.helper("toJson",function(t){return JSON.stringify(t)}),template.config("escape",!1);var s=template("product-list",l);$("#product-info").html(s),i=Math.ceil(l.totalCount/10);for(var n=1;n<=i;n++){var p=document.createElement("option");p.value=n,p.innerHTML=n+"/"+i,$("#select").append(p)}$("#btn-next").on("click",function(){r++,r<=i?($("#select option")[r-1].selected="selected",t()):(alert("已经到最后一页了"),r=i)}),$("#btn-before").on("click",function(){r--,r>=1?($("#select option")[r-1].selected="selected",t()):(alert("已经是最前一页了"),r=1)}),$("#select").change(function(){$(this).children().each(function(t,c){if(c.selected){var i=JSON.parse(e["categoryid"+a])["productList"+c.value];if(i){var l=i;template.config("escape",!1);var s=template("product-list",l);$("#product-info").html(s),r=c.value}else $.ajax({type:"get",url:"http://192.168.15.144:3000/api/getproductlist",data:{categoryid:a,pageid:c.value},success:function(t){o["productList"+c.value]=t,e["categoryid"+a]=JSON.stringify(o),template.config("escape",!1);var i=template("product-list",t);$("#product-info").html(i),r=c.value}})}})})}})}})});