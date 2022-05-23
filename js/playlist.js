// điều khiển âm thanh cả page
const volumePanel = document.querySelector('.total-volume-panel');
const volumeRange = volumePanel.querySelector('input');
const volumeProgress = volumePanel.querySelector('.volume-progress');
var tiLeVolume = 1;
var oldTiLeVolume = 1;
volumeRange.addEventListener('input', function (e) {
    volumeProgress.style.width = volumeRange.value + '%';
    tiLeVolume = volumeRange.value / 100;
    updateVolumeAll ();
    if (volumeRange.value == 0) {
        showMuteBtn();
    } else {
        showUnmuteBtn();
    }
});

const muteBtn = document.querySelector('.header-menu-mute');
const unmuteBtn = document.querySelector('.header-menu-unmute');
function updateVolumeAll () {
    for (const [i,a] of music.entries()) {
        a.volume = tiLeVolume * soundVolRange[i].value / 100;
    }
}
function showMuteBtn () {
    muteBtn.style.display = 'block';
    unmuteBtn.style.display = 'none';
}
function showUnmuteBtn () {
    muteBtn.style.display = 'none';
    unmuteBtn.style.display = 'block';
}
unmuteBtn.addEventListener('click', () => {
    showMuteBtn();
    oldTiLeVolume = tiLeVolume;
    tiLeVolume = 0;
    updateVolumeAll();
})
muteBtn.addEventListener('click', () => {
    showUnmuteBtn();
    tiLeVolume = oldTiLeVolume;
    updateVolumeAll();
})

//âm thanh từng sound
var sound = []; //array các sound object
var soundVolRange = []; //array từng cái 
var soundVolProgress = [];
var music = []; // array nhạc để play
var isPlaying = []; //kiểm soát nhạc đang play hay không

const soundList = document.querySelectorAll('.sound-item');
for (var i = 0; i < soundList.length; i++) {
    sound[i] = soundList[i];
    soundVolRange[i] = sound[i].querySelector('input');
    soundVolProgress[i] = sound[i].querySelector('.volume-progress');
    music[i] = new Audio(`./assets/sound/${sound[i].id}.mp3`);
    isPlaying[i] = false;
}

// listen to play/pause nhạc
const items = document.querySelectorAll('.sound-icon');
const soundBar = document.querySelectorAll('.sound-volume')
for (const [i,item] of items.entries()) {
    items[i].addEventListener('click', () => {
        if (!isPlaying[i]) {
            music[i].play();
            isPlaying[i] = true;
            soundBar[i].style.visibility = 'visible';
            items[i].style.opacity = '1';
        } else {
            music[i].pause();
            isPlaying[i] = false;
            soundBar[i].style.visibility = 'hidden';
            items[i].style.opacity = '.5';
        }
    })
}

for (const [i,soundItem] of soundVolRange.entries()) {
    soundItem.addEventListener('input', function (e) {
        soundVolProgress[i].style.width = soundItem.value + '%';
        updateVolumeAll ();
    });
}