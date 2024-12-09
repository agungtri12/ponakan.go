const levels = {
    1: [
        { image: "/level1/kelinci.jpg", answer: "Kelinci", category: "Hewan", options: ["Kelinci", "Kucing", "Anjing", "Burung"] },
        { image: "/level1/panda.jpg", answer: "Panda", category: "Hewan", options: ["Panda", "Beruang", "Singa", "Zebra"] },
        { image: "/level1/pisang.jpg", answer: "Pisang", category: "Buah", options: ["Pisang", "Apel", "Mangga", "Jeruk"] },
        { image: "/level1/jepang.jpg", answer: "Jepang", category: "Negara", options: ["Jepang", "Korea", "China", "Indonesia"] },
        { image: "/level1/kompor.jpg", answer: "Kompor", category: "Alat Masakan", options: ["Kompor", "Panci", "Wajan", "Pisau"] },
        // Add more questions...
    ],
};

let currentLevel = 1;
let currentProgress = 0;

const gameImage = document.getElementById("game-image");
const choicesContainer = document.getElementById("choices-container");
const progress = document.getElementById("current-progress");
const levelDisplay = document.getElementById("current-level");
const correctPopup = document.getElementById("popup");
const incorrectPopup = document.getElementById("incorrect-popup");

function loadQuestion() {
    const question = levels[currentLevel][currentProgress];
    gameImage.src = question.image;

    choicesContainer.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "choice";
        button.addEventListener("click", () => checkAnswer(option));
        choicesContainer.appendChild(button);
    });

    progress.textContent = currentProgress + 1;
}

function checkAnswer(selected) {
    const correctAnswer = levels[currentLevel][currentProgress].answer;

    if (selected === correctAnswer) {
        correctPopup.classList.remove("hidden");
        setTimeout(() => {
            correctPopup.classList.add("hidden");
            currentProgress++;

            if (currentProgress < 20) {
                loadQuestion();
            } else if (currentLevel < 10) {
                currentLevel++;
                currentProgress = 0;
                levelDisplay.textContent = currentLevel;
                loadQuestion();
            } else {
                alert("Selamat! Kamu menyelesaikan semua level!");
            }
        }, 1500);
    } else {
        incorrectPopup.classList.remove("hidden");
        setTimeout(() => {
            incorrectPopup.classList.add("hidden");
        }, 1500);
    }
}

loadQuestion();
