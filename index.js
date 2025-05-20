const focusDuration = 50 * 60; // 50 minutes in seconds
const breakDuration = 10 * 60; // 10 minutes in seconds

let isFocusTime = true;
let timeLeft = focusDuration;
let isRunning = false;
let interval = null;

const timerDisplay = document.getElementById('timer');
const modeDisplay = document.getElementById('mode');
const startPauseBtn = document.getElementById('start-pause');
const resetBtn = document.getElementById('reset');
const darkModeToggle = document.getElementById('darkModeToggle');
const focusSelect = document.getElementById('focusSelect');
const breakSelect = document.getElementById('breakSelect');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  modeDisplay.textContent = isFocusTime ? 'Focus Time' : 'Break Time';
  startPauseBtn.textContent = isRunning ? 'Pause' : 'Start';
}

// Animate the timer display when switching modes
function animateModeSwitch() {
  anime({
    targets: '.timer-display',
    scale: [1, 1.15, 1],
    duration: 600,
    easing: 'easeInOutQuad',
  });
  anime({
    targets: '.mode',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    easing: 'easeOutExpo',
  });
}

function updateDurations() {
  const focusVal = parseInt(focusSelect.value, 10) * 60;
  const breakVal = parseInt(breakSelect.value, 10) * 60;
  if (isFocusTime) {
    timeLeft = focusVal;
  } else {
    timeLeft = breakVal;
  }
  updateDisplay();
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    isFocusTime = !isFocusTime;
    if (isFocusTime) {
      timeLeft = parseInt(focusSelect.value, 10) * 60;
    } else {
      timeLeft = parseInt(breakSelect.value, 10) * 60;
    }
    updateDisplay();
    // Optionally: play a sound or show a notification here
  }
}

startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
  } else {
    interval = setInterval(tick, 1000);
    isRunning = true;
  }
  updateDisplay();
  animateModeSwitch();
});

// Animate the Reset button on click
resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
  if (isFocusTime) {
    timeLeft = parseInt(focusSelect.value, 10) * 60;
  } else {
    timeLeft = parseInt(breakSelect.value, 10) * 60;
  }
  updateDisplay();
  anime({
    targets: '.timer-display',
    rotate: [0, 360],
    duration: 700,
    easing: 'easeInOutSine',
  });
});

// Toggle dark mode
darkModeToggle.addEventListener('change', function() {
  document.body.classList.toggle('dark-mode', this.checked);
});

focusSelect.addEventListener('change', () => {
  if (isFocusTime) {
    timeLeft = parseInt(focusSelect.value, 10) * 60;
    updateDisplay();
  }
});
breakSelect.addEventListener('change', () => {
  if (!isFocusTime) {
    timeLeft = parseInt(breakSelect.value, 10) * 60;
    updateDisplay();
  }
});

// Animate the timer display on page load
anime({
  targets: '.timer-display',
  opacity: [0, 1],
  scale: [0.8, 1],
  duration: 900,
  easing: 'easeOutBack',
});

// Initialize display
updateDisplay();

// Animated background using anime.js
function createAnimatedBackground() {
  // Create SVG background if not already present
  if (!document.getElementById('animated-bg')) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('id', 'animated-bg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('style', 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    // Add several circles
    for (let i = 0; i < 10; i++) {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', Math.random() * 1920);
      circle.setAttribute('cy', Math.random() * 1080);
      circle.setAttribute('r', 120 + Math.random() * 80);
      circle.setAttribute('fill', i % 2 === 0 ? '#e1705522' : '#ffd16622');
      circle.setAttribute('class', 'bg-anim-circle');
      svg.appendChild(circle);
    }
    document.body.prepend(svg);
  }
  // Animate the circles
  anime({
    targets: '.bg-anim-circle',
    translateX: () => anime.random(-100, 100),
    translateY: () => anime.random(-80, 80),
    scale: [0.95, 1.1],
    direction: 'alternate',
    loop: true,
    duration: 8000,
    easing: 'easeInOutSine',
    delay: anime.stagger(400),
    opacity: [0.5, 0.9],
  });
}

// Call on load
window.addEventListener('DOMContentLoaded', () => {
  createAnimatedBackground();
});
