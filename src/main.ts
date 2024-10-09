import "./style.css";

//Title of the App
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Clicker Game 101";
document.title = gameName;

// Counter Increase and Growth Rate
let counter = 0;
let growthRate = 0;
let temp1 = 0;

const obj = document.createElement("div");
obj.innerText = "0 Lollipops";
obj.className = "test";
//document.getElementById("counterDisplay").appendChild(obj); //WHY DOES THIS NOT ALLOW ME TO COMMITTTTTTTT!!!! AHH
const counterDisplay = document.getElementById("counterDisplay");
if (counterDisplay) {
  counterDisplay.appendChild(obj);
}

let lastTime = performance.now();

// Function to update the counter using requestAnimationFrame
function updateCounter(currentTime: number) {
  // Calculate the time elapsed since the last update
  const deltaTime = currentTime - lastTime;

  // Display the updated counter value
  document.getElementById("counter")!.textContent = growthRate.toString();

  // Enable or disable the upgrade button based on counter value
  //document.getElementById("upgradeButton").disabled = counter < 10;
  const upgradeButton = document.getElementById(
    "upgradeButton",
  ) as HTMLButtonElement;
  if (upgradeButton) {
    upgradeButton.disabled = counter < 10;
  }
  // Check if a second (1000 milliseconds) has passed
  if (deltaTime >= 1000) {
    // Increment the counter
    counter += Math.floor(deltaTime / 1000);
    obj.innerText = counter + " Lollipops Lollipopped";
    temp1 = Math.floor(deltaTime / 1000);
    // Update the lastTime to the current time
    lastTime = currentTime;
  }

  // Request the next frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Add event listener for the purchase button
const upgradeButton = document.getElementById("upgradeButton");
if (upgradeButton) {
  upgradeButton.addEventListener("click", () => {
    if (counter >= 10) {
      counter -= 10;
      growthRate += temp1;
    }
  });
} else {
  console.error("Upgrade button not found!");
}

// Button HERE
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("myButton");

  if (button) {
    button.addEventListener("click", () => {
      console.log("Button was clicked!");
      counter += 1; //Increase the counter
      //alert(counter);
      obj.innerText = counter + " Lollipops Lollipopped";
    });
  } else {
    console.error("Button not found!");
  }
});

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
