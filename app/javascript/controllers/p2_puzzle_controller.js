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
    this.stop_puzzle = this.stop_puzzle.bind(this);
    if (this.data.get("status") == "in_progress"){
      this.start_puzzle()
    } else if (this.data.get("status") == "complete") {
      this.stop_puzzle()
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
    console.log(player)
    if (player == 1){
      p2data = JSON.parse(this.data.get("p2data"));
    } else {
      p2data = JSON.parse(this.data.get("p1data"));
    }

    let not_player = 0
    if (user_id == this.data.get("user1")){
      not_player = 2
    } else {
      not_player = 1
    }


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
    const bg_style = this.data.get(`u${not_player}_background_style`).replace(" ", "_")
    const cell_style = this.data.get(`u${not_player}_cell_style`).replace(" ", "_")
    const active_style = this.data.get(`u${not_player}_active_style`).replace(" ", "_")
    const flagged_style = this.data.get(`u${not_player}_flagged_style`).replace(" ", "_")

    rootDiv.classList.add(bg_style)

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
          box.classList.add(active_style)
          box.classList.add(flagged_style)
          box.classList.add(cell_style)
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

  stop_puzzle(handleClick) {
    // let block = document.querySelector(".cornerBlock");
    // block.classList.add("cleared");
    // let cells = document.getElementsByClassName("cell");
    // for (const cell of cells) {
    //   cell.replaceWith(cell.cloneNode(true))
    // }
    // let guides = document.getElementsByClassName("xGuide");
    // for (const guide of guides) {
    //   guide.classList.add("cleared")
    // }
    // guides = document.getElementsByClassName("yGuide");
    // for (const guide of guides) {
    //   guide.classList.add("cleared")
    // }
    // setTimeout(() => {
    //   let cells = document.getElementsByClassName("cell");
    //   for (const cell of cells) {
    //     cell.classList.remove("flagged")
    //     cell.classList.add("finished")
    //   }
    //   for (const guide of guides) {
    //     guide.innerText = ""
    //   }
    //   guides = document.getElementsByClassName("xGuide");
    //   for (const guide of guides) {
    //     guide.innerText = ""
    //   }
    // },1);


  };

  // puzzle_ended() {
  //   const p2data = JSON.parse(this.data.get("p2data"));
  //   const rootDiv = this.p2RootDivTarget
  //   for (let i = 0; i < 16; i++){
  //     let row = document.createElement("div")
  //     row.classList.add("row");
  //     rootDiv.appendChild(row);
  //     //create guide cell
  //     let box = document.createElement("div")
  //     box.classList.add("yGuide")
  //     row.appendChild(box);
  //     //create columns
  //     for (let n = 0; n < 16; n++){
  //         //add columns to current_patern
  //         let box = document.createElement("div");
  //         box.classList.add(`col${n}`);
  //         box.classList.add(`row${i}`);
  //         box.classList.add(`cell`);
  //         box.classList.add("finished")
  //         if (p2data[i][n] == 1){
  //           box.classList.add("selected")
  //         }
  //         box.dataset.x = n;
  //         box.dataset.y = i;
  //       row.appendChild(box);
  //     }
  //   }
  // }
}
