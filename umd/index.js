!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).VanillaCamera=n()}(this,function(){"use strict";var l=0<=["iPad","iPhone","iPod"].indexOf(navigator.platform),f=navigator&&navigator.mediaDevices&&"enumerateDevices"in navigator.mediaDevices;function m(n,e,i){navigator.mediaDevices.getUserMedia(e).then(function(e){n.srcObject=e,n.setAttribute("playsinline","true"),n.controls=!0,setTimeout(function(){n.controls=!1})}).catch(function(e){console.log("Error occurred ",e),i(e)})}function e(e,n){var i,t=void 0===n?{}:n,o=t.onError,r=void 0===o?function(){}:o,d=t.direction,a=t.size,c=void 0===a?1:a;i="string"==typeof e?document.querySelector(e):e,document.contains(i)||r("document.contains no found target");var u=document.createElement("video");u.width=i.clientWidth,u.height=i.clientHeight,u.controls=!1,u.style.background="#000",u.muted=!0,i.append(u),u.autoplay=!0,function(t,o){f&&navigator.mediaDevices.enumerateDevices().then(function(e){var n,i=e.filter(function(e){if("videoinput"==e.kind)return e});1<i.length?(n={video:{mandatory:{sourceId:i[i.length-1].deviceId?i[i.length-1].deviceId:null}},audio:!1},l&&(n.video.facingMode="environment"),m(t,n,o)):i.length?(n={video:{mandatory:{sourceId:i[0].deviceId?i[0].deviceId:null}},audio:!1},l&&(n.video.facingMode="environment"),n.video.mandatory.sourceId||l?m(t,n,o):m(t,{video:!0},o)):m(t,{video:!0},o)}).catch(function(e){console.error("Error occurred : ",e)})}(u,r);var v=document.createElement("canvas");"horizontal"===d?(v.height=window.innerWidth*c,v.width=window.innerHeight*c):(v.width=window.innerWidth*c,v.height=window.innerHeight*c);var s=v.getContext("2d");return{video:u,canvas:v,context:s,remove:function(){u.pause(),u.remove(),v.remove()},playPause:function(){u.paused?u.play():u.pause()},screenshot:function(){return s.drawImage(u,0,0,v.width,v.height),v.toDataURL("image/png")}}}return window.VanillaCamera=e});
