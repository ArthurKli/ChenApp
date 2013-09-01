var storage = window.localStorage;
var session=window.sessionStorage;
var baseMedia;  //定义一个全局的音频对象
var baseAudio="/android_asset/www/audio/";
//var baseAudio="http://x.huango.cn:8080/ChenApp/audio/";

var index =100;
var inich;
var myScroll;
function loaded() {
    if(myScroll!=null){
        myScroll.destroy();
    }
    myScroll = null;
    myScroll = new iScroll('wrapper', {
        click:true,
        keyBindings:false
//                snap: 'li',
//                momentum: false,
//                hScrollbar: false,
//                vScrollbar: false
    });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', loaded , false);




//        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
//        /* * * * * * * *
//         *
//         * Use this for high compatibility (iDevice + Android)
//         *
//         */
//        document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); },

$(function(){
//$('div:jqmData(role="page")').live('pagebeforeshow',function(){
    $.mobile.ajaxEnabled=false;



    var inilen= $(".full").css("width").indexOf("px");
    inich=  $(".full").css("width").substring(0,inilen);

    var tourLine=session.getItem("tourLine");
    var initOver=session.getItem("initOver") ;
    if(tourLine!=null||tourLine!=undefined){
        changeLine(tourLine);
    }
    if(initOver!=null||initOver!=undefined){
        $("#black_overlay_init_go").hide();
        $("#myhead").hide();
        $("#black_overlay_init").hide();

        showHasVisit();
        horseNews();
    }


    $("body").dblclick(function(){
        changeSizeBig(20);
    });

    $("#fullImg").click(function(){
        $("#show_music_player_index").slideUp();
        $("#white_content").slideUp("slow");
        //隐藏坐标
        $(".subTipsList").hide();
    });

    $("#menu").click(function(){

        var h=$(document).height();
        var w=$(document).width();

//                $("#fade").css("width",h+500);
//                $("#fade").css("height",w);
//                document.getElementById('white_content').style.display='block';
//                document.getElementById('black_overlay').style.display='block';

        $("#white_content").slideToggle();
        $(".subTipsList").hide();

        /*屏蔽首页显示展品功能*/
//        $("#index_display_bar").slideUp();
//        $(".index_display").slideUp();


        $(".menu_image").toggle();
        setTimeout(function(){$(".menu_image").toggle();},500);
    });


    $("#music").click(function(){
//                var src=storage.getItem("mp3");
//                var soundObj = new Media(src,onSuccess,onError);
//                if(soundObj!=null && soundObj!='undefined')
//                 soundObj.play();
        $("#show_music_player_index").slideDown();
    });
    $("#photo").click(function(){
        $("#show_music_player_index").slideDown();
//        if(baseMedia==null || baseMedia=='undefined'){
             $("#show_music_player_click_index").trigger("click");
//         }

//        $("#show_music_body2_index").show();
//        $("#show_music_body1_index").hide();

        $(".photo_image").toggle();
        setTimeout(function(){$(".photo_image").toggle();},500);
    });
    $("#show_music_player_click_index").click(function(){
        if($("#show_music_body2_index").css("display")=="none"){
            $("#show_music_body2_index").show();
            $("#show_music_body1_index").hide();
            if(baseMedia==null){
                var src ="/android_asset/www/audio/jianjie.mp3";
                baseMedia = new Media(src,onSuccess,onError);
            }
            if(baseMedia!=null && baseMedia!='undefined')
                baseMedia.play();

        } else{
            $("#show_music_body2_index").hide();
            $("#show_music_body1_index").show();
            baseMedia.pause(); //暂停
        }
    });


    //点击播放音频
    $(".playMedia").click(function(){
//                var obj =document.getElementById("taihe");
        var ids=this.id;
        var info_id="#tips_info_"+ids.substr(10);
        var src =baseAudio+$(info_id).val()+".mp3";

        if(baseMedia!=null && baseMedia!='undefined')
            baseMedia.stop();

        baseMedia = new Media(src,onSuccess,onError);
        storage.setItem("mp3",src);
        baseMedia.play();
//                obj.play();
    });
    $("#bigger").click(function(){
        changeSizeBig(20);
        $(".big_image").toggle();
        setTimeout(function(){$(".big_image").toggle();},500);

    });
    $("#smaller").click(function(){
        changeSizeSmall(20);
        $(".smaller_image").toggle();
        setTimeout(function(){$(".smaller_image").toggle();},500);

    });
    $("#viewList").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
//                location.href="list.html";
//        $.mobile.ajaxEnabled = false;
//                $.mobile.changePage( "list.html", {
//                    transition: "pop",
//                    reloadPage:true
//                });
        goTo("list.html") ;

    });
    $("#gaik").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
//                location.href="htm/info.html";
        $.mobile.ajaxEnabled = false;
//                $.mobile.changePage( "htm/info.html", {
//                    transition: "pop",
//                    reloadPage:true
//                });
        goTo('info.html');

    });
    $("#traffic").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
//        location.href="htm/traffic.html";
        goTo('traffic.html');

    });
    $("#master").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
        goTo('org.html');
//        goTo('master.html');
    });
    $("#popular").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
        goTo('popular.html');
    });

//    $("#wechat").click(function(){
//        $(".white_content").hide();
//        $(".black_overlay").hide();
////        goTo('popular.html');
//        window.plugins.weixin.openWeixin(wechat_ok, wechat_fail);
//
//    });


    $("#sina").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
        location.href="javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=1174559040',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','我现在在使用陈家祠安卓应用，一起来玩吧。','','gb2312'));";
//        goTo("javascript:void((function(s,d,e,r,l,p,t,z,c){var%20f='http://v.t.sina.com.cn/share/share.php?appkey=1174559040',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'gb2312','&pic=',e(p||'')].join('');function%20a(){if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=430,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else%20a();})(screen,document,encodeURIComponent,'','','','我现在在使用陈家祠安卓应用，一起来玩吧。','','gb2312'));");
    });
    //参观须知
    $("#help").click(function(){
        $(".white_content").hide();
        $(".black_overlay").hide();
        goTo('help.html');
    });

    //重选路线
    $("#reset").click(function(){
        session.removeItem("initOver");
        session.removeItem("tourLine");
        window.location.reload();
    });

    //点击显示或隐藏提示信息
    $(".tipsList").click(function(){
        var sub=this.id+"_sub";
        var info_id="#tips_info_"+this.id.substr(3);
        $("#white_content").slideUp("slow");
        if($("#"+sub).css("display")=="block"){
            $(".subTipsList").hide();
            $("#"+sub).hide();
            $(".index_display").hide();

            displayFourIcon(this.id,'show');

            /*音频设置*/
            var src =baseAudio+$(info_id).val()+".mp3";
            storage.setItem("mp3",src);
        }else{
            $(".subTipsList").hide();
            $(".subTipsList").css("z-index","10");
            $("#"+sub).css("z-index","100");
            $("#"+sub).show();
            $(".index_display").hide();
            var name=$(info_id).val();
            if(name!='zhongting'&&name!='hxz'&&name!='hdz'&&name!='hdx'&&name!='qxz'&&name!='zxx'&&name!='hxx'&&name!='zdx'&&name!='qdz'&&name!='hxz'){
                displayFourIcon(this.id,'hide');
            }



            /*音频设置*/
            var src =baseAudio+"jianjie.mp3";
            storage.setItem("mp3",src);
        }
//        $(".tipsList").show();
//        if($("#"+sub).css("display")=="block"){
//
//        }else{
//            var src =baseAudio+"jianjie.mp3";
//            storage.setItem("mp3",src);
//        }

    });
    //点击显示景点介绍
    $(".tips_sub_txt").click(function(){
        var ids=this.id;
        var info_id="#tips_info_"+ids.substr(13);
//        location.href="htm/"+$(info_id).val()+".html";
        goTo($(info_id).val()+".html");
    });
    //点击显示展览品
    $("#gps").click(function(){
        $("#index_display_bar").slideToggle("slow");
        $(".index_display").slideToggle("slow");
//        $("#black_overlay").toggle();
//        var info_id="#tips_info_"+ids.substr(13);
//        goTo($(info_id).val()+".html");
    });
    $(".index_display").click(function(){
          var ids=this.id.substr(17);
          var info_id="#tips_info_"+ids;
          var name=$(info_id).val();
        if(name=='zhongting'||name=='hdz'||name=='hdx'||name=='qdz'||name=='zxx'||name=='hxx'||name=='zdx'||name=='qdz'||name=='hxz'){
            goTo('displayView.html');
        }else{
            goTo("disView_"+name+".html");
        }





//        location.href="javascript:goTo('displayView.html')";
    });
    $("#index_display_bar").click(function(){
        $("#index_display_bar").hide();
        $(".index_display").hide();
//        $("#black_overlay").hide();
        goTo("disList.html");
    });

    $("#black_overlay_init_go_img").click(function(){
        $("#black_overlay_init_go").slideUp("slow");
        $("#myhead").slideUp("slow");
        $("#black_overlay_init").hide();
        $("#index_black_jia").hide();
        session.setItem("initOver",true);
        changeSizeBig(60);
                 //第一次进入手机，放大的时候，以坐标1为中心点。
        $(".full").css("transform","translate(0px, -206px)");
        $(".full").css("-webkit-transform","translate(0px, -206px)");


        horseNews();
    });

    $(".half_hour").click(function(){
        changeLine(1);
        $(".change_line_img").hide();
        $("#change_line_img_1").show();
    });
    $(".one_hour").click(function(){
        changeLine(2);
        $(".change_line_img").hide();
        $("#change_line_img_2").show();
    });
    $(".one_hour_plus").click(function(){
        changeLine(3);
        $(".change_line_img").hide();
        $("#change_line_img_3").show();
    });





});      //end of ready
function changeSizeBig(size){
    var obj=$(".full");
    var len= obj.css("width").indexOf("px");
    var ch=  obj.css("width").substring(0,len);
    if(ch>=889){
        return;
    }
    index=index+size;
    var wh=index+"%";
    $(".full").css("width",wh);
    $(".full").css("height",wh);
    loaded();
    translateImage(index);
}
function changeSizeSmall(size){
    var obj=$(".full");
    var len= obj.css("width").indexOf("px");
    var ch=  obj.css("width").substring(0,len);

    if(ch<=inich){
        return;
    }
    index=index-size;
    var wh=index+"%";
//                     if($("#full").css("width")<=)
    $(".full").css("width",wh);
    $(".full").css("height",wh);
    loaded();
    translateImage(index);

}



function changeLine(num){
    if(num==1){
        removejscssfile("css/position2.css","css");
        removejscssfile("css/position3.css","css");
        loadjscssfile("css/position1.css", "css");
//        $("#black_overlay_init_go_text").html("半小时路线：首进正厅→月台");
        session.setItem("tourLine",1);
    }else if(num==2){
        removejscssfile("css/position3.css","css");
        removejscssfile("css/position1.css","css");
        loadjscssfile("css/position2.css", "css");
//        $("#black_overlay_init_go_text").html("一小时路线：首进正厅→月台");
        session.setItem("tourLine",2);
    }else{
        removejscssfile("css/position2.css","css");
        removejscssfile("css/position1.css","css");
        loadjscssfile("css/position3.css", "css");
//        $("#black_overlay_init_go_text").html("一小时以上路线：首进正厅→首进西厅");
        session.setItem("tourLine",3);
    }
}

function translateImage(index){
    if(index==100){
        $(".full").css("transform","translate(0px, 0px)");
    }else if(index==120){
//                    $(".full").css("translateX","-45px");
//                    $(".full").css("translateY","-25px");

        $(".full").css("transform","translate(-45px, -25px)");
        $(".full").css("-webkit-transform","translate(-45px, -25px)");
    }else if(index==140){
        $(".full").css("transform","translate(-65px, -45px)");
        $(".full").css("-webkit-transform","translate(-65px, -45px)");
    }else if(index==160){
        $(".full").css("transform","translate(-100px, -53px)");
        $(".full").css("-webkit-transform","translate(-100px, -53px)");
    }else if(index==180){
        $(".full").css("transform","translate(-120px, -64px)");
        $(".full").css("-webkit-transform","translate(-120px, -64px)");
    }else if(index==200){
        $(".full").css("transform","translate(-152px, -103px)");
        $(".full").css("-webkit-transform","translate(-152px, -103px)");
    }else if(index==220){
        $(".full").css("transform","translate(-184px, -142px)");
        $(".full").css("-webkit-transform","translate(-184px, -142px)");
    }else if(index==240){
        $(".full").css("transform","translate(-212px, -199px)");
        $(".full").css("-webkit-transform","translate(-212px, -199px)");
    }else if(index==260){
        $(".full").css("transform","translate(-244px, -237px)");
        $(".full").css("-webkit-transform","translate(-244px, -237px)");
    }else if(index==280){
        $(".full").css("transform","translate(-274px, -280px)");
        $(".full").css("-webkit-transform","translate(-274px, -280px)");
    }else if(index==300){
        $(".full").css("transform","translate(-304px, -313px)");
        $(".full").css("-webkit-transform","translate(-304px, -313px)");
    }
}

function hideFull() {
    document.getElementById("map").style.display = "";
    document.getElementById("full").style.display = "none";
}
//图标灰处理
function showHasVisit(){
    var ls=session.length;
    var tourline=storage.getItem("tourLine");
    if(tourline==3){
        for(var i=0; i < ls;i++){
            var key=session.key(i);
            if(key.indexOf("has_")==-1){
                continue;
            }
            if(session.getItem(key)=='off'){
                continue;
            }
            if(key=="has_dongting"){
                $("#tip9").css("background-image","url(css/images/icon/gary/9.png)");
            }else if(key=="has_zhengting"){
                $("#tip1").css("background-image","url(css/images/icon/gary/start.png)");
            }else if(key=="has_xiting"){
                $("#tip2").css("background-image","url(css/images/icon/gary/1.png)");
                $("#tip3").css("background-image","url(css/images/icon/gary/2.png)");
                $("#tip5").css("background-image","url(css/images/icon/gary/4.png)");
            }else if(key=="has_zhongting"){
                $("#tip6").css("background-image","url(css/images/icon/gary/5.png)");
            }else if(key=="has_jxt"){
                $("#tip4").css("background-image","url(css/images/icon/gary/3.png)");
            }else if(key=="has_qdx"){
                $("#tip10").css("background-image","url(css/images/icon/gary/end.png)");
            }else if(key=="has_hdx"){
                $("#tip8").css("background-image","url(css/images/icon/gary/7.png)");
            }else if(key=="has_hdz"){
                $("#tip7").css("background-image","url(css/images/icon/gary/6.png)");
            }
        }
    }else if(tourline==1){
        for(var i=0; i < ls;i++){
            var key=session.key(i);
            if(key.indexOf("has_")==-1){
                continue;
            }
            if(session.getItem(key)=='off'){
                continue;
            }
//                    if(key=="has_dongting"){
//                        $("#tip9").css("background-image","url(css/images/icon/gary/9.png)");
//                    }else
            if(key=="has_zhengting"){
                $("#tip1").css("background-image","url(css/images/icon/gary/start.png)");
            }
//                    else if(key=="has_xiting"){
//                        $("#tip2").css("background-image","url(css/images/icon/gary/1.png)");
//                        $("#tip3").css("background-image","url(css/images/icon/gary/2.png)");
//                        $("#tip5").css("background-image","url(css/images/icon/gary/4.png)");
//                    }
            else if(key=="has_hdz"){
                $("#tip7").css("background-image","url(css/images/icon/gary/6.png)");
            }
            else if(key=="has_zhongting"){
                $("#tip6").css("background-image","url(css/images/icon/gary/3.png)");
            }else if(key=="has_jxt"){
                $("#tip4").css("background-image","url(css/images/icon/gary/2.png)");
            }else if(key=="has_qdx"){
                $("#tip10").css("background-image","url(css/images/icon/gary/end.png)");
            }
//                    else if(key=="has_hdx"){
//                        $("#tip8").css("background-image","url(css/images/icon/gary/7.png)");
//                    }
            else if(key=="has_hdz"){
                $("#tip7").css("background-image","url(css/images/icon/gary/4.png)");
            }else if(key=="has_yuetai"){
                $("#tip11").css("background-image","url(css/images/icon/gary/1.png)");
            }
        }
    }else {
        for(var i=0; i < ls;i++){
            var key=session.key(i);
            if(key.indexOf("has_")==-1){
                continue;
            }
            if(session.getItem(key)=='off'){
                continue;
            }
            if(key=="has_dongting"){
                $("#tip9").css("background-image","url(css/images/icon/gary/6.png)");
            }else if(key=="has_zhengting"){
                $("#tip1").css("background-image","url(css/images/icon/gary/start.png)");
            }else if(key=="has_xiting"){
//                        $("#tip2").css("background-image","url(css/images/icon/gary/1.png)");
//                        $("#tip3").css("background-image","url(css/images/icon/gary/2.png)");
                $("#tip5").css("background-image","url(css/images/icon/gary/3.png)");
            }else if(key=="has_zhongting"){
                $("#tip6").css("background-image","url(css/images/icon/gary/4.png)");
            }else if(key=="has_jxt"){
                $("#tip4").css("background-image","url(css/images/icon/gary/2.png)");
            }else if(key=="has_qdx"){
                $("#tip10").css("background-image","url(css/images/icon/gary/end.png)");
            }
//                    else if(key=="has_hdx"){
//                        $("#tip8").css("background-image","url(css/images/icon/gary/7.png)");
//                    }
            else if(key=="has_hdz"){
                $("#tip7").css("background-image","url(css/images/icon/gary/5.png)");
            }else if(key=="has_yuetai"){
                $("#tip11").css("background-image","url(css/images/icon/gary/1.png)");
            }
        }
    }


}








function onSuccess(){
    if(baseMedia!=null && baseMedia!='undefined'){
        baseMedia.stop();
        baseMedia=null;
    }

    $("#show_music_body2").hide();
    $("#show_music_body1").show();

}
function onError(){
    if(baseMedia!=null && baseMedia!='undefined'){
        baseMedia.stop();
        baseMedia=null;
    }
//    alert("音频未加载");
}
function wechat_ok(){

}
function wechat_fail(){
     alert("打开失败");
}
function displayFourIcon(id,dis){
    /*屏蔽首页显示展品功能*/
    return;
    if(dis=='show'){
        $("#index_display_bar").slideUp("slow");
        $("#index_display_img"+id.substr(3)).slideUp("slow");
    }else if(dis=='hide'){
        $("#index_display_bar").slideDown("slow");
        $("#index_display_img"+id.substr(3)).slideDown("slow");
    } else{
        alert('参数错误');
    }


}

function horseNews(){
//    $.post("http://localhost:8080/ChenServ/News", function(data){
//        alert("Data Loaded: " + data);
//    });
    $.support.cors = true;
    $.mobile.allowCrossDomainPages=true;
    $.ajax({
        type : "GET",
        url : "http://www.gzchenjiaci.com/museum/szhd_apk.aspx?MenuID=02010406",
        dataType : "text",
        jsonp: 'jsoncallback',
        success : function(data)
        {
//            var data="<a href='#'>请教高手帮我看下这段代码</a><a href='#'>asdddddddddddd</a><a href='#'>lfk了付款了凡客</a>" ;
            $("#index_shell_div").append(data);
            return true;
        }
    });


    var box=document.getElementById("index_shell_div"),can=true;
    box.innerHTML+=box.innerHTML;
    box.onmouseover=function(){can=false};
    box.onmouseout=function(){can=true};
    new function (){
        var stop=box.scrollTop%18==0&&!can;
        if(!stop)box.scrollTop==parseInt(box.scrollHeight/2)?box.scrollTop=0:box.scrollTop++;
        setTimeout(arguments.callee,box.scrollTop%18?10:2000);
    };
}

