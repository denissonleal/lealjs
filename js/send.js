/**
 * Declare the object so that no errors occur
 */

$.support.cors = true;
var server_url = $('meta[name=server_url]').length ? $('meta[name=server_url]').attr('value') : '/';
var type_user = $('meta[name=type_user]').length ? $('meta[name=type_user]').attr('value') : '';

$.each(['put', 'delete', 'post', 'get'], function(i, method) {
	$[method] = function(url, data, callback, fail, always) {

		if ( typeof url == 'undefined' || typeof data == 'undefined' || typeof callback != 'function' || typeof fail != 'function' ) {
			console.error('incomplete data');
			return null;
		}

		var url_complete = server_url + '/' + type_user + '/' + url;
		while (url_complete.indexOf('//') >= 0) url_complete = url_complete.replace(/\/\//gi, '/');

		return $.ajax({
			url: url_complete,
			type: method,
			dataType: 'json',
			crossDomain: true,
			data: data,
			success: callback,
			error: fail,
			always: always
		});
	};
});

$.fn.send = function(success, error) {
	if (typeof erro == 'undefined') error = error_send;
	$(this).submit(function(e) {
		e.preventDefault();
		if (!$(this).validation()) {
			$.alert('Campo inválido. Por favor preencha corretamente.');
			return false;
		}
		// $.dialog.waiting("Aguarde...");
		$.post($(this).attr("action"), $(this).serialize(), success, error).done(function() {
			// if($(".dialog-waiting").length) $.dialog.close();
		});
	});
};

$.fn.sendImage = function(success, error) {
	$(this).submit(function() {
		$.dialog.waiting('Enviando...');
		$.ajax({
			type: 'POST',
			url: serverUrl + $(this).attr('action'),
			data: new FormData(this),
			enctype: 'multipart/form-data',
			processData: false, // tell jQuery not to process the data
			contentType: false // tell jQuery not to set contentType
		}).success(success).fail(error).done(function() {
			if ($('.dialog-waiting').length) $.dialog.close();
		});
		return false;
	});
	$(this).find('input[type="file"]').change(function() {
		var str = $(this).val(),
			arr = [/.png$/, /.jpg$/, /.jpge$/];
		for (var i = 0; i < arr.length; i++)
			if (str.search(arr[i]) > 0) {
				$(this).closest('form').submit();
				return;
			}
		$.alert('Arquivo inválido!');
	});
};

function error_send() {
	$.dialog.info("Erro", "Erro ao enviar informações");
}

function error_load() {
	$.dialog.info("Erro", "Erro ao carregar informações");
}