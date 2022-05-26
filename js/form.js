// var inputEmail= document.getElementById("Email")
// var inputPassword= document.getElementById("Password");
// var Btn = document.getElementById("btn-login");


// const creatToken = () =>{
//      sessionStorage.setItem("token",(Math.floor(Math.random()*1000000)).toString());
//  } 
// const getToken = () =>{
//     return sessionStorage.setItem("token")
// } 
 
// Btn.addEventListener("click",(e) => {
    
//    if(inputEmail == "khailathanngu@gmail.com" && inputPassword == "khaideptrai")
//     {
//          creatToken();
//     }
// })

var errorMsg = document.querySelector('.error-noti');
sessionStorage.setItem('loginStatus', 'false');

function signup(e) {
    event.preventDefault();
    var email = document.getElementById('signup_email');
    var username = document.getElementById('signup_username');
    var password = document.getElementById('signup_password');
    email.addEventListener('focus', ()=> {
        email.classList.remove('invalid-value-input');
    })
    username.addEventListener('focus', ()=> {
        username.classList.remove('invalid-value-input');
    })
    password.addEventListener('focus', ()=> {
        password.classList.remove('invalid-value-input');
    })

    var valid = true;
    var newUser = {
        email: email.value,
        username: username.value,
        password: password.value,
        firstName: '',
        lastName: '',
        mins: '60',
        secs: '00',
    };
    if (!email.value) {
        email.classList.add('invalid-value-input');
        valid = false;
    }
    if (!username.value) {
        username.classList.add('invalid-value-input');
        valid = false;
    }
    if (password.value.length <6) {
        password.classList.add('invalid-value-input');
        valid = false;
    }
    if (valid) {
        var checkUser = localStorage.getItem(username);
        var checkEmail = localStorage.getItem(email);
        if (checkEmail) {
            errorMsg.innerText = 'The email already exists.'
            valid = false;
        } 
        if (checkUser) {
            errorMsg.innerText = 'The username already exists.'
            valid = false;
        } 
        if (valid) {
            var json = JSON.stringify(newUser);
            localStorage.setItem(username.value, json);
            localStorage.setItem(email.value, json);
            window.location.pathname = '/login.html'
        }
    } else {
        errorMsg.innerText = 'Please input right in each field.'
    }
}

function login(e) {
    event.preventDefault();
    var loginname = document.getElementById('login_name');
    var password = document.getElementById('login_password');
    loginname.addEventListener('focus', ()=> {
        loginname.classList.remove('invalid-value-input');
    })
    password.addEventListener('focus', ()=> {
        password.classList.remove('invalid-value-input');
    })
    var user = localStorage.getItem(loginname.value);
    var data = JSON.parse(user);

    if(user == null) {
        errorMsg.innerText = 'Wrong username.'
    } else if (password.value == data.password) {
        sessionStorage.setItem('loginStatus', 'true');
        sessionStorage.setItem('currentAccount', data.username);
        window.location.pathname = '/playlist.html';
    } else {
        errorMsg.innerText = 'Wrong password.'
    }
}
