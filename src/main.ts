import "./style.css";

//Title of the App
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Clicker Game 101";
document.title = gameName;

// Counter Increase
let counter = 0;

const obj = document.createElement("div");
obj.innerText = "0 Lollipops";
obj.className = "test";
//document.getElementById("counterDisplay").appendChild(obj); //WHY DOES THIS NOT ALLOW ME TO COMMITTTTTTTT!!!! AHH

let lastTime = performance.now();

// Function to update the counter using requestAnimationFrame
function updateCounter(currentTime: number) {
  // Calculate the time elapsed since the last update
  const deltaTime = currentTime - lastTime;

  // Check if a second (1000 milliseconds) has passed
  if (deltaTime >= 1000) {
    // Increment the counter
    counter += Math.floor(deltaTime / 1000);
    obj.innerText = counter + " Lollipops Lollipopped";

    // Update the lastTime to the current time
    lastTime = currentTime;
  }

  // Request the next frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Button HERE
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("myButton");

  if (button) {
    button.addEventListener("click", () => {
      console.log("Button was clicked!");
      counter += 1; //Increase the button
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
