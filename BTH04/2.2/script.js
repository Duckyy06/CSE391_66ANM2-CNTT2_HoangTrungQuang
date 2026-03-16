const prices = {
Ao:150000,
Quan:200000,
Giay:500000
};

const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const date = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const note = document.getElementById("note");

const total = document.getElementById("total");
const noteCount = document.getElementById("noteCount");

const confirmBox = document.getElementById("confirmBox");
const orderSummary = document.getElementById("orderSummary");


function showError(id,msg){
document.getElementById(id).innerText = msg;
}

function clearError(id){
document.getElementById(id).innerText = "";
}


function validateProduct(){

if(product.value===""){
showError("productError","Phải chọn sản phẩm");
return false;
}

clearError("productError");
return true;

}


function validateQuantity(){

let q = Number(quantity.value);

if(!Number.isInteger(q) || q<1 || q>99){

showError("quantityError","Số lượng từ 1 đến 99");
return false;

}

clearError("quantityError");
return true;

}


function validateDate(){

if(!date.value){

showError("dateError","Chọn ngày giao");
return false;

}

let today = new Date();
let maxDate = new Date();
maxDate.setDate(today.getDate()+30);

let d = new Date(date.value);

today.setHours(0,0,0,0);

if(d < today){

showError("dateError","Không chọn ngày quá khứ");
return false;

}

if(d > maxDate){

showError("dateError","Không quá 30 ngày từ hôm nay");
return false;

}

clearError("dateError");
return true;

}


function validateAddress(){

if(address.value.trim().length < 10){

showError("addressError","Địa chỉ ≥ 10 ký tự");
return false;

}

clearError("addressError");
return true;

}


function validateNote(){

if(note.value.length > 200){

showError("noteError","Không quá 200 ký tự");
return false;

}

clearError("noteError");
return true;

}


function validatePayment(){

let p = document.querySelector('input[name="payment"]:checked');

if(!p){

showError("paymentError","Chọn phương thức thanh toán");
return false;

}

clearError("paymentError");
return true;

}


function updateTotal(){

let p = product.value;
let q = Number(quantity.value);

if(prices[p] && q){

let sum = prices[p]*q;

total.innerText = sum.toLocaleString("vi-VN");

}else{

total.innerText = "0";

}

}


note.addEventListener("input", function(){

let len = note.value.length;

noteCount.innerText = len + "/200";

if(len > 200){

noteCount.style.color = "red";
showError("noteError","Ghi chú không được vượt quá 200 ký tự");

}else{

noteCount.style.color = "gray";
clearError("noteError");

}

});


product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);


product.addEventListener("blur",validateProduct);
quantity.addEventListener("blur",validateQuantity);
date.addEventListener("blur",validateDate);
address.addEventListener("blur",validateAddress);


product.addEventListener("change",()=>clearError("productError"));

quantity.addEventListener("input",()=>clearError("quantityError"));

date.addEventListener("input",()=>clearError("dateError"));

address.addEventListener("input",()=>clearError("addressError"));


document.querySelectorAll('input[name="payment"]').forEach(el=>{

el.addEventListener("change",()=>{

clearError("paymentError");

});

});


form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment();

if(valid){

let p = product.options[product.selectedIndex].text;
let q = quantity.value;
let d = date.value;
let money = total.innerText;

orderSummary.innerText =
"Sản phẩm: "+p+
"\nSố lượng: "+q+
"\nNgày giao: "+d+
"\nTổng tiền: "+money+" VNĐ";

confirmBox.style.display="block";

}

});


document.getElementById("confirmBtn").onclick=function(){

confirmBox.style.display="none";

document.getElementById("success").innerText =
"Đặt hàng thành công 🎉";

};


document.getElementById("cancelBtn").onclick=function(){

confirmBox.style.display="none";

};
