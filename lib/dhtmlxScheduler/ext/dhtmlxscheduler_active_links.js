/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.config.active_link_view="day",e._active_link_click=function(t){var i=t.target||event.srcElement,r=i.getAttribute("jump_to"),s=e.date.str_to_date(e.config.api_date);return r?(e.setCurrentView(s(r),e.config.active_link_view),t&&t.preventDefault&&t.preventDefault(),!1):void 0},e.attachEvent("onTemplatesReady",function(){var t=function(t,i){i=i||t+"_scale_date",e.templates["_active_links_old_"+i]||(e.templates["_active_links_old_"+i]=e.templates[i]);var r=e.templates["_active_links_old_"+i],s=e.date.date_to_str(e.config.api_date);
e.templates[i]=function(e){return"<a jump_to='"+s(e)+"' href='#'>"+r(e)+"</a>"}};if(t("week"),t("","month_day"),this.matrix)for(var i in this.matrix)t(i);this._detachDomEvent(this._obj,"click",e._active_link_click),dhtmlxEvent(this._obj,"click",e._active_link_click)})});