import { Controller } from "@hotwired/stimulus"

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

// Connects to data-controller="puzzle"
export default class extends Controller {
  static targets = ["p2RootDiv"]
  connect() {
    //rootDiv is where to mount the puzzle
    const rootDiv = this.p2RootDivTarget;

    this.start_puzzle = this.start_puzzle.bind(this);
    //this.stop_puzzle = this.stop_puzzle.bind(this);
    if (this.data.get("status") == "in_progress"){
      this.start_puzzle()
    } else {
      let button = document.createElement("button");
    button.innerHTML = "START!"
    button.classList.add("p2startButton")
    button.addEventListener("click", this.start_puzzle);
    rootDiv.appendChild(button);
    }

  }

  start_puzzle() {
    const rootDiv = this.p2RootDivTarget
    if (document.querySelector(".p2startButton")) {document.querySelector(".p2startButton").remove()}
    //current patern is the working array
    let current_pattern = []
    //puzzledata is the solution array
    const puzzledata = JSON.parse(this.data.get("variable"));

    const user_id = document.getElementById("user_id").innerText
    let player = 0
    if (user_id == this.data.get("user1")){
      player = 1
    } else {
      player = 2
    }
    let p2data = []
    if (player == 1){
      p2data = JSON.parse(this.data.get("p2data"));
    } else {
      p2data = JSON.parse(this.data.get("p1data"));
    }
    console.log(p2data)

    if (p2data.length == 0){
      p2data = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],]
    }

    //create the hints arrays
    let xValues = xWriter(puzzledata);
    let yValues = yWriter(puzzledata);



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
          if (p2data[i][n] == 1){
            box.classList.add("selected")
          } else if (p2data[i][n] == 2){
            box.classList.add("flagged")
          }
          box.dataset.x = n;
          box.dataset.y = i;
        row.appendChild(box);
      }
    }
  }

  // check_for_level_up() {
  //   console.log("hi")
  //   let xp = document.getElementById("xp_field").value
  //   let level = parseInt(document.getElementById("level_field").value)
  //   document.getElementById("level-span").innerText = level;
  //   document.getElementById("level-up-span").innerText = Math.floor(xp / 100);
  //   if (xp / 100 >= (level + 1)) {
  //     document.getElementById("level_field").value = Math.floor(xp / 100);
  //   return true
  //   }
  //   return false
  // }

  // create_puzzle_record() {
  //   document.getElementById("time_field").value = seconds_absolute;
  //   document.getElementById("puzzle_form").requestSubmit();
  // }
  // update_user_record() {
  //   document.getElementById("xp_field").value = parseInt(document.getElementById("xp_field").value) + 100
  // }

  // experience_roller() {
  //   let target = 100;
  //   let count = parseInt(document.getElementById("xp-value").innerText);
  //   let increment = 1;
  //   if (count < target) {
  //     count += increment;
  //     document.getElementById("xp-value").innerText = `${count}`;
  //     setTimeout(() => {
  //       this.experience_roller()
  //     }, 5);
  //   }

  // }

  // stop_puzzle(handleClick) {
  //   document.getElementById("time-span").innerText = (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
  //   let block = document.querySelector(".cornerBlock");
  //   block.classList.add("cleared");
  //   let cells = document.getElementsByClassName("cell");
  //   for (const cell of cells) {
  //     cell.replaceWith(cell.cloneNode(true))
  //   }
  //   let guides = document.getElementsByClassName("xGuide");
  //   for (const guide of guides) {
  //     guide.classList.add("cleared")
  //   }
  //   guides = document.getElementsByClassName("yGuide");
  //   for (const guide of guides) {
  //     guide.classList.add("cleared")
  //   }
  //   setTimeout(() => {
  //     let cells = document.getElementsByClassName("cell");
  //     for (const cell of cells) {
  //       cell.classList.remove("flagged")
  //       cell.classList.add("finished")
  //     }
  //     for (const guide of guides) {
  //       guide.innerText = ""
  //     }
  //     guides = document.getElementsByClassName("xGuide");
  //     for (const guide of guides) {
  //       guide.innerText = ""
  //     }
  //   },1);
  //   this.update_user_record();
  //   this.create_puzzle_record();
  //   setTimeout(() => {
  //     document.getElementById('conclussionModal').classList.remove("hidden");
  //     document.getElementById('popup-button').addEventListener("click", () => {
  //       document.getElementById('conclussionModal').style.display = "none";
  //       document.getElementById('kanji-data').classList.add("expanded");
  //       document.getElementById('highscores').classList.add("expanded");
  //     });
  //     this.experience_roller()
  //     this.check_for_level_up()
  //     if (this.check_for_level_up) {
  //       setTimeout(() => {
  //         document.getElementById('level-up').classList.remove("hidden");
  //         setTimeout(() => {
  //           document.getElementById('level-up').classList.add("expanded");
  //         },1)

  //         //document.getElementById('level-up-image').classList.remove("hidden");
  //       },1500)
  //     }

  //   },1000)

  // };
}
