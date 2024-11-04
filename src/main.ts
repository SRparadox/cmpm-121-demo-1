import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  colorClass: string; // New field for color class
}

const availableItems: Item[] = [
  {
    name: "Strawberry",
    cost: 10,
    rate: 0.1,
    description:
      "They say that the universe was created by the diety of the Strawberry lollipops: Strawberry!",
    colorClass: "strawberry-color",
  },
  {
    name: "Blueberry",
    cost: 100,
    rate: 2,
    description:
      "The seas and the sky reprecent the twin aspects of the path of the omniprescence of Blueberry!",
    colorClass: "blueberry-color",
  },
  {
    name: "Lemon",
    cost: 1000,
    rate: 50,
    description:
      "The big fiery light in the sky is not a star, but Lemon 'The Burning Lollipop'!",
    colorClass: "lemon-color",
  },
  {
    name: "Lollipop Thief",
    cost: 20,
    rate: 2,
    description:
      "The worst of the worst, there are tales of thiefs that steal lollpops. Their services can be bought, but at what cost?",
    colorClass: "thief-color",
  },
  {
    name: "Lollipop Mage",
    cost: 120,
    rate: 15,
    description:
      "Tread carefully when buying the services from a mage, some say their practice is heresy against all lollipops",
    colorClass: "mage-color",
  },
];

// DOM elements and variables setup
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "To Lollipop or to not Lollipop";
document.title = gameName;

let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

const clickCounts = new Map<string, number>();
const costElements = new Map<string, HTMLElement>();
const clickElements = new Map<string, HTMLElement>();
const descriptionElements = new Map<string, HTMLElement>();
const buttons = new Map<string, HTMLButtonElement>();

// Counter display setup
const counterDisplay = document.getElementById("counterDisplay");
const counterElement = document.createElement("div");
counterElement.className = "counter-text";
counterDisplay?.appendChild(counterElement);

updateCounterDisplay();

// Dynamically create elements for each item
availableItems.forEach((item) => {
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

  const descriptionElement = document.createElement("div");
  descriptionElement.innerText = item.description;
  descriptionElement.className = `description-text ${item.colorClass}`;
  counterDisplay?.appendChild(descriptionElement);
  descriptionElements.set(item.name, descriptionElement);
});

availableItems.forEach((item, index) => {
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
function updateCounterValue(currentTime: number): void {
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) {
    counter += growthRate;
    lastTime = currentTime;
    updateCounterDisplay();
  }
}

function updateButtonStates(): void {
  availableItems.forEach((item) => {
    const button = buttons.get(item.name);
    if (button) {
      button.disabled = counter < item.cost;
    }
  });
}

function updateCounter(currentTime: number) {
  updateCounterValue(currentTime);
  updateButtonStates();
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

function canPurchaseUpgrade(item: Item): boolean {
  return counter >= item.cost;
}

function updateItemData(item: Item, clickCount: number): void {
  counter -= item.cost;
  growthRate += item.rate;
  clickCounts.set(item.name, clickCount);
  item.cost *= 1.15;
}

function updateDOMForItem(item: Item, clickCount: number): void {
  const clickElement = clickElements.get(item.name);
  if (clickElement) {
    clickElement.innerText = `${item.name} Flavor Purchased: ${clickCount}`;
  }
  
  const costElement = costElements.get(item.name);
  if (costElement) {
    costElement.innerText = `${item.name} Cost: ${item.cost.toFixed(2)}`;
  }
}

function handleUpgrade(item: Item) {
  if (canPurchaseUpgrade(item)) {
    const itemName = item.name;
    const clickCount = (clickCounts.get(itemName) || 0) + 1;
    
    updateItemData(item, clickCount);
    updateDOMForItem(item, clickCount);
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
