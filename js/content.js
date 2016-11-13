function NavcarHover() {
    var imgs=$(".header .nav li img");
    imgs.each(function(){
        $(this).mouseenter(function () {
            var src=$(this).attr("src");
            var src3=src.slice(0,src.length-5)+"3.png";
            $(this).attr("src",src3);
        });
        $(this).mouseleave(function () {
            var src=$(this).attr("src");
            var src1=src.slice(0,src.length-5)+"1.png";
            $(this).attr("src",src1);
        });
    });
    var as=$(".header .nav li a");
    as.each(function () {
        $(this).mouseenter(function () {
            var src=$(this).siblings("img").attr("src");
            var src3=src.slice(0,src.length-5)+"3.png";
            $(this).siblings("img").attr("src",src3);
        });
        $(this).mouseleave(function () {
            var src=$(this).siblings("img").attr("src");
            var src1=src.slice(0,src.length-5)+"1.png";
            $(this).siblings("img").attr("src",src1);
        });
    });
}
