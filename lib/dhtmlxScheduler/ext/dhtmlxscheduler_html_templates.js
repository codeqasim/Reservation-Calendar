/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){for(var t=document.body.getElementsByTagName("DIV"),i=0;i<t.length;i++){var a=t[i].className||"";if(a=a.split(":"),2==a.length&&"template"==a[0]){var r='return "'+(t[i].innerHTML||"").replace(/\"/g,'\\"').replace(/[\n\r]+/g,"")+'";';r=unescape(r).replace(/\{event\.([a-z]+)\}/g,function(e,t){return'"+ev.'+t+'+"'}),e.templates[a[1]]=Function("start","end","ev",r),t[i].style.display="none"}}})});