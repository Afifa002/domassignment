document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registrationForm");
    const studentList = document.getElementById("studentList");
    let students = [];

    // Load data from local storage when the page loads
    if (localStorage.getItem("students")) {
        students = JSON.parse(localStorage.getItem("students"));
        displayStudents();
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const studentClass = document.getElementById("course").value;
        const email = document.getElementById("email").value;
        const contact = document.getElementById("contact").value;
        const id = document.getElementById("id").value;

        if (!validateName(name)) {
            alert("Please enter a valid name.");
            return;
        }

        if (!validateClass(studentClass)) {
            alert("Please enter a valid class.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validateContact(contact)) {
            alert("Please enter a valid contact number.");
            return;
        }

        if (!validateID(id)) {
            alert("Please enter a valid student ID.");
            return;
        }

        const student = {
            name,
            course: studentClass,
            email,
            contact,
            id
        };

        students.push(student);
        saveDataToLocalStorage();
        displayStudents();
        form.reset();
    });

    function displayStudents() {
        const tbody = document.querySelector("#studentList tbody");
        studentList.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>${student.id}</td>
                <td><button  onclick="editStudent(${index})">Edit</button></td>
                <td><button onclick="deleteStudent(${index})">Delete</button></td>
            `;
            studentList.appendChild(row);
        });
        
    }

    function saveDataToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function validateName(name) {
        return /^[a-zA-Z\s]+$/.test(name);
    }

    function validateClass(studentClass) {
        return /^[a-zA-Z0-9\s]+$/.test(studentClass);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateContact(contact) {
        return /^[0-9]+$/.test(contact);
    }

    function validateID(id) {
        return /^[0-9]+$/.test(id);
    }

    window.editStudent = function(index) {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("course").value = student.course;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;
        document.getElementById("id").value = student.id;

        students.splice(index, 1);
        saveDataToLocalStorage();
        displayStudents();
    }

    window.deleteStudent = function(index) {
        students.splice(index, 1);
        saveDataToLocalStorage();
        displayStudents();
    }
});

