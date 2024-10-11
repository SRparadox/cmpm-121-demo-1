// Import the stylesheet
import "./style.css";

// DOM elements and variables setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Clicker Game 101";
document.title = gameName;

let counter = 0;
let growthRate = 0;
let growthButtonClicks = 0;
let tier2ButtonClicks = 0;
let tier3ButtonClicks = 0;

// Counter display setup
const counterDisplay = document.getElementById("counterDisplay");
const counterElement = document.createElement("div");
counterElement.innerText = "0 Lollipops";
counterElement.className = "counter-text";
counterDisplay?.appendChild(counterElement);

const buttonClickElement = document.createElement("div");
buttonClickElement.innerText = "Tier 1 Purchased: 0";
buttonClickElement.className = "click-text";
counterDisplay?.appendChild(buttonClickElement);

const tier2ClickElement = document.createElement("div");
tier2ClickElement.innerText = "Tier 2 Purchased: 0";
tier2ClickElement.className = "click-text";
counterDisplay?.appendChild(tier2ClickElement);

const tier3ClickElement = document.createElement("div");
tier3ClickElement.innerText = "Tier 3 Purchased: 0";
tier3ClickElement.className = "click-text";
counterDisplay?.appendChild(tier3ClickElement);

let lastTime = performance.now();

// Function to update the counter
function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;

  const counterText = document.getElementById("counter");
  if (counterText) {
    counterText.textContent = growthRate.toFixed(1);
  }

  // Update button disable conditions with new costs
  const upgradeButton = document.getElementById(
    "upgradeButton",
  ) as HTMLButtonElement;
  if (upgradeButton) {
    upgradeButton.disabled = counter < 10;
  }

  const upgradeButton1 = document.getElementById(
    "upgradeButton1",
  ) as HTMLButtonElement;
  if (upgradeButton1) {
    upgradeButton1.disabled = counter < 50;
  }

  const upgradeButton10 = document.getElementById(
    "upgradeButton10",
  ) as HTMLButtonElement;
  if (upgradeButton10) {
    upgradeButton10.disabled = counter < 200;
  }

  if (deltaTime >= 1000) {
    counter += growthRate;
    counterElement.innerText = `${counter.toFixed(1)} Lollipops Lollipopped`;
    lastTime = currentTime;
  }

  requestAnimationFrame(updateCounter);
}

// Initialize DOM content once loaded
document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById(
    "upgradeButton",
  ) as HTMLButtonElement;
  const upgradeButton1 = document.getElementById(
    "upgradeButton1",
  ) as HTMLButtonElement;
  const upgradeButton10 = document.getElementById(
    "upgradeButton10",
  ) as HTMLButtonElement;
  const clickButton = document.getElementById("myButton");

  if (upgradeButton)
    upgradeButton.addEventListener("click", () => handleUpgrade(10, 0.1, 1));
  if (upgradeButton1)
    upgradeButton1.addEventListener("click", () => handleUpgrade(50, 1.0, 2));
  if (upgradeButton10)
    upgradeButton10.addEventListener("click", () => handleUpgrade(200, 10.0, 3));
  if (clickButton) clickButton.addEventListener("click", handleButtonClick);

  createHeader();
  requestAnimationFrame(updateCounter);
});

function handleUpgrade(
  cost: number,
  increment: number,
  tier: number,
) {
  if (counter >= cost) {
    counter -= cost;
    growthRate += increment;

    if (tier === 1) {
      growthButtonClicks += 1;
      buttonClickElement.innerText = `Tier 1 Purchased: ${growthButtonClicks}`;
    } else if (tier === 2) {
      tier2ButtonClicks += 1;
      tier2ClickElement.innerText = `Tier 2 Purchased: ${tier2ButtonClicks}`;
    } else if (tier === 3) {
      tier3ButtonClicks += 1;
      tier3ClickElement.innerText = `Tier 3 Purchased: ${tier3ButtonClicks}`;
    }
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
