// A collection of javascript functions for working with custom holostream player controllers

let hspCurrentAudioVolume = 0.5;
let hspMute = false;

function handleSeekDrag()
{
  let videoPlayer = document.getElementById("videoPlayer");
  let seekElem = document.getElementById("hsp-control-seek");
  videoPlayer.currentTime = seekElem.value;
}

/* because chrome doesn't support styling input sliders we use a javascript to style the background of the slider */
function updateProgressStyle(sliderElement) {
  const  value = (sliderElement.value-sliderElement.min)/(sliderElement.max-sliderElement.min)*100;
  sliderElement.style.background = 'linear-gradient(to right, #5d5a5e 0%, #5d5a5e ' + value + '%, #aeaeae ' + value + '%, #aeaeae 100%)'
}

/* called after each HoloStream Update to update the UI/UX */
function handleHoloStreamUpdate(videoPlayerID, seekSliderID, timeFieldID)
{
    let videoPlayer = document.getElementById(videoPlayerID);
    let seekSlider = document.getElementById(seekSliderID);
    let timeField = document.getElementById(timeFieldID);
    seekSlider.max = videoPlayer.duration;
    seekSlider.value = videoPlayer.currentTime;
    timeField.innerText = convertSecondsToMinsSecondsString(videoPlayer.duration,videoPlayer.currentTime);
    updateProgressStyle(seekSlider);
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

/* starts and stops playback */
function togglePlay()
{
  const playIcon = document.querySelector('.hsp-control-play-icon');
  const pauseIcon = document.querySelector('.hsp-control-pause-icon');

  const playStyle = getComputedStyle(playIcon);
  if (playStyle['visibility'] == "visible") {
      toggleVisibility(pauseIcon, playIcon);
      holoStream.handlePlay(true);
  } else {
      toggleVisibility(playIcon, pauseIcon);
      holoStream.handlePlay(false);
  }
}


/* turns on and off audio simultaniously adjusting the position of the volueme control */
function toggleAudioEnabled(hspPlayer)
{
  const audioEnabledIcon = document.querySelector('.hsp-control-audio-enabled-icon');
  const audioDisabledIcon = document.querySelector('.hsp-control-audio-disabled-icon');
  const volumeControl = document.getElementById("hsp-control-volume");
  const videoPlayer = document.getElementById("videoPlayer");

  const audioEnabledStyle = getComputedStyle(audioEnabledIcon);
  if (audioEnabledStyle['visibility'] == "visible") {
    hspCurrentAudioVolume = volumeControl.value;
    videoPlayer.volume = 0;
    volumeControl.value = 0;
    hspMute = true;
    toggleVisibility(audioDisabledIcon, audioEnabledIcon);
  } else {
    videoPlayer.volume = hspCurrentAudioVolume;
    volumeControl.value = hspCurrentAudioVolume;
    toggleVisibility(audioEnabledIcon, audioDisabledIcon);
  }
  updateProgressStyle(volumeControl);
}

function handleAudioControlDrag()
{
  const videoPlayer = document.getElementById("videoPlayer");
  const volumeControl = document.getElementById("hsp-control-volume");
  videoPlayer.volume = volumeControl.value;

  const audioEnabledIcon = document.querySelector('.hsp-control-audio-enabled-icon');
  const audioDisabledIcon = document.querySelector('.hsp-control-audio-disabled-icon');

  if ((hspMute == false) && (volumeControl.value == 0)) {
        toggleVisibility(audioDisabledIcon, audioEnabledIcon);
        hspMute = true;
  }
  if ((hspMute == true) && (volumeControl.value != 0)) {
      toggleVisibility(audioEnabledIcon, audioDisabledIcon);
      hspMute=false;
  }
}

function toggleFullScreen(fullScreenElement)
{
  const maximizeFullScreenIcon = document.querySelector('.hsp-control-maximizeFullScreen-icon');
  const minimizeFullScreenIcon = document.querySelector('.hsp-control-minimizeFullScreen-icon');

  /* check to see if we are in full screen */
  const maximizeFullScreenIconStyle = getComputedStyle(maximizeFullScreenIcon);
  /* if the maximize icon is visible, then we are not in full screen mode */
  if (maximizeFullScreenIconStyle['visibility'] == "visible") {
      toggleVisibility(minimizeFullScreenIcon, maximizeFullScreenIcon);
  } else {
      toggleVisibility(maximizeFullScreenIcon, minimizeFullScreenIcon);
  }
  let fsElem = document.querySelector(fullScreenElement);
  _toggleFullscreen(fsElem); /* this size change is asynchronous so you must use a call back on the toggle fullscreen function if you depend on knowing the new element dimensions after the resize */
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

/* toggling full screen is ayschnronis so you need a call back once the change has completed */
function updateHoloStreamCanvasAfterParentSizeChange()
{
  let fsElem = document.querySelector('.hsp-player');
  let canvas = holoStream.getHoloStreamCanvas();
  let viewPortContainer = document.querySelector('.hsp-viewport-container');
  viewPortContainer.clientWidth = canvas.width = fsElem.clientWidth; //document.width is obsolete
  viewPortContainer.clientHeight = canvas.height = fsElem.clientHeight; //document.height is obsolete
  holoStream.handleResize();
}

/* adjusts the class list to toggle one element hidden and the other visible*/
function toggleVisibility(elementToShow, elementToHide)
{
   elementToHide.classList.remove("hsp-display-element");
   elementToHide.classList.add('hsp-hide-element');
   elementToShow.classList.remove('hsp-hide-element');
   elementToShow.classList.add('hsp-display-element');
}
