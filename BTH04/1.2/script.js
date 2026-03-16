let students = [];
let filteredStudents = [];
let isSorting = false;

let sortAsc = true;

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");
const filterRank = document.getElementById("filterRank");

const tableBody = document.getElementById("tableBody");
const sortScore = document.getElementById("sortScore");

function getRank(score){

if(score >= 8.5) return "Giỏi";
if(score >= 7) return "Khá";
if(score >= 5) return "Trung bình";
return "Yếu";

}

function addStudent(){

let name = nameInput.value.trim();
let score = parseFloat(scoreInput.value);

if(name === ""){
alert("Họ tên không được trống");
return;
}

if(isNaN(score) || score < 0 || score > 10){
alert("Điểm phải từ 0 đến 10");
return;
}

students.push({name,score});

nameInput.value="";
scoreInput.value="";

nameInput.focus();

applyFilters();
}

function applyFilters(){

let keyword = searchInput.value.toLowerCase();
let rankFilter = filterRank.value;

filteredStudents = students.filter(s=>{
let matchName = s.name.toLowerCase().includes(keyword);
let rank = getRank(s.score);
let matchRank = rankFilter === "all" || rank === rankFilter;
return matchName && matchRank;
});

if(isSorting){
filteredStudents.sort((a,b)=>{
return sortAsc ? a.score - b.score : b.score - a.score;
});
}

renderTable();
}

function renderTable(){

tableBody.innerHTML="";

if(filteredStudents.length === 0){

tableBody.innerHTML =
`<tr>
<td colspan="5" class="no-result">Không có kết quả</td>
</tr>`;

return;
}

filteredStudents.forEach((s,index)=>{

let rank = getRank(s.score);

let row = `
<tr class="${s.score < 5 ? 'low-score' : ''}">
<td>${index+1}</td>
<td>${s.name}</td>
<td>${s.score}</td>
<td>${rank}</td>
<td><button onclick="deleteStudent('${s.name}',${s.score})">Xóa</button></td>
</tr>
`;

tableBody.innerHTML += row;

});

}

function deleteStudent(name,score){

students = students.filter(s => !(s.name === name && s.score === score));

applyFilters();
}

addBtn.addEventListener("click",addStudent);

scoreInput.addEventListener("keypress",function(e){
if(e.key === "Enter"){
addStudent();
}
});

searchInput.addEventListener("input",applyFilters);

filterRank.addEventListener("change",applyFilters);

sortScore.addEventListener("click",()=>{

isSorting = true;

sortAsc = !sortAsc;

sortScore.innerHTML =
sortAsc ? "Điểm ▲" : "Điểm ▼";

applyFilters();

});