// Gulp Tasks
var elixir				= require('laravel-elixir'),
		autoprefixer	= require('autoprefixer'),
		postStylus		= require('poststylus'),
		lost					= require('lost'),
		mqpacker			= require('css-mqpacker');

elixir.config.assetsPath = '';
elixir.config.publicPath = 'dist';

// Extensions
require('laravel-elixir-stylus')


elixir(function(mix) {
	// Js
	mix.scripts('*.js', 'dist/leal.min.js');

	// Stylus config
	var config = [
		lost(),
		mqpacker(),
		autoprefixer()
  ];
	mix.stylus('config.styl', 'dist/leal.min.css', {
		use: [postStylus(config)]
	});

	mix.copy('fonts', 'dist/fonts');

	// Browser Sync
	mix.browserSync({
		proxy: 'localhost:8000'
	});
});
