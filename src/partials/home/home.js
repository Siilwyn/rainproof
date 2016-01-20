if (selectAttr('data-home-text')) {
	var homeSubtext = selectAttr('data-home-subtext'),
		homeText = selectAttr('data-home-text'),
		homeButton1 = selectAttr('data-home-text');

	homeButton1.onclick = function() {
		console.log('click works');
		homeText.classList.add('home-text-hide');
		homeSubtext.classList.remove('home-text-hide');
		homeSubtext.classList.add('home-text-show');
	}
};
