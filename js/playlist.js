if (!loginStatus) {
    window.location.pathname = '/index.html'
}

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
            music[i].loop = true;
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
const slideItems = document.querySelectorAll(".slider-item");

var currentPos = 0;
let slideLength = slideItems.length;

const rightClone1 = slideItems[0].cloneNode(true);
const rightClone2 = slideItems[1].cloneNode(true);
const rightClone3 = slideItems[2].cloneNode(true);
const leftClone1 = slideItems[slideLength-1].cloneNode(true);
const leftClone2 = slideItems[slideLength-2].cloneNode(true);
const leftClone3 = slideItems[slideLength-3].cloneNode(true);

slider.append(rightClone1);
slider.append(rightClone2);
slider.append(rightClone3);
slider.prepend(leftClone1);
slider.prepend(leftClone2);
slider.prepend(leftClone3);

let itemWidth = slideItems[currentPos].clientWidth + 20; //thêm 10 margin và 10 border
window.addEventListener('resize', () => {
    itemWidth = slideItems[currentPos].clientWidth + 20;
})

const moveToPos = (i) => {
    slider.style.transform = `translateX(${-itemWidth * i -20}px)`;
}
slider.addEventListener('transitionend', () => {
    if (currentPos > slideLength) {
        slider.style.transition = 'none';
        currentPos -= slideLength;
        moveToPos(currentPos);
    }
    if (currentPos < 1) {
        slider.style.transition = 'none';
        currentPos += slideLength;
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

const updatePlaylist = () => {
    if (playingPlaylist > -1) {
        stopPlaylist(playingPlaylist);
    }
    currentPlaylist = currentPos;
    if (playingPlaylist != currentPlaylist){
        playingPlaylist = currentPlaylist;
        startPlaylist(currentPlaylist);   
    } else {
        playingPlaylist = -1;
        stopPlaylist(currentPlaylist);
    }
}

for (const [i, slideItem] of slideItems.entries()) {
    slideItem.addEventListener('click', () => {
        currentPos = i+1;
        slider.style.transition = '.5s ease-out';
        moveToPos(currentPos);
        updatePlaylist();
    })
}
rightClone1.addEventListener('click', () => {
    moveNext();
    if (currentPos == slideLength) {
        moveNext();
    }
    if (currentPos > slideLength) {
        slider.style.transition = 'none';
        currentPos -= slideLength;
        moveToPos(currentPos);
    }
    updatePlaylist();
})
rightClone2.addEventListener('click', () => {
    moveNext();
    moveNext();
    if (currentPos > slideLength) {
        slider.style.transition = 'none';
        currentPos -= slideLength;
        moveToPos(currentPos);
    }
    updatePlaylist();
})
leftClone1.addEventListener('click', () => {
    if(currentPos != 0) {
        movePrevious();
        if (currentPos == 1) {
            movePrevious();
        }
    }   
    if (currentPos < 1) {
        slider.style.transition = 'none';
        currentPos += slideLength;
        moveToPos(currentPos);
    }
    updatePlaylist();
})
leftClone2.addEventListener('click', () => {
    movePrevious();
    movePrevious();
    if (currentPos < 1) {
        slider.style.transition = 'none';
        currentPos += slideLength;
        moveToPos(currentPos);
    }
    updatePlaylist();
})

//phát nhạc theo slider
var playingPlaylist = -1;
var currentPlaylist = -1;
const playlist = (a,b,c) => {
    if (!isPlaying[a]) {
        music[a].play();
        music[a].loop = true;
        isPlaying[a] = true;
        soundBar[a].style.visibility = 'visible';
        soundItems[a].style.opacity = '1';
    }
    if (!isPlaying[b]) {
        music[b].play();
        music[b].loop = true;
        isPlaying[b] = true;
        soundBar[b].style.visibility = 'visible';
        soundItems[b].style.opacity = '1';
    }
    if (!isPlaying[c]) {
        music[c].play();
        music[c].loop = true;
        isPlaying[c] = true;
        soundBar[c].style.visibility = 'visible';
        soundItems[c].style.opacity = '1';
    }
}
const pauselist = (a,b,c) => {
    if (isPlaying[a]) {
        music[a].pause();
        isPlaying[a] = false;
        soundBar[a].style.visibility = 'hidden';
        soundItems[a].style.opacity = '.5';
    }
    if (isPlaying[b]) {
        music[b].pause();
        isPlaying[b] = false;
        soundBar[b].style.visibility = 'hidden';
        soundItems[b].style.opacity = '.5';
    }
    if (isPlaying[c]) {
        music[c].pause();
        isPlaying[c] = false;
        soundBar[c].style.visibility = 'hidden';
        soundItems[c].style.opacity = '.5';
    }
}

const startPlaylist = (code) => {
    switch (code) {
        case 1:
            playlist(0,1,5);
            soundVolRange[1].value = 40;
            break;
        case 2:
            playlist(0,6,7);
            soundVolRange[0].value = 50;
            soundVolRange[7].value = 15;
            break;
        case 3:
            playlist(3,7,8);
            soundVolRange[8].value = 50;
            soundVolRange[7].value = 5;
            break;
        case 4:
            playlist(1,3,8);
            soundVolRange[1].value = 50;
            soundVolRange[3].value = 50;
            soundVolRange[8].value = 50;
            break;
        case 5:
            playlist(4,5,8);
            break;
        case 6:
            playlist(2,7,6);
            soundVolRange[7].value = 5;
            break;
        case 7:
            playlist(Math.floor(Math.random() * 9),Math.floor(Math.random() * 9),Math.floor(Math.random() * 9));
            break;      
    }
    slideItems[code-1].style.opacity = '1';
    updateVolumeAll();
}
const stopPlaylist = (code) => {
    switch (code) {
        case 1:
            pauselist(0,1,5);
            break;
        case 2:
            pauselist(0,6,7);
            break;
        case 3:
            pauselist(3,7,8);
            break;
        case 4:
            pauselist(1,3,8);
            break;
        case 5:
            pauselist(4,5,8);
            break;
        case 6:
            pauselist(2,7,6);
            break;
        case 7:
            pauselist(0,1,2);
            pauselist(3,4,5);
            pauselist(6,7,8);
            break;      
    }
    slideItems[code-1].style.opacity = '.5';
    updateVolumeAll();
}


