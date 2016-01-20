if (selectAttr('data-map-click')) {

	console.log('works');
	
	function eventFire(el, etype){
	  if (el.fireEvent) {
	    el.fireEvent('on' + etype);
	  } else {
	    var evObj = document.createEvent('Events');
	    evObj.initEvent(etype, true, false);
	    el.dispatchEvent(evObj);
	  }
	}

	eventFire(document.querySelector('.year-control-input'), 'click');
};