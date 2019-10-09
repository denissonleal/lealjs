/**
 * Declare the object so that no errors occur
 */

$.ctrl = {};
var current_page = "";

$.view = function(name, done) {
  name = name.replace("#", "").replace(".", "/");
  $.ajax({
    url: "views/" + name + ".html",
    type: "GET",
    dataType: "html",
    success: function(data) {
      $(".app").append(data);
    },
    error: function() {
      $.alert("[$.view] caminho inválido");
    }
  }).done(done);
};

$.controller = function(name) {
  name = name.replace("#", "").replace(".", "/");
  $.ajax({
    url: "js/controllers/" + name + ".js",
    type: "GET",
    dataType: "script",
    async: false,
    error: function() {
      console.error("[$.controller] caminho inválido");
      // location.hash = "error";
    }
  });
};

function routes(e) { //console.log('routes');
  hash = argument(0);
  if (!hash) {
    redirect(initial_hash);
    return false;
  }

  $(".all-views").hide();
  $(".active", ".sidebar-menu-items").removeClass("active");

  if (typeof $.ctrl[hash] == 'undefined') $.controller(hash);
  else $.ctrl[hash].show();
  current_page = hash;
}

function redirect(route) {
  var hash = location.hash.replace('#', '');
  if (typeof route == 'object') route = route.join('/');
  route = route.replace('#', '');
  if (route == hash)
    routes();
  else
    location.hash = route;
}

function controller(id, obj) {
  if (typeof obj == 'function') {
    var c = new obj();

    for (var i in c) {
      if (typeof c[i] == 'function') {
        c[i] = c[i].bind(c);
      }
    }
    if (!c.view) c.view = '#' + id;

    $.ctrl[id] = c;
  } else
    $.ctrl[id] = obj;

  if (typeof $.ctrl[id].initialize == 'function')
    $($.ctrl[id].initialize);
}

var initial_hash = '';

function initial(hash) {
  initial_hash = hash;
}

function argument(i) {
  var hash = location.hash.replace('#', '').split('/');
  if (hash.length > 1 && !hash[0].length) i++;
  return (typeof hash[i] == 'undefined' ? null : hash[i]);
}

$(function() {
  $(window).on('hashchange', routes);
  setTimeout(routes, 200);
});
