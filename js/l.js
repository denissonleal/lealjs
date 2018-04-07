var l, lealjs = function() {
	var initial_hash = '', current_page = '';
	var ctrl = {};

	this.initial = function(hash) {
		if ( typeof hash != 'undefined' ) {
			initial_hash = hash;
		}
		return initial_hash;
	}.bind(this);

	this.clone = function(x) {
		return JSON.parse(JSON.stringify(x));
	}.bind(this);

	this.routes = function(e) {
		var hash = l.argument(0);
		if (!hash) {
			l.redirect(l.initial());
			return false;
		}

		// var ctrl = document.querySelectorAll('.all-views').elements;
		for ( var i in ctrl ) {
			if ( ctrl.hasOwnProperty(i) && i != hash ) {
				ctrl[i].hide();
			}
		}
		// document.querySelectorAll('.sidebar-menu-items .active').removeClass('active');

		ctrl[hash].show();
		current_page = hash;
	}.bind(this);

	this.redirect = function(route) {
		var hash = location.hash.replace('#', '');
		if (typeof route == 'object') route = route.join('/');
		route = route.replace('#', '');
		if (route == hash)
			this.routes();
		else
			location.hash = '#/'+route;
	}.bind(this);

	this.controller = function(id, obj) {
		if ( typeof id == 'undefined' ) {
			return ctrl[l.argument(0)];
		}
		if ( typeof obj == 'undefined' ) {
			return ctrl[id];
		}

		if (typeof obj == 'function') {
			var c = new obj();

			for (var i in c) {
				if (typeof c[i] == 'function') {
					c[i] = c[i].bind(c);
				}
			}
			if (!c.view) c.view = '#' + id;
			if (!c.hide) c.hide = function() {
				var view = document.querySelector(this.view);
				if (view) view.style.display = 'none';
			}.bind(c);

			ctrl[id] = c;
		}
		else {
			ctrl[id] = obj;
		}

		if (typeof ctrl[id].initialize == 'function') {
			ctrl[id].initialize();
		}
	}.bind(this);

	this.argument = function(i) {
		var hash = location.hash.replace('#', '').split('/');
		if (hash.length > 1 && !hash[0].length) i++;
		return (typeof hash[i] == 'undefined' ? null : hash[i]);
	}.bind(this);

	// -------------------------

	var methods = ['put', 'delete', 'post', 'get'];
	// for ( var i in methods ) {
	// 	if ( methods.hasOwnProperty(i) ) {
	// 		l[methods[i]] = function(url, data, callback, fail, always) {

	// 			if ( typeof url == 'undefined' || typeof data == 'undefined' || typeof callback != 'function' || typeof fail != 'function' ) {
	// 				console.error('incomplete data');
	// 				return null;
	// 			}

	// 			var url_complete = url;
	// 			while (url_complete.indexOf('//') >= 0) url_complete = url_complete.replace(/\/\//gi, '/');

	// 			// return $.ajax({
	// 			// 	url: url_complete,
	// 			// 	type: method,
	// 			// 	dataType: 'json',
	// 			// 	crossDomain: true,
	// 			// 	data: data,
	// 			// 	success: callback,
	// 			// 	error: fail,
	// 			// 	always: always
	// 			// });
	// 		}.bind(this);
	// 	}
	// }

	// document.querySelector('form').elements[1].getAttribute('regex')

	this.validation = function(form) {
		form = typeof form == 'string' ? document.querySelector(form) : form;

		var out = {};
		var result_validation = true;
		// $(inputs).removeClass('invalid'); //A partir da segunda execução
		// $('.callback').hide();
		for(var i = 0 ; i < form.elements ; i++ ) {
			var element = form.elements[i];
			var regex = element.getAttribute('regex');
			var name = element.getAttribute('name');
			var convert = element.getAttribute('convert');
			var val =  ['radio', 'checkbox'].indexOf(element.type) != -1 ? element.checked : element.value;

			if ( element.enabled ) {
				if (
					(element.getAttribute('minlength') && val.length < parseInt(element.getAttribute('minlength'))) ||
					(element.getAttribute('maxlength') && val.length > parseInt(element.getAttribute('maxlength')))
				){
					// $(inputs).eq(i).closest('.form-group, .forms, .validation-group').find('.callback').show();
					if ( result_validation ) { // mostrar todas as msgs de erro de uma vez
						// $(inputs).eq(i).addClass('invalid').focus();
						result_validation = false;
					}
				}
				if ( regex && regex.length ) {
					val = val ? val : "";
					// console.log($(inputs).eq(i).attr("name"), val, regex);
					if (!(new RegExp(regex, 'i')).exec(val)) {
						// $(inputs).eq(i).closest('.form-group, .forms, .validation-group').find('.callback').show();
						if ( result_validation ) { // mostrar todas as msgs de erro de uma vez
							// console.log($(inputs).eq(i));
							// if(['radio', 'checkbox'].indexOf(element.getAttribute('type')) != -1)
							// 	$(window).scrollTop($(inputs).eq(i).addClass('invalid').closest('.form-group, .forms, .validation-group').offset().top - 230);
							// else
							// 	$(inputs).eq(i).addClass('invalid').focus();
							result_validation = false;
						}
					}
					else {
						if ( convert == 'int' ) val = val.length > 0 ? parseInt(val) : null;
						if ( convert == 'float' ) val = val.length > 0 ? parseFloat(val.replace(',', '.')) : null;
						if ( convert == 'numberonly' ) val = val.replace(/\D/g, '');
						if ( convert == 'titlecase' ) val = val.toTitleCase();
						if ( convert == 'bool' ) val = (val || '').length > 0;
						out = push_object(out, name, val);
					}
				}
				else {
					if ( convert == 'int' ) val = val.length > 0 ? parseInt(val) : null;
					if ( convert == 'float' ) val = val.length > 0 ? parseFloat(val.replace(',', '.')) : null;
					if ( convert == 'numberonly' ) val = val.replace(/\D/g, '');
					if ( convert == 'titlecase' ) val = val.toTitleCase();
					if ( convert == 'bool' ) val = (val || '').length > 0;
					out = push_object(out, name, val);
				}
			}
		}
		if ( !result_validation ) return false;
		return out;
	}.bind(this);
};

l = new lealjs();
window.onload = function() {
	window.onhashchange = l.routes;
	setTimeout(l.routes, 200);
};