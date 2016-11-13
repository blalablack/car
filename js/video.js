
function initial(){
    allTime();
    var bar_parent=$("#bar_parent");
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
    bar_parent.bind("click",bar_click);
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

/********************控制全屏*******************/

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
//监听全屏切换状态
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
//volume的hover click事件
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
//播放条，音量条，音量圆形按钮
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

//控制control几秒后隐藏
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

function media_ended(){
    aa.p();
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
function allTime(){
    var media=$("#media").get(0);
    var allTime=parseInt(media.duration);
    var shi=Math.floor(allTime/60);
    var miao=allTime%60;
    var all=$("#time_all").get(0);
    all.innerHTML=shi+":"+miao;
}
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
//视频准备好以后才绑定开始事件
$("video").get(0).addEventListener("canplaythrough",initial,false);

