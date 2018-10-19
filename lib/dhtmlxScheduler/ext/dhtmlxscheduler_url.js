/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._get_url_nav=function(){for(var e={},t=(document.location.hash||"").replace("#","").split(","),a=0;a<t.length;a++){var i=t[a].split("=");2==i.length&&(e[i[0]]=i[1])}return e},e.attachEvent("onTemplatesReady",function(){function t(t){r=t,e.getEvent(t)&&e.showEvent(t)}var a=!0,i=e.date.str_to_date("%Y-%m-%d"),n=e.date.date_to_str("%Y-%m-%d"),r=e._get_url_nav().event||null;e.attachEvent("onAfterEventDisplay",function(e){return r=null,!0}),e.attachEvent("onBeforeViewChange",function(s,o,d,_){
if(a){a=!1;var l=e._get_url_nav();if(l.event)try{if(e.getEvent(l.event))return t(l.event),!1;var c=e.attachEvent("onXLE",function(){t(l.event),e.detachEvent(c)})}catch(h){}if(l.date||l.mode){try{this.setCurrentView(l.date?i(l.date):null,l.mode||null)}catch(h){this.setCurrentView(l.date?i(l.date):null,d)}return!1}}var u=["date="+n(_||o),"mode="+(d||s)];r&&u.push("event="+r);var v="#"+u.join(",");return document.location.hash=v,!0})})});