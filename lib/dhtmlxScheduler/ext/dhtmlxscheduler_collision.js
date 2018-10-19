/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(t){var a=e._get_section_view();a&&t&&(i=e.getEvent(t)[e._get_section_property()])}var i,a;e.config.collision_limit=1,e.attachEvent("onBeforeDrag",function(e){return t(e),!0}),e.attachEvent("onBeforeLightbox",function(i){var r=e.getEvent(i);return a=[r.start_date,r.end_date],t(i),!0}),e.attachEvent("onEventChanged",function(t){if(!t||!e.getEvent(t))return!0;var i=e.getEvent(t);if(!e.checkCollision(i)){if(!a)return!1;i.start_date=a[0],i.end_date=a[1],
i._timed=this.isOneDayEvent(i)}return!0}),e.attachEvent("onBeforeEventChanged",function(t,i,a){return e.checkCollision(t)}),e.attachEvent("onEventAdded",function(t,i){var a=e.checkCollision(i);a||e.deleteEvent(t)}),e.attachEvent("onEventSave",function(t,i,a){if(i=e._lame_clone(i),i.id=t,!i.start_date||!i.end_date){var r=e.getEvent(t);i.start_date=new Date(r.start_date),i.end_date=new Date(r.end_date)}return i.rec_type&&e._roll_back_dates(i),e.checkCollision(i)}),e._check_sections_collision=function(t,i){
var a=e._get_section_property();return t[a]==i[a]&&t.id!=i.id?!0:!1},e.checkCollision=function(t){var a=[],r=e.config.collision_limit;if(t.rec_type)for(var n=e.getRecDates(t),s=0;s<n.length;s++)for(var d=e.getEvents(n[s].start_date,n[s].end_date),o=0;o<d.length;o++)(d[o].event_pid||d[o].id)!=t.id&&a.push(d[o]);else{a=e.getEvents(t.start_date,t.end_date);for(var l=0;l<a.length;l++)if(a[l].id==t.id){a.splice(l,1);break}}var _=e._get_section_view(),h=e._get_section_property(),c=!0;if(_){for(var u=0,l=0;l<a.length;l++)a[l].id!=t.id&&this._check_sections_collision(a[l],t)&&u++;
u>=r&&(c=!1)}else a.length>=r&&(c=!1);if(!c){var g=!e.callEvent("onEventCollision",[t,a]);return g||(t[h]=i||t[h]),g}return c}}()});