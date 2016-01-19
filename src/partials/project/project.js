if (selectAttr('data-project-video')) {
	var video = selectAttr('data-project-video');
	var videoButton = selectAttr('data-project-video-button');
	var videoBackground = selectAttr('data-project-container-img');

	videoButton.onclick = function () {
		video.classList.remove('project-video-hide');
		video.classList.add('project-video-show');
		videoBackground.classList.add('project-container-img-videomodus');
	};

	document.onkeydown = function (evt) {
		evt = evt || window.event;
		if (evt.keyCode === 27) {
			video.classList.remove('project-video-show');
			videoBackground.classList.remove('project-container-img-videomodus');
		}
	};


	 function is_touch_device() {
  return 'ontouchstart' in window // works on most browsers 
      || 'onmsgesturechange' in window; // works on ie10
  };
  is_touch_device();

	 /* Every time the window is scrolled ... */
  $(window).scroll( function(){ 
      /* Check the location of each desired element */
      $('.hideme').each( function(i){
          var bottom_of_object = $(this).offset().top + $(this).outerHeight();
          var bottom_of_window = $(window).scrollTop() + $(window).height();
          
          /* If the object is completely visible in the window, fade it it */
          if (is_touch_device == true) {
            if( bottom_of_window > (bottom_of_object - 300) ){ 
                $(this).animate({'opacity':'1'},1000);     
            } if( (bottom_of_window > (bottom_of_object + 150)) && $(this).hasClass('showslow') ){
                    $(this).animate({'opacity':'1'},500);  
            };
          }
          else {
            if( bottom_of_window > (bottom_of_object - 150) ){ 
                $(this).animate({'opacity':'1'},1000);     
            } if( (bottom_of_window > (bottom_of_object + 100)) && $(this).hasClass('showslow') ){
                    $(this).animate({'opacity':'1'},500);  
            };
          };   
      });
  });
}

