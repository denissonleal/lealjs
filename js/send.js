/**
 * Declare the object so that no errors occur
 */

$.support.cors = true;
var serverUrl = "/";

$.each(["put", "delete", "post", "get"], function(i, method) {
  $[method] = function(url, data, callback, fail) {
    var type_user = $('meta[name=type_user]').length ? $('meta[name=type_user]').attr('value') : '';

    var url_complete = serverUrl + '/' + type_user + '/' + url;
    while (url_complete.indexOf("//") >= 0) url_complete = url_complete.replace(/\/\//gi, "/");

    return $.ajax({
      url: url_complete,
      type: method,
      dataType: "json",
      crossDomain: true,
      data: data,
      success: callback,
      error: fail
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
    $.dialog.waiting("Enviando...");
    $.ajax({
      type: "POST",
      url: serverUrl + $(this).attr("action"),
      data: new FormData(this),
      enctype: 'multipart/form-data',
      processData: false, // tell jQuery not to process the data
      contentType: false // tell jQuery not to set contentType
    }).success(success).fail(error).done(function() {
      if ($(".dialog-waiting").length) $.dialog.close();
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
    $.alert("Arquivo inválido!");
  });
};

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name]) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

$.fn.validation = function() {
  var inputs = $(this).find("input, select");
  $(this).find(".has-error").removeClass("has-error");
  $(inputs).removeClass('invalid');
  $(".callback").hide();
  for (var i = 0; i < $(inputs).length; i++) {
    var regex = $(inputs).eq(i).attr('regex');
    if (regex && regex.length && $(inputs).eq(i).is(":enabled")) {
      var val = $(inputs).eq(i).is(":radio") || $(inputs).eq(i).is(":checkbox") ?
        $(this).find("input:" + $(inputs).eq(i).attr("type")).filter("[name='" + $(inputs).eq(i).attr("name") + "']").filter(":checked").val() :
        $(inputs).eq(i).val();
      val = val ? val : "";
      // console.log($(inputs).eq(i).attr("name"), val, regex);
      if (!(new RegExp(regex, "i")).exec(val)) {
        $(inputs).eq(i).closest(".form-group").addClass("has-error").find(".callback").show();
        $(inputs).eq(i).addClass('invalid').focus();
        return false;
      } else {}
    }
  }
  return true;
};

function clone(x) {
  return JSON.parse(JSON.stringify(x));
}
