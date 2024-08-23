document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const commonLoginForm = document.getElementById('common-login-form');
    const attendancePage = document.getElementById('attendance-page');
    const userResultPage = document.getElementById('user-result-page');
    const errorMessage = document.getElementById('error-message');
    const commonErrorMessage = document.getElementById('common-error-message');
    const commonLoginButton = document.getElementById('common-login-button');
    const adminLoginButton = document.getElementById('admin-login-button');
    const adminLoginContainer = document.getElementById('admin-login');
    const commonLoginContainer = document.getElementById('common-login');
    const classForm = document.getElementById('class-form');
    const classNameInput = document.getElementById('class-name');
    const classSizeInput = document.getElementById('class-size');
    const classList = document.getElementById('class-list');
    const absenceSection = document.getElementById('absence-section');
    const absenceForm = document.getElementById('absence-form');
    const absentStudentsInput = document.getElementById('absent-students');
    const presentStudents = document.getElementById('present-students');
    const userPresentStudents = document.getElementById('user-present-students');
    const userAbsentStudents = document.getElementById('user-absent-students');
    const logoutButton = document.getElementById('logout-button');
    const commonLogoutButton = document.getElementById('common-logout-button');

    let totalStudents = 0;
    let totalAbsentStudents = 0;
    let selectedClassSize = 0;

    commonLoginButton.addEventListener('click', () => {
        adminLoginContainer.classList.add('hidden');
        commonLoginContainer.classList.remove('hidden');
    });

    adminLoginButton.addEventListener('click', () => {
        commonLoginContainer.classList.add('hidden');
        adminLoginContainer.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cpf = loginForm.elements['cpf'].value;
        const senha = loginForm.elements['senha'].value;

        if (cpf === '12345678901' && senha === 'alex_gay123') {
            loginForm.parentElement.classList.add('hidden');
            attendancePage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
        } else {
            errorMessage.classList.remove('hidden');
        }
    });

    commonLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cpf = commonLoginForm.elements['cpf'].value;
        const senha = commonLoginForm.elements['senha'].value;

        if (cpf === '09876543210' && senha === 'peru_sonho') {
            commonLoginForm.parentElement.classList.add('hidden');
            userResultPage.classList.remove('hidden');
            commonErrorMessage.classList.add('hidden');
            updateUserResultPage();
        } else {
            commonErrorMessage.classList.remove('hidden');
        }
    });

    logoutButton.addEventListener('click', () => {
        attendancePage.classList.add('hidden');
        adminLoginContainer.classList.remove('hidden');
    });

    commonLogoutButton.addEventListener('click', () => {
        userResultPage.classList.add('hidden');
        commonLoginContainer.classList.remove('hidden');
    });

    classForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const className = classNameInput.value.trim();
        const classSize = parseInt(classSizeInput.value.trim());

        if (className === '' || isNaN(classSize) || classSize <= 0) {
            alert('Por favor, insira o nome da turma e um número válido de alunos.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = `${className} - ${classSize} alunos`;

        const selectButton = document.createElement('button');
        selectButton.textContent = 'Selecionar';
        selectButton.addEventListener('click', () => {
            absenceSection.classList.remove('hidden');
            absenceForm.setAttribute('data-class', className);
            absenceForm.setAttribute('data-class-size', classSize);
            selectedClassSize = classSize;
        });

        listItem.appendChild(selectButton);
        classList.appendChild(listItem);

        totalStudents += classSize;
        updatePresentStudents();

        classNameInput.value = '';
        classSizeInput.value = '';
        classNameInput.focus();
    });

    absenceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const absentStudents = parseInt(absentStudentsInput.value);
        if (isNaN(absentStudents) || absentStudents < 0 || absentStudents > selectedClassSize) {
            alert('Por favor, insira um número válido de alunos faltantes.');
            return;
        }

        totalStudents -= absentStudents;
        totalAbsentStudents += absentStudents;
        updatePresentStudents();

        absentStudentsInput.value = '';
        absenceSection.classList.add('hidden');
    });

    function updatePresentStudents() {
        presentStudents.textContent = totalStudents;
    }

    function updateUserResultPage() {
        userPresentStudents.textContent = totalStudents;
        userAbsentStudents.textContent = totalAbsentStudents;
    }
});
