// Decorative hearts generator for intro and global background.
function spawnHearts(containerSelector, count, durationMin, durationMax) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${
      Math.random() * (durationMax - durationMin) + durationMin
    }s`;
    heart.style.animationDelay = `${Math.random() * 3}s`;
    heart.style.opacity = `${Math.random() * 0.5 + 0.2}`;
    heart.style.transform = `rotate(45deg) scale(${Math.random() * 0.5 + 0.7})`;
    container.appendChild(heart);
  }
}

spawnHearts(".floating-hearts", 24, 4, 9);
spawnHearts(".global-particles", 36, 7, 14);

// Loader transition into the main content.
const loader = document.getElementById("intro-loader");
const mainContent = document.getElementById("main-content");

setTimeout(() => {
  loader.classList.add("fade-out");
  mainContent.classList.remove("hidden");
}, 3200);

// Smooth slide navigation with fade transitions.
const slides = Array.from(document.querySelectorAll(".slide"));
const prevSlideBtn = document.getElementById("prev-slide");
const nextSlideBtn = document.getElementById("next-slide");
const slideIndicator = document.getElementById("slide-indicator");
let currentSlide = 0;

function activateSlide(index) {
  if (index < 0 || index >= slides.length) return;
  slides[currentSlide].classList.remove("is-active");
  currentSlide = index;
  slides[currentSlide].classList.add("is-active");
  slideIndicator.textContent = `${currentSlide + 1} / ${slides.length}`;
  prevSlideBtn.disabled = currentSlide === 0;
  nextSlideBtn.disabled = currentSlide === slides.length - 1;

  // Trigger special slide behaviors.
  if (currentSlide === 4 && !typingStarted) {
    typingStarted = true;
    typeNextCharacter();
  }

  if (currentSlide === 5) {
    launchConfetti(55);
  }
}

prevSlideBtn.addEventListener("click", () => activateSlide(currentSlide - 1));
nextSlideBtn.addEventListener("click", () => activateSlide(currentSlide + 1));

// Optional keyboard control for professional slideshow feel.
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") activateSlide(currentSlide + 1);
  if (event.key === "ArrowLeft") activateSlide(currentSlide - 1);
});

activateSlide(0);

// Interactive gift reveal and celebration.
const giftBtn = document.getElementById("gift-btn");
const giftMessage = document.getElementById("gift-message");

function launchConfetti(amount = 80) {
  const palette = ["#f2c5d7", "#f7dea8", "#ffffff", "#e89cbc", "#cfad67"];
  for (let i = 0; i < amount; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = palette[Math.floor(Math.random() * palette.length)];
    piece.style.animationDuration = `${Math.random() * 1200 + 1400}ms`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2600);
  }
}

giftBtn.addEventListener("click", () => {
  giftMessage.classList.remove("hidden");
  giftBtn.textContent = "Opened with love 💝";
  giftBtn.disabled = true;
  launchConfetti(110);
});

// Quiz game slide: "How well do you know me?"
const quizData = [
  {
    question: "Which vibe matches me the most?",
    options: ["Calm and kind", "Bold and adventurous", "Playful and caring", "All of these"],
    correctIndex: 4
  },
  {
    question: "Which moment of us would you relive if you could?",
    options: ["Our funniest memory", "A quiet moment that meant a lot", "A day that didn’t seem special… but actually was", "All of these"],
    correctIndex: 4
  },
  {
    question: "What's my favorite cuisine type?",
    options: ["Desi", "Chinese", "BBQ", "Everything"],
    correctIndex: 3
  }
];

const quizContainer = document.getElementById("quiz-container");
const quizNextBtn = document.getElementById("quiz-next");
const quizFeedback = document.getElementById("quiz-feedback");
let quizIndex = 0;
let quizScore = 0;
let selectedOptionIndex = null;

function renderQuizQuestion() {
  const current = quizData[quizIndex];
  if (!current) {
    quizContainer.innerHTML = `
      <h3>Quiz complete! 🎉</h3>
      <p>You scored <strong>${quizScore} / ${quizData.length}</strong>.</p>
      <p>Perfect score or not, your place in my heart is always full marks.</p>
    `;
    quizNextBtn.textContent = "Play Again";
    quizFeedback.textContent = "You did amazing, birthday star.";
    launchConfetti(95);
    return;
  }

  const optionsHTML = current.options
    .map(
      (option, index) =>
        `<button class="quiz-option" data-option="${index}" type="button">${option}</button>`
    )
    .join("");

  quizContainer.innerHTML = `
    <h3>${current.question}</h3>
    <div class="quiz-options">${optionsHTML}</div>
  `;
  quizFeedback.textContent = "Choose one answer to continue.";
  selectedOptionIndex = null;

  const optionButtons = quizContainer.querySelectorAll(".quiz-option");
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      optionButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedOptionIndex = Number(button.dataset.option);
    });
  });
}

quizNextBtn.addEventListener("click", () => {
  if (quizIndex >= quizData.length) {
    quizIndex = 0;
    quizScore = 0;
    quizNextBtn.textContent = "Next Question";
    renderQuizQuestion();
    return;
  }

  if (selectedOptionIndex === null) {
    quizFeedback.textContent = "Pick an option first, sweetheart.";
    return;
  }

  if (selectedOptionIndex === quizData[quizIndex].correctIndex) {
    quizScore += 1;
    quizFeedback.textContent = "Correct! You know this heart so well. 💕";
  } else {
    quizFeedback.textContent = "Close one! Love still wins. 💗";
  }

  quizIndex += 1;
  setTimeout(renderQuizQuestion, 350);
});

renderQuizQuestion();

// Typewriter message section.
const typedMessage = document.getElementById("typed-message");
const message = `On this beautiful day, I just want to say:

Where do I even begin with you… my built-in best friend, my partner in crime, and honestly my biggest headache 😭 Happy Birthday to the girl who cried at literally everything growing up and still does 🌚 You were a menace, you're still a menace and yet somehow you turned into one of the most beautiful souls I've ever known 🥹
Growing up with you has been the greatest blessing of my life. From crying over the dumbest things to laughing until we couldn't breathe, from silly fights over the TV remote to Fridays at Grandma's house, every single memory with you is something I'd relive a thousand times 💖
You're annoying, dramatic, loud, and absolutely irreplaceable. I wouldn't trade you for anything in this world (SHAWARMA is an exception 👉👈). Genuinely so lucky to have you as my cousin, my person, and my forever chaos buddy 🫶🏻
Happy birthday, my bro. Today and always, I choose you.`;

let typingStarted = false;
let typingIndex = 0;

function typeNextCharacter() {
  if (typingIndex < message.length) {
    typedMessage.textContent += message.charAt(typingIndex);
    typingIndex += 1;
    setTimeout(typeNextCharacter, 30);
  }
}

const typingCard = document.querySelector(".typing-card");
if (!typingCard) typingStarted = true;

// Background music toggle. Autoplay may be blocked by browser policies.
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

music.volume = 0.35;

async function tryAutoPlay() {
  try {
    await music.play();
    musicToggle.textContent = "🔊 Music On";
    musicToggle.setAttribute("aria-pressed", "true");
  } catch (error) {
    musicToggle.textContent = "🔇 Music Off";
    musicToggle.setAttribute("aria-pressed", "false");
  }
}

tryAutoPlay();

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    await music.play();
    musicToggle.textContent = "🔊 Music On";
    musicToggle.setAttribute("aria-pressed", "true");
  } else {
    music.pause();
    musicToggle.textContent = "🔇 Music Off";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

