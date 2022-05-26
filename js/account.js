var loginStatus = sessionStorage.getItem('loginStatus');

if (loginStatus == 'false') {
    // window.location.pathname = '/index.html';
    history.back();
}

//thay đổi các tab 
const navProfile = document.querySelector('.nav-profile');
const navTimer = document.querySelector('.nav-timer');
const showingProfile = document.querySelector('.account-info');
const showingTimer = document.querySelector('.account-timer');

navProfile.addEventListener('click', ()=> {
    navProfile.classList.remove('is-showing');
    navTimer.classList.remove('is-showing');
    navProfile.classList.add('is-showing');
    showingProfile.classList.remove('is-hidden');
    showingTimer.classList.remove('is-hidden');
    showingTimer.classList.add('is-hidden');
})
navTimer.addEventListener('click', ()=> {
    navProfile.classList.remove('is-showing');
    navTimer.classList.remove('is-showing');
    navTimer.classList.add('is-showing');
    showingProfile.classList.remove('is-hidden');
    showingTimer.classList.remove('is-hidden');
    showingProfile.classList.add('is-hidden');
})

var currentUserorEmail = sessionStorage.getItem('currentAccount');
var currentData = JSON.parse(localStorage.getItem(currentUserorEmail));
var currentUser = currentData.username;
var currentEmail = currentData.email;

var info_username = document.querySelector('#username');
var info_email = document.querySelector('#email');
var info_fname = document.querySelector('#fname');
var info_lname = document.querySelector('#lname');
var timer_mins = document.querySelector('#timer_min');
var timer_secs = document.querySelector('#timer_sec');

info_username.value = currentData['username'];
info_email.value = currentData['email'];
info_fname.value = currentData['firstName'];
info_lname.value = currentData['lastName'];
timer_mins.value = pad(currentData['mins']);
timer_secs.value = pad(currentData['secs']);

function updateProfile(e) {
    event.preventDefault();
    var noti1 = document.querySelector('.messProfile');
    currentData.firstName = info_fname.value;
    currentData.lastName = info_lname.value;

    var json = JSON.stringify(currentData);
    localStorage.setItem(currentUser, json);
    localStorage.setItem(currentEmail, json);

    noti1.innerHTML='Success!';
    setTimeout(()=>{
        noti1.innerHTML='';
    },3000)
}

function updatePassword(e) {
    event.preventDefault();
    var pwd_current = document.getElementById('currentPwd');
    var pwd_new = document.getElementById('newPwd');
    var pwd_repeat = document.getElementById('repeatPwd');
    var noti2 = document.querySelector('.messPassword');

    if (pwd_new.value != pwd_repeat.value) {
        noti2.innerHTML = 'Please repeat new password correctly.';
        noti2.style.color = 'red';
    } else if (pwd_current.value != currentData['password']) {
        noti2.innerHTML = 'Please input correct password.';
        noti2.style.color = 'red';
    } else {
        currentData.password = pwd_new.value;

        var json = JSON.stringify(currentData);
        localStorage.setItem(currentUser, json);
        localStorage.setItem(currentEmail, json);

        noti2.innerHTML='Success!';
        noti2.style.color = '#57c9a1';
        setTimeout(()=>{
            noti2.innerHTML='';
        },3000)
    }
}

function logout() {
    sessionStorage.setItem('loginStatus', 'false');
    sessionStorage.removeItem('currentAccount');
    window.location.pathname = '/index.html';
}

function updateTimer(e) {
    event.preventDefault();
    var noti3 = document.querySelector('.messTimer');
    currentData.mins = pad(timer_mins.value);
    currentData.secs = pad(timer_secs.value);

    var json = JSON.stringify(currentData);
    localStorage.setItem(currentUser, json);
    localStorage.setItem(currentEmail, json);

    noti3.innerHTML='Success!';
    setTimeout(()=>{
        noti3.innerHTML='';
    },3000)
}