/**
 * Necessário declarar o objeto para que não ocorram erros
 */

function back_button() {
  if ( $(".dialog").length ) {
    if(!$(".dialog-waiting").length)
      $.dialog.close();
    return false;
  }

  if($(".gdatepicker").length) {
    $.gdatepicker.close();
    return false;
  }

  if (typeof $.ctrl[current_page].back != "undefined" ) {
    $.ctrl[current_page].back();
    return false;
  }

  if (location.hash.length) {
    redirect('');
    return false;
  }

  $.dialog.confirm("", "Deseja fechar o aplicativo?", function() {
    navigator.app.exitApp();
  });
}

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}

$.fn.broken = function(img) {
  $(this).error(function () {
    var img = $(this).attr('broken');
    if ( $(this).attr('src') != img ) $(this).attr('src', img);
  }).attr('broken', img);
}

Number.prototype.format = function(c, d, t){
  var n = this,
  c = isNaN(c = Math.abs(c)) ? 2 : c,
  d = d == undefined ? "." : d,
  t = t == undefined ? "," : t,
  s = n < 0 ? "-" : "",
  i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
  j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
            + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

$(function() {
  toggle_mask();
  $('html').on('click', '.back-history', function(){ history.back(); });
  if ($('[data-toggle="tooltip"]').tooltip) {
    setInterval(function() {
      $('[data-toggle="tooltip"]').not('.tooltip-setted').addClass('tooltip-setted').tooltip();
    }, 5000);
  }
});

function toggle_mask() {
  if( $("input").mask ) {
    $('.mask-date').unmask().mask('00/00/0000', {  });
    $('.mask-time').unmask().mask('00:00:00', { placeholder: "__:__:__" });
    $('.mask-date-time').unmask().mask('00/00/0000 00:00:00', { placeholder: "__/__/____ __:__:__" });
    $('.mask-cep').unmask().mask('00000-000', { placeholder: "_____-___" });
    // $('.mask-phone').mask('(00) 0000-0000');
    $('.mask-cpf').unmask().mask('000.000.000-00', {placeholder: "___.___.___-__"});
    $('.mask-cns').unmask().mask('000 0000 0000 0000', {placeholder: "___ ____ ____ ____"});
    $('.mask-cnpj').unmask().mask('00.000.000/0000-00', {placeholder: "__.___.___/____-__"});
    $('.mask-money').unmask().mask('000.000.000.000.000,00', {reverse: true});
    $('.mask-thousand').unmask().mask('000 000 000 000 000', {reverse: true});
    $('.mask-number').unmask().mask('#', {reverse: true});

    $('.mask-phone').unmask().mask(function (val) {
      return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    }, {
      onKeyPress: function(val, e, field, options) {
        // field.mask(maskBehavior.apply({}, arguments), options);
      },
      placeholder: "(__) ____-____"
    });
  }
}

function update_masks() {
  $(".mask-cpf, .mask-phone, .mask-date, .mask-time, .mask-date, .mask-cpf, .mask-money, .mask-number").trigger('keyup');
}

function error_send() {
  $.dialog.info("Erro", "Erro ao enviar informações");
}

function error_load() {
  $.dialog.info("Erro", "Erro ao carregar informações");
}

function img_error(img_class, img) {
  var img_class = typeof img_class == 'undefined' ? ".img-avatar" : img_class;
  var img = typeof img == 'undefined' ? '/images/user-default.png' : img;
  $(img_class).unbind("error").on("error", { img: img }, function (e) {
    // var img = '/images/user-default.png';
    if ( $(this).attr('src') != e.data.img ) $(this).attr('src', e.data.img);
  });
}

$(".img-avatar", "#birthdays").error(function () {
  var img = '/images/user-default.png';
  if ( $(this).attr('src') != img ) $(this).attr('src', img);
});


Function.prototype.bind = function(scope) {
  var _function = this;

  return function() {
    return _function.apply(scope, arguments);
  }
}

$.fn.toClean = function() {
  $('.to-clean', this).html('');
}

$.fn.toDefault = function() {
  $('.to-clean', this).each(function(i) {
    var tmp = $(this).attr('default');
    if ( !tmp ) tmp = '';
    if ( !$(this).html().length ) $(this).html(tmp);
  });
}

function removeAccents(str) {
  var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
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
}
