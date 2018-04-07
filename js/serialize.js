

// $.fn.validation = function() {
// 	var out = {};
// 	var result_validation = true;
// 	var inputs = $(this).find('input, select, textarea');
// 	$(inputs).removeClass('invalid'); //A partir da segunda execução
// 	$('.callback').hide();
// 	for(var i = 0 ; i < $(inputs).length ; i++ ) {
// 		var regex = $(inputs).eq(i).attr('regex');
// 		var name = $(inputs).eq(i).attr('name');
// 		var convert = $(inputs).eq(i).attr('convert');
// 		var val = $(inputs).eq(i).is(':radio') || $(inputs).eq(i).is(':checkbox') ?
// 		$('input[name="'+$(inputs).eq(i).attr('name')+'"]', this).filter(':checked').val() :
// 		$.trim($(inputs).eq(i).val());

// 		if ( $(inputs).eq(i).is(':enabled') ) {
// 			if (($(inputs).eq(i).attr('minlength') && val.length < parseInt($(inputs).eq(i).attr('minlength'))) || ($(inputs).eq(i).attr('maxlength') && val.length > parseInt($(inputs).eq(i).attr('maxlength')))){
// 				$(inputs).eq(i).closest('.form-group, .forms, .validation-group').find('.callback').show();
// 				if ( result_validation ) { // mostrar todas as msgs de erro de uma vez
// 					$(inputs).eq(i).addClass('invalid').focus();
// 					result_validation = false;
// 				}
// 			}
// 			if ( regex && regex.length ) {
// 				val = val ? val : "";
// 				// console.log($(inputs).eq(i).attr("name"), val, regex);
// 				if (!(new RegExp(regex, 'i')).exec(val)) {
// 					$(inputs).eq(i).closest('.form-group, .forms, .validation-group').find('.callback').show();
// 					if ( result_validation ) { // mostrar todas as msgs de erro de uma vez
// 						// console.log($(inputs).eq(i));
// 						if(['radio', 'checkbox'].indexOf($(inputs).eq(i).attr('type')) != -1)
// 							$(window).scrollTop($(inputs).eq(i).addClass('invalid').closest('.form-group, .forms, .validation-group').offset().top - 230);
// 						else
// 							$(inputs).eq(i).addClass('invalid').focus();
// 						result_validation = false;
// 					}
// 				}
// 				else {
// 					if ( convert == 'int' ) val = val.length > 0 ? parseInt(val) : null;
// 					if ( convert == 'float' ) val = val.length > 0 ? parseFloat(val.replace(',', '.')) : null;
// 					if ( convert == 'numberonly' ) val = val.replace(/\D/g, '');
// 					if ( convert == 'titlecase' ) val = val.toTitleCase();
// 					if ( convert == 'bool' ) val = (val || '').length > 0;
// 					out = push_object(out, name, val);
// 				}
// 			}
// 			else {
// 				if ( convert == 'int' ) val = val.length > 0 ? parseInt(val) : null;
// 				if ( convert == 'float' ) val = val.length > 0 ? parseFloat(val.replace(',', '.')) : null;
// 				if ( convert == 'numberonly' ) val = val.replace(/\D/g, '');
// 				if ( convert == 'titlecase' ) val = val.toTitleCase();
// 				if ( convert == 'bool' ) val = (val || '').length > 0;
// 				out = push_object(out, name, val);
// 			}
// 		}
// 	}
// 	if ( !result_validation ) return false;
// 	return out;
// };