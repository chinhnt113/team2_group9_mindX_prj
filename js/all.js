var loginStatus = sessionStorage.getItem('loginStatus');

if (!loginStatus) {
    sessionStorage.setItem('loginStatus','false');
}

function pad(n) {
    n = parseInt(n,10);
    return (n < 10) ? ("0" + n) : n;
}