import { Controller } from "@hotwired/stimulus"

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
let seconds = 0;
let minutes = 0;
let seconds_absolute = 0;

let timer = (() => {setInterval(() => {
  document.getElementById('timerBox').innerHTML=
  (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
  seconds ++;
  seconds_absolute ++;
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
    button.classList.add("startButton")
    button.addEventListener("click", this.start_puzzle);
    rootDiv.appendChild(button);
  }

  start_puzzle() {

    document.querySelector(".startButton").remove()
    timer()
    //current patern is the working array
    let current_pattern = []
    //puzzledata is the solution array
    console.log(document.getElementById('conclussionModal'));
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

          const handleRightClick = () => {
            current_pattern[i][n] = "0";
            event.preventDefault();
            event.currentTarget.classList.remove("selected");
            event.currentTarget.classList.toggle("flagged");
          }

          //add click listener to each cell
          box.addEventListener("mousedown", handleClick)
          box.addEventListener("contextmenu", handleRightClick)
        //add everything to the mount
        row.appendChild(box);
      }
    }
  }

  check_for_level_up() {
    let xp = document.getElementById("xp_field").value
    let level = parseInt(document.getElementById("level_field").value)
    if (xp / 100 >= (level + 1)) {
      document.getElementById("level_field").value = Math.floor(xp / 100)
    }
  }

  create_puzzle_record() {
    document.getElementById("time_field").value = seconds_absolute;
    document.getElementById("puzzle_form").requestSubmit();
  }
  update_user_record() {
    document.getElementById("xp_field").value = parseInt(document.getElementById("xp_field").value) + 100
    this.check_for_level_up()
  }

  experience_roller() {
    console.log("xp")
    let target = 100;
    let count = parseInt(document.getElementById("xp-value").innerText);
    console.log(count)
    let increment = 1;
    if (count < target) {
      count += increment;
      document.getElementById("xp-value").innerText = `${count}`;
      setTimeout(() => {
        this.experience_roller()
      }, 10);
    }

  }

  stop_puzzle(handleClick) {
    document.getElementById("time-span").innerText = (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
    let block = document.querySelector(".cornerBlock");
    block.classList.add("cleared");
    let cells = document.getElementsByClassName("cell");
    for (const cell of cells) {
      cell.replaceWith(cell.cloneNode(true))
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
        cell.classList.remove("flagged")
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
    this.update_user_record();
    this.create_puzzle_record();
    setTimeout(() => {
      document.getElementById('conclussionModal').style.display = "block";
      document.getElementById('popup-button').addEventListener("click", () => {
        document.getElementById('conclussionModal').style.display = "none";
      });
      this.experience_roller()
    },1000)

  };
}
