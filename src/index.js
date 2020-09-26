import { Request } from "./request";
import { UI } from "./ui";

//Elementleri Ekleme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.querySelector("#employees");
const updateButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");

const ui = new UI();

let updateState = null;

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
	form.addEventListener("submit", addEmployee);
	employeesList.addEventListener("click", updateOrDelete);
	updateButton.addEventListener("click", updateEmployee);
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

function addEmployee(e) {
	const employeeName = nameInput.value.trim();
	const employeeDepartment = departmentInput.value.trim();
	const employeeSalary = salaryInput.value.trim();
	if (
		employeeName === "" ||
		employeeDepartment === "" ||
		employeeSalary === ""
	) {
		alert("Tüm alanları doldurunuz!!");
	} else {
		request
			.post({
				name: employeeName,
				department: employeeDepartment,
				salary: Number(employeeSalary),
			})
			.then((employee) => {
				ui.addEmployeeToUI(employee);
			})
			.catch((err) => console.log(err));
	}
	ui.clearInputs();
	e.preventDefault();
}

function updateOrDelete(e) {
	if (e.target.id === "delete-employee") {
		//silme
		deleteEmployee(e.target);
	} else if (e.target.id === "update-employee") {
		//güncelleme
		//tr yi aldık
		updateEmployeeController(e.target.parentElement.parentElement);
	}
}

function deleteEmployee(targetEmployee) {
	//idyi bulduk
	const id =
		targetEmployee.parentElement.previousElementSibling.previousElementSibling
			.textContent;

	request
		.delete(id)
		.then((message) => {
			ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
		})
		.catch((err) => console.log("err >> ", err));
}

function updateEmployeeController(targetEmployee) {
	ui.toggleUpdateButton(targetEmployee);

	if (updateState === null) {
		updateState = {
			updateId: targetEmployee.children[3].textContent,
			updateParent: targetEmployee,
		};
	} else {
		updateState = null;
	}
}

function updateEmployee() {
	if (updateState) {
		//null değilse
		const data = {
			name: nameInput.value.trim(),
			department: departmentInput.value.trim(),
			salary: Number(salaryInput.value.trim()),
		};

		request
			.put(updateState.updateId, data)
			.then((updatedEmployee) => {
				ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
			})
			.catch((err) => console.log("errr >> ", errr));
	}
}
