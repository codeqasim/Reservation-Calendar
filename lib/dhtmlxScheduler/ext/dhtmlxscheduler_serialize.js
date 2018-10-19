/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._get_serializable_data=function(){var e={};for(var t in this._events){var a=this._events[t];-1==a.id.toString().indexOf("#")&&(e[a.id]=a)}return e},e.data_attributes=function(){var t=[],a=e.templates.xml_format,n=this._get_serializable_data();for(var i in n){var r=n[i];for(var s in r)"_"!=s.substr(0,1)&&t.push([s,"start_date"==s||"end_date"==s?a:null]);break}return t},e.toXML=function(e){var t=[],a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
var r=n[i];t.push("<event>");for(var s=0;s<a.length;s++)t.push("<"+a[s][0]+"><![CDATA["+(a[s][1]?a[s][1](r[a[s][0]]):r[a[s][0]])+"]]></"+a[s][0]+">");t.push("</event>")}return(e||"")+"<data>"+t.join("\n")+"</data>"},e._serialize_json_value=function(e){return null===e||"boolean"==typeof e?e=""+e:(e||0===e||(e=""),e='"'+e.toString().replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"'),e},e.toJSON=function(){var e=[],t="",a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
for(var r=n[i],s=[],d=0;d<a.length;d++)t=a[d][1]?a[d][1](r[a[d][0]]):r[a[d][0]],s.push(' "'+a[d][0]+'": '+this._serialize_json_value(t));e.push("{"+s.join(",")+"}")}return"["+e.join(",\n")+"]"},e.toICal=function(t){var a="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:",n="END:VCALENDAR",i=e.date.date_to_str("%Y%m%dT%H%i%s"),r=e.date.date_to_str("%Y%m%d"),s=[],d=this._get_serializable_data();for(var o in d){var l=d[o];s.push("BEGIN:VEVENT"),l._timed&&(l.start_date.getHours()||l.start_date.getMinutes())?s.push("DTSTART:"+i(l.start_date)):s.push("DTSTART:"+r(l.start_date)),
l._timed&&(l.end_date.getHours()||l.end_date.getMinutes())?s.push("DTEND:"+i(l.end_date)):s.push("DTEND:"+r(l.end_date)),s.push("SUMMARY:"+l.text),s.push("END:VEVENT")}return a+(t||"")+"\n"+s.join("\n")+"\n"+n}});