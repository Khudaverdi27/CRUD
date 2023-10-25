const imgModal = document.querySelector(".imgModal")
const imgInput = document.querySelector(".imgInput")
const addImgIcon = document.querySelector(".addImgBtn")
const inputFullDate = document.querySelector(".inputFullDate")
const btnSubmit = document.querySelector(".btn-submit")
const modalTitle = document.querySelector(".modal-title")
const btnUpdate = document.querySelector(".btnUpdate")
const tabelBody = document.querySelector(".tabelBody")
const btnAddUser = document.querySelector(".btn-addUser")
const userInfo = document.querySelectorAll(".userData")




// addEventListeners
imgInput.addEventListener("change", imgToModal)
btnSubmit.addEventListener("click", submitData)

// change user photo
function imgToModal() {
    const file = imgInput.files[0]
    if (file) {
        if (file.type.startsWith("image")) {
            const img = URL.createObjectURL(file);
            imgModal.setAttribute("src", img)

        }
    }
}
// class Human {
//     constructor(img, userName, userAge, userCity, userMail, userPhone, userPosition, startTime) {
//         this.profil = img;
//         this.name = userName;
//         this.age = userAge;
//         this.city = userCity;
//         this.email = userMail;
//         this.phone = userPhone;
//         this.position = userPosition;
//         this.startDate = startTime;
//     }
// }
class Human {
    constructor(img, name, age, city, email, phone, position, startDate) {
        Object.assign(this, { img, name, age, city, email, phone, position, startDate });
    }
}

let count = 1

class UI {
    addToUi(data) {

        tabelBody.innerHTML += `<tr class="text-center tableContent">
        <th class="" scope="row">${count++}</th>
        <td><img src="${data.img}" class="imgInTable" alt=""></td>
        <td>${data.name}</td>
        <td>${data.age}</td>
        <td>${data.city}</td>
        <td>${data.email}</td>
        <td>${data.phone}</td>
        <td>${data.position}</td>
        <td>${data.startDate}</td>
        <td><button class=" btn-watch btn btn-success" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
                <i class=" fa-solid fa-eye"></i></button>
            <button class="btn-edit btn btn-primary" data-bs-toggle="modal"
            data-bs-target="#exampleModal">
                <i class="fa-solid fa-pen"></i></button>
            <button class=" btn-delete btn btn-danger">
                <i class=" fa-solid fa-trash-can"></i></button>
        </td>
    </tr>`
        const imgIntable = document.querySelector(".imgInTable")
        const btnWatch = document.querySelectorAll(".btn-watch")
        const btnEdit = document.querySelectorAll(".btn-edit")
        const btnDelete = document.querySelectorAll(".btn-delete")




        lookInfo(btnWatch, btnEdit, btnDelete, imgIntable)
    }


}

// function submitData() {

//     let userName = userInfo[0].value;
//     let userAge = userInfo[1].value;
//     let userCity = userInfo[2].value;
//     let userMail = userInfo[3].value;
//     let userPhone = userInfo[4].value;
//     let userPosition = userInfo[5].value;
//     let startTime = userInfo[6].value;
//     let img = imgModal.src

//     if (userName != "" && userAge != "" && userCity != "" && userMail != "" && userPhone != "" && userPosition != "" && startTime != "") {

//         let human = new Human(img, userName, userAge, userCity, userMail, userPhone, userPosition, startTime)

//         let ui = new UI
//         ui.addToUi(human)
//         btnSubmit.setAttribute("data-bs-dismiss", "modal")
//     } else {
//         modalTitle.textContent = "Please fill every field area"
//         modalTitle.parentElement.classList.add("bg-danger")
//     }
// }

// modal datas show UI
function submitData() {
    const fields = [
        'userName', 'userAge', 'userCity', 'userMail', 'userPhone', 'userPosition', 'startTime'
    ];

    const values = fields.map(field => userInfo[fields.indexOf(field)].value);
    const img = imgModal.src;

    if (values.every(value => value !== "")) {
        const human = new Human(img, ...values);
        const ui = new UI();
        ui.addToUi(human);


    } else {
        modalTitle.textContent = "Please fill every field area";
        modalTitle.parentElement.classList.add("bg-danger");
    }
}

// CRUD buttons events
function lookInfo(btnWatch, btnEdit, btnDelete, imgInTable) {
    // For each button, add access to the data in that row
    btnWatch.forEach(button => {
        button.addEventListener('click', () => {

            const row = button.closest('tr'); // closest tr element
            const dataCells = Array.from(row.querySelectorAll('td'));

            modalTitle.textContent = "User Info";
            btnSubmit.style.display = "none";
            addImgIcon.style.display = "none";
            calendarIcon.style.display = "none";
            imgInput.disabled = true;

            userInfo.forEach(noEditModal => noEditModal.disabled = true);
            for (let i = 0; i < 7; i++) {
                userInfo[i].value = dataCells[i + 1].textContent;
            }
            // userInfo[0].value = dataCells[1].textContent;
            // userInfo[1].value = dataCells[2].textContent;
            // userInfo[2].value = dataCells[3].textContent;
            // userInfo[3].value = dataCells[4].textContent;
            // userInfo[4].value = dataCells[5].textContent;
            // userInfo[5].value = dataCells[6].textContent;
            // userInfo[6].value = dataCells[7].textContent;
        });
    });





    // For each button, add access to the data in that row
    btnEdit.forEach(button => {
        button.addEventListener('click', () => {

            const row = button.closest('tr'); // closest tr element
            const dataCells = Array.from(row.querySelectorAll('td'));

            calendarIcon.style.display = "inline-block"
            btnSubmit.style.display = "none";
            btnUpdate.classList.replace("d-none", "d-block")
            imgInput.disabled = false;

            addImgIcon.style.display = "block"

            userInfo.forEach(EditModal => EditModal.disabled = false);
            btnUpdate.addEventListener("click", () => {
                imgInTable.src = imgModal.src  //edit
                for (let i = 0; i < 7; i++) {
                    dataCells[i + 1].textContent = userInfo[i].value
                }
            })

        });
    });

    btnDelete.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.parentElement.parentElement.remove()
        })
    })


}

btnAddUser.addEventListener("click", () => {

    userInfo.forEach((letEdit) => {
        letEdit.value = ""
        calendarIcon.style.display = "inline-block"
        btnSubmit.style.display = "block"
        addImgIcon.style.display = "block"
        btnUpdate.classList.replace("d-block", "d-none")
        letEdit.disabled = false;
        imgInput.disabled = false
    })
})


































const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span"),
    wrapper = document.querySelector(".wrapper"),
    calendarIcon = document.querySelector(".calendarIcon");

calendarIcon.addEventListener("click", () => {
    wrapper.classList.toggle("d-none");
    btnSubmit.setAttribute("data-bs-dismiss", "modal")

})
// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;

    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;

    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`

    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
    selectDate(currYear, currMonth, daysTag.children);
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

//select day from calendar
function selectDate(currYear, currMonth, daysTag) {
    let arrDays = [...daysTag]
    arrDays.forEach((day) => {
        day.addEventListener('click', () => {
            let selectedDay = day.textContent;
            let selectedMonth = currMonth + 1;
            let selectedYear = currYear;
            inputFullDate.value = `${selectedDay}/${selectedMonth}/${selectedYear}`;
            wrapper.classList.add("d-none");
        })
    })
}