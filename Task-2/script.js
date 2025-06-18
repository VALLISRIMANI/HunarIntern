let selectedCourse = '';
let enrolledCourses = JSON.parse(localStorage.getItem('dashboardCourses')) || [];

function showSection(sectionId) {
    const sections = document.querySelectorAll("main");
    sections.forEach(sec => sec.style.display = "none");
    const target = document.getElementById(sectionId);

    if (target) {
        target.style.display = "block";
        document.documentElement.scrollTop = 0; 
        document.body.scrollTop = 0;           
    }

    const navLinks = document.querySelectorAll('.nav-items');
    navLinks.forEach(link => link.classList.remove('active'));
    const clickedLink = Array.from(navLinks).find(link => link.getAttribute('onclick')?.includes(sectionId));

    if (clickedLink) clickedLink.classList.add('active');

    const navBar = document.querySelector('.nav-bar');
    const hamburger = document.querySelector(".hamburger");
    if (window.innerWidth <= 900) {
        navBar.classList.remove('show');
        hamburger.classList.remove("open"); 
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    showSection('home-section'); 
    loadDashboardFromStorage();
});

function toggleMenu() {
    const nav = document.querySelector('.nav-bar');
    nav.classList.toggle('show');
}

function openCourseDetails(courseName) {
    selectedCourse = courseName;
    const title = document.getElementById('modalTitle');
    const modal = document.getElementById('courseModal');

    if (title) title.textContent = courseName;

    if (modal) {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }
}

window.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal();});

function closeModal() {
    const modal = document.getElementById('courseModal');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

function goToEnroll() {
    closeModal();
    showSection('enroll-section');
    const categorySelect = document.querySelector('#course');

    if (categorySelect) {
        categorySelect.value = selectedCourse;
        const exists = Array.from(categorySelect.options).some(opt => opt.value === selectedCourse);
        if (!exists) {
            const newOption = new Option(selectedCourse, selectedCourse, true, true);
            categorySelect.add(newOption);
        }
    }
}

function handleEnrollment(event) {
    event.preventDefault();
    const name = document.getElementById('fullname').value.trim();
    const course = document.getElementById('course').value;
    const duration = document.getElementById('duration').value;
    const key = `${name}_${course}_${duration}`;

    if (enrolledCourses.includes(key)) {
    showToast(`Already registered for ${course} (${duration}) `);
    return false;
    }

    enrolledCourses.push(key);
    localStorage.setItem('dashboardCourses', JSON.stringify(enrolledCourses));

    const grid = document.querySelector('.dashboard-grid');
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.setAttribute('data-key', key);
    card.innerHTML = `
        <h3>Quick Snapshot -</h3>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p>🎗️🎉✨ All the best for your learning journey!</p>
        <div id="card-btns">
            <button onclick="removeEnrollment(this, '${key}')" class="cancel-btn">Cancel</button>
            <button class="continue-btn">Continue</button>
        </div>
        `;
    grid.appendChild(card);
    document.getElementById('no-courses-text').style.display = 'none';

    event.target.reset();
    showToast("Registration successful! Check out the dashboard.");
    return false;
}

function removeEnrollment(btn, key) {
    const card = btn.closest('.dashboard-card');

    if (card) {
        card.remove();
        const index = enrolledCourses.indexOf(key);
        if (index !== -1) {
            enrolledCourses.splice(index, 1);
            localStorage.setItem('dashboardCourses', JSON.stringify(enrolledCourses));
        } 
    }

    if (document.querySelectorAll('.dashboard-card').length === 0) {
        document.getElementById('no-courses-text').style.display = 'block';
    }
}

function loadDashboardFromStorage() {
    const stored = JSON.parse(localStorage.getItem('dashboardCourses')) || [];
    const grid = document.querySelector('.dashboard-grid');
    const noText = document.getElementById('no-courses-text');
    grid.innerHTML = "";

    if (stored.length === 0) {
        noText.style.display = 'block';
    } else {
        noText.style.display = 'none';
        stored.forEach(key => {
            const [name, course, duration] = key.split('_');
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.setAttribute('data-key', key);
            card.innerHTML = `
                <h3>Quick Snapshot -</h3>
                <p><strong>Course:</strong> ${course}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Duration:</strong> ${duration}</p>
                <p>🎗️🎉✨ All the best for your learning journey!</p>
                <div id="card-btns">
                    <button onclick="removeEnrollment(this, '${key}')" class="cancel-btn">Cancel</button>
                    <button class="continue-btn">Continue</button>
                </div>
                `;
            grid.appendChild(card);
        });
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}