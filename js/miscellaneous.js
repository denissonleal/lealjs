Number.prototype.format = function(c, d, t) {
	var n = this,
		c = isNaN(c = Math.abs(c)) ? 2 : c,
		d = d == undefined ? "." : d,
		t = t == undefined ? "," : t,
		s = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
// Number.defineProperty(Function.prototype, "format", { enumerable: false });

Function.prototype.bind = function(scope) {
	var _function = this;

	return function() {
		return _function.apply(scope, arguments);
	}
}
Object.defineProperty(Function.prototype, "bind", { enumerable: false });

String.prototype.removeAccents = function(str) {
	var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
	var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
	str = str.split('');
	var strLen = str.length;
	var i, x;
	for (i = 0; i < strLen; i++) {
		if ((x = accents.indexOf(str[i])) != -1) {
			str[i] = accentsOut[x];
		}
	}
	return str.join('');
};
Object.defineProperty(String.prototype, "removeAccents", { enumerable: false });

// function toggle_mask() {
// 	if ($("input").mask) {
// 		$('.mask-date').unmask().mask('00/00/0000', {});
// 		$('.mask-time').unmask().mask('00:00:00', { placeholder: "__:__:__" });
// 		$('.mask-date-time').unmask().mask('00/00/0000 00:00:00', { placeholder: "__/__/____ __:__:__" });
// 		$('.mask-cep').unmask().mask('00000-000', { placeholder: "_____-___" });
// 		// $('.mask-phone').mask('(00) 0000-0000');
// 		$('.mask-cpf').unmask().mask('000.000.000-00', { placeholder: "___.___.___-__" });
// 		$('.mask-cns').unmask().mask('000 0000 0000 0000', { placeholder: "___ ____ ____ ____" });
// 		$('.mask-cnpj').unmask().mask('00.000.000/0000-00', { placeholder: "__.___.___/____-__" });
// 		$('.mask-money').unmask().mask('000.000.000.000.000,00', { reverse: true });
// 		$('.mask-thousand').unmask().mask('000.000.000.000.000', {reverse: true});
// 		$('.mask-number').unmask().mask('#', { reverse: true });

// 		$('.mask-phone').unmask().mask(function(val) {
// 			return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
// 		}, {
// 			onKeyPress: function(val, e, field, options) {
// 				// field.mask(maskBehavior.apply({}, arguments), options);
// 			},
// 			placeholder: "(__) ____-____"
// 		});
// 	}
// }