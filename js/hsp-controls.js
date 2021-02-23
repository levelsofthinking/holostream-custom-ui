// A collection of javascript functions for working with custom holostream player controllers

function togglePlay(hspPlayer)
{
  const playIcon = document.querySelector('.hsp-control-play-icon');
  const pauseIcon = document.querySelector('.hsp-control-pause-icon');

  const playStyle = getComputedStyle(playIcon);
  if (playStyle['visibility'] == "visible") {
      playIcon.classList.remove("hsp-control-icon-visible");
      playIcon.classList.add('hsp-control-icon-hidden');
      pauseIcon.classList.remove('hsp-control-icon-hidden');
      pauseIcon.classList.add('hsp-control-icon-visible');
  } else {
      pauseIcon.classList.remove("hsp-control-icon-visible");
      pauseIcon.classList.add('hsp-control-icon-hidden');
      playIcon.classList.remove('hsp-control-icon-hidden');
      playIcon.classList.add('hsp-control-icon-visible');
  }
  console.log("They pressed the play button");
}
function toggleAudioMuted(hspPlayer)
{
  const audioOnIcon = document.querySelector('.hsp-control-audio-icon');
  const audioMuteIcon = document.querySelector('.hsp-control-audio-mute-icon');

  const audioOnStyle = getComputedStyle(audioOnIcon);
  if (audioOnStyle['visibility'] == "visible") {
      audioOnIcon.classList.remove("hsp-control-icon-visible");
      audioOnIcon.classList.add('hsp-control-icon-hidden');
      audioMuteIcon.classList.remove('hsp-control-icon-hidden');
      audioMuteIcon.classList.add('hsp-control-icon-visible');
  } else {
      audioMuteIcon.classList.remove("hsp-control-icon-visible");
      audioMuteIcon.classList.add('hsp-control-icon-hidden');
      audioOnIcon.classList.remove('hsp-control-icon-hidden');
      audioOnIcon.classList.add('hsp-control-icon-visible');
  }
  console.log("They pressed the toggle mute button");
}

function toggleFullScreen(fullScreenElement)
{
  const maximizeFullScreenIcon = document.querySelector('.hsp-control-maximizeFullScreen-icon');
  const minimizeFullScreenIcon = document.querySelector('.hsp-control-minimizeFullScreen-icon');

  const maximizeFullScreenIconStyle = getComputedStyle(maximizeFullScreenIcon);
  if (maximizeFullScreenIconStyle['visibility'] == "visible") {
      maximizeFullScreenIcon.classList.remove("hsp-control-icon-visible");
      maximizeFullScreenIcon.classList.add('hsp-control-icon-hidden');
      minimizeFullScreenIcon.classList.remove('hsp-control-icon-hidden');
      minimizeFullScreenIcon.classList.add('hsp-control-icon-visible');
  } else {
      minimizeFullScreenIcon.classList.remove("hsp-control-icon-visible");
      minimizeFullScreenIcon.classList.add('hsp-control-icon-hidden');
      maximizeFullScreenIcon.classList.remove('hsp-control-icon-hidden');
      maximizeFullScreenIcon.classList.add('hsp-control-icon-visible');
  }
  console.log("They pressed the toggle full screen button");
  _toggleFullscreen(document.querySelector(fullScreenElement));
}

/* cross browser toggle full screen command */
function _toggleFullscreen(elem) {
  console.log("entered _toggleFullScreen");
  elem = elem || document.documentElement;
  console.log(elem);
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
