var storage = window.localStorage;
var session=window.sessionStorage;
var base="/android_asset/www/audio/";
//var base="http://x.huango.cn:8080/ChenApp/audio/";
var baseMedia;  //定义一个全局的音频对象
//$(document).ready(function(){
$('div:jqmData(role="page")').live('pageshow',function(){
    var key="has_"+$("#tips_info").val();
    var dd= session.getItem(key);
    if(dd!=null){
        if(dd=='on'){
            $('option:last').attr("selected",true);
            $("#slider").slider("refresh");
        }
    }
    //默认不播放
    if(baseMedia!=null){
        baseMedia.stop();
        baseMedia=null;
    }

    /*if(baseMedia==null){
        var src='';
        var info=$("#tips_info").val();
        if(info=='undefined'){
            src=storage.getItem("mp3");
        }else{
            src=base+$("#tips_info").val()+".mp3";
        }
        try{
            baseMedia = new Media(src,onSuccess,onError);
        }catch(e){

        }
    }
    if(baseMedia!=null && baseMedia!='undefined')
        baseMedia.play();*/


    function hideThePlayer(){
        setTimeout(function(){
            $("#show_music_handle").show();
        },300);
//        $("#dis_overlay").hide();
        $("#show_music_player").slideUp();
    }

    $("#playMusic").click(function(){

        $("#show_music_player").slideToggle();
        doPlayMusic();

    });


    $("#show_music_player_click").click(function(){
        doPlayMusic();
    });

    $("#hide_music_player").click(function(){
        hideThePlayer();
    });


    $("#show_music_handle").click(function(){
//        $("#dis_overlay").show();
        $("#show_music_handle").hide();
        $("#show_music_player").slideDown();


    });




    $("#slider").change(function(){
        var door=$("#slider").val();
        session.setItem(key,door);
    });

    $("#submit_buttom").click(function(){
        search_list();
    });



});
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

function doPlayMusic(){
    if($("#show_music_body2").css("display")=="none"){
        $("#show_music_body2").show();
        $("#show_music_body1").hide();
        if(baseMedia==null){
            var src=base+$("#tips_info").val()+".mp3";
            baseMedia = new Media(src,onSuccess,onError);
        }
        if(baseMedia!=null && baseMedia!='undefined')
            baseMedia.play();

    } else{
        $("#show_music_body2").hide();
        $("#show_music_body1").show();


//        //隐藏
//        setTimeout(function(){
//            $("#show_music_handle").show();
//        },300);
//        $("#dis_overlay").hide();
//        $("#show_music_player").slideUp();

        baseMedia.pause(); //暂停
    }
}

function search_list(){
//    alert($("#keyword").val());
    var inp= $("#keyword").val();
    var search_list="";
    myJson = {zhengting:"正厅", zhongting:"中厅",dongting:"东厅",
               xiting:"西厅", jxt:"聚贤堂",hdz:"后东斋",
               hdx:"后东厢", qdx:"前东厢",yuetai:"月台",
               qxz:"前西斋", qxx:"前西厢",
               hxx:"后西厢",qdz:"前东斋",
               hxz:"后西斋"
              };

    for(var p in myJson){//遍历json对象的每个key/value对,p为key
//        alert(p + " " + myJson[p]);
        if( myJson[p].indexOf(inp)!=-1)
        search_list+="<li><a href=\"javascript:goTo('"+p+".html')\" data-back=\"flase\" rel=\"external\" >"+myJson[p]+"</a></li>";
    }
    if(search_list.length>0) {
        $("#search_view_list").empty();
        $("#search_view_list").append(search_list);
    }else{
        myAlert('搜索结果为空');
    }
    $('ul').listview('refresh');



    return false;
}
function search_view(){
//    alert($("#keyword").val());
    var inp= $("#keyword").val();
    var search_list="";
    myJson = {
        zhengting:['龙戏珠','榴开百子','四季平安','凤凰牡丹'],
        dongting:['羲之题扇','太白醉酒','千里送京娘','戏赌华山一局棋'],
        xiting: ['李元霸伏龙驹'],
        yuetai:['双福捧寿','月台石雕装饰','月台望柱头石雕'],
        jxt:['卸甲封王','花开富贵','麒麟送子','福寿双全'],
        qdx:['滕王阁序'],
        hdx:["新会葵艺展"],
        hdz:["馆藏潮绣精品展"],
        qxx:["夜宴桃李园"]
    };
    for(var p in myJson){//遍历json对象的每个key/value对,p为key
//        alert(p + " " + myJson[p]);
        var list=eval(myJson[p]);
//        alert(list);

        for(var i=0;i<list.length;i++){
            if(list[i].indexOf(inp)!=-1){
                search_list+="<li><a href=\"javascript:goTo('disView_"+p+".html')\" data-back=\"flase\" rel=\"external\" >" +
                    "<img  src='image/disList/zhengting_00"+(i+1)+".png' /><h3>"+list[i]+"</h3>" +
                    "</a></li>";
            }
        }
//        if( myJson[p].indexOf(inp)!=-1)
//            search_list+="<li><a href=\"javascript:goTo('"+p+".html')\" data-back=\"flase\" rel=\"external\" >"+myJson[p]+"</a></li>";
    }
    if(search_list.length>0) {
        $("#default_view_list").hide();
        $("#search_view_ul").empty();
        $("#search_view_ul").append(search_list);
        $("#search_view_list").show();

    }else{
        myAlert('搜索结果为空');
    }
    $('ul').listview('refresh');
    return false;
}

function viewList(){
    $("#view_mid_div_more a").css("background-color","#3030ff");
    setTimeout(function(){
        $("#view_mid_div_more a").css("background-color","#000000");
    },500);
    goTo('popular.html');
}