import { Request } from "./request";
import { UI } from "./ui";

//Elementleri Ekleme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList2 = document.querySelector("#employees");
const updateButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");

const ui = new UI();

// request
//     .get()
//     .then((employees) => console.log("employees :>> ", employees))
//     .catch((err) => console.log("err >> ", err));

// request
//     .post({
//         name: "Serhat Erdem",
//         department: "Bilişim",
//         salary: 2500,
//     })
//     .then((employee) => console.log("employee >> ", employee))
//     .catch((err) => console.log("err >> ", err));

// request
//     .put(6, {
//         name: "Serhat Say",
//         department: "Bilişim",
//         salary: 2500,
//     })
//     .then((employee) => console.log("employee >> ", employee))
//     .catch((err) => console.log("err >> ", err));

// request
//     .delete(5)
//     .then((message) => console.log(message))
//     .catch((err) => console.log("err :>> ", err));

eventListeners();

function eventListeners() {
	document.addEventListener("DOMContentLoaded", getAllEmployees);
}

function getAllEmployees() {
	//get fonksiyonundan arrayimizi alcaz
	request
		.get()
		.then((employees) => {
			ui.addAllEmployeesToUI(employees);
		})
		.catch((err) => console.log("err >> ", err));
}
