'use strict';

(function(){

  //获取当前脚本文件路径
  var js = document.scripts;
  var jspath = js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1);

  function wechatQrcode(imgurl,text){
    var _this = this;
    imgurl = imgurl || jspath + 'images/qrcode.jpg';
    text = text || '关注我们的微信';
    jQuery(js[js.length-1]).after('<link rel="stylesheet" href="'+jspath+'style.css" />');

    //创建dom对象
    var dom = jQuery('<div></div>').addClass('watch')
    .append('<a class="watch-btn" href="javascript:;" id="watch-lb" stat="watch1001">关注</a>')
    .append('<div class="watch-code"><img src="' + imgurl + '" /><p>' + text + '</p></div>');

    jQuery("body").after(dom);

    //处理鼠标移动事件
    jQuery('#watch-lb',dom).hover(function(){
            jQuery('.watch-code',dom).addClass('code-show').show();
        },function(){
            jQuery('.watch-code',dom).removeClass('code-show').hide();
        });
    return dom;
  }

  jQuery.extend({wechatFloat: wechatQrcode});

})();