// Get element
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// Build our functions
function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  toggle.textContent = this.paused ? `►` : '||';
  console.log('kmklmnl');
}

function skip() {
  console.log('mkmklm', this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  console.log('ermkgne', video.currentTime, video.duration);
  const percent = (video.currentTime/video.duration)*100;
  console.log('rmekrn', parseInt(percent));
  progressBar.style.flexBasis = `${parseInt(percent)}%`;
}

function scrub(e) {
  let x = e.offsetX;
  const scrubTime = (x/progress.offsetWidth)*video.duration;
  video.currentTime = scrubTime;
  console.log('emkgme', e);
}
// Hook up event listners

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('mousemove', 
  handleRangeUpdate));

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);  
  progress.addEventListener('mouseup', () => mousedown = false);