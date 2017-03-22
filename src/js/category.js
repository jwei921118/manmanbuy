

(function (window) {
    // 入口函数
    $(function () {

        //申明一i个变量 用于存储 每一个列表的索引值 和当前对象
        var param , that ;
        // 定义一个变量来存储 sessions 对象
        var sStorage =window.sessionStorage;
            //    第一次异步获取 分类列表的 数据

        // 封装显示隐藏 函数
        /*



         */
        function play()  {
            if ( $("#na_in table").eq( param ).css("display") == "none" ){

                $("#na_in table").eq( param ).css({display:"table"});
                $("#na_in table").eq(param).siblings("table").css({display:"none"});
            } else {
                $("#na_in table").css({display:"none"});
            }
        }


        $.ajax({
            type:"get",
            url:"http://192.168.15.144:3000/api/getcategorytitle",
            success:function ( data ) {

                var htmlStr = template("carte-all",data);
                $("#na_in").html( htmlStr );
                // 模板渲染

                // 循环每一个分类列表给齐全添加一个自定义属性
                $("#na_in .classify").each(function ( i , v ) {
                    v.index = i;
                });

                // 获取局部数据
                // 绑定点击事件 获取数据 然后存储待session 中
                $("#na_in .classify").on("click",function () {
                        // 将当前对象的索引值 赋值给一个变量
                        param = this.index;
                        // 将当前对象赋值给一个变量
                        that = this;
                    // 再次发送ajax请求 获取分类列表的详情信息

                    // 判断是否有存在数据 没有就去请求 有就从本地去拿数据
                    if ( !sStorage["title"+param] ){

                        // 没有数据  则发送请求
                        $.ajax({
                            type :"get",
                            url :"http://192.168.15.144:3000/api/getcategory?titleid="+param,
                            success : function ( data ) {
                                console.log(data);
                                sStorage["title"+param] = JSON.stringify( data );
                                template.config("eacape",false);
                                // 给获取的数据添加一个属性 来得到数据在试图渲染需要的行数
                                data.k = Math.ceil(data.result.length/3);

                                var htmlStr = template("carte-detail" ,data);

                                // 循环遍历获取到的每一个对象并 添加 一个自定义属性
                                data.result.forEach( function ( v , i ) {
                                    v.index = i;
                                });
                                // 渲染到 当前 元素的下一个元素里
                                $("#na_in table").eq( param ).html( htmlStr );

                                // 调用显示隐藏函数
                                play();

                            }
                        });


                    } else {

                        var data = JSON.parse( sStorage.getItem("title"+param) );
                        data.k = Math.ceil(data.result.length/3);
                        var htmlStr = template("carte-detail" , data );
                        $("#na_in table").eq( param ).html( htmlStr );

                        // 调用 显示隐藏函数
                        play();
                    }

                });

            },
        });


    });


})( window )