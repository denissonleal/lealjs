/**
 * Declare the object so that no errors occur
 */

// $.fn.send = function(success, error) {
// 	if (typeof erro == 'undefined') error = error_send;
// 	$(this).submit(function(e) {
// 		e.preventDefault();
// 		if (!$(this).validation()) {
// 			$.alert('Campo inválido. Por favor preencha corretamente.');
// 			return false;
// 		}
// 		// $.dialog.waiting("Aguarde...");
// 		$.post($(this).attr("action"), $(this).serialize(), success, error).done(function() {
// 			// if($(".dialog-waiting").length) $.dialog.close();
// 		});
// 	});
// };

// $.fn.sendImage = function(success, error) {
// 	$(this).submit(function() {
// 		$.dialog.waiting('Enviando...');
// 		$.ajax({
// 			type: 'POST',
// 			url: serverUrl + $(this).attr('action'),
// 			data: new FormData(this),
// 			enctype: 'multipart/form-data',
// 			processData: false, // tell jQuery not to process the data
// 			contentType: false // tell jQuery not to set contentType
// 		}).success(success).fail(error).done(function() {
// 			if ($('.dialog-waiting').length) $.dialog.close();
// 		});
// 		return false;
// 	});
// 	$(this).find('input[type="file"]').change(function() {
// 		var str = $(this).val(),
// 			arr = [/.png$/, /.jpg$/, /.jpge$/];
// 		for (var i = 0; i < arr.length; i++)
// 			if (str.search(arr[i]) > 0) {
// 				$(this).closest('form').submit();
// 				return;
// 			}
// 		$.alert('Arquivo inválido!');
// 	});
// };

// function error_send() {
// 	$.dialog.info("Erro", "Erro ao enviar informações");
// }

// function error_load() {
// 	$.dialog.info("Erro", "Erro ao carregar informações");
// }