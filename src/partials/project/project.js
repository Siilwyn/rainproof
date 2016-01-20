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
}
