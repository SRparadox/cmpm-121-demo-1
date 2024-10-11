import "./style.css";

// Title of the App
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Clicker Game 101";
document.title = gameName;

// Counter and Growth Rate
let counter = 0;
let growthRate = 0;

// Create and display counter element
const counterDisplay = document.getElementById("counterDisplay");
const counterElement = document.createElement("div");
counterElement.innerText = "0 Lollipops";
counterElement.className = "counter-text";
counterDisplay?.appendChild(counterElement);

let lastTime = performance.now();

// Function to update the counter
function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;

  // Update growth rate display
  const counterText = document.getElementById("counter");
  if (counterText) {
    counterText.textContent = growthRate.toFixed(1);
  }

  // Update the upgrade button's state
  const upgradeButton = document.getElementById("upgradeButton") as HTMLButtonElement;
  if (upgradeButton) {
    upgradeButton.disabled = counter < 10;
  }

  // Increase counter at the interval of 1 second
  if (deltaTime >= 1000) {
    counter += growthRate;
    counterElement.innerText = `${counter.toFixed(1)} Lollipops Lollipopped`;
    lastTime = currentTime;
  }

  requestAnimationFrame(updateCounter);
}

// Initialize DOM content once loaded
document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById("upgradeButton") as HTMLButtonElement;
  const clickButton = document.getElementById("myButton");

  if (upgradeButton) {
    upgradeButton.addEventListener("click", handleUpgrade);
  } else {
    console.error("Upgrade button not found!");
  }
  
  if (clickButton) {
    clickButton.addEventListener("click", handleButtonClick);
  } else {
    console.error("Button not found!");
  }

  createHeader();
  requestAnimationFrame(updateCounter);
});

// Handle the upgrade button click
function handleUpgrade() {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
  }
}

// Handle the main button click
function handleButtonClick() {
  console.log("Button was clicked!");
  counter += 1;
  counterElement.innerText = `${counter} Lollipops Lollipopped`;
}

// Create and append a header
function createHeader() {
  const header = document.createElement("h1");
  header.innerHTML = gameName;
  app.append(header);
}