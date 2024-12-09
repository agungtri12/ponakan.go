let score = 0;
let level = 1;
let currentAnswer = "";
let isCorrect = false;

const scoreElement = document.getElementById("score");
const levelElement = document.getElementById("level");
const questionElement = document.getElementById("question");
const messageElement = document.getElementById("message");
const messageTextElement = document.getElementById("message-text");
const nextQuestionButton = document.getElementById("next-question");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-answer");
const voiceButton = document.getElementById("voice-answer");

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

submitButton.addEventListener("click", checkAnswer);
nextQuestionButton.addEventListener("click", generateQuestion);
voiceButton.addEventListener("click", startVoiceRecognition);

function generateQuestion() {
  isCorrect = false;
  messageElement.classList.add("hidden");
  nextQuestionButton.classList.add("hidden");
  userInput.value = "";
  
  if (level % 2 === 1) {
    currentAnswer = getRandomItem(numbers);
    questionElement.textContent = `Tebak angka: ${currentAnswer}`;
    speak(`Tebak angka: ${currentAnswer}`);
  } else {
    currentAnswer = getRandomItem(letters);
    questionElement.textContent = `Tebak huruf: ${currentAnswer}`;
    speak(`Tebak huruf: ${currentAnswer}`);
  }
}

function checkAnswer() {
  const userAnswer = userInput.value.trim().toUpperCase();
  if (userAnswer === currentAnswer) {
    isCorrect = true;
    messageTextElement.textContent = "Jawaban Benar!";
    speak("Jawaban benar!");
    score += 10;
    if (score % 50 === 0) {
      level++;
      levelElement.textContent = level;
    }
  } else {
    messageTextElement.textContent = "Jawaban Salah! Coba lagi.";
    speak("Jawaban salah, coba lagi.");
  }
  scoreElement.textContent = score;
  messageElement.classList.remove("hidden");
  nextQuestionButton.classList.remove("hidden");
  userInput.disabled = true;
  submitButton.disabled = true;
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID'; // Bahasa Indonesia
  window.speechSynthesis.speak(utterance);
}

// Voice Recognition (Speech-to-Text)
function startVoiceRecognition() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'id-ID'; // Bahasa Indonesia
  recognition.start();

  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript.toUpperCase();
    userInput.value = transcript; // Set the voice input to the text field
    checkAnswer(); // Check the answer after recognizing the voice
  };

  recognition.onerror = function(event) {
    messageTextElement.textContent = "Ada masalah dengan pengenalan suara. Coba lagi.";
    messageElement.classList.remove("hidden");
  };
}

// Start the game by generating the first question
generateQuestion();
