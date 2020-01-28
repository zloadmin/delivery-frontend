

/* ************* On Swipe Effects ************* */
document.addEventListener('swiped-down', function(e) {
	setTimeout(function(){
		let wPos = window.pageYOffset;

		if ( wPos == 0 ) {
			document.querySelector('.header').classList.add("animated");

			setTimeout(function(){
				document.querySelector('.header').classList.remove("animated");
			},350);
		}
	},100)
});

/* ************* Controls ************* */





/* ************* Functions ************* */


