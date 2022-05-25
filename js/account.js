var loginStatus = sessionStorage.getItem('loginStatus');

if (loginStatus == 'false') {
    // window.location.pathname = '/index.html';
    history.back();
}

var currentUser = sessionStorage.getItem('currentAccount');
var currentData = JSON.parse(localStorage.getItem(currentUser));

var info_username = document.querySelector('#username');
var info_email = document.querySelector('#email');
var info_fname = document.querySelector('#fname');
var info_lname = document.querySelector('#lname');
var noti = document.querySelector('.messProfile');

info_username.value = currentData['username'];
info_email.value = currentData['email'];
info_fname.value = currentData['firstName'];
info_lname.value = currentData['lastName'];

function updateProfile(e) {
    event.preventDefault();
    currentData.firstName = info_fname.value;
    currentData.lastName = info_lname.value;

    var json = JSON.stringify(currentData);
    localStorage.setItem(currentUser, json);

    noti.innerHTML='Success!';
    setTimeout(()=>{
        noti.innerHTML='';
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

        noti2.innerHTML='Success!';
        noti2.style.color = '#57c9a1';
        setTimeout(()=>{
            noti2.innerHTML='';
        },3000)
    }
}

function logout() {
    sessionStorage.setItem('loginStatus', 'false');
    window.location.pathname = '/index.html';
}