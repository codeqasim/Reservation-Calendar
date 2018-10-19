scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.config.time_step = 60;
scheduler.config.fix_tab_position = false;
scheduler.xy.scale_height = 38;
scheduler.config.limit_drag_out = true;

var cars = scheduler.serverList("car");
var types = scheduler.serverList("type");
var hours = scheduler.serverList("hour");
var priceRanges = scheduler.serverList("priceRange");
var statuses = scheduler.serverList("status");

scheduler.config.lightbox.sections = [
  { name:"Contact details",   type:"textarea", map_to:"text",          height:42, focus:true },
  { name:"Note",              type:"textarea", map_to:"description",   height:63},
  { name:"Car Brand",         type:"select",   map_to:"car",           options:scheduler.serverList("currentCars")},
  { name:"Pick up location",  type:"textarea", map_to:"pick_location", height:30},
  { name:"Drop off location", type:"textarea", map_to:"drop_location", height:30},
  { name:"time",              type:"time",     map_to:"auto",          height:72}    
];


scheduler.locale.labels.new_event = "New Rent";
scheduler.locale.labels.dhx_cal_today_button = "TODAY";

scheduler.locale.labels.week_timeline_tab = "WEEK";
scheduler.locale.labels.two_week_timeline_tab = "2 WEEKS";
scheduler.locale.labels.month_timeline_tab = "MONTH";

scheduler.createTimelineView({
  fit_events: true,
  name: "week_timeline",
  y_property: "car",
  render: "bar",
  x_unit: "day",
  x_date: "%D %j",
  x_step: 1,
  x_size: 7,
  x_length: 7,
  dx: 155,
  dy: 120,
  event_dy: 32,
  section_autoheight: false,
  full_event__dy: true,
  y_unit: scheduler.serverList("currentCars")
});

scheduler.createTimelineView({
  fit_events: true,
  name: "two_week_timeline",
  y_property: "car",
  render: "bar",
  x_unit: "day",
  x_date: "%D %j",
  x_step: 1,
  x_size: 14,
  x_length: 7,
  dx: 155,
  dy: 120,
  event_dy: 32,
  section_autoheight: false,
  full_event__dy: true,
  y_unit: scheduler.serverList("currentCars")
});

scheduler.createTimelineView({
  fit_events: true,
  name: "month_timeline",
  y_property: "car",
  render: "bar",
  x_unit: "day",
  x_date: "%D %j",
  x_step: 1,
  x_size: 14,
  x_length: 7,
  dx: 155,
  dy: 120,
  event_dy: 32,
  section_autoheight: false,
  full_event__dy: true,
  y_unit: scheduler.serverList("currentCars")
});


scheduler.date.week_timeline_start = scheduler.date.two_week_timeline_start = scheduler.date.week_start;
scheduler.date.month_timeline_start = scheduler.date.month_start;
scheduler.date.add_month_timeline = function(date, inc){
  return scheduler.date.add(date, inc, "month");
};

scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date) {
  if (mode == "month_timeline") {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1);
    var d = new Date(year, month, 0);
    var days = d.getDate();//numbers of day in month
    scheduler.matrix['month_timeline'].x_size = days;
    scheduler.matrix['month_timeline'].x_length = days;
  }
  return true;
});

var weekDateFormat = scheduler.date.date_to_str("%D %j");
scheduler.templates.week_timeline_scale_date =
    scheduler.templates.two_week_timeline_scale_date = function(date){
      return "<br/>" + weekDateFormat(date);
    };
scheduler.templates.month_timeline_scale_date = function(date) {
  return getShortDayName(date) + "<br/>" + date.getDate();
};

scheduler.templates.week_timeline_scale_label =
    scheduler.templates.two_week_timeline_scale_label =
        scheduler.templates.month_timeline_scale_label = function(key, label, section){
  return "<div style=\"width:100%\">\
  <img src=\""+section.link+"\" alt=\""+label+"\"></img><br/>\
  <div class=\"car_brand\">"+label+"</div><div class=\"car_price\">$"+section.price+"</div></div>";
};

scheduler.templates.week_timeline_cell_class =
    scheduler.templates.two_week_timeline_cell_class =
        scheduler.templates.month_timeline_cell_class = function(evs, date, section) {
          var day = date.getDay();
          return day == 0 || day == 6 ? "dhx_cell_holiday" : "";
        };

function getShortDayName(date) {
  switch(date.getDay())
  {
    case 0:
      return "Su";
    case 1:
      return "Mo";
    case 2:
      return "Tu";
    case 3:
      return "We";
    case 4:
      return "Th";
    case 5:
      return "Fr";
    case 6:
      return "Sa";
    default:
      return "";
  }
}
  
var get_formatted_duration = function (start, end) {
  var diff = end - start;

  var durations = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000
  };

  var days = Math.floor(diff / durations.day);
  diff -= days * durations.day;
  var hours = Math.floor(diff / durations.hour);
  diff -= hours * durations.hour;

  var results = [];
  if (days) results.push(days + " days");
  if (hours) results.push(hours + " hours");
  return results.join(", ");
};

scheduler.templates.tooltip_date_format = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.tooltip_text = function (start, end, event) {
  var statusKey = event.status || null;
  var statuses = scheduler.serverList("status");
  var status = "";
  for (var i = 0; i < statuses.length; i++) {
    if (!statusKey || statuses[i].key == statusKey) {
      status = statuses[i].label;
      break;
    }
  }

  return "Rented for " + get_formatted_duration(start, end) + "<br/>" +
      status + "<br/>" +
      "<b>Pick Up:</b> " + scheduler.templates.tooltip_date_format(start) + "<br/>" +
      "<b>Drop Off:</b> " + scheduler.templates.tooltip_date_format(end);

};

scheduler.templates.event_bar_text = function (start, end, event) {
  return "<div class='event-bar-text'>Rented for " + get_formatted_duration(start, end) + "</div>";
};

scheduler.templates.event_class = function (start, end, event) {
  if (event.status == 1) {
    return "dhx_rent_reservation";
  }
  if (event.status == 2) {
    return "dhx_rent_prepaid";
  }
  if (event.status == 3) {
    return "dhx_rent_payed";
  }
  return "";
};

scheduler.attachEvent("onEventCollision", function (ev, evs) {
  for (var i = 0; i < evs.length; i++) {
    if (ev.car != evs[i].car) continue;
    dhtmlx.message({
      type: "error",
      text: "This car is already rented for this date."
    });
  }
  return true;
});

scheduler.pickerDateFormat = "%d/%m/%Y";
scheduler.currentCal = null;
function show_minical(htmlElem, id) {
  //if mini calendar already shown - destroy it
  if (scheduler.isCalendarVisible()){
    scheduler.destroyCalendar(null, true);
    if(scheduler.currentCal == htmlElem) return;
  }

  scheduler.currentCal = htmlElem;
  //create minicalendar
  scheduler.renderCalendar({
    position: htmlElem.id,
    date: scheduler._date,
    navigation: true,
    handler: function (date, calendar) {
      //on click - put selected value to the input
      document.getElementById(id).value = scheduler.date.date_to_str(scheduler.pickerDateFormat)(date);
      //update sections
      updateSections();
      //and destroy calendar
      scheduler.destroyCalendar();
      //check if 'To' date is later than 'From' date
      if (!areDatesCorrect()) {
        showWarning();
      }
    }
  });

  function areDatesCorrect() {
    var from = document.getElementById("dateFrom").value,
        to = document.getElementById("dateTo").value;

    if (from && to) {
      //function to convert string to date object
      var converter = scheduler.date.str_to_date(scheduler.pickerDateFormat);
      from = converter(from);
      to = converter(to);
      if (from && to) {//if converted successfully
        if (from.getTime() > to.getTime())
          //return false only if start date is later than end date, other cases are valid
          return false;
      }
    }
    return true;
  }

  function showWarning() {
      document.getElementById("dateTo").value = "";
      dhtmlx.message("Pick up date must be before Drop off date!");
  }
}

function getItem(array, key){
  for (var i = 0; i < array.length; i++) {
    if (key == array[i].key){
      return array[i];
    }
  }
  return null;
}

function convertToDateObj(date, time){
  var formatFunc = scheduler.date.str_to_date("%d/%m/%Y %H:%i"),
    targetDate = date + " " + time,
    convertedDate = formatFunc(targetDate);

  return convertedDate;
}

function filterByType(car, types){
  return !!types[car.type];
}

function filterByPrice(car, prices){
  return prices.some(function(price){
    return +car.price >= price.minVal && +car.price < price.maxVal;
  });
}

function filterByDate(car, dateFrom, dateTo){
  if(dateFrom){
    var evs = scheduler.getEvents();
    
    for (var i=0; i<evs.length; i++){    
      if(car.key == evs[i].car){
        var evStart = (evs[i].start_date).getTime(),
          evEnd = (evs[i].end_date).getTime(),
          filterDateStart = dateFrom.getTime(),
          filterDateEnd = dateTo.getTime();
        if(( (evStart>=filterDateStart)&&(evEnd<=filterDateEnd) )||( (evStart<=filterDateStart)&&(evEnd>=filterDateEnd) )||( (evStart>=filterDateStart)&&(evEnd>=filterDateEnd && evStart<filterDateEnd) )||( (evEnd<=filterDateEnd)&&(evStart<=filterDateStart && evEnd>filterDateStart) ) )
          return false;
      }
    } 
    return true;
  } 

  return true;
}

function getCheckedValues(boxId){
  return Array.prototype.slice
      .call(document.querySelectorAll("#" + boxId + " input[type=checkbox]:checked"))
      .map(function (box) {
        return box.value;
      });
}

function updateSections(){
  scheduler.updateCollection("currentCars", cars.slice());

  var types = getCheckedValues("type-options")
      .reduce(function (hash, value) {
        hash[value] = true;
        return hash;
      }, {});

  var arrByType = cars.filter(function(car){
    return filterByType(car, types)
  });  

  var selectedPrices = getCheckedValues("price-options")
      .map(function(value) {
        return getItem(priceRanges, value);
      });

  var arrByPrice = arrByType.filter(function(car){
    return filterByPrice(car, selectedPrices);
  });

  var checkbox = document.getElementById("dateFilter");
  var newDate = document.getElementById("dateFrom").value;
  if(checkbox.checked && newDate){
    var formatFunc = scheduler.date.str_to_date("%d/%m/%Y");
    scheduler.setCurrentView(formatFunc(newDate));

    var dateFrom = document.getElementById("dateFrom").value,
      timeFrom = getItem(hours, document.getElementById("timeFrom").value).label,
      dateTo = document.getElementById("dateTo").value,
      timeTo = getItem(hours, document.getElementById("timeTo").value).label;
      if(dateFrom){
        var targetDateFrom = convertToDateObj(dateFrom, timeFrom);
        var targetDateTo = (!dateTo) ? (scheduler.date.add(targetDateFrom, 1, 'hour')) : convertToDateObj(dateTo, timeTo);        
      }

    var arrByDate = arrByPrice.filter(function(car){
      return filterByDate(car, targetDateFrom, targetDateTo)
    });

    scheduler.updateCollection("currentCars", arrByDate)
  } else {
    scheduler.updateCollection("currentCars", arrByPrice)
  }
}

function pushSelectOptions(elementID, arr, formatter){
  var select = document.getElementById(elementID);
  var selectHTML = [""];
  for(var i=0; i<arr.length; i++){
    var item = arr[i];
    selectHTML.push("<option value='"+item.key+"'>"
      +(formatter ? formatter(item) : item.label)
      +"</option>");
  }
  select.innerHTML = selectHTML.join("");
}

function pushCheckboxes(root, options, formatter, name){
	var select = document.getElementById(root);
	var html = [];
	for(var i = 0; i < options.length; i++){
	  var item = options[i];

	  html.push("<label>" +
          "<div class='checkbox'>" +
          "<input type='checkbox' name='"+name+"' value='"+item.key+"' onchange='updateSections()' checked>" +
          "<span class='checkbox_marker'></span>" +
          "</div>" +
          "<span class='checkbox_text'>" +
          (formatter ? formatter(item) : item.label) +
          "</span>" +
          "</label>");
    }
    select.innerHTML = html.join("<br>");
}

scheduler.attachEvent("onXLE", function (){
  scheduler.updateCollection("currentCars", cars.slice());

  pushCheckboxes("type-options", types, null, "type");
  pushCheckboxes("price-options", priceRanges, function(item){ return "$"+item.minVal+"-"+item.maxVal }, "price");
  pushSelectOptions("timeFrom", hours);
  pushSelectOptions("timeTo", hours);
  pushSelectOptions("lightboxFromTime", hours);
  pushSelectOptions("lightboxToTime", hours);

  var carOptions = cars.slice().sort(function(a, b){
    if(a.label > b.label) return 1;
    if(a.label < b.label) return -1;
    return a.key > b.key ? 1: -1;
  });
  pushSelectOptions("lightboxCar", carOptions);

  var statusesHtml = statuses.map(function(status){
    return "<label>" +
        "<div class='radio'>" +
        "<input type='radio' name='status' value='"+status.key+"'>" +
        "<span class='radio_marker'></span>" +
        "</div>" +
        status.label +
        "</label>";
  });

  document.getElementById("lightboxStatus").innerHTML = statusesHtml.join("<br>");
});

var html = function(id) { return document.getElementById(id); }; //just a helper

function setRadio(containerId, value){
  var boxes = html(containerId).querySelectorAll("input[type=radio]");
  if(!value) {
    boxes[0].checked = true;
  }
  else {
    for(var i = 0; i < boxes.length; i++) {
      if(boxes[i].value == value){
        boxes[i].checked = true;
        break;
      }
    }
  }
}

function getRadio(containerId) {
  var boxes = html(containerId).querySelectorAll("input[type=radio]");
  for(var i = 0; i < boxes.length; i++) {
    if(boxes[i].checked){
      return boxes[i].value;
    }
  }
  return 0;
}

var dateToLightboxStr = scheduler.date.date_to_str(scheduler.pickerDateFormat);
function setDate(containerId, value) {
  var block = html(containerId);
  block.querySelector("input[type=text]").value = dateToLightboxStr(value);
  var hour = value.getHours() + 1;
  block.querySelector("select").value = hour;
}

function getDate(containerId) {
  var block = html(containerId);
  var date = block.querySelector("input[type=text]").value;
  var time = getItem(hours, block.querySelector("select").value).label

  var result = convertToDateObj(date, time);
  if(isNaN(+result)) return null;

  return result;
}

scheduler.showLightbox = function(id) {
  var ev = scheduler.getEvent(id);
  scheduler.startLightbox(id, html("lightbox_form"));

  html("lightboxName").value = ev.text || "";
  html("lightboxCar").value = ev.car;
  setRadio("lightboxStatus", ev.status);

  setDate("lightboxPickUpDate", ev.start_date);
  setDate("lightboxDropOffDate", ev.end_date);
};

function save_form() {
  var isError = false;

  var text = html("lightboxName").value.trim();
  if(!text) {
    dhtmlx.message("Enter correct Name", "error");
    isError = true;
  }

  var car = html("lightboxCar").value;

  var status = getRadio("lightboxStatus");
  if(!status) {
    dhtmlx.message("Enter correct Status", "error");
    isError = true;
  }

  var startDate = getDate("lightboxPickUpDate");
  if(!startDate){
    dhtmlx.message("Enter correct Pick Up date", "error");
    isError = true;
  }

  var endDate = getDate("lightboxDropOffDate");
  if(!endDate){
    dhtmlx.message("Enter correct Drop Off date", "error");
    isError = true;
  }

  if(!isError && +endDate <= +startDate){
    dhtmlx.message("Drop Off date should be higher than Pick Up date", "error");
    isError = true;
  }

  if(!isError) {
    var ev = scheduler.getEvent(scheduler.getState().lightbox_id);
    if(!scheduler.checkCollision({
          id: ev.id,
          start_date: startDate,
          end_date: endDate,
          car: car
        })) return;
    
    ev.text = text;
    ev.car = car;
    ev.status = status;
    ev.start_date = startDate;
    ev.end_date = endDate;

    scheduler.endLightbox(true, html("lightbox_form"));
  }
}

function close_form() {
  scheduler.endLightbox(false, html("lightbox_form"));
}

function delete_event() {
  var event_id = scheduler.getState().lightbox_id;
  scheduler.endLightbox(false, html("lightbox_form"));
  scheduler.deleteEvent(event_id);
}

function initLightboxBgCancel() {
  dhtmlxEvent(document.body, "click", function (e) {
    if (e.target && e.target.className == "dhx_cal_cover" &&
        scheduler.getState().lightbox_id) {
      close_form();
    }
  });
}

function init(){
  scheduler.init('scheduler_here',new Date(2017, 4, 17),"week_timeline");
  scheduler.load("./data.php", "json");
  initLightboxBgCancel();

  window.dp = new dataProcessor("./data.php");
  dp.init(scheduler);
}
