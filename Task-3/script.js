window.onload = () => {
    const logoContainer = document.getElementById("logoContainer");
    const signInContainer = document.getElementById("signInContainer");
    const moviesContainer = document.getElementById("moviesContainer");
    const footer = document.getElementById("sharedFooter");

    logoContainer.style.display = "flex";
    signInContainer.style.display = "none";
    moviesContainer.style.display = "none";
    footer.style.display = "none";

    setTimeout(() => {
        logoContainer.style.display = "none";
        signInContainer.style.display = "flex";
        footer.style.display = "block";

        document.getElementById("email").addEventListener("blur", () => {
            validateInput("email", "emailErrorMessage", "email");
        });

        document.getElementById("password").addEventListener("blur", () => {
            validateInput("password", "passwordeErrorMessage", "password");
        });

        document.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const emailValid = validateInput("email", "emailErrorMessage", "email");
            const passwordValid = validateInput("password", "passwordeErrorMessage", "password");

            if (emailValid && passwordValid) {
                openContainer("moviesContainer");
            }
        });
    }, 2000);
};

function validateInput(inputId, errorId, type = "text") {
    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(errorId);
    const value = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value || (type === "email" && !emailPattern.test(value))) {
        errorMessage.textContent = "X Please enter a valid email or phone number.";
        errorMessage.style.display = "block";
        input.style.borderColor = "red";
        return false;
    }

    if (!value || (type === "password" && (value.length < 4 || value.length > 60))) {
        errorMessage.textContent = "X Your password must contain between 4 and 60 characters.";
        errorMessage.style.display = "block";
        input.style.borderColor = "red";
        return false;
    }

    errorMessage.style.display = "none";
    input.style.borderColor = "green";
    return true;
}

function openContainer(targetId) {
    const containers = ["logoContainer", "signInContainer", "moviesContainer"];
    containers.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = (id === targetId) ? (id === "logoContainer" ? "flex" : "block") : "none";
    });

    const footer = document.getElementById("sharedFooter");
    if (targetId === "signInContainer" || targetId === "moviesContainer") {
        footer.style.display = "block";
    } else {
        footer.style.display = "none";
    }
}

function heroErrorCheck(event) {
    event.preventDefault();

    const button = event.target;
    const form = button.closest(".hero-form");
    const input = form.querySelector(".hero-email-input");
    const errorMessage = form.querySelector(".hero-error-message");
    const email = input.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        errorMessage.textContent = "X Email is required.";
        errorMessage.style.display = "block";
        input.style.borderColor = "red";
        return;
    }

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "X Please enter a valid email address.";
        errorMessage.style.display = "block";
        input.style.borderColor = "red";
        return;
    }

    errorMessage.textContent = "";
    errorMessage.style.display = "none";
    input.style.borderColor = "green";
    const targetSection = document.querySelector(".netflix-movies-container");
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
}

const container = document.getElementById('scroll-container');
const leftBtn = document.getElementById('scroll-left');
const rightBtn = document.getElementById('scroll-right');
const scrollStep = 200;

function updateArrows() {
    const max = container.scrollWidth - container.clientWidth;
    leftBtn.classList.toggle('hidden', container.scrollLeft <= 0);
    rightBtn.classList.toggle('hidden', container.scrollLeft >= max - 5);
}

leftBtn.onclick = () => {
    container.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
};

rightBtn.onclick = () => {
    container.scrollBy({ left: scrollStep, behavior: 'smooth' });
    setTimeout(updateArrows, 300);
};

container.addEventListener('scroll', updateArrows);
window.addEventListener('DOMContentLoaded', updateArrows);

let movieData = [];

fetch("movies.json")
    .then(res => res.json())
    .then(data => {
        movieData = data;
        setupMovieCards();
    });

function setupMovieCards() {
    const cards = document.querySelectorAll(".movie-card");
    const detailsBox = document.getElementById("movieDetails");
    const metaList = document.getElementById("movieMeta");
    const plot = document.getElementById("moviePlot");
    const poster = document.getElementById("detailPoster");
    const watchBtn = document.getElementById("watchButton");
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");
    const closeVideo = document.getElementById("closeVideo");
    const closeDetails = document.getElementById("closeDetails");

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const movie = movieData[index];
            poster.src = movie.poster;
            plot.textContent = movie.plot;
            metaList.innerHTML = `
                <li>${movie.year}</li>
                <li>${movie.rating}</li>
                <li>${movie.type}</li>
                ${movie.genres.map(g => `<li>${g}</li>`).join("")}
            `;
            watchBtn.setAttribute(
                "data-trailer",
                movie.youtube_trailer.replace("watch?v=", "embed/").split("&")[0]
            );
            detailsBox.style.display = "flex";
        });
    });

    watchBtn.addEventListener("click", () => {
        const videoSrc = watchBtn.getAttribute("data-trailer");
        videoPlayer.src = videoSrc + "?autoplay=1";
        videoModal.style.display = "flex";
    });

    closeVideo.addEventListener("click", () => {
        videoPlayer.src = "";
        videoModal.style.display = "none";
    });

    closeDetails.addEventListener("click", () => {
        detailsBox.style.display = "none";
    });
}

function displayAnswer(id) {
    const allAnswers = document.querySelectorAll('.answer');
    const allQuestions = document.querySelectorAll('.question');

    allAnswers.forEach(answer => {
        if (answer.id === id) {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        } else {
            answer.style.display = 'none';
        }
    });

    allQuestions.forEach(button => {
        const targetId = button.getAttribute('onclick')?.match(/'([^']+)'/)[1];
        if (targetId === id) {
            button.classList.toggle('active');
        } else {
            button.classList.remove('active');
        }
    });
}