$(function() {
  $.alert = function(m, t) {
    t = t || 5000;
    id = "toast-" + Date.now();

    $("#toast-container").show(0);

    html = '<div id="' + id + '" class="toast-alert toast">\
              <div class="toast-message">' + (m || '') + '</div>\
              <div class="material-icons toast-close" hidden>&#xE5CD;</div>\
            </div>';

    $("#toast-container").append(html);
    id = '#' + id;

    $(id).addClass("toast-show");
    $(".toast-close", id).click(function() {
      var toast = $(this).closest(".toast");
      $(toast).removeClass("toast-show");
      setTimeout(function(toast) {
        $(toast).remove();
      }, 300, toast);
    });

    if (t > 0) {
      setTimeout(function(id) {
        $(".toast-close", id).click();
      }, t, id);
    }

    return id;
  }
  $('body').append($('<div>', { 'id': 'toast-container' }));
});
