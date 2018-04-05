process.env.DISABLE_NOTIFIER = true;

var elixir = require('laravel-elixir');

elixir.config.assetsPath = '';
elixir.config.publicPath = 'dist';

elixir(function(mix) {
	mix.scripts('*.js', 'dist/leal.min.js')
		.copy('dist/leal.min.js', 'demo/leal.min.js');
});
