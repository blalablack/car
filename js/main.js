/**
 * Created by Administrator on 2016/10/17.
 */
/*nav 汽车*/
function navcar(){
    var as=$(".header .nav li a");
    var nav=$(".header .nav");
    as.each(function(){
        $(this).bind("mouseenter",function(){
           var w=nav.width();//放在外面只能在页面加载时执行一次变了以后的数值不变
           var img= $(this).parent().children("img");
            img.stop();
            img.animate({"width":w*.6,"left":w*.25},300,function () {
                $(this).next("a").css({"color":"#fff"});
                var src=$(this).attr("src");
                var src2=src.slice(0,src.length-5)+"2.png";
                $(this).attr("src",src2);
            });
        })
        $(this).bind("mouseleave",function(){
            var w=nav.width();
            var img= $(this).parent().children("img");
            img.stop();


            img.animate({"width":w*.33,"left":"0",},300,function () {
                $(this).next("a").css({"color":"#60BEAE"});
                var src=$(this).attr("src");
                var src2=src.slice(0,src.length-5)+"1.png"
                $(this).attr("src",src2);
                $(this).css({width:""});//清除内部样式，保证图片大小是外部定义的，保证自适应
            });


        })
    });
}
/******图片轮播*****//****无敌闭包封装******/
var i=0;
var picturechange=(function (){
    var timer;
    var pictures = $("#picture>div");
//要想动画依次执行只能用回调函数，无论是for循环还是依次绑定都不行（会一块执行）
    function ha() {
        //把上一次的图片上的文字回归原处
        var h=$("#picture").height()*8/100;
        var w=$("#picture").width()*4/100;
        var w2=$(".onpicture_1").width();
        if(i==1){
            $(".onpicture_2").animate({"bottom":h,right:-w2},200);
        }else if(i==2){

            $(".onpicture_3").animate({"top":h,right:-w2},200);
        }else if(i==3){

            $(".onpicture_4").animate({"top":h,left:-w2},200);
        }else if(i==0){

            $(".onpicture_1").animate({"bottom":h,left:-w2},200);
        }
        //上一次显示的图片hidden，这一次的visible
        $(pictures[i]).animate({"opacity": 0.8}, 600, function () {
            if(i==3){
                i=-1;
            }
            var next=$(pictures[i+1])
            next.css("visibility","visible");//先把下一次的visible防止切换空白
            $(this).css("visibility","hidden");
            $(this).attr("class","");
            next.attr("class","active");//加一个active属性方便后面选取
            next.animate({"opacity": 1}, 100, function () {
                i++;
                //图片上的文字显示

                if(i==1){
                    $(".onpicture_2").animate({"right":w,"bottom":h},400);//TODO:全部数据调成百分比除了外框
                }else if(i==2){
                     $(".onpicture_3").animate({"right":w,"top":h},400);
                }else if(i==3){
                    $(".onpicture_4").animate({"left":w,"top":h},400);
                }else if(i==0){
                    $(".onpicture_1").animate({"left":w,"bottom":h},400);
                }
            })
        })
        //定义m控制li背景的切换
        var m=i;
        if(m==3){
            m=-1
        }
        var width= ($(".nav_content ul").width())*(m+1)/4;
        $("#back").animate({"left":width},800)
    }
    function start(){
        timer=setInterval(ha,3000);
        //interval的间隔时间要大于上面走的时间才能控制住
    }
    function stop(){
        clearInterval(timer);
        timer=null;
    }
    return{
        t:start,
        p:stop
    }
})();
/********鼠标移入图标停止轮播********/
function picturemouse(){
    var pictures = $("#picture>div");
    pictures.each(function(){
        $(this).mouseenter(function(){
            picturechange.p();
        });
        $(this).mouseleave(function () {
            picturechange.t();
        })
    });
}
function limouse(){
    var lis=$(".nav_content li");
    lis.each(function () {
        $(this).mouseenter(function(){
            picturechange.p();//调用stop
        });
        $(this).mouseleave(function () {
            picturechange.t();//调用start
        })
    });
}

function liclick(){
    var lis=$(".nav_content li");
    lis.each(function () {
        $(this).click(function () {
            //找到li对应的图片
            var dataId=$(this).attr('data-id');
            var picture=$("#"+dataId);
            //修改之前显示的div
            var before=picture.siblings("div[class='active']");
            var id=before.attr("id");
            //定义m控制代表上一次显示的文字
            var h=$("#picture").height()*8/100;
            var w=$("#picture").width()*4/100;
            var w2=$("#picture").width()*32/100;
            var m;
            if(id){
                m=id.slice(8);
            }
            if(m==2){
                $(".onpicture_2").stop(true,true);
                $(".onpicture_2").animate({"bottom":h,right:-w2},1);//1ms消除切换时的more bug
            }else if(m==3){
                $(".onpicture_3").stop(true,true);
                $(".onpicture_3").animate({"top":h,right:-w2},1);
            }else if(m==4){
                $(".onpicture_4").stop(true,true);
                $(".onpicture_4").animate({"top":h,left:-w2},1);
            }else if(m==1){
                $(".onpicture_1").stop(true,true);
                $(".onpicture_1").animate({"bottom":h,left:-w2},1);
            }else{}
            before.css({"visibility":"hidden","opacity":.8});
            before.attr("class","");
            //显示点击的图片
            picture.css({"visibility":"visible",opacity:1});
            picture.attr("class","active");
            i=(dataId.slice(8)-1);//这是个dom str方法
            //修改文字
            if(i==1){
                $(".onpicture_2").stop(true,true);
                $(".onpicture_2").animate({"right":w,"bottom":h},300);//全部数据调成百分比除了外框
            }else if(i==2){
                $(".onpicture_3").stop(true,true);
                $(".onpicture_3").animate({"right":w,"top":h},300);
            }else if(i==3){
                $(".onpicture_4").stop(true,true);
                $(".onpicture_4").animate({"left":w,"top":h},300);
            }else if(i==0){
                $(".onpicture_1").stop(true,true);
                $(".onpicture_1").animate({"left":w,"bottom":h},300);
            }
            /****背景颜色的切换****/
            var width= ($(".nav_content ul").width())*(i)/4;
            $("#back").animate({"left":width},10)

        })
    });
}
function imghover(){
    var spans=$(".neirong>a div span")
    spans.each(function () {
        var div=$(this).parent();
        $(this).mouseenter(function () {
            div.css("height",div.height());
            console.log(div.height())
            var w=div.width();//190
            console.log(w);
            var h=div.height();//105
            var l=(w*1.1-w)/2
            var t=(h*1.1-h)/2
            $(this).stop();
            $(this).animate({width:w*1.1,left:-l,top:-t},600,'linear');
        });
        $(this).mouseleave(function () {
            var w=div.width();//190
            $(this).stop();
            $(this).animate({width:w,left:0,top:0},600,function () {
                $(this).css({width:""});//清除内部样式，保证图片大小是外部定义的，保证自适应
                div.css("height","");//同上
            });
        })
    });
}


//手机端的js
var z=0;
var pictureChangePhone=(function (){
    var timer;
    var pictures = $("#picture>div");
//要想动画依次执行只能用回调函数，无论是for循环还是依次绑定都不行（会一块执行）
    function ha() {
        //上一次显示的图片hidden，这一次的visible
        $(pictures[z]).animate({"opacity": 0.8}, 600, function () {
            if(z==3){
                z=-1;
            }
            var next=$(pictures[z+1])
            next.css("visibility","visible");//先把下一次的visible防止切换空白
            $(this).css("visibility","hidden");
            $(this).attr("class","");
            next.attr("class","active");//加一个active属性方便后面选取
            next.animate({"opacity": 1}, 100, function () {
                z++;
            })
        })
        //定义m控制li背景的切换
        var m=z;
        if(m==3){
            m=-1
        }
        var width= ($(".nav_content ul").width())*(m+1)/4;
        $("#back").animate({"left":width},800)
    }
    function start(){
        timer=setInterval(ha,3000);
        //interval的间隔时间要大于上面走的时间才能控制住
    }
    function stop(){
        clearInterval(timer);
        timer=null;
    }
    return{
        t:start,
        p:stop
    }
})();
function phoneNavcar() {
    var imgs=$(".header .nav li img");
    imgs.each(function(){
        var src=$(this).attr("src");
        var src3=src.slice(0,src.length-5)+"3.png";
        $(this).attr("src",src3);
    });
}
function PhoneLiClick(){
    var lis=$(".nav_content li");
    lis.each(function () {
        $(this).click(function () {
            //找到li对应的图片
            var dataId=$(this).attr('data-id');
            var picture=$("#"+dataId);
            //修改之前显示的div
            var before=picture.siblings("div[class='active']");
            before.css({"visibility":"hidden","opacity":.8});
            before.attr("class","");
            //显示点击的图片
            picture.css({"visibility":"visible",opacity:1});
            picture.attr("class","active");
            i=(dataId.slice(8)-1);//这是个dom str方法
            /****背景颜色的切换****/
            var width= ($(".nav_content ul").width())*(i)/4;
            $("#back").animate({"left":width},10)

        })
    });
}