var elixir = require('laravel-elixir');

elixir.config.assetsPath = '';
elixir.config.publicPath = 'dist';
// elixir.config.viewPath =
// console.log(elixir.config);
elixir(function(mix) {
	mix.scripts('js/*.js', 'dist/leal.min.js');
	mix.styles('css/*.css', 'dist/leal.min.css');
//     mix.sass('app.scss');
});
