const letters = "BCDEFGHIJKLMNOPQRSTUVWXYZ"; // all letters except A
const grid = document.getElementById("grid");
const resetBtn = document.getElementById("resetBtn");
const timerDisplay = document.getElementById("timer");
const popup = document.getElementById("popup");

// Heartbeat sound
const heartbeat = new Audio("heartbeat.mp3");
heartbeat.loop = true;

let time = 5;
let timerInterval;

// Show popup
function showPopup(message, duration = 1500) {
    popup.textContent = message;
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, duration);
}

// Generate grid
function generateGrid() {
    grid.innerHTML = "";
    clearInterval(timerInterval);
    time = 5;
    timerDisplay.textContent = `Time: ${time}s`;
    document.body.classList.remove("pressure");
    heartbeat.pause();
    heartbeat.currentTime = 0;
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("jitter-fast"));

    const aPosition = Math.floor(Math.random() * 100);

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";

        if (i === aPosition) {
            cell.textContent = "A";
            cell.addEventListener("click", () => {
                clearInterval(timerInterval);
                showPopup("🎉 You found the A! You win!", 2000);
                document.body.classList.remove("pressure");
                heartbeat.pause();
            });
        } else {
            cell.textContent = letters[Math.floor(Math.random() * letters.length)];
            cell.addEventListener("click", () => {
                showPopup("❌ Wrong letter. Try again!", 1000);
            });
        }

        grid.appendChild(cell);
    }

    // Timer
    timerInterval = setInterval(() => {
        time--;
        timerDisplay.textContent = `Time: ${time}s`;

        if (time <= 3 && time > 0) {
            document.body.classList.add("pressure");
            timerDisplay.style.transform = "scale(1.5)";
            timerDisplay.style.color = "#ff0000";
            document.querySelectorAll(".cell").forEach(cell => cell.classList.add("jitter-fast"));

            if (heartbeat.paused) heartbeat.play();
            heartbeat.playbackRate = 1 + (3 - time) * 0.5;
        } else {
            timerDisplay.style.transform = "scale(1)";
            timerDisplay.style.color = "#ffdd57";
            document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("jitter-fast"));
        }

        if (time <= 0) {
            clearInterval(timerInterval);
            showPopup("⏰ Time's up! Game over!", 2000);
            document.body.classList.remove("pressure");
            heartbeat.pause();
        }
    }, 1000);
}

resetBtn.addEventListener("click", generateGrid);
generateGrid();
