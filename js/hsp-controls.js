// A collection of javascript functions for working with custom holostream player controllers

let hspCurrentAudioVolume;
let hspMute = false;

function togglePlay()
{
  const playIcon = document.querySelector('.hsp-control-play-icon');
  const pauseIcon = document.querySelector('.hsp-control-pause-icon');

  const playStyle = getComputedStyle(playIcon);
  if (playStyle['visibility'] == "visible") {
      playIcon.classList.remove("hsp-control-icon-visible");
      playIcon.classList.add('hsp-control-icon-hidden');
      pauseIcon.classList.remove('hsp-control-icon-hidden');
      pauseIcon.classList.add('hsp-control-icon-visible');
      holoStream.handlePlay(true);
  } else {
      pauseIcon.classList.remove("hsp-control-icon-visible");
      pauseIcon.classList.add('hsp-control-icon-hidden');
      playIcon.classList.remove('hsp-control-icon-hidden');
      playIcon.classList.add('hsp-control-icon-visible');
      holoStream.handlePlay(false);
  }
}
function toggleAudioMuted(hspPlayer)
{
  const audioOnIcon = document.querySelector('.hsp-control-audio-icon');
  const audioMuteIcon = document.querySelector('.hsp-control-audio-mute-icon');

  const audioOnStyle = getComputedStyle(audioOnIcon);
  if (audioOnStyle['visibility'] == "visible") {
      muteAudio(audioOnIcon, audioMuteIcon)
  } else {
      unMuteAudio(audioOnIcon, audioMuteIcon)
  }
}

function muteAudio(audioOnIcon, audioMuteIcon)
{
    let volumeControl = document.getElementById("hsp-control-volume");
    let videoPlayer = document.getElementById("videoPlayer");

    hspCurrentAudioVolume = volumeControl.value;
    videoPlayer.volume = 0;
    volumeControl.value = 0;
    audioOnIcon.classList.remove("hsp-control-icon-visible");
    audioOnIcon.classList.add('hsp-control-icon-hidden');
    audioMuteIcon.classList.remove('hsp-control-icon-hidden');
    audioMuteIcon.classList.add('hsp-control-icon-visible');
    hspMute = true;

}
function unMuteAudio(audioOnIcon, audioMuteIcon)
{
      let volumeControl = document.getElementById("hsp-control-volume");
      let videoPlayer = document.getElementById("videoPlayer");

      volumeControl.value = hspCurrentAudioVolume;
      videoPlayer.volume = hspCurrentAudioVolume;

      audioMuteIcon.classList.remove("hsp-control-icon-visible");
      audioMuteIcon.classList.add('hsp-control-icon-hidden');
      audioOnIcon.classList.remove('hsp-control-icon-hidden');
      audioOnIcon.classList.add('hsp-control-icon-visible');
      hspMute = false;
}

function handleAudioControlDrag()
{
  let videoPlayer = document.getElementById("videoPlayer");
  let volumeControl = document.getElementById("hsp-control-volume");
  videoPlayer.volume = volumeControl.value;

  const audioOnIcon = document.querySelector('.hsp-control-audio-icon');
  const audioMuteIcon = document.querySelector('.hsp-control-audio-mute-icon');
  if ((hspMute == false) && (volumeControl.value == 0)) {
      muteAudio(audioOnIcon, audioMuteIcon)
  }
  if ((hspMute == true) && (volumeControl.value != 0)) {
      unMuteAudio(audioOnIcon, audioMuteIcon)
  }
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
  let fsElem = document.querySelector(fullScreenElement);
  _toggleFullscreen(fsElem);
  let canvas = holoStream.getHoloStreamCanvas();
  let viewPortContainer = document.querySelector('.hsp-viewport-container');

  console.log(fsElem);

  console.log(fsElem.clientWidth);
  console.log(fsElem.clientHeight);

  viewPortContainer.clientWidth = canvas.clientWidth = fsElem.clientWidth; //document.width is obsolete
  viewPortContainer.clientHeight = canvas.clientHeight = fsElem.clientHeight; //document.height is obsolete

  holoStream.handleResize();
}

function updateHoloStreamCanvasAfterParentSizeChange()
{
  console.log("We got an update");
  let fsElem = document.querySelector('.hsp-player-container');
  console.log(fsElem.clientWidth);
  console.log(fsElem.clientWidth);
  let canvas = holoStream.getHoloStreamCanvas();
  let viewPortContainer = document.querySelector('.hsp-viewport-container');
  viewPortContainer.clientWidth = canvas.width = fsElem.clientWidth; //document.width is obsolete
  viewPortContainer.clientHeight = canvas.height = fsElem.clientHeight; //document.height is obsolete
  holoStream.handleResize();

}

/* cross browser toggle full screen command */
function _toggleFullscreen(elem) {
  elem = elem || document.documentElement;

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


/* called after each HoloStream Update to update the UI/UX */
function handleHoloStreamUpdate(elementID, progressSlider, timeElement)
{
    let videoPlayer = document.getElementById(elementID);
    let progressElem = document.getElementById(progressSlider);
    let timeElem = document.getElementById(timeElement);
    progressElem.max = videoPlayer.duration;
    progressElem.value = videoPlayer.currentTime;
    timeElem.innerText = convertSecondsToMinsSecondsString(videoPlayer.duration,videoPlayer.currentTime);
}

function handleProgressDrag()
{
  let videoPlayer = document.getElementById("videoPlayer");
  let progressElem = document.getElementById("hsp-control-progress");
  videoPlayer.currentTime = progressElem.value;
}

function getHoloStreamDuration(elementID)
{
  let videoPlayer = document.getElementById(elementID);
  return videoPlayer.duration;
}

function getHoloStreamCurrentTime(elementID)
{
  let videoPlayer = document.getElementById(elementID);
  return videoPlayer.currentTime;
}

function convertSecondsToMinsSecondsString(totalClipDuration,seconds)
{
  var countDown = Math.abs(seconds-totalClipDuration);
  var minutes = Math.round(countDown / 60);
  return "-"+minutes.toString().padStart(2,"0") + ":" + Math.floor((countDown % 60)).toString().padStart(2,"0");
}


/* below here is verified */

/* adjusts the class list to toggle one element hidden and the other visible*/
function toggleVisibility(elementToShow, elementToHide)
{
   elementToHide.classList.remove("hsp-display-element");
   elementToHide.classList.add('hsp-hide-element');
   elementToShow.classList.remove('hsp-hide-element');
   elementToShow.classList.add('hsp-display-element');
}
