// script.js

let gameBox = document.getElementById("game-box"); let message = document.getElementById("message"); let result = document.getElementById("result");

let waiting = false; let startTime, timeoutId;

gameBox.addEventListener("click", () => { if (!waiting) { startWaiting(); } else if (gameBox.classList.contains("go")) { const reactionTime = Date.now() - startTime; message.textContent = "Good job!"; result.textContent = Your reaction time: ${reactionTime} ms; resetGame(); } else { // too soon clearTimeout(timeoutId); message.textContent = "Too soon! Wait for green."; result.textContent = "Try again."; resetGame(); } });

function startWaiting() { waiting = true; gameBox.classList.remove("go"); gameBox.classList.add("ready"); message.textContent = "Wait for green...";

const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5s timeoutId = setTimeout(() => { gameBox.classList.remove("ready"); gameBox.classList.add("go"); message.textContent = "CLICK NOW!"; startTime = Date.now(); }, delay); }

function resetGame() { waiting = false; gameBox.classList.remove("ready", "go"); message.textContent = "Click anywhere to start"; }

