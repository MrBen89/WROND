import { Controller } from "@hotwired/stimulus"

let staqtus = 0;

//compares if the target and current array arre the same
let checkArrays = (arr1, arr2) => {
  for (let i=0; i<16; i++){
      for (let n=0; n<16; n++){
          if (arr1[i][n] != arr2[i][n]){
              return false;
          }
      }
  }
  return true;
}

//takes a given array and returns puzzle guides for that array.
let numberWriter = ((array) => {
  let valueString = ""
  let count=0
  array.forEach((item) => {
    if (item == "1"){
      count += 1
    } else if (count > 0){
      valueString += `${count}\n`
      count = 0
    }
  })
  if (count > 0) {
    valueString += count
  }
  return valueString
})

//takes each column and returns the puzzle guides
let xWriter = ((puzzledata) => {
  let xValues = [];
  for (let n = 0; n < 16; n ++){
    let numArray = [];
    for (let i = 0; i < 16; i ++){
      numArray.push(puzzledata[i][n])
    }
    xValues.push(numberWriter(numArray))
  }
  return xValues;
})

//takes each row and returns the puzzle guides
let yWriter = ((puzzledata) => {
  let yValues = [];
  for (let i = 0; i < 16; i ++) {
    yValues.push(numberWriter(puzzledata[i]).replaceAll("\n", " "))
  }
  return yValues;
})
var seconds = 0;
var minutes = 0;

let timer = (() => {setInterval(() => {
  document.getElementById('timerBox').innerHTML=
  (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
  seconds ++;
  if (seconds >= 60) {
      minutes ++;
      seconds = 0
    }
  }, 1000);
})

// Connects to data-controller="puzzle"
export default class extends Controller {
  static targets = ["rootDiv"]
  connect() {
    //rootDiv is where to mount the puzzle
    const rootDiv = this.rootDivTarget;
    this.start_puzzle = this.start_puzzle.bind(this);
    this.stop_puzzle = this.stop_puzzle.bind(this);
    let button = document.createElement("button");
    button.innerHTML = "START!"
    button.addEventListener("click", this.start_puzzle);
    rootDiv.appendChild(button);
  }

  start_puzzle() {
    timer()
    //current patern is the working array
    let current_pattern = []
    //puzzledata is the solution array
    console.log(this.data.get("variable"))
    const puzzledata = JSON.parse(this.data.get("variable"));
    //create the hints arrays
    let xValues = xWriter(puzzledata);
    let yValues = yWriter(puzzledata);

    const rootDiv = this.rootDivTarget

    //create a puzzle guides row
    let row = document.createElement("div");
    row.classList.add("header");
    row.classList.add("row");
    let box = document.createElement("div");
    box.classList.add("cornerBlock");
    box.setAttribute("id", "timerBox");
    box.innerText = "00:00";
    row.appendChild(box);
    for (let i = 0; i < 16; i ++){
      let box = document.createElement("div")
      box.classList.add("xGuide")
      box.innerText = xValues[i]
      row.appendChild(box);
    }
    rootDiv.appendChild(row);


    //create rows
    for (let i = 0; i < 16; i++){
      let row = document.createElement("div")
      row.classList.add("row");
      rootDiv.appendChild(row);
      //add rows to current_pattern
      current_pattern.push([]);
      //create guide cell
      let box = document.createElement("div")
      box.classList.add("yGuide")
      box.innerText = yValues[i]
      row.appendChild(box);
      //create columns
      for (let n = 0; n < 16; n++){
          //add columns to current_patern
          current_pattern[i].push("0")
          let box = document.createElement("div");
          box.classList.add(`col${n}`);
          box.classList.add(`row${i}`);
          box.classList.add(`cell`);
          box.dataset.add
          box.dataset.x = n;
          box.dataset.y = i;

          const handleClick = () => {
            current_pattern[i][n] == "0" ?  current_pattern[i][n] = "1" :  current_pattern[i][n] = "0";
              event.currentTarget.classList.remove("flagged");
              event.currentTarget.classList.toggle("selected")


              //check for win
              if (checkArrays(current_pattern, puzzledata)){
                  this.stop_puzzle(handleClick)
              }
          }

          //add click listener to each cell
          box.addEventListener("mousedown", handleClick)
          box.addEventListener("contextmenu", () => {
            current_pattern[i][n] = "0"
            event.preventDefault();
            event.currentTarget.classList.remove("selected");
            event.currentTarget.classList.toggle("flagged");
          })
        //add everything to the mount
        row.appendChild(box);
      }
    }
  }
  stop_puzzle(handleClick) {
    let block = document.querySelector(".cornerBlock");
    block.classList.add("cleared");
    let cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
      cell.replaceWith(cell.cloneNode(true))
      cell.classList.add("finished")
    }
    let guides = document.getElementsByClassName("xGuide");
    for (const guide of guides) {
      guide.classList.add("cleared")
    }
    guides = document.getElementsByClassName("yGuide");
    for (const guide of guides) {
      guide.classList.add("cleared")
    }
    setTimeout(() => {
      let cells = document.getElementsByClassName("cell");
      for (const cell of cells) {
        cell.classList.add("finished")
      }
      for (const guide of guides) {
        guide.innerText = ""
      }
      guides = document.getElementsByClassName("xGuide");
      for (const guide of guides) {
        guide.innerText = ""
      }
    },1);
  };
}
