// Gulp Tasks
var elixir = require('laravel-elixir');

elixir.config.assetsPath = '';
elixir.config.publicPath = 'dist';

// Extensions
require('laravel-elixir-stylus')


elixir(function(mix) {
	// Js
	mix.scripts('*.js', 'dist/leal.min.js');

	// CSS
	mix.stylus('config.styl', 'dist/leal.min.css');

	// Browser Sync
	mix.browserSync({
		proxy: 'localhost:8000'
	});
});
