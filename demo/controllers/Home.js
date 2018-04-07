l.controller('home', function() {

	this.initialize = function() {
		l.initial('home');
	};

	this.show = function() {
		document.querySelector(this.view).style.display = '';
		alert();
	};
});