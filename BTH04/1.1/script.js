let danhsach = [];

function xeploai(mark){
    if (mark >= 8.5) {
        return { text: "Giỏi" };
    } else if (mark >= 7.0) {
        return { text: "Khá" };
    } else if (mark >= 5.0) {
        return { text: "Trung Bình" };
    } else {
        return { text: "Yếu"};
    }
}

function renderTable(){
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    danhsach.forEach(function (sv, index){
        const loai = xeploai(sv.mark);
        const tr = document.createElement("tr");
        if(sv.mark < 5.0){
            tr.style.backgroundColor = "yellow";
        }
        tr.innerHTML = 
            "<td>" + (index + 1) + "</td>" + 
            "<td>" + sv.name + "</td>" + 
            "<td>" + sv.mark + "</td>" + 
            "<td>" + loai.text + "</td>" + 
            "<td><button class='btn-remove' data-index='" + index + "'>Xoá</button></td>";
        tbody.appendChild(tr);
    })
    updatedata();
}

function updatedata(){
    const studentsum = danhsach.length;

    const statEl = document.querySelector(".stat");
    statEl.style.display = studentsum ===  0 ? "none" : "block";
    document.getElementById("stat-total").textContent = studentsum;
    if(studentsum === 0){
        document.getElementById("stat-avg").textContent = 0;
        return;
    }
    let marksum = 0;
    for(let i=0; i<danhsach.length; i++){
        marksum += danhsach[i].mark;
    }
    const avg = marksum / studentsum;
    document.getElementById("stat-avg").textContent = avg.toFixed(2);
     
}

function addstudent(){
    const inpname = document.getElementById("name");
    const inpmark = document.getElementById("mark");
    const name = inpname.value.trim();
    const mark = Number(inpmark.value);
    if(name === ""){
        alert("Vui lòng nhập họ và tên sinh viên!");
        inpname.focus();
        return;
    }
    if(isNaN(mark) || mark < 0 || mark > 10){
        alert("Điểm không hợp lệ! Vui lòng nhập số từ 0 đến 10.");
        inpDiem.focus();
        return;
    }
    danhsach.push({name:name, mark:mark});
    renderTable();
    inpname.value = "";
    inpmark.valua = "";
    inpname.focus();
}

document.querySelector(".input-btn").addEventListener("click", function () {
    addstudent();
});

document.getElementById("mark").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addstudent();
    }
}); 

document.getElementById("table-body").addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-remove")) {
        const index = parseInt(e.target.dataset.index);
        danhsach.splice(index, 1)
        renderTable();            
    }
});