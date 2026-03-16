const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const successMessage = document.getElementById("successMessage");

const nameCount = document.getElementById("nameCount");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");


function showError(field, message){
document.getElementById(field + "Error").innerText = message;
}

function clearError(field){
document.getElementById(field + "Error").innerText = "";
}


fullname.addEventListener("input", function(){

let len = fullname.value.length;

nameCount.innerText = len + "/50";

clearError("fullname");

});


password.addEventListener("input", function(){

let value = password.value;

let score = 0;

if(value.length >= 6) score++;
if(/[A-Z]/.test(value)) score++;
if(/[0-9]/.test(value)) score++;
if(/[^A-Za-z0-9]/.test(value)) score++;

strengthBar.className = "";

if(score <= 1){
strengthBar.classList.add("active");
strengthText.innerText = "Yếu";
strengthText.style.color = "red";
}
else if(score <= 3){
strengthBar.classList.add("medium");
strengthText.innerText = "Trung bình";
strengthText.style.color = "orange";
}
else{
strengthBar.classList.add("strong");
strengthText.innerText = "Mạnh";
strengthText.style.color = "green";
}

clearError("password");

});


togglePassword.addEventListener("click", function(){

if(password.type === "password"){
password.type = "text";
}
else{
password.type = "password";
}

});


function validateFullname(){

let value = fullname.value.trim();
let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

if(value === ""){
showError("fullname","Không được để trống");
return false;
}

if(!regex.test(value)){
showError("fullname","Ít nhất 3 ký tự, chỉ chứa chữ cái");
return false;
}

clearError("fullname");
return true;
}

function validateEmail(){

let value = email.value.trim();
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(value === ""){
showError("email","Email không được trống");
return false;
}

if(!regex.test(value)){
showError("email","Email không đúng định dạng");
return false;
}

clearError("email");
return true;
}


function validatePhone(){

let value = phone.value.trim();
let regex = /^0\d{9}$/;

if(!regex.test(value)){
showError("phone","SĐT phải 10 số và bắt đầu bằng 0");
return false;
}

clearError("phone");
return true;
}


function validatePassword(){

let value = password.value;
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(!regex.test(value)){
showError("password","≥8 ký tự, có chữ hoa, thường, số");
return false;
}

clearError("password");
return true;
}


function validateConfirmPassword(){

if(confirmPassword.value !== password.value){
showError("confirmPassword","Mật khẩu không khớp");
return false;
}

clearError("confirmPassword");
return true;
}


function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked');

if(!gender){
showError("gender","Phải chọn giới tính");
return false;
}

clearError("gender");
return true;
}


function validateTerms(){

if(!terms.checked){
showError("terms","Phải đồng ý điều khoản");
return false;
}

clearError("terms");
return true;
}


form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateFullname() &&
validateEmail() &&
validatePhone() &&
validatePassword() &&
validateConfirmPassword() &&
validateGender() &&
validateTerms();

if(valid){

form.style.display = "none";

successMessage.innerText =
"Đăng ký thành công! 🎉 Xin chào " + fullname.value;

}

});


fullname.addEventListener("blur",validateFullname);
email.addEventListener("blur",validateEmail);
phone.addEventListener("blur",validatePhone);
password.addEventListener("blur",validatePassword);
confirmPassword.addEventListener("blur",validateConfirmPassword);


fullname.addEventListener("input",()=>clearError("fullname"));
email.addEventListener("input",()=>clearError("email"));
phone.addEventListener("input",()=>clearError("phone"));
confirmPassword.addEventListener("input",()=>clearError("confirmPassword"));