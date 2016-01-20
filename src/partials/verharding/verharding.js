'use strict';

function eventFire (el, etype) {
  var evObj;

  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

if (selectAttr('data-map-click')) {
  eventFire(document.querySelector('.year-control-input'), 'click');
}
