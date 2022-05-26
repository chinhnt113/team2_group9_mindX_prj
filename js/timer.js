var currentUser = sessionStorage.getItem('currentAccount');
var currentData = JSON.parse(localStorage.getItem(currentUser));
var mins = currentData.mins;
var secs = currentData.secs;
var timeOut = false;

document.querySelector('.time-count-min').innerText = pad(mins);
document.querySelector('.time-count-sec').innerText = pad(secs);

const playBtn = document.querySelector('.timer-play');
const pauseBtn = document.querySelector('.timer-pause');
const resetBtn = document.querySelector('.timer-reset');

playBtn.addEventListener('click', () => {
    playBtn.classList.add('is-hidden');
    pauseBtn.classList.remove('is-hidden');
    var countDown = setInterval( ()=> {  
        secs--;
        if(secs == -1){
            mins -= 1;
            secs = 59;
        }
        if(mins == -1){
            mins = currentData.mins;
            secs = currentData.secs;
            clearTimeout(countDown);
            pauselist(0,1,2);
            pauselist(3,4,5);
            pauselist(6,7,8);
            playBtn.classList.remove('is-hidden');
            pauseBtn.classList.add('is-hidden');
        }
        document.querySelector('.time-count-min').innerText = pad(mins);
        document.querySelector('.time-count-sec').innerText = pad(secs);
    },1000)

    pauseBtn.addEventListener('click', () => {
        playBtn.classList.remove('is-hidden');
        pauseBtn.classList.add('is-hidden');
        clearTimeout(countDown);
        console.log('pause');
    });
});

resetBtn.addEventListener('click', () => {
    mins = currentData.mins;
    secs = currentData.secs;
    document.querySelector('.time-count-min').innerText = pad(mins);
    document.querySelector('.time-count-sec').innerText = pad(secs);
    console.log('reset');
});

