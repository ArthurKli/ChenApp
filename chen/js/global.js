$.mobile.transitionFallbacks.slide = "none";
$.mobile.buttonMarkup.hoverDelay = "false";
var serverURL = 'http://x.huango.cn:8080/ChenApp/';
var session=window.sessionStorage;
var fileSystem;

// var serverURL = 'http://123.169.142.183:8080/wglWeb';
function goTo(page) {
	showLoading();
//	$.mobile.changePage(page, {
//		transition : "slide"
//	});
    location.href=page;
}
function goBack() {
	$.mobile.back();
}

function showLoading() {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg("a", "加载中...");
}

function hideLoading() {
	$.mobile.hidePageLoadingMsg();
}

function showAlert(text) {
	$.mobile.loadingMessageTextVisible = true;
	$.mobile.showPageLoadingMsg("a", text, true);
}
function myAlert(text) {
	showAlert(text);
	setTimeout(hideLoading, 2000);
}

function errpic(thepic) {
	thepic.src = "../img/no_pic.png"
}

function getUrlParam(string) {
	var obj = new Array();
	if (string.indexOf("?") != -1) {
		var string = string.substr(string.indexOf("?") + 1);
		var strs = string.split("&");
		for ( var i = 0; i < strs.length; i++) {
			var tempArr = strs[i].split("=");
			obj[i] = tempArr[1];
		}
	}
	return obj;
}

// =========================PhoneGap==================================

// 等待加载PhoneGap
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap加载完毕
function onDeviceReady() {
	// 按钮事件
	document.addEventListener("backbutton", eventBackButton, false); // 返回键
	//document.addEventListener("menubutton", eventMenuButton, false); // 菜单键
	//document.addEventListener("searchbutton", eventSearchButton, false); // 搜索键

    // 文件系统
//    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, onFSError);

}
function onFSSuccess(fs) {
    fileSystem = fs;

//    alert("file system:"+fileSystem.name +
//        ".root entry name is "+fileSystem.root.name);
//    doDirectoryListing();
}
//generic error handler
function onFSError(e) {
//    alert(e.toString());
    console.log(e.toString());
}

// 返回键
function eventBackButton() {
	 if($.mobile.activePage.is('#indexPage')){
           if($("#black_overlay_init_go").css("display")!='none'){
               $("#black_overlay_init_go").slideUp("slow");
               $("#myhead").slideUp("slow");
               $("#black_overlay_init").hide();
               $("#index_black_jia").hide();
               session.setItem("initOver",true);
               changeSizeBig(60);
               horseNews();
           }else{
               myAlert('再点击一次退出!');
               document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
               document.addEventListener("backbutton", exitApp, false);//绑定退出事件
               // 3秒后重新注册
               var intervalID = window.setInterval(function() {
                   window.clearInterval(intervalID);
                   document.removeEventListener("backbutton", exitApp, false); // 注销返回键
                   document.addEventListener("backbutton", eventBackButton, false); // 返回键
               }, 3000);
           }

     }
     else {
//         navigator.app.backHistory();
         goBack();
     }
	 	
}

function exitApp(){
	navigator.app.exitApp();
}

// 菜单键
function eventMenuButton() {
	myAlert('点击了 菜单 按钮!');
	goTo('menu.html');
}
// 搜索键
function eventSearchButton() {
	myAlert('点击了 搜索按钮!');
}
