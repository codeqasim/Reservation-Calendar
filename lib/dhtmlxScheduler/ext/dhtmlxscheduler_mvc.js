/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return d.use_id||delete t.id,t}function a(){clearTimeout(s),s=setTimeout(function(){e.updateView()},1)}function i(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function n(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function r(e){return d.use_id?e.id:e.cid}var s,d={use_id:!1};e.backbone=function(s,o){function l(){_.length&&(e.parse(_,"json"),
_=[])}o&&(d=o),s.bind("change",function(t,i){var n=r(t),s=e._events[n]=t.toJSON();s.id=n,e._init_event(s),a()}),s.bind("remove",function(t,a){var i=r(t);e._events[i]&&e.deleteEvent(i)});var _=[];s.bind("add",function(t,a){var i=r(t);if(!e._events[i]){var n=t.toJSON();n.id=i,e._init_event(n),_.push(n),1==_.length&&setTimeout(l,1)}}),s.bind("request",function(t){t instanceof Backbone.Collection&&i(e)}),s.bind("sync",function(t){t instanceof Backbone.Collection&&n(e)}),s.bind("error",function(t){t instanceof Backbone.Collection&&n(e);
}),e.attachEvent("onEventCreated",function(t){var a=new s.model(e.getEvent(t));return e._events[t]=a.toJSON(),e._events[t].id=t,!0}),e.attachEvent("onEventAdded",function(a){if(!s.get(a)){var i=t(e.getEvent(a)),n=new s.model(i),d=r(n);d!=a&&this.changeEventId(a,d),s.add(n),s.trigger("scheduler:add",n)}return!0}),e.attachEvent("onEventChanged",function(a){var i=s.get(a),n=t(e.getEvent(a));return i.set(n),s.trigger("scheduler:change",i),!0}),e.attachEvent("onEventDeleted",function(e){var t=s.get(e);
return t&&(s.trigger("scheduler:remove",t),s.remove(e)),!0})}}()});