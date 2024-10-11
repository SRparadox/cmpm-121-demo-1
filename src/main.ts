import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Strawberry", cost: 10, rate: 0.1 },
  { name: "Blueberry", cost: 100, rate: 2 },
  { name: "Lemon", cost: 1000, rate: 50 },
];

// DOM elements and variables setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Clicker Game 101";
document.title = gameName;

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

const clickCounts = new Map<string, number>();
const costElements = new Map<string, HTMLElement>();
const clickElements = new Map<string, HTMLElement>();
const buttons = new Map<string, HTMLButtonElement>();

// Counter display setup
const counterDisplay = document.getElementById("counterDisplay");
const counterElement = document.createElement("div");
counterElement.className = "counter-text";
counterDisplay?.appendChild(counterElement);

updateCounterDisplay();

// Dynamically create elements for each item
availableItems.forEach((item) => {
  // Removed index
  clickCounts.set(item.name, 0);

  const clickElement = document.createElement("div");
  clickElement.innerText = `${item.name} Flavor Purchased: 0`;
  clickElement.className = "click-text";
  counterDisplay?.appendChild(clickElement);
  clickElements.set(item.name, clickElement);

  const costElement = document.createElement("div");
  costElement.innerText = `${item.name} Cost: ${item.cost.toFixed(2)}`;
  costElement.className = "cost-text";
  counterDisplay?.appendChild(costElement);
  costElements.set(item.name, costElement);
});

availableItems.forEach((item, index) => {
  // index is used here, so it's needed
  const button = document.createElement("button");
  button.id = `upgradeButton${index}`;
  button.innerText = `Upgrade ${item.name}`;
  button.disabled = counter < item.cost;
  button.className = "upgrade-button";
  counterDisplay?.appendChild(button);
  buttons.set(item.name, button);

  button.addEventListener("click", () => handleUpgrade(item));
});

// Function to update the counter
function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;

  if (deltaTime >= 1000) {
    counter += growthRate;
    updateCounterDisplay();
    lastTime = currentTime;
  }

  availableItems.forEach((item) => {
    const button = buttons.get(item.name);
    if (button) {
      button.disabled = counter < item.cost;
    }
  });

  requestAnimationFrame(updateCounter);
}

// Function to update the counter display text
function updateCounterDisplay() {
  counterElement.innerText = `Lollipopping/Second 🍭: ${growthRate.toFixed(1)}, Current: ${counter.toFixed(1)} 🍭 Lollipops Lollipopped`;
}

// Initialize DOM content once loaded
document.addEventListener("DOMContentLoaded", () => {
  const clickButton = document.getElementById("myButton");
  if (clickButton) clickButton.addEventListener("click", handleButtonClick);

  createHeader();
  requestAnimationFrame(updateCounter);
});

function handleUpgrade(item: Item) {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;
    const itemName = item.name;

    const clickCount = (clickCounts.get(itemName) || 0) + 1;
    clickCounts.set(itemName, clickCount);

    const clickElement = clickElements.get(itemName);
    if (clickElement) {
      clickElement.innerText = `${itemName} Flavor Purchased: ${clickCount}`;
    }

    item.cost *= 1.15;
    const costElement = costElements.get(itemName);
    if (costElement) {
      costElement.innerText = `${itemName} Cost: ${item.cost.toFixed(2)}`;
    }

    updateCounterDisplay();
  }
}

// Handle the main button click
function handleButtonClick() {
  console.log("Button was clicked!");
  counter += 1;
  updateCounterDisplay();
}

// Create and append a header
function createHeader() {
  const header = document.createElement("h1");
  header.innerHTML = gameName;
  app.append(header);
}
