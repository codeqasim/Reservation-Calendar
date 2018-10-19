/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.load=function(e,t){var a;return"string"==typeof t&&(this._process=t,a=t,t=arguments[2]),this._load_url=e,this._after_call=t,e.$proxy?void e.load(this,"string"==typeof a?a:null):void this._load(e,this._date)},e._dp_init_backup=e._dp_init,e._dp_init=function(e){e._sendData=function(e,t){if(e){if(!this.callEvent("onBeforeDataSending",t?[t,this.getState(t),e]:[null,null,e]))return!1;if(t&&(this._in_progress[t]=(new Date).valueOf()),this.serverProcessor.$proxy){var a="POST"!=this._tMode?"get":"post",i=[];
for(var n in e)i.push({id:n,data:e[n],operation:this.getState(n)});return void this.serverProcessor._send(i,a,this)}var r=new dtmlXMLLoaderObject(this.afterUpdate,this,!0),s=this.serverProcessor+(this._user?getUrlSymbol(this.serverProcessor)+["dhx_user="+this._user,"dhx_version="+this.obj.getUserData(0,"version")].join("&"):"");"POST"!=this._tMode?r.loadXML(s+(-1!=s.indexOf("?")?"&":"?")+this.serialize(e,t)):r.loadXML(s,!0,this.serialize(e,t)),this._waitMode++}},e._updatesToParams=function(e){for(var t={},a=0;a<e.length;a++)t[e[a].id]=e[a].data;
return this.serialize(t)},e._processResult=function(e,t,a){if(200==a.status)t=new dtmlXMLLoaderObject(function(){},this,!0),t.loadXMLString(e),t.xmlDoc=a,this.afterUpdate(this,null,null,null,t);else for(var i in this._in_progress){var n=this.getState(i);this.afterUpdateCallback(i,i,n,null)}},this._dp_init_backup(e)},window.dataProcessor&&(dataProcessor.prototype.init=function(e){this.init_original(e),e._dataprocessor=this,this.setTransactionMode("POST",!0),this.serverProcessor.$proxy||(this.serverProcessor+=(-1!=this.serverProcessor.indexOf("?")?"&":"?")+"editing=true");
})});