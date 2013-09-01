
var img=document.getElementById("display_load_image_in");
var imgdiv=document.getElementById("display_load_image");
imgdiv.style.top = "127px";
imgdiv.style.left = (document.documentElement.clientWidth - img.width) / 2+ "px";
(function(window, Util, PhotoSwipe){

    Util.Events.domReady(function(e){
        var locurl = window.location.href; //获得页面的URL
        var startplace = locurl.indexOf("?"); //得到网址与参数分隔符的位置，一般都用“？”分隔
        if (startplace != -1) { //判断网址中有没有参数
            var params = locurl.substr(startplace + 1); //获得参数字符串，从分隔符位置+1处开始获取
            var id = params.substr(3);
            var newObj=[];

            if(id!=1){
                var a=$("#display_view_ins_1").html();
                var b=$("#display_view_ins_"+id).html();
                $("#display_view_ins_1").empty();
                $("#display_view_ins_"+id).empty();
                $("#display_view_ins_1").append(b);
                $("#display_view_ins_"+id).append(a);
            }


            newObj.push(photoObj[id-1]);
            for(var i=1;i<photoObj.length;i++){
                if((id-1)==i){
                    newObj.push(photoObj[0]);
                    continue;
                }
                newObj.push(photoObj[i]);
            }
        }
        var instance, indicators;

        instance = PhotoSwipe.attach(
            newObj,
            {
                target: window.document.querySelectorAll('#PhotoSwipeTarget')[0],
                preventHide: true,
                getImageSource: function(obj){
                    return obj.url;
                },
                getImageCaption: function(obj){
                    return obj.caption;
                }
            }
        );


        indicators = window.document.querySelectorAll('#Indicators span');

        // onDisplayImage - set the current indicator
        instance.addEventHandler(PhotoSwipe.EventTypes.onDisplayImage, function(e){
            var i, len;
            for (i=0, len=indicators.length; i<len; i++){
                indicators[i].setAttribute('class', '');
            }
            indicators[e.index].setAttribute('class', 'current');
            var ind=e.index+1;
            var ids="#display_view_ins_"+ind;
            $(".display_view_ins").hide();
            $(ids).show();
        });

        instance.show(0);

    });


}(window, window.Code.Util, window.Code.PhotoSwipe));

window.onload=function(){
    setTimeout(hideLoad,500);
}
function hideLoad(){
    $("#display_load_image").hide();
}

$(document).bind("mobileinit", function()
{

//    img.style.top = (document.documentElement.scrollTop + (document.documentElement.clientHeight - img.offsetHeight) / 2) + "px";
//    img.style.left = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - img.offsetWidth) / 2) + "px";
    if (navigator.userAgent.indexOf("Android") != -1)
    {
        $.mobile.defaultPageTransition = 'none';
        $.mobile.defaultDialogTransition = 'none';
    }
});

