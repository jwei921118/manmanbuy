/**
 * Created by jwei on 2017/3/18.
 */


// jquery 的入口函数
$(function () {
    // 获取导航栏的数据
    var titleid;
    var sStorage = window.sessionStorage;
    $.ajax({
        type:"get",
        url:"http://192.168.15.144:3000/api/getbaicaijiatitle",
        success : function ( data ) {
            //  通过目模板将 title数据渲染再页面上
            var tmp = template("nav-info", data );
            $("#nav-con").html( tmp );



            var lisWidth = 0;

            $("#nav-con li").each(function ( i , v ) {
                lisWidth += $(v).width();
            });

            $("#nav-con").width( lisWidth );



            // 拖动导航栏可以查看所有的分类

            var ulBox = $("#nav-con")[0];
            var parentBox = ulBox.parentNode;
            var patentWidth = parentBox.offsetWidth;
            var lastliWidth = $("#nav-con li").last().width();
            var ulBoxWidth = $("#nav-con").width();
            var minX = patentWidth - ulBoxWidth - lastliWidth;
            var startX = 0;
            var distanceX = 0;
            var moveX = 0;
            var currentX= 0;

            var addTransition = function(){
                ulBox.style.webkitTransition = "all .2s";
                ulBox.style.transition = "all .2s";
            }
            var removeTransition = function(){
                ulBox.style.webkitTransition = "none";
                ulBox.style.transition = "none";
            }
            var setTranslateX = function ( x ) {
                ulBox.style.webkitTransform = "translateX(" + x +"px)";
                ulBox.style.transform = "translateX(" + x +"px)";
            }

            ulBox.addEventListener("touchstart",function (e) {

                startX = e.touches[0].clientX;

            });

            ulBox.addEventListener("touchmove",function (e) {

                moveX = e.touches[0].clientX;
                distanceX = moveX -startX;

                removeTransition();
                setTranslateX( currentX + distanceX);

            });
            ulBox.addEventListener("touchend",function ( ) {

                if( (currentX +distanceX) > 0 ){
                    currentX = 0;
                    addTransition();
                    setTranslateX( currentX );
                }else if ( (currentX+distanceX) < minX ) {
                    currentX = minX;
                    addTransition();
                    setTranslateX( currentX );

                } else {
                    addTransition();
                    setTranslateX( currentX + distanceX );
                }

                currentX = currentX + distanceX;
                // 重置变量
                startX = 0;
                distanceX = 0;
                moveX = 0;

            });




            // 给所有的 导航栏的a 表亲啊添加点击事件
            $("#nav-con a").on("click",function () {

                $(this).addClass("borderbt");
                $(this).parent().siblings().children().removeClass("borderbt");
                // 获取当前的自定义属性值
                titleid = $(this).attr("titleid");

                var obj =  sStorage["titleid" + titleid ] ;

                // 判断是否已经有数据了 没有就获取 有就直接使用本地存储的数据
                if ( !obj ){
                    $.ajax({
                        type:"get",
                        url:"http://192.168.15.144:3000/api/getbaicaijiaproduct",
                        data:{titleid:titleid},
                        success: function ( data ) {

                            sStorage["titleid" + titleid ] = JSON.stringify( data );

                            var tmp = template("productLists" ,data );
                            $("#good-list").html( tmp );
                        },
                    });
                } else {
                    var data = JSON.parse( obj );
                    var tmp = template("productLists" ,data );
                    $("#good-list").html( tmp );
                }


            //  点击当前相
                console.log($(this).parent().offset());
                var liOffsetleft = $(this).parent().offset().left;

                if ( (currentX-liOffsetleft) < minX ){
                    currentX = minX;
                    addTransition();
                    setTranslateX( currentX );
                }

                if ( currentX ==0 ){
                    currentX =0;
                    addTransition();
                    setTranslateX( currentX );
                }
                if ( currentX > minX && currentX <0 ){
                    currentX = currentX - liOffsetleft;
                    addTransition();
                    setTranslateX( currentX );
                }


            });

            // 获取下面的列表

            $.ajax({
                type:"get",
                url:"http://192.168.15.144:3000/api/getbaicaijiaproduct",
                data:{titleid:0},
                success: function ( data ) {
                    template.config("escape",false);
                    var tmp = template("productLists" ,data );
                    $("#good-list").html( tmp );
                },
            });


        },
    })

});
