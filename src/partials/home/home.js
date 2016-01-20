var homeSubtext = document.querySelector('.home-subtext'),
	homeText = document.querySelector('.home-text'),
	homeButton1 = document.querySelector('.home-text p');

homeButton1.onclick = function() {
	console.log('click works');
	homeText.classList.add('home-text-hide');
	homeSubtext.classList.remove('home-text-hide');
	homeSubtext.classList.add('home-text-show');
}
