var videoButton = document.querySelector('.project-video-button');
var video = document.querySelector('.project-video');

videoButton.onclick = function() {
	video.classList.remove('project-video-hide');
	video.classList.add('project-video-show');
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode === 27) {
        video.classList.remove('project-video-show');
    }
};