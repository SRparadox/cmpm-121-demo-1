import "./style.css";

interface Item {
  name: string,
  cost: number,
  rate: number
};

const availableItems: Item[] = [
  {name: "Strawberry", cost: 10, rate: 0.1},
  {name: "Blueberry", cost: 100, rate: 2},
  {name: "Lemon", cost: 1000, rate: 50}
];

// DOM elements and variables setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Clicker Game 101";
document.title = gameName;

let counter = 0;
let growthRate = 0;
let growthButtonClicks = 0;
let tier2ButtonClicks = 0;
let tier3ButtonClicks = 0;

// Initialize tier costs
let tier1Cost = availableItems[0].cost;
let tier2Cost = availableItems[1].cost;
let tier3Cost = availableItems[2].cost;

// Counter display setup
const counterDisplay = document.getElementById("counterDisplay");
const counterElement = document.createElement("div");
counterElement.innerText = "0 Lollipops";
counterElement.className = "counter-text";
counterDisplay?.appendChild(counterElement);

const buttonClickElement = document.createElement("div");
buttonClickElement.innerText = `${availableItems[0].name} Flavor Purchased: 0`;
buttonClickElement.className = "click-text";
counterDisplay?.appendChild(buttonClickElement);

const tier2ClickElement = document.createElement("div");
tier2ClickElement.innerText = `${availableItems[1].name} Flavor Purchased: 0`;
tier2ClickElement.className = "click-text";
counterDisplay?.appendChild(tier2ClickElement);

const tier3ClickElement = document.createElement("div");
tier3ClickElement.innerText = `${availableItems[2].name} Flavor Purchased: 0`;
tier3ClickElement.className = "click-text";
counterDisplay?.appendChild(tier3ClickElement);

// Cost display elements
const tier1CostElement = document.createElement("div");
tier1CostElement.innerText = `${availableItems[0].name} Cost: ${tier1Cost.toFixed(2)}`;
tier1CostElement.className = "cost-text";
counterDisplay?.appendChild(tier1CostElement);

const tier2CostElement = document.createElement("div");
tier2CostElement.innerText = `${availableItems[1].name} Cost: ${tier2Cost.toFixed(2)}`;
tier2CostElement.className = "cost-text";
counterDisplay?.appendChild(tier2CostElement);

const tier3CostElement = document.createElement("div");
tier3CostElement.innerText = `${availableItems[2].name} Cost: ${tier3Cost.toFixed(2)}`;
tier3CostElement.className = "cost-text";
counterDisplay?.appendChild(tier3CostElement);

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
  const upgradeButton1 = document.getElementById(
    "upgradeButton1",
  ) as HTMLButtonElement;
  const upgradeButton10 = document.getElementById(
    "upgradeButton10",
  ) as HTMLButtonElement;

  if (upgradeButton) {
    upgradeButton.disabled = counter < tier1Cost;
  }

  if (upgradeButton1) {
    upgradeButton1.disabled = counter < tier2Cost;
  }

  if (upgradeButton10) {
    upgradeButton10.disabled = counter < tier3Cost;
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
    upgradeButton.addEventListener("click", () =>
      handleUpgrade(availableItems[0], 1),
    );
  if (upgradeButton1)
    upgradeButton1.addEventListener("click", () =>
      handleUpgrade(availableItems[1], 2),
    );
  if (upgradeButton10)
    upgradeButton10.addEventListener("click", () =>
      handleUpgrade(availableItems[2], 3),
    );
  if (clickButton) clickButton.addEventListener("click", handleButtonClick);

  createHeader();
  requestAnimationFrame(updateCounter);
});

function handleUpgrade(item: Item, tier: number) {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;

    switch (tier) {
      case 1:
        growthButtonClicks += 1;
        buttonClickElement.innerText = `${item.name} Flavor Purchased: ${growthButtonClicks}`;
        tier1Cost *= 1.15;
        tier1CostElement.innerText = `${item.name} Cost: ${tier1Cost.toFixed(2)}`;
        break;
      case 2:
        tier2ButtonClicks += 1;
        tier2ClickElement.innerText = `${item.name} Flavor Purchased: ${tier2ButtonClicks}`;
        tier2Cost *= 1.15;
        tier2CostElement.innerText = `${item.name} Cost: ${tier2Cost.toFixed(2)}`;
        break;
      case 3:
        tier3ButtonClicks += 1;
        tier3ClickElement.innerText = `${item.name} Flavor Purchased: ${tier3ButtonClicks}`;
        tier3Cost *= 1.15;
        tier3CostElement.innerText = `${item.name} Cost: ${tier3Cost.toFixed(2)}`;
        break;
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