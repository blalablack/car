/*************************************************pc端效果*/
/******汽车navhover******/
function navcar() {
    var nav = $(".nav");
    //事件代理替换减少dom操作
    nav.delegate("a", "mouseenter", function () {
        var w = nav.width();//width是变化的所以每一次都要查询一次
        var img = $(this).prev();//取得同辈的img元素
        img.stop();
        var a=$(this);//记录下(取到)这个a
        var src=img.attr("src");
        var src2 = src.slice(0, src.length - 5) + "2.png";//得到黑色的src
        img.animate({"width": w * .6, "left": w * .25}, 300, function () {
            $(this).attr("src", src2);
            a.css({"color": "#fff"});
        });
    });
    nav.delegate("a", "mouseleave", function () {
        var w = nav.width();//width是变化的所以每一次都要查询一次
        var img = $(this).prev();//取得同辈的img元素
        img.stop();
        var a=$(this);//记录下(取到)这个a
        var src=img.attr("src");
        var src2 = src.slice(0, src.length - 5) + "1.png"//得到白色的src
        //先被为白色在走动画
        a.css({"color": "#60BEAE"});
        img.attr("src", src2);
        img.animate({"width": w * .33, "left": "0"}, 300, function () {
            $(this).css({width: ""});//清除内部样式，保证图片大小是外部定义的，保证自适应
        });
    });
}
/*************************************************************banner的轮播控制*/
var banner = (function () {
    var pictures = $("#picture>div");
    var pic = $("#picture");
    var top = $("#top");
    var onpicture_1 = $(".onpicture_1");
    var onpicture_2 = $(".onpicture_2");
    var onpicture_3 = $(".onpicture_3");
    var onpicture_4 = $(".onpicture_4");
    var back = $("#back");
    var ul_width = $(".nav_content ul");
    /******轮播图切换******/
    var y = 0;//y控制是哪张图片
    var picturechange = (function () {
        var timer;
        //要想动画依次执行只能用回调函数，无论是for循环还是依次绑定都不行（会一块执行）
        function ha() {
            var h = pic.height() * 8 / 100;//onpicture本来的距离上或下的距离
            var w = pic.width() * 4 / 100;//onpicture距离左右的距离
            var w2 = onpicture_1.width();//onpicture的长度，使它刚好隐藏
            //把目前的图片上的onpicture隐藏
            if (y == 1) {
                onpicture_2.animate({"bottom": h, right: -w2}, 200);
            } else if (y == 2) {
                onpicture_3.animate({"top": h, right: -w2}, 200);
            } else if (y == 3) {
                onpicture_4.animate({"top": h, left: -w2}, 200);
            } else if (y == 0) {
                onpicture_1.animate({"bottom": h, left: -w2}, 200);
            }

            //目前显示的图片hidden，下一个的visible
            $(pictures[y]).animate({"opacity": 0.8}, 600, function () {
                //一共四张图，最后一张在回到第一张
                if (y == 3) {
                    y = -1;
                }
                var next = $(pictures[y + 1])
                next.css("visibility", "visible");//先把下一次的visible防止切换空白
                $(this).css("visibility", "hidden");//目前的隐藏
                $(this).attr("class", "");//清空active
                next.attr("class", "active");//加一个active属性方便后面选取
                next.animate({"opacity": 1}, 100, function () {
                    y++;
                    //下一张图片上的onpicture显示
                    if (y == 1) {
                        onpicture_2.animate({"right": w, "bottom": h}, 400);
                    } else if (y == 2) {
                        onpicture_3.animate({"right": w, "top": h}, 400);
                    } else if (y == 3) {
                        onpicture_4.animate({"left": w, "top": h}, 400);
                    } else if (y == 0) {
                        onpicture_1.animate({"left": w, "bottom": h}, 400);
                    }
                })
            });
            //这里是必须写的因为执行到这里是上面的判断有可能还没执行到
            if (y == 3) {
                y = -1
            }
            //背景颜色距离左边的距离
            var width = (ul_width.width()) * (y + 1) / 4;
            back.animate({"left": width}, 800)
        }
        function start() {
            timer = setInterval(ha, 4000);
            //interval的间隔时间要大于上面走的时间才能控制住
        }
        function stop() {
            clearInterval(timer);
            timer=null;
        }
        return {
            t: start,
            p: stop
        }
    })();

    /*****鼠标移入轮播图和下面的li停止轮播*****/
    function tophover() {
        top.mouseenter(function () {
            picturechange.p();
        });
        top.mouseleave(function () {
            picturechange.t();
        })
    }

    /*****轮播图下面的li的点击事件，所有的东西都换*****/
    function liclick() {
        var nav_content = $(".nav_content");
        nav_content.delegate("li", "click", function () {
            var dataId = $(this).attr('data-id');
            var picture = $("#" + dataId);//取到点击的那个对应的图片
            //修改之前显示的div
            var before = picture.siblings(".active");
            var id = before.attr("id");
            var h = pic.height() * 8 / 100;//onpicture本来的距离上或下的距离
            var w = pic.width() * 4 / 100;//onpicture本来距离左右的距离
            var w2 = pic.width() * 32 / 100;//onpicture的宽度是它刚好隐藏掉
            var m;//定义m控制代表上一次显示的文字
            if (id) {
                m = id.slice(8);//给m取值
            }
            //让onpicture隐藏
            if (m == 2) {
                onpicture_2.stop(true, true);
                onpicture_2.animate({"bottom": h, right: -w2}, 1);//1ms消除切换时的more bug
            } else if (m == 3) {
                onpicture_3.stop(true, true);
                onpicture_3.animate({"top": h, right: -w2}, 1);
            } else if (m == 4) {
                onpicture_4.stop(true, true);
                onpicture_4.animate({"top": h, left: -w2}, 1);
            } else if (m == 1) {
                onpicture_1.stop(true, true);
                onpicture_1.animate({"bottom": h, left: -w2}, 1);
            } else {
            }
            //之前的图片隐藏
            before.css({"visibility": "hidden", "opacity": .8});
            before.attr("class", "");
            //点击的图片显示
            picture.css({"visibility": "visible", opacity: 1});
            picture.attr("class", "active");
            y = (dataId.slice(8) - 1);//把点击的值付给y
            //把点击对应的onpicture显示出来
            if (y == 1) {
                onpicture_2.stop(true, true);
                onpicture_2.animate({"right": w, "bottom": h}, 300);//全部数据调成百分比除了外框
            } else if (y == 2) {
                onpicture_3.stop(true, true);
                onpicture_3.animate({"right": w, "top": h}, 300);
            } else if (y == 3) {
                onpicture_4.stop(true, true);
                onpicture_4.animate({"left": w, "top": h}, 300);
            } else if (y == 0) {
                onpicture_1.stop(true, true);
                onpicture_1.animate({"left": w, "bottom": h}, 300);
            }
            /****背景颜色的切换****/
            var width = (ul_width.width()) * (y) / 4;
            back.animate({"left": width}, 10)
        });
    }

    return {
        topHover: tophover,
        st: picturechange.t,
        sp: picturechange.p,
        liClick: liclick,
    }
})();

/*****内容图片hover变大******/
//原理就是span里面一张图片改变span的宽高图片就跟这边，但是span万变的div不变
function imghover() {
    var bottom = $("#bottom");
    bottom.delegate(".neirong>a div span", "mouseenter", function () {
        var div = $(this).parent();
        div.css("height", div.height());//给定一个高度不然div会根据里面的高度加而增加
        var w = div.width();//190
        var h = div.height();
        var l = (w * 1.1 - w) / 2;
        var t = (h * 1.1 - h) / 2;
        $(this).stop();
        //span缓缓变大
        $(this).animate({width: w * 1.1, left: -l, top: -t}, 400, 'linear');
    });
    bottom.delegate(".neirong>a div span", "mouseleave", function () {
        var div = $(this).parent();
        var w = div.width();//190
        $(this).stop();
        $(this).animate({width: w, left: 0, top: 0}, 200, function () {
            $(this).css({width: ""});//清除内部样式，保证图片大小是外部定义的，保证自适应
            div.css("height", "");//同上
        });
    })
}


/*********************************************手机端的js*/
/*******图片轮播切换和pc端的基本一样就是onpicture不变*****/
var pcBanner = (function () {
    var z = 0;//y控制是哪张图片
    var pictures = $("#picture>div");
    var back = $("#back");
    var ul_width = $(".nav_content ul");
    var nav_content = $(".nav_content");
    var pictureChangePhone = (function () {
        var timer;
        function ha() {
            //目前显示的图片hidden，这一次的visible
            $(pictures[z]).animate({"opacity": 0.8}, 600, function () {
                if (z == 3) {
                    z = -1;
                }
                var next = $(pictures[z + 1]);
                next.css("visibility", "visible");//先把下一次的visible防止切换空白
                $(this).css("visibility", "hidden");
                $(this).attr("class", "");
                next.attr("class", "active");//加一个active属性方便后面选取
                next.animate({"opacity": 1}, 100, function () {
                    z++;
                })
            });
            //定义m控制li背景的切换
            var m = z;
            if (m == 3) {
                m = -1
            }
            var width = (ul_width.width()) * (m + 1) / 4;
            back.animate({"left": width}, 800)
        }
        function start() {
            timer = setInterval(ha, 4000);
        }
        function stop() {
            clearInterval(timer);
            timer=null;
        }
        return {
            t: start,
            p: stop
        }
    })();
    /*******点击轮播图下的li切换图片*****/
    function phoneliclick() {
        nav_content.delegate("li", "click", function () {
            //找到li对应的图片
            var dataId = $(this).attr('data-id');
            var picture = $("#" + dataId);
            //修改之前显示的div
            var before = picture.parent().children(".active");
            before.css({"visibility": "hidden", "opacity": .8});
            before.attr("class", "");
            //显示点击的图片
            picture.css({"visibility": "visible", opacity: 1});
            picture.attr("class", "active");
            z = (dataId.slice(8) - 1);//这是个dom str方法
            /****背景颜色的切换****/
            var width = (ul_width.width()) * (z) / 4;
            back.animate({"left": width}, 10)
        })
    }

    return {
        st: pictureChangePhone.t,
        sp: pictureChangePhone.p,
        PhoneLiClick: phoneliclick,
    }
})();
/*********把汽车nav换成黑色的这个在ipad端才使用**********/
function phoneNavcar() {
    var imgs = $(".nav img");
    //遍历img改变它们的src
    imgs.each(function () {
        var src = $(this).attr("src");
        var src3 = src.slice(0, src.length - 5) + "3.png";
        $(this).attr("src", src3);
    });
}


/*******************************************************************video的js*/
var video = (function () {
    var media = $("#media").get(0);
    var tops = $("#tops");
    var cicle = $(".cicle");
    var volume_class = $(".volume");
    var voice_progress = $(".voice_progress");
    var fullscreen_span = $("#fullscreen span");
    var control = $("#control");
    var bar_parent_bar = $("#bar_parent .bar");
    var voice_voice_bar = $("#voice .voice_bar");
    var bar_parent = $("#bar_parent");
    var bar_parent_progress = $("#bar_parent .progress");
    var btn = $("#buttons .btn");
    var pause_on = $("#pause_on");
    var poster_on = $("#poster_on");
    var buffer = $("#bar_parent .buffer");
    var now = $("#time_now");

    /********************全屏箭头按钮控制video父元素全屏*******************/
    function fullscreen() {
        if (document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.oRequestFullscreen) {
                document.oCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            var element = $("#player").get(0);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.oRequestFullscreen) {
                element.oRequestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullScreen();
            }
        }
    };
    /**********监听全屏切换状态（主要是有原来的esc退出）提供相对应的css变化******/
    function screenchange() {
        //判断当前是否全屏
        if (document.FullScreen === true || document.webkitIsFullScreen === true || document.mozFullScreen) {
            //contorl是absolute不用担心reflow
            control.css({"height": "55px", "padding-top": "5px", "bottom": "25px"});
            bar_parent_bar.css({"height": "3px"});
            voice_voice_bar.css({height: "3px"});
            cicle.css({"top": "3px"});
            fullscreen_span.css({"backgroundPosition": "-191px 0"});
            bar_parent.animate({"width": "68%"}, 10, ziShiYong);
            //全屏fullscreen的hover事件
            fullscreen_span.unbind("mouseenter mouseleave");
            fullscreen_span.mouseenter(function () {
                $(this).css("backgroundPosition", "-211px 0");
            });
            fullscreen_span.mouseleave(function () {
                $(this).css("backgroundPosition", "-191px 0");
            });

        } else {
            control.css({height: "40px", "padding-top": "0", "bottom": "15px"});
            bar_parent_bar.css({"height": "2px"});
            voice_voice_bar.css({height: "2px"});
            cicle.css({"top": "3px"});
            //移除内联的width保证自适应
            bar_parent.removeAttr("style");
            //进度条voice的自适应
            ziShiYong();
            fullscreen_span.css({"backgroundPosition": "-151px 0"});
            //非全屏fullscreen的hover事件
            fullscreen_span.unbind("mouseenter mouseleave");
            fullscreen_span.mouseenter(function () {
                $(this).css("backgroundPosition", "-171px 0");
            });
            fullscreen_span.mouseleave(function () {
                $(this).css("backgroundPosition", "-151px 0");
            });

        }
    };
    /************voice拖拽******************/
    function tops_mousemove(e) {
        var distance = Math.abs(e.offsetX);
        var voi = media.volume;
        //函数节流的方式拖完整个条只要执行24次，而原本的mouseover则要100多次（正常情况下）
        if (distance / tops.width() - voi >= 0.03 || distance / tops.width() - voi <= -0.03) {
            var lef = (distance - 4) / tops.width() * 100 + "%";
            cicle.css("left", lef);
            var wid = distance / tops.width() * 100 + "%";
            voice_progress.css("width", wid);
            media.volume = (distance / tops.width()).toFixed(2);
        }

    }

    function tops_mousedown(e) {
        //判断鼠标左键
        if (e.button == 0) {
            var distance = Math.abs(e.offsetX);
            var lef = (distance - 4) / tops.width() * 100 + "%";
            cicle.css("left", lef);
            var wid = distance / tops.width() * 100 + "%";
            voice_progress.css("width", wid);
            media.volume = (distance / tops.width()).toFixed(2);
            tops.bind("mousemove", tops_mousemove);
        }
    }

    //用来监听在tops中up和在body中up
    function tops_mouseup() {
        tops.unbind("mousemove");
        //判断是否音量为0
        if (media.volume <= .05) {
            volume_class.css({"backgroundPosition": "-103px 0"});
        } else {
            volume_class.css({"backgroundPosition": "-59px 0"});
            volume_class.mouseenter(function () {
                $(this).css({"backgroundPosition": "-81px 0"});
            });
            volume_class.mouseleave(function () {
                $(this).css({"backgroundPosition": "-59px 0"});
            });
        }
    }

    /*****播放条，音量条，音量圆形按钮的自适应******/
    function ziShiYong() {
        var progress = $(".progress");
        //让现在的时间进度条也相对于现在的屏幕。
        var size = (media.currentTime / media.duration) * 100 + "%";
        progress.css("width", size);
        //音量随屏幕调整
        var width = tops.width() * media.volume;
        var w = width / tops.width() * 100 + "%";
        var wi = (w - 4) / tops.width() * 100 + "%";
        voice_progress.css("width", w);
        //圆形按钮
        cicle.css("left", wi);
    }

    /*********volume的hover click事件*********/
    function volume_click() {
        volume_class.mouseenter(function () {
            $(this).css({"backgroundPosition": "-81px 0"});
        });
        volume_class.mouseleave(function () {
            $(this).css({"backgroundPosition": "-59px 0"});
        });
        volume_class.click(function () {
            $(this).css({"backgroundPosition": "-103px 0"});
            voice_progress.css({"width": "0%"});
            cicle.css("left", "0%");
            $(this).unbind("mouseenter mouseleave");
            media.volume = 0;
        });
    }

    /***获取总时间***/
    function allTime() {
        var allTime = parseInt(media.duration);
        var shi = Math.floor(allTime / 60);
        var miao = allTime % 60;
        if (miao < 10) {
            miao = "0" + miao;
        }
        var all = $("#time_all").get(0);
        all.innerHTML = shi + ":" + miao;
    }

    /*****监听结束事件******/
    function mediaEnded() {
        stop();
        media.pause();
        media.currentTime = 0;
        poster_on.css("display", "block");
        pause_on.css("display", "block");
        bar_parent_progress.css("width", "0%");
    }

    /**********播放进度********/
    function barClick(e) {
        var distance = e.offsetX;
        var wid = distance / bar_parent.width() * 100 + "%";
        bar_parent_progress.css("width", wid);
        var currentTime = (distance / bar_parent_bar.width() * media.duration).toFixed(0);
        media.currentTime = currentTime;
        var shi = Math.floor(currentTime / 60);
        var miao = currentTime % 60;
        if (miao < 10) {
            miao = "0" + miao;
        }
        now.get(0).innerHTML = shi + ":" + miao;
    }

    /*****控制control几秒后隐藏****/
    var now_TIME = 0;

    function shijian() {
        if (now_TIME >= 6) {
            if (control.css("display") == "block") {//加个判断避免运行压力
                //4秒没动就会隐藏control
                control.animate({"opacity": 0}, 500, function () {
                    control.css({"display": "none"});
                });
            }
        }
        now_TIME++;
    }

    /**************播放按钮**************/
    var isPlay = true;

    function btnClick() {
        if (!media.ended && !media.paused) {
            media.pause();
            pause_on.css({"display": "block"});
            btn.css("backgroundPosition", "0 0");
            btn.unbind("mouseenter mouseleave");
            btn.mouseenter(function () {
                $(this).css("backgroundPosition", "-15px 0");
            });
            btn.mouseleave(function () {
                $(this).css("backgroundPosition", "0 0");
            });
            stop();
        } else {
            media.play();
            pause_on.css("display", "none");
            poster_on.css("display", "none");
            //一动control就回来
            //绑定一个计时器多次会加速，isPlay用来控制
            if (isPlay) {//只能进去一次
                $(media).bind("mousemove", function () {
                    now_TIME = 0;
                    if (control.css("display") == "none") {
                        control.css({"display": "block"});
                        control.stop(true);
                        control.animate({"opacity": 1}, 10);
                    }
                });
                control.bind("mousemove", function () {
                    now_TIME = 0;
                    if ($(this).css("display") == "none") {
                        $(this).css({"display": "block"});
                        $(this).stop(true);
                        $(this).animate({"opacity": 1}, 10);
                    }

                });
                //视频播放就开始计时
                setInterval(shijian, 1000);
                isPlay = false;
            }
            control.css({"display": "block"});
            control.animate({"opacity": 1}, 200);
            pause_on.css({"display": "none"});
            btn.css("backgroundPosition", "-29px 0");
            btn.unbind("mouseenter mouseleave");
            btn.mouseenter(function () {
                $(this).css("backgroundPosition", "-45px 0");
            });
            btn.mouseleave(function () {
                $(this).css("backgroundPosition", "-29px 0");
            });
            start();
        }
    }

    /******播放开始（计时器）****/
    var timer;//计时器控制
    function time() {
        var width_progress = media.currentTime / media.duration * 100 + "%";
        bar_parent_progress.css("width", width_progress);
        var width_buffer = media.buffered.end(0) / media.duration * 100 + "%";
        buffer.css("width", width_buffer);
        var currentTime = parseInt(media.currentTime);
        var shi = Math.floor(currentTime / 60);
        var miao = currentTime % 60;
        if (miao < 10) {
            miao = "0" + miao;
        }
        now.get(0).innerHTML = shi + ":" + miao;
    }

    function start() {
        timer = setInterval(time, 400);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    /*******video开始的绑定事件*******/
    function Initial() {
        //点击进度条
        bar_parent.bind("click", barClick);
        /*************播放事件**********************/
        //保证电脑端的自定义controls显示
        control.css("display", "block");
        poster_on.css("display", "block");
        pause_on.css("display", "block");
        $(media).removeAttr("controls");
        //播放按钮绑定暂停播放事件
        btn.bind("click", btnClick);
        //整个播放器绑定暂停播放事件
        $(media).bind("click", btnClick);
        //大暂停按钮绑定暂停播放事件
        pause_on.bind("click", btnClick);
        //播放完图片绑定播放事件
        poster_on.bind("click", btnClick);
        //播放器绑定结束事件
        $(media).bind("ended", mediaEnded);
        //声音条事件
        tops.bind("mousedown", tops_mousedown);
        $("body").bind("mouseup", tops_mouseup);
        //页面一加载时的fullcsreen的hover事件
        fullscreen_span.mouseenter(function () {
            $(this).css("backgroundPosition", "-171px 0");
        });
        fullscreen_span.mouseleave(function () {
            $(this).css("backgroundPosition", "-151px 0");
        });
        //绑定全屏事件
        $(document).bind('webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenChange fullscreenchange', screenchange);
        //页面加载时paly的hover事件
        btn.mouseenter(function () {
            $(this).css("backgroundPosition", "-15px 0");
        });
        btn.mouseleave(function () {
            $(this).css("backgroundPosition", "0 0");
        });
        //volume的hover click事件
        volume_click();
        //一开始音量
        media.volume = .5;
        //绑定全屏切换按钮click事件
        fullscreen_span.click(fullscreen);
    }

    return {
        all_time: allTime,
        initial: Initial
    }
})();
/*****************************************************************pc端图片展示*/
var show = (function () {
    var mask = $(".mask");
    var kuang = $(".kuang");
    var wrap_items = $(".wrap_item");
    var i_m = wrap_items.length;
    var m = 100 * i_m;//避免下面频繁赋值
    //向右转
    function right() {
        m++;
        //暂时把所有的item的class去除掉
        for (var i = 0; i < i_m; i++) {
            $(wrap_items[i]).removeClass();
        }
        //每一个都赋予新的class
        $(wrap_items[m % i_m]).attr("class", "wrap_item out");
        $(wrap_items[(m + 1) % i_m]).attr("class", "wrap_item middle_left");
        $(wrap_items[(m + 2) % i_m]).attr("class", "wrap_item show");
        $(wrap_items[(m + 3) % i_m]).attr("class", "wrap_item middle_right");
        for (var x = 4; x < i_m; x++) {
            $(wrap_items[(m + x) % i_m]).attr("class", "wrap_item out");
        }
    }
    //向左转同上
    function left() {
        m--;
        if (m == -1) {
            m = 100 * i_m;
        }
        for (var i = 0; i < i_m; i++) {
            $(wrap_items[i]).removeClass();
        }
        $(wrap_items[m % i_m]).attr("class", "wrap_item out");
        $(wrap_items[(m + 1) % i_m]).attr("class", "wrap_item middle_left");
        $(wrap_items[(m + 2) % i_m]).attr("class", "wrap_item show");
        $(wrap_items[(m + 3) % i_m]).attr("class", "wrap_item middle_right");
        for (var x = 4; x < i_m; x++) {
            $(wrap_items[(m + x) % i_m]).attr("class", "wrap_item out");
        }
    };
    /******退出展示****/
    function ex() {
        jinyong(false);
        //所有的东西都还原
        kuang.removeClass("blur");
        mask.css({"display": "none", "opacity": "0"});
        clearTimeout(kaishi);
        wrap_items.each(function (i) {
            if (i == 2) {
                $(this).attr("class", "wrap_item show")
            } else {
                $(this).attr("class", "wrap_item")
            }
        });
        //保证下一次打开还是这个顺序
        m = 100 * i_m;
    };
    //左右图片分开的动画（分配图片位置）
    function kaishi() {
        mask.animate({"opacity": 1}, 600, function () {
            wrap_items.each(function (i) {
                if (i == 1) {
                    $(this).addClass("middle_left");
                } else if (i == 2) {
                } else if (i == 3) {
                    $(this).addClass("middle_right");
                } else {
                    $(this).addClass("out");
                }
            });
        });
    }

    //展示图片
    function showPicture() {
        jinyong(true);//禁用滚轮
        var Src = mask.attr("data_class");//展示图片的路径
        wrap_items.each(function (i) {
            $(this).children("img").attr("src", Src + i + ".jpg");//给每个item src
            //绑定左右click事件
            $(this).click(function () {
                if ($(this).attr("class") == "wrap_item middle_right") {
                    right();
                } else if ($(this).attr("class") == "wrap_item middle_left") {
                    left();
                }
            });
        });
        //blur的同时加载图片
        kuang.addClass("blur");//css定义transition0.5s模糊时间
        mask.css("display", "block");
        //延迟800ms给图片加载时间
        setTimeout(kaishi, 800);
    }

    /**************滚轮禁用************/
    function wheel(e) {
        e.preventDefault();
    }
    function jinyong(e) {
        var isFF = /FireFox/i.test(navigator.userAgent);
        if (e) {
            if (!isFF) {
                window.onmousewheel = document.onmousewheel = function () {
                    return false;
                }
            } else {
                window.addEventListener("DOMMouseScroll", wheel, false);
            }
        } else if (!e) {
            if (!isFF) {
                window.onmousewheel = document.onmousewheel = function () {
                    return true;
                }
            } else {
                window.removeEventListener("DOMMouseScroll", wheel, false);
            }
        }
    }

    return {
        exit: ex,
        shows: showPicture,
    };
})();

$(function () {
    if (Agent === "pc1") {
        navcar();
        banner.st();
        banner.topHover();
        banner.liClick();
        imghover();
    } else if (Agent === "pid1") {
        pcBanner.st();
        phoneNavcar();
        pcBanner.PhoneLiClick()
    } else if (Agent === "pc2") {
        navcar();
        //绑定开始事件
        var sp = $(".center span");
        sp.get(0).onclick = show.shows;
        //绑定退出事件
        var quit = $(".quit");
        quit.get(0).onclick = show.exit;
        //视频初始化
        video.initial();
        //获取总时长
        $("video").get(0).addEventListener("canplaythrough", video.all_time, false);
    } else {
    }
});


