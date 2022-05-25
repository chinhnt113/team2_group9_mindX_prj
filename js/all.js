var loginStatus = sessionStorage.getItem('loginStatus');

if (!loginStatus) {
    sessionStorage.setItem('loginStatus','false');
}