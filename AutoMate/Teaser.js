// ----------------------------------------------------
// 1. Morphing Button, Idle Logic & API Submission
// ----------------------------------------------------
const toggleBtn = document.getElementById("toggle-btn");
const morphBox = document.getElementById("morph-box");
const usernameInput = document.getElementById("username-input");
const idleMessage = document.getElementById("idle-message");
const safelistForm = document.getElementById("safelist-form");
const submitArrow = document.querySelector(".submit-arrow");
const inputWrapperText = document.querySelector(".input-wrapper p");

let idleTimer;

function startIdleTimer() {
  idleTimer = setTimeout(() => {
    idleMessage.classList.add("visible");
  }, 10000);
}

// Morph the button into the input field
toggleBtn.addEventListener("click", () => {
  morphBox.classList.add("morphed");
  clearTimeout(idleTimer);
  idleMessage.classList.remove("visible");
  setTimeout(() => {
    usernameInput.focus();
  }, 400);
});

// Handle the API Fetch Submission
safelistForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevents the page from reloading

  const email = usernameInput.value.trim();

  // Basic Validation
  if (!email || !email.includes("@")) {
    idleMessage.textContent = "PLEASE ENTER A VALID EMAIL.";
    idleMessage.style.color = "#ef4444"; // Red error color
    idleMessage.classList.add("visible");
    return;
  }

  // --- LOADING STATE ---
  usernameInput.disabled = true;
  submitArrow.disabled = true;
  submitArrow.style.opacity = "0.5";
  submitArrow.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
  idleMessage.classList.remove("visible");

  try {
    // --- THE FETCH REQUEST ---
    // Replace this URL with your actual Node.js endpoint later
    const response = await fetch("http://localhost:5000/api/safelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      throw new Error("Server rejected request.");
    }

    // --- SUCCESS STATE ---
    inputWrapperText.textContent = "Welcome to the future";

    // Overwrite the input box with a sleek success badge
    morphBox.innerHTML = `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(184, 115, 99, 0.1); border: 1px solid var(--copper-main); border-radius: 50px; color: var(--copper-main); font-family: var(--font-main); font-weight: 600; letter-spacing: 0.1em; font-size: 0.85rem; animation: fadeIn 0.5s ease; z-index: 10;">
              <i class="fa-solid fa-check" style="margin-right: 8px;"></i>
              POSITION SECURED
            </div>
          `;
  } catch (error) {
    console.error("Submission Error:", error);

    // --- ERROR STATE (Revert UI) ---
    usernameInput.disabled = false;
    submitArrow.disabled = false;
    submitArrow.style.opacity = "1";
    submitArrow.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';

    idleMessage.textContent = "CONNECTION INTERRUPTED. TRY AGAIN.";
    idleMessage.style.color = "#ef4444";
    idleMessage.classList.add("visible");
    usernameInput.focus();
  }
});
// ----------------------------------------------------
// 2. Centered Typewriter
// ----------------------------------------------------
const lines = [
  "In Nigeria’s multi-billion Naira used-car market,",
  "documentation is often incomplete. Accident history",
  "is frequently obscured. Mechanical integrity is rarely",
  "verified. AutoMate inspects what others overlook",
  "because we are customer-first.",
  "The era of “buy and pray” is ending.",
];

const output = document.getElementById("typewriter-output");
const cursor = document.getElementById("cursor");
const preHeading = document.getElementById("pre-heading");
let lineIndex = 0,
  charIndex = 0;

function typeNextChar() {
  if (lineIndex >= lines.length) {
    // Cursor stays visible while waiting, then hides just as nudge appears
    setTimeout(() => {
      cursor.style.opacity = "0";
    }, 10000);
    preHeading.classList.add("visible"); // Show Brand Name
    startIdleTimer(); // Begin watching for idle user
    return;
  }
  const currentLine = lines[lineIndex];
  if (charIndex < currentLine.length) {
    const charSpan = document.createElement("span");
    charSpan.textContent = currentLine.charAt(charIndex);
    output.insertBefore(charSpan, cursor);
    charIndex++;
    setTimeout(typeNextChar, Math.random() * 20 + 15);
  } else {
    const br = document.createElement("br");
    output.insertBefore(br, cursor);
    lineIndex++;
    charIndex = 0;
    setTimeout(typeNextChar, 500);
  }
}
setTimeout(typeNextChar, 1200);

// ----------------------------------------------------
// 3. Planet-Pulse Fluid Waves (Constrained to Right Edge)
// ----------------------------------------------------
const canvas = document.getElementById("fluid-canvas");
const ctx = canvas.getContext("2d");
let width, height;

let targetSpeed = 1,
  currentSpeed = 1;
let targetAmp = 1,
  currentAmp = 1;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") targetAmp = Math.min(targetAmp + 0.3, 2.5);
  if (e.key === "ArrowDown") targetAmp = Math.max(targetAmp - 0.3, 0.2);
  if (e.key === "ArrowRight") targetSpeed = Math.min(targetSpeed + 0.5, 3.5);
  if (e.key === "ArrowLeft") targetSpeed = Math.max(targetSpeed - 0.5, -1.5);
});

// Right-side specific waves
const rightWaves = [
  {
    xBaseOffset: 0.9,
    amp: 50,
    freq: 0.0025,
    speed: 0.01,
    color: "rgba(15, 23, 42, 0.8)",
    phase: 0,
  },
  {
    xBaseOffset: 0.94,
    amp: 40,
    freq: 0.0035,
    speed: 0.015,
    color: "rgba(184, 115, 99, 0.15)",
    phase: 2,
  },
  {
    xBaseOffset: 0.98,
    amp: 30,
    freq: 0.0045,
    speed: 0.02,
    color: "rgba(184, 115, 99, 0.25)",
    phase: 4,
  },
];

let time = 0;

function animateFluid() {
  requestAnimationFrame(animateFluid);
  ctx.clearRect(0, 0, width, height);

  currentSpeed += (targetSpeed - currentSpeed) * 0.05;
  currentAmp += (targetAmp - currentAmp) * 0.05;
  time += 0.015 * currentSpeed;

  // Planetary pulse effect (breathes in and out)
  let planetPulse = Math.sin(time) * 40;

  // Draw Right Side Planet-Pulsing Wave
  rightWaves.forEach((wave) => {
    ctx.beginPath();
    ctx.moveTo(width, 0); // Start top right corner

    let dynamicBaseOffset = wave.xBaseOffset;

    for (let y = 0; y <= height; y += 15) {
      // Creates a rounded bulge in the middle of the screen height (planet curve)
      let planetCurve = Math.sin((y / height) * Math.PI) * (180 + planetPulse);

      let xBase = width * dynamicBaseOffset - planetCurve;
      let x =
        xBase - Math.sin(y * wave.freq + wave.phase) * (wave.amp * currentAmp);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.lineTo(width, 0);
    ctx.fillStyle = wave.color;
    ctx.fill();

    wave.phase += wave.speed * currentSpeed;
  });
}
animateFluid();
