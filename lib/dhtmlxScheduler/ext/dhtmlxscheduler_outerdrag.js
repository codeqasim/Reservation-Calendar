/*
@license
dhtmlxScheduler v.4.4.9 Professional Evaluation

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){function t(t,i,n,r){if(!e.checkEvent("onBeforeExternalDragIn")||e.callEvent("onBeforeExternalDragIn",[t,i,n,r,a])){var s=e.attachEvent("onEventCreated",function(i){e.callEvent("onExternalDragIn",[i,t,a])||(this._drag_mode=this._drag_id=null,this.deleteEvent(i))}),d=e.getActionData(a),o={start_date:new Date(d.date)};if(e.matrix&&e.matrix[e._mode]){var l=e.matrix[e._mode];o[l.y_property]=d.section;var _=e._locate_cell_timeline(a);
o.start_date=l._trace_x[_.x],o.end_date=e.date.add(o.start_date,l.x_step,l.x_unit)}e._props&&e._props[e._mode]&&(o[e._props[e._mode].map_to]=d.section),e.addEventNow(o),e.detachEvent(s)}}var a,i=new dhtmlDragAndDropObject,n=i.stopDrag;i.stopDrag=function(e){return a=e||event,n.apply(this,arguments)},i.addDragLanding(e._els.dhx_cal_data[0],{_drag:function(e,a,i,n){t(e,a,i,n)},_dragIn:function(e,t){return e},_dragOut:function(e){return this}}),dhtmlx.DragControl&&dhtmlx.DragControl.addDrop(e._els.dhx_cal_data[0],{
onDrop:function(e,i,n,r){var s=dhtmlx.DragControl.getMaster(e);a=r,t(e,s,i,r.target||r.srcElement)},onDragIn:function(e,t,a){return t}},!0)})});