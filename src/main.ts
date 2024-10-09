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

// Set up the timer to call the increment function every second (1000 milliseconds)
function incrementCounter() {
  counter += 1;
  obj.innerText = counter + " Lollipops Lollipopped";
}
setInterval(incrementCounter, 1000);

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
