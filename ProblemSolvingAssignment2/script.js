function openModal(type) {
    const modal = document.getElementById('contactModal');
    const message = document.getElementById('modalMessage');

    if (type === 'call') {
        message.innerHTML = `<strong>Phone:</strong> <a href="tel:+1234567890">+1 234 567 890</a>`;
    } else if (type === 'email') {
        message.innerHTML = `<strong>Email:</strong> <a href="mailto:fitness_club@gmail.com">fitness_club@gmail.com</a>`;
    }

    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function displayContent(className) {
    const contents = document.querySelectorAll('.content');
    contents.forEach(content => content.style.display = 'none');

    const selectedContent = document.querySelector(`.${className}`);
    if (selectedContent) selectedContent.style.display = 'block';

    const navLinks = document.querySelectorAll('.navbar li a');
    navLinks.forEach(link => link.classList.remove('active'));

    const clickedLink = Array.from(navLinks).find(link =>
        link.getAttribute('onclick')?.includes(className)
    );
    if (clickedLink) clickedLink.classList.add('active');
}

function submitForm() {
    const inputs = document.querySelectorAll('.home .formgroup input');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        alert('Thank you for submitting the form.');
        inputs.forEach(input => input.value = '');
    } else {
        alert('Please fill out the form before submitting.');
    }
}

function calculateBMI() {
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;
    const result = document.getElementById("bmi-result");

    const height = parseFloat(heightInput) / 100;
    const weight = parseFloat(weightInput);

    if (height && weight) {
        const bmi = weight / (height * height);
        let category = "";

        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 24.9) category = "Normal weight";
        else if (bmi < 29.9) category = "Overweight";
        else category = "Obese";

        result.textContent = `Your BMI is ${bmi.toFixed(2)} (${category})`;
    } else {
        result.textContent = "Please enter valid height and weight.";
    }
}