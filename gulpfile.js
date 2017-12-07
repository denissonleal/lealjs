// Gulp Tasks
var elixir				= require('laravel-elixir');

elixir.config.assetsPath = '';
elixir.config.publicPath = 'dist';

elixir(function(mix) {
	// Js
	mix.scripts('*.js', 'dist/leal.min.js');
});
