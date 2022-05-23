

var inputEmail= document.getElementById("Email")
var inputPassword= document.getElementById("Password");
var Btn = document.getElementById("btn-login");


 const creatToken = () =>{
     sessionStorage.setItem("token",(Math.floor(Math.random()*1000000)).toString());
 } 
 const getToken = () =>{
    return sessionStorage.setItem("token")
} 
 
Btn.addEventListener("click",(e) => {
    
   if(inputEmail == "khailathanngu@gmail.com" && inputPassword == "khaideptrai")
    {
         creatToken();
    }
})