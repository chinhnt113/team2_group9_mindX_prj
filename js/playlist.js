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
const soundItems = document.querySelectorAll('.sound-icon');
const soundBar = document.querySelectorAll('.sound-volume')
for (const [i,item] of soundItems.entries()) {
    soundItems[i].addEventListener('click', () => {
        if (!isPlaying[i]) {
            music[i].play();
            isPlaying[i] = true;
            soundBar[i].style.visibility = 'visible';
            soundItems[i].style.opacity = '1';
        } else {
            music[i].pause();
            isPlaying[i] = false;
            soundBar[i].style.visibility = 'hidden';
            soundItems[i].style.opacity = '.5';
        }
    })
}

for (const [i,soundItem] of soundVolRange.entries()) {
    soundItem.addEventListener('input', function (e) {
        soundVolProgress[i].style.width = soundItem.value + '%';
        updateVolumeAll ();
    });
}

//slider
const slider = document.querySelector(".slider-container-tracker");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const items = document.querySelectorAll(".slider-item");

var currentPos = 0;
const slideLength = items.length;

const rightClone1 = items[0].cloneNode(true);
const rightClone2 = items[1].cloneNode(true);
const rightClone3 = items[2].cloneNode(true);
const leftClone1 = items[slideLength-1].cloneNode(true);
const leftClone2 = items[slideLength-2].cloneNode(true);
const leftClone3 = items[slideLength-3].cloneNode(true);

slider.append(rightClone1);
slider.append(rightClone2);
slider.append(rightClone3);
slider.prepend(leftClone1);
slider.prepend(leftClone2);
slider.prepend(leftClone3);

const itemWidth = items[currentPos].clientWidth + 20; //thêm 10 margin và 10 border

const moveToPos = (i) => {
    slider.style.transform = `translateX(${-itemWidth * i -20}px)`;
}
slider.addEventListener('transitionend', () => {
    if (currentPos === slideLength + 1) {
        slider.style.transition = 'none';
        currentPos = 1;
        moveToPos(currentPos);
    }
    if (currentPos === 0) {
        slider.style.transition = 'none';
        currentPos = slideLength;
        moveToPos(currentPos);
    }
})
const moveNext = () => {
    currentPos ++;
    slider.style.transition = '.5s ease-out';
    moveToPos(currentPos);
}
const movePrevious = () => {
    currentPos --;
    slider.style.transition = '.5s ease-out';
    moveToPos(currentPos);
}
btnLeft.addEventListener('click', () => {
    movePrevious();
})
btnRight.addEventListener('click', () => {
    moveNext();
})

