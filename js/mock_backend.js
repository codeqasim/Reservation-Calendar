(function() {

	var storage = {
		getData: function (url, params) {
			return getSchedulerData();
		},
		saveData: function (url, params) {
			var command = parseRequestArguments(params);
			var data = JSON.parse(getSchedulerData());

			var eventsArray = data.data;

			var updatedEvent = command.event;

			switch (command.action) {
				case "inserted":
					insertEvent(updatedEvent, eventsArray);
					break;
				case "updated":
					updateEvent(updatedEvent, eventsArray);
					break;
				case "deleted":
					deleteEvent(updatedEvent, eventsArray);
					break;
			}

			updateSchedulerData(data);
			return JSON.stringify({action: command.action, tid: updatedEvent.id, sid: updatedEvent.id});
		}
	};

	function insertEvent(event, dataset) {
		var newId = event.id;// leave id unchanged
		dataset.push(event);
		return newId;
	}

	function updateEvent(event, dataset) {
		var dbEvent;
		for (var i = 0; i < dataset.length; i++) {
			if (dataset[i].id == event.id) {
				dbEvent = dataset[i];
			}
		}

		for (var i in event) {
			dbEvent[i] = event[i];
		}
	}

	function deleteEvent(event, dataset) {
		for (var i = 0; i < dataset.length; i++) {
			if (dataset[i].id == event.id) {
				dataset.splice(i, 1);
				break;
			}
		}
	}

	function updateSchedulerData(data) {
		localStorage.setItem('dhx-scheduler-car-rental-updated', JSON.stringify(data));
	}

	function getSchedulerData() {
		if (!localStorage.getItem('dhx-scheduler-car-rental-updated')) {
			var data = { "data":[{"id":"1","start_date":"2017-05-17 12:00","end_date":"2017-05-21 12:00","text":"Rent 1","car":"2","status":"1"},{"id":"2","start_date":"2017-05-17 11:00","end_date":"2017-05-20 11:00","text":"Rent 2","car":"3","status":"2"},{"id":"3","start_date":"2017-05-17 06:00","end_date":"2017-05-21 07:00","text":"Rent 3","car":"4","status":"3"},{"id":"4","start_date":"2017-05-17 00:00","end_date":"2017-05-21 22:00","text":"Rent 4","car":"5","status":"1"}], "collections": {"hour":[{"id":"1","value":"1","label":"00:00"},{"id":"2","value":"2","label":"01:00"},{"id":"3","value":"3","label":"02:00"},{"id":"4","value":"4","label":"03:00"},{"id":"5","value":"5","label":"04:00"},{"id":"6","value":"6","label":"05:00"},{"id":"7","value":"7","label":"06:00"},{"id":"8","value":"8","label":"07:00"},{"id":"9","value":"9","label":"08:00"},{"id":"10","value":"10","label":"09:00"},{"id":"11","value":"11","label":"10:00"},{"id":"12","value":"12","label":"11:00"},{"id":"13","value":"13","label":"12:00"},{"id":"14","value":"14","label":"13:00"},{"id":"15","value":"15","label":"14:00"},{"id":"16","value":"16","label":"15:00"},{"id":"17","value":"17","label":"16:00"},{"id":"18","value":"18","label":"17:00"},{"id":"19","value":"19","label":"18:00"},{"id":"20","value":"20","label":"19:00"},{"id":"21","value":"21","label":"20:00"},{"id":"22","value":"22","label":"21:00"},{"id":"23","value":"23","label":"22:00"},{"id":"24","value":"24","label":"23:00"}],"priceRange":[{"id":"1","value":"1","label":"Budget","minVal":"50","maxVal":"80"},{"id":"2","value":"2","label":"Premium","minVal":"80","maxVal":"120"},{"id":"3","value":"3","label":"Luxury","minVal":"120","maxVal":"150"}],"type":[{"id":"1","value":"1","label":"Compact: 11 cars"},{"id":"2","value":"2","label":"Mid-size: 11 cars"},{"id":"3","value":"3","label":"Full-size: 12 cars"},{"id":"4","value":"4","label":"Sports car: 12 cars"}],"status":[{"id":"1","value":"1","label":"Reservation"},{"id":"2","value":"2","label":"Prepaid"},{"id":"3","value":"3","label":"100% payment"}],"car":[{"id":"1","value":"1","label":"Dodge Caliber","price":"129.99","link":".\/content\/dodge_caliber.png","type":"1"},{"id":"2","value":"2","label":"Ford Focus","price":"129.45","link":".\/content\/ford_focus.png","type":"1"},{"id":"3","value":"3","label":"Chevy Cruze","price":"95.5","link":".\/content\/chevy_cruze.png","type":"1"},{"id":"4","value":"4","label":"Honda Civic","price":"99.9","link":".\/content\/honda_civic.png","type":"1"},{"id":"5","value":"5","label":"Hyundai Elantra","price":"58.6","link":".\/content\/hyundai_elantra.png","type":"1"},{"id":"6","value":"6","label":"Mitsubishi Lancer","price":"59.9","link":".\/content\/mitsubishi_lancer.png","type":"1"},{"id":"7","value":"7","label":"Nissan Sentra","price":"60.05","link":".\/content\/nissan_sentra.png","type":"1"},{"id":"8","value":"8","label":"Subaru Impreza","price":"120.98","link":".\/content\/subaru_impreza.png","type":"1"},{"id":"9","value":"9","label":"Toyota Corolla","price":"140.99","link":".\/content\/toyota_corolla.png","type":"1"},{"id":"10","value":"10","label":"Renault Megane","price":"99.99","link":".\/content\/renault_megane.png","type":"1"},{"id":"11","value":"11","label":"Audi A3","price":"89.99","link":".\/content\/audi_a3.png","type":"1"},{"id":"12","value":"12","label":"Dodge Avenger","price":"99.59","link":".\/content\/dodge_avenger.png","type":"2"},{"id":"13","value":"13","label":"Ford Fusion","price":"69.99","link":".\/content\/ford_fusion.png","type":"2"},{"id":"14","value":"14","label":"Hyundai Sonata","price":"68.59","link":".\/content\/hyundai_sonata.png","type":"2"},{"id":"15","value":"15","label":"Mitsubishi Galant","price":"88.99","link":".\/content\/mitsubishi_galant.png","type":"2"},{"id":"16","value":"16","label":"Nissan Altima","price":"99.99","link":".\/content\/nissan_altima.png","type":"2"},{"id":"17","value":"17","label":"Subaru Legacy","price":"100.99","link":".\/content\/subaru_legacy.png","type":"2"},{"id":"18","value":"18","label":"Toyota Camry","price":"89.99","link":".\/content\/toyota_camry.png","type":"2"},{"id":"19","value":"19","label":"Lexus GS","price":"115.99","link":".\/content\/lexus_gs.png","type":"2"},{"id":"20","value":"20","label":"Audi A6","price":"118.99","link":".\/content\/audi_a6.png","type":"2"},{"id":"21","value":"21","label":"BMW 5-Series","price":"121.99","link":".\/content\/bmw_5_series.png","type":"2"},{"id":"22","value":"22","label":"Infiniti M","price":"99.99","link":".\/content\/infiniti_m.png","type":"2"},{"id":"23","value":"23","label":"Dodge Charger","price":"100.99","link":".\/content\/dodge_charger.png","type":"3"},{"id":"24","value":"24","label":"Chrysler 300","price":"129.59","link":".\/content\/chrysler_300.png\r\n","type":"3"},{"id":"25","value":"25","label":"BMW 7-Series","price":"131.99","link":".\/content\/bmw_7_series.png","type":"3"},{"id":"26","value":"26","label":"Toyota Avalon","price":"100.59","link":".\/content\/toyota_avalon.png","type":"3"},{"id":"27","value":"27","label":"Nissan Maxima","price":"110.99","link":".\/content\/nissan_maxima.png","type":"3"},{"id":"28","value":"28","label":"Honda Accord","price":"139.59\r\n","link":".\/content\/honda_accord.png","type":"3"},{"id":"29","value":"29","label":"Cadillac DTS","price":"149.99","link":".\/content\/cadillac_dts.png","type":"3"},{"id":"30","value":"30","label":"Ford Taurus","price":"115.99","link":".\/content\/ford_taurus.png","type":"3"},{"id":"31","value":"31","label":"Chevy Impala","price":"107.59","link":".\/content\/chevy_impala.png","type":"3"},{"id":"32","value":"32","label":"Mercedes-Benz","price":"115.99","link":".\/content\/mercedes_benz.png","type":"3"},{"id":"33","value":"33","label":"Audi A8","price":"121.59","link":".\/content\/audi_a8.png","type":"3"},{"id":"34","value":"34","label":"Lexus LS S-Class","price":"135.99","link":".\/content\/lexus_ls_s_class.png","type":"3"},{"id":"35","value":"35","label":"Dodge Challenger","price":"139.99","link":".\/content\/dodge_challenger.png","type":"4"},{"id":"36","value":"36","label":"Ford Mustang","price":"129.99","link":".\/content\/ford_mustang.png","type":"4"},{"id":"37","value":"37","label":"Chevy Camaro","price":"149.59","link":".\/content\/chevy_camaro.png","type":"4"},{"id":"38","value":"38","label":"Honda CR-Z","price":"168.59","link":".\/content\/honda_cr_z.png","type":"4"},{"id":"39","value":"39","label":"Mitsubishi Eclipse","price":"119.99","link":".\/content\/mitsubishi_eclipse.png","type":"4"},{"id":"40","value":"40","label":"Nissan Z","price":"100.99","link":".\/content\/nissan_z.png","type":"4"},{"id":"41","value":"41","label":"BMW M-Series","price":"105.99","link":".\/content\/bmw_m_series.png","type":"4"},{"id":"42","value":"42","label":"BMW Z-Series","price":"110.99","link":".\/content\/bmw_z_series.png","type":"4"},{"id":"43","value":"43","label":"Audi TT","price":"129.9","link":".\/content\/audi_tt.png","type":"4"},{"id":"44","value":"44","label":"Ferrari California","price":"149.59","link":".\/content\/ferrari_california.png","type":"4"},{"id":"45","value":"45","label":"Lamborghini Gallardo","price":"100.99","link":".\/content\/lamborghini_gallardo.png","type":"4"},{"id":"46","value":"46","label":"Dodge Viper GTS V10","price":"100.99","link":".\/content\/dodge_viper_gts_v10.png","type":"4"}]}};

			localStorage.setItem('dhx-scheduler-car-rental-updated', JSON.stringify(data));
		}

		return localStorage.getItem('dhx-scheduler-car-rental-updated');
	}

	function parseRequestArguments(params) {
		var parts = decodeURIComponent(params).split("&");

		var fieldsMap = {};
		for (var i = 0; i < parts.length; i++) {
			var param = parts[i].split("=");
			fieldsMap[param[0]] = param[1];
		}

		var id = fieldsMap["ids"];

		var action,
			event = {};

		var prefix = id + "_";

		for (var i in fieldsMap) {
			var isEventProperty = i.indexOf(prefix) > -1;
			if (isEventProperty) {
				var fieldName = i.substr(prefix.length);

				if (fieldName == "!nativeeditor_status") {
					action = fieldsMap[i];
				} else {
					event[fieldName] = fieldsMap[i];
				}
			}
		}

		return {
			action: action,
			event: event
		};
	}

	var mockAjax = {
		call: function (httpMethod, url, params, callback) {

			var handler = this.router.route(httpMethod, url);
			if (handler) {
				this.executeRequest(httpMethod, handler, url, params, callback);
			} else {
				console.error("no route found " + this.router.urlMask(httpMethod, url));
			}
		},

		executeRequest: function (httpMethod, method, url, params, callback) {
			setTimeout(function () {
				var res = method(url, params);
				console.log(["XHR " + httpMethod.toUpperCase(), url].join(" -> "));
				setTimeout(function () {
					callback({
						filePath: url,
						xmlDoc: {
							readyState: 4,
							response: res,
							responseText: res,
							status: 200
						}
					});
				});
			});
		}
	};

	mockAjax.router = {
		routeMap: {},
		route: function (httpMethod, url) {
			return this.routeMap[this.urlMask(httpMethod, url)];
		},
		urlMask: function (httpMethod, url) {
			return [httpMethod, this._stripUrl(url)].join("->").toLowerCase();
		},
		_stripUrl: function (url) {
			var paramsIndex = url.indexOf("?");
			if (paramsIndex < 0) {
				paramsIndex = url.length;
			}

			return url.substr(0, paramsIndex);
		}
	};

	window.dhtmlxAjax = {
		get: function (url, callback) {
			mockAjax.call("get", url, null, function(res){
				callback(res);
			});
		},
		post: function (url, post, callback) {
			mockAjax.call("post", url, post, function(res){
				callback(res);
			});
		}
	};

	window.dtmlXMLLoaderObject.prototype.loadXML = function (filePath, postMode, postVars) {
		console.log(filePath);
		console.log(postMode);
		console.log(postVars);
		var callback = this.onloadAction;
		mockAjax.call(postMode ? "post" : "get", filePath, postVars, function(res){
			callback(window.dp, null, null, null, res);
		});
	};

	mockAjax.router.routeMap["get->./data.php"] = storage.getData.bind(storage);
	mockAjax.router.routeMap["post->./data.php"] = storage.saveData.bind(storage);

})();