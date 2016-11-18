
/************************************************pc端效果*/
/************汽车navhover**********/
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
/******轮播图切换*****/
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
/********鼠标移入轮播图停止轮播********/
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
/******鼠标移入轮播图下面的li停止轮播*******/
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
/****轮播图下面的li的点击事件，所有的东西都换************/
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
/******内容图片hover变大******/
function imghover(){
    var spans=$(".neirong>a div span")
    spans.each(function () {
        var div=$(this).parent();
        $(this).mouseenter(function () {
            div.css("height",div.height());
            var w=div.width();//190
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


/*****************************************手机端的js*/
/*******图片轮播切换*****/
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
/*********把汽车nav换成黑色的**********/
function phoneNavcar() {
    var imgs=$(".header .nav li img");
    imgs.each(function(){
        var src=$(this).attr("src");
        var src3=src.slice(0,src.length-5)+"3.png";
        $(this).attr("src",src3);
    });
}
/*******点击轮播图下的li切换图片*****/
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
/*****************************video的js*/

function initial(){
    var bar_parent=$("#bar_parent");
    bar_parent.bind("click",bar_click);
    var tops=$("#tops");
    /*************播放事件**********************/
    var btn=$("#buttons .btn");
    var media=$("#media");

    var pause_on=$("#pause_on");
    var poster_on=$("#poster_on");
    //播放按钮绑定暂停播放事件
    btn.bind("click",btn_click);
    //整个播放器绑定暂停播放事件
    media.bind("click",btn_click);
    //大暂停按钮绑定暂停播放事件
    pause_on.bind("click",btn_click);
    //播放完图片绑定播放事件
    poster_on.bind("click",btn_click);

    //播放器绑定结束事件
    media.bind("ended",media_ended);
    //播放进度条绑定click事件

    //声音条事件
    tops.bind("mousedown",tops_mousedown);
    $("body").bind("mouseup",tops_mouseup);

    //页面一加载时的fullcsreen的hover事件
    var fullscreen_span=$("#fullscreen span");
    fullscreen_span.mouseenter(function () {
        $(this).css("backgroundPosition","-171px 0");
    });
    fullscreen_span.mouseleave(function () {
        $(this).css("backgroundPosition","-151px 0");
    });
    //绑定全屏事件
    $(document).bind('webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenChange fullscreenchange',screenchange);

    //页面加载时paly的hover事件
    btn.mouseenter(function () {
        $(this).css("backgroundPosition","-15px 0");
    });
    btn.mouseleave(function () {
        $(this).css("backgroundPosition","0 0");
    });


    //volume的hover click事件
    volume_click();
    //一开始音量
    media.get(0).volume=.5;
}
/********************控制video父元素全屏*******************/
$("#fullscreen").click(function(){
    if(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen){
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.oRequestFullscreen){
            document.oCancelFullScreen();
        }else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }else{
        var element=$("#player").get(0);
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
            element.msRequestFullscreen();
        } else if(element.oRequestFullscreen){
            element.oRequestFullscreen();
        } else if(element.webkitRequestFullscreen){
            element.webkitRequestFullScreen();
        }
    }
});
/**********监听全屏切换状态******/
function screenchange() {
    //判断当前是否全屏
    var fullscreen_span=$("#fullscreen span");
    var control=$("#control");
    var bar_parent_bar=$("#bar_parent .bar");
    var voice_voice_bar=$("#voice .voice_bar");
    var cicle_class=$(".cicle");
    var bar_parent=$("#bar_parent");
    if(document.FullScreen===true||document.webkitIsFullScreen===true||document.mozFullScreen){
        control.css({"height":"55px","padding-top":"5px","z-index":"2147483648","bottom":"25px"});
        bar_parent_bar.css({"height":"3px"});
        voice_voice_bar.css({height:"3px"});
        cicle_class.css({"top":"3px"});
        fullscreen_span.css({"backgroundPosition":"-191px 0"});
        bar_parent.animate({"width":"68%"},10,ziShiYong);
        //全屏fullscreen的hover事件
        fullscreen_span.unbind("mouseenter mouseleave");
        fullscreen_span.mouseenter(function () {
            $(this).css("backgroundPosition","-211px 0");
        });
        fullscreen_span.mouseleave(function () {
            $(this).css("backgroundPosition","-191px 0");
        });

    }else{
        control.css({height:"40px","padding-top":"0","bottom":"15px"});
        bar_parent_bar.css({"height":"2px"});
        voice_voice_bar.css({height:"2px"});
        cicle_class.css({"top":"3px"});
        //播放进度的调整，animate是为了等width=50%之后执行下面的
        bar_parent.animate({"width":"55%"},10,ziShiYong);
        fullscreen_span.css({"backgroundPosition":"-151px 0"});
        //非全屏fullscreen的hover事件
        fullscreen_span.unbind("mouseenter mouseleave");
        fullscreen_span.mouseenter(function () {
            $(this).css("backgroundPosition","-171px 0");
        });
        fullscreen_span.mouseleave(function () {
            $(this).css("backgroundPosition","-151px 0");
        });

    }
};
/*********volume的hover click事件*********/
function volume_click(){
    var volume_class=$(".volume");
    volume_class.mouseenter(function () {
        $(this).css({"backgroundPosition":"-81px 0"});
    });
    volume_class.mouseleave(function () {
        $(this).css({"backgroundPosition":"-59px 0"});
    });
    volume_class.click(function () {
        $(this).css({"backgroundPosition":"-103px 0"});
        var voice_progress=$(".voice_progress");
        voice_progress.css({"width":"0%"});
        $("#voice .cicle").css("left","0%");
        $(this).unbind("mouseenter mouseleave");
        var media=$("#media");
        media.get(0).volume=0;
    });
}
/*****播放条，音量条，音量圆形按钮******/
function ziShiYong(){
    //在下面var 也是为了给下面节约时间
    var media=$("#media").get(0);
    var progress=$(".progress");
    var voice_progress=$("#voice .voice_progress");
    var tops=$("#tops");
    //让现在的时间进度条也相对于现在的屏幕。
    var size=(media.currentTime/media.duration)*100+"%";
    progress.css("width",size);
    //音量随屏幕调整
    var width=tops.width()*media.volume;
    var w=width/tops.width()*100+"%";
    var wi=(w-4)/tops.width()*100+"%";
    voice_progress.css("width",w);
    //圆形按钮
    $("#voice .cicle").css("left",wi);
}
/***********voice 拖拽*************/
function tops_mousemove(e){
    var tops=$("#tops");
    var distance=Math.abs(e.offsetX);
    var lef=(distance-4)/tops.width()*100+"%";
    $("#voice .cicle").css("left",lef);
    var wid=distance/tops.width()*100+"%";
    $("#voice .voice_progress").css("width",wid);
    var media=$("#media").get(0);
    media.volume=(distance/tops.width()).toFixed(2);
}
function tops_mousedown(e){
    var tops=$("#tops");
    //判断鼠标左键
    if(e.button==0){
        var distance=Math.abs(e.offsetX);
        var lef=(distance-4)/tops.width()*100+"%";
        $("#voice .cicle").css("left",lef);
        var wid=distance/tops.width()*100+"%";
        $("#voice .voice_progress").css("width",wid);
        var media=$("#media").get(0);
        media.volume=(distance/tops.width()).toFixed(2);
        tops.bind("mousemove",tops_mousemove);
    }
}
function tops_mouseup(){
    var tops=$("#tops");
    tops.unbind("mousemove");
    //判断是否音量为0
    var volume_class=$(".volume");
    if(media.volume<=.05){
        volume_class.css({"backgroundPosition":"-103px 0"});
    }else{
        volume_class.css({"backgroundPosition":"-59px 0"});
        volume_class.mouseenter(function () {
            $(this).css({"backgroundPosition":"-81px 0"});
        });
        volume_class.mouseleave(function () {
            $(this).css({"backgroundPosition":"-59px 0"});
        });
    }
}
/**************播放按钮**************/
var shijian_time=true;
function btn_click(){
    var control=$("#control");
    var media=$("#media").get(0);
    var btn=$("#buttons .btn");
    var pause_on=$("#pause_on");
    var poster_on=$("#poster_on");
    if(!media.ended&&!media.paused){
        media.pause();
        pause_on.css({"display":"block"});
        btn.css("backgroundPosition","0 0");
        btn.unbind("mouseenter mouseleave");
        btn.mouseenter(function () {
            $(this).css("backgroundPosition","-15px 0");
        });
        btn.mouseleave(function () {
            $(this).css("backgroundPosition","0 0");
        });
        aa.p();
    }else{
        media.play();
        pause_on.css("display","none");
        poster_on.css("display","none");
        //一动control就回来
        //绑定一个计时器多次会加速，shijian_time用来控制
        if(shijian_time){
            $(media).bind("mousemove",function () {
                now_TIME=0;
                if(control.css("display")=="none"){
                    control.css({"display":"block"});
                    control.stop(true);
                    control.animate({"opacity":1},10);
                }
            });
            control.bind("mousemove",function () {
                now_TIME=0;
                if($(this).css("display")=="none"){
                    $(this).css({"display":"block"});
                    $(this).stop(true);
                    $(this).animate({"opacity":1},10);
                }

            });
            //视频播放就开始计时
            setInterval(shijian,1000);
            shijian_time=false;
        }
        control.css({"display":"block"});
        control.animate({"opacity":1},200);
        pause_on.css({"display":"none"});
        btn.css("backgroundPosition","-29px 0");
        btn.unbind("mouseenter mouseleave");
        btn.mouseenter(function () {
            $(this).css("backgroundPosition","-45px 0");
        });
        btn.mouseleave(function () {
            $(this).css("backgroundPosition","-29px 0");
        });
        aa.t();
    }
}

/*****控制control几秒后隐藏****/
var now_TIME=0;
function shijian(){
    var control=$("#control");
    if(now_TIME>=6){
        if(control.css("display")=="block"){//加个判断避免运行压力
            //4秒没动就会隐藏control
            control.animate({"opacity":0},500,function () {
                control.css({"display":"none"});
            });}
    }
    now_TIME++;
}
/*****监听结束事件******/
function media_ended(){
    var media=$("#media").get(0);
    aa.p();
    media.pause();
    media.currentTime=0;
    $("#poster_on").css("display","block");
    $("#pause_on").css("display","block");
    $("#bar_parent .progress").css("width","0%");
}
/**********播放进度********/
function bar_click(e){
    var distance=e.offsetX;
    var wid=distance/$("#bar_parent").width()*100+"%";
    $("#bar_parent .progress").css("width",wid);
    var media=$("#media").get(0);
    var currentTime=(distance/$("#bar_parent .bar").width()*media.duration).toFixed(0);
    media.currentTime=currentTime;
    var shi=Math.floor(currentTime/60);
    var miao=currentTime%60;
    if(miao<10){
        miao="0"+miao;
    }
    var now=$("#time_now").get(0);
    now.innerHTML=shi+":"+miao;
}
/***获取总时间***/
function allTime() {
    var media = $("#media").get(0);
    var allTime = parseInt(media.duration);
    var shi = Math.floor(allTime / 60);
    var miao = allTime % 60;
    var all = $("#time_all").get(0);
    all.innerHTML = shi + ":" + miao;
}
/****播放开始***/
var aa=(function current_time(){
    var timer;
    function time(){
        var media=$("#media").get(0);
        var progress=$("#bar_parent .progress");
        var buffer=$("#bar_parent .buffer");
        var width_progress=media.currentTime/media.duration*100+"%";
        progress.css("width",width_progress);
        var width_buffer=media.buffered.end(0)/media.duration*100+"%";
        buffer.css("width",width_buffer);
        var currentTime=parseInt(media.currentTime);
        var shi=Math.floor(currentTime/60);
        var miao=currentTime%60;
        if(miao<10){
            miao="0"+miao;
        }
        var now=$("#time_now").get(0);
        now.innerHTML=shi+":"+miao;
    }
    function start(){
        timer=setInterval(time,100);
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
function Video() {
    $("video").get(0).addEventListener("canplaythrough",allTime,false);
    $(function () {
        initial();
        $("#control").css("display","block");
        $("#poster_on").css("display","block");
        $("#pause_on").css("display","block");
        $("#media").removeAttr("controls");
    });
}
/**************滚轮禁用************/
function jinyong(e){
    var isFF=/FireFox/i.test(navigator.userAgent);
    if(e){
        if(!isFF){
            window.onmousewheel=document.onmousewheel=function(){return false;}
        }else{
            window.addEventListener("DOMMouseScroll",wheel,false);
        }
    }else if(!e){
        if(!isFF){
            window.onmousewheel=document.onmousewheel=function(){return true;}
        }else{
            window.removeEventListener("DOMMouseScroll",wheel,false);
        }
    }
}
/**************************************pc端图片展示*/
function showPicture() {
    var wrap_items=$(".wrap_item");
    var Src=$(".mask").attr("data_class");
    wrap_items.each(function (i){
        $(this).children("img").attr("src",Src+i+".jpg");
        $(this).click( function(){
            if($(this).attr("class")=="wrap_item middle_right"){
                show.right();
            }else if($(this).attr("class")=="wrap_item middle_left"){
                show.left();
            }
        });
    });
    $(".kuang").attr("class"," kuang blur");
    $(".mask").css("display","block");
    jinyong(true);
 /******退出展示****/
    var quit=$(".quit");
    quit.click(function () {
        $(".kuang").attr("class"," kuang");
        $(".mask").css("display","none");
        jinyong(false);
    });
}
/*******图片切换******/
var show=(function () {
    var wrap_items=$(".wrap_item");
    var m=100*wrap_items.length;
    function ceshi() {
        m++;
        var i_m=wrap_items.length;
        for(var i=0;i<wrap_items.length;i++){
            $(wrap_items[i]).removeClass();
        }
        $(wrap_items[m%i_m]).attr("class","wrap_item out");
        $(wrap_items[(m+1)%i_m]).attr("class","wrap_item middle_left");
        $(wrap_items[(m+2)%i_m]).attr("class","wrap_item show");
        $(wrap_items[(m+3)%i_m]).attr("class","wrap_item middle_right");
        for(var x=4;x<i_m;x++){
            $(wrap_items[(m+x)%i_m]).attr("class","wrap_item out");
        }

    }
    function ceshi1() {
        m--;
        var i_m=wrap_items.length;
        if(m==-1){
            m=100*wrap_items.length;
        }
        for(var i=0;i<wrap_items.length;i++){
            $(wrap_items[i]).removeClass();
        }
        $(wrap_items[m%i_m]).attr("class","wrap_item out");
        $(wrap_items[(m+1)%i_m]).attr("class","wrap_item middle_left");
        $(wrap_items[(m+2)%i_m]).attr("class","wrap_item show");
        $(wrap_items[(m+3)%i_m]).attr("class","wrap_item middle_right");
        for(var x=4;x<i_m;x++){
            $(wrap_items[(m+x)%i_m]).attr("class","wrap_item out");
        }
    };
    return {
        right:ceshi,
        left:ceshi1
    };
})()




