/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",a=0;a<e.options.length;a++)t+="<label><input type='checkbox' value='"+e.options[a].key+"'/>"+e.options[a].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(t,a,i,n){function r(e){for(var a=t.getElementsByTagName("input"),i=0;i<a.length;i++)a[i].checked=!!e[a[i].value];
}for(var s=t.getElementsByTagName("input"),d=0;d<s.length;d++)s[d].checked=!1;var o={};if(i[n.map_to]){for(var l=(i[n.map_to]+"").split(n.delimiter||e.config.section_delimiter||","),d=0;d<l.length;d++)o[l[d]]=!0;r(o)}else{if(e._new_event||!n.script_url)return;var _=document.createElement("div");_.className="dhx_loading",_.style.cssText="position: absolute; top: 40%; left: 40%;",t.appendChild(_);var c=[n.script_url,-1==n.script_url.indexOf("?")?"?":"&","dhx_crosslink_"+n.map_to+"="+i.id+"&uid="+e.uid()].join("");
dhtmlxAjax.get(c,function(e){for(var a=e.doXPath("//data/item"),i={},s=0;s<a.length;s++)i[a[s].getAttribute(n.map_to)]=!0;r(i),t.removeChild(_)})}},get_value:function(t,a,i){for(var n=[],r=t.getElementsByTagName("input"),s=0;s<r.length;s++)r[s].checked&&n.push(r[s].value);return n.join(i.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});