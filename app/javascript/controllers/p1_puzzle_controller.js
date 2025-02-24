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
  static targets = ["p1RootDiv"]
  connect() {
    //rootDiv is where to mount the puzzle
    const rootDiv = this.p1RootDivTarget;

    this.start_puzzle = this.start_puzzle.bind(this);
    this.stop_puzzle = this.stop_puzzle.bind(this);
    if (this.data.get("status") == "in_progress"){
      this.start_puzzle()
    } else if (this.data.get("status") == "completed"){
      this.stop_puzzle()
    } else {
      let button = document.createElement("button");
      button.innerHTML = "START!"
      button.classList.add("p1startButton")
      button.addEventListener("click", this.start_puzzle);
      button.addEventListener("click", () => {document.querySelector(".p2startButton").click()});
      rootDiv.appendChild(button);
    }
  }

  start_puzzle() {
    const rootDiv = this.p1RootDivTarget
    let mouse_status = "up"
    let mode = "draw"

    if (document.querySelector(".p1startButton")) {document.querySelector(".p1startButton").remove()}
    timer()
    //current pattern is the working array
    //let current_pattern = []
    //puzzledata is the solution array
    const puzzledata = JSON.parse(this.data.get("variable"));
    const user_id = document.getElementById("user_id").innerText
    let player = 0

    if (user_id == this.data.get("user1")){
      player = 1
    } else {
      player = 2
    }
    let current_pattern = []

    if (player == 1 && this.data.get("p1data") != null && this.data.get("p1data").length > 0) {
      current_pattern = JSON.parse(this.data.get("p1data"))
    } else if (player == 2 && this.data.get("p2data") != null && this.data.get("p2data").length > 0) {
      current_pattern = JSON.parse(this.data.get("p2data"))
    }

    if (current_pattern.length == 0){
      console.log("reset array");
      current_pattern = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

    const bg_style = this.data.get("background_style").replace(" ", "_")
    const cell_style = this.data.get("cell_style").replace(" ", "_")
    const active_style = this.data.get("active_style").replace(" ", "_")
    const flagged_style = this.data.get("flagged_style").replace(" ", "_")

    rootDiv.classList.add(bg_style)

    rootDiv.addEventListener("mouseup", () => {
      mouse_status = "up"
      mode = "draw"
      document.getElementById("state_field").value = JSON.stringify(current_pattern);
      document.getElementById("conflict_form").requestSubmit()
    })



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
      //current_pattern.push([]);
      //create guide cell
      let box = document.createElement("div")
      box.classList.add("yGuide")
      box.innerText = yValues[i]
      row.appendChild(box);
      //create columns
      for (let n = 0; n < 16; n++){
          //add columns to current_patern
          //current_pattern[i].push("0")
          let box = document.createElement("div");
          box.classList.add(`col${n}`);
          box.classList.add(`row${i}`);
          box.classList.add(`cell`);
          box.classList.add(active_style)
          box.classList.add(flagged_style)
          box.classList.add(cell_style)
          if (current_pattern[i][n] == 1){
            box.classList.add("selected")
          } else if (current_pattern[i][n] == 2){
            box.classList.add("flagged")
          }
          box.dataset.x = n;
          box.dataset.y = i;

          const handleDrag = () => {
            if (mouse_status == "left") {
              if (mode == "draw"){
                current_pattern[i][n] = "1"
                event.currentTarget.classList.remove("flagged");
                event.currentTarget.classList.add("selected")
              } else if (mode == "erase") {
                current_pattern[i][n] = "0";
                event.currentTarget.classList.remove("flagged");
                event.currentTarget.classList.remove("selected")
              }

              //check for win
              if (checkArrays(current_pattern, puzzledata)){
                  this.stop_puzzle(handleClick)
              }

            } else if (mouse_status == "right") {
              if (mode == "draw"){
                current_pattern[i][n] = "0";
                event.preventDefault();
                event.currentTarget.classList.remove("selected");
                event.currentTarget.classList.add("flagged");
              } else if (mode == "erase"){
                event.preventDefault();
                event.currentTarget.classList.remove("flagged");
              }
            }
          }


          const handleClick = () => {
            event.button == 0 ? mouse_status = "left" : mouse_status = "right"
            if (mouse_status == "left"){
              if (event.currentTarget.classList.contains("selected")){
                mode = "erase"
              } else if (!event.currentTarget.classList.contains("selected")){
                mode = "draw"
              }
              current_pattern[i][n] == "0" ?  current_pattern[i][n] = "1" :  current_pattern[i][n] = "0";
              event.currentTarget.classList.remove("flagged");
              event.currentTarget.classList.toggle("selected")
            }
              //check for win
              if (checkArrays(current_pattern, puzzledata)){
                this.stop_puzzle(handleClick)
            }
          }

          const handleRightClick = () => {
            if (mouse_status == "right"){
              if (event.currentTarget.classList.contains("flagged")){
                mode = "erase"
              } else if (!event.currentTarget.classList.contains("flagged")){
                mode = "draw"
              }
              current_pattern[i][n] = "0";
              event.preventDefault();
              event.currentTarget.classList.remove("selected");
              event.currentTarget.classList.toggle("flagged");
            }

          }

          //add click listener to each cell
          box.addEventListener("mouseenter", handleDrag)
          box.addEventListener("mousedown", handleClick)
          box.addEventListener("contextmenu", handleRightClick)
        //add everything to the mount
        row.appendChild(box);
      }
    }
  }

  check_for_level_up() {
    console.log("hi")
    let xp = document.getElementById("xp_field").value
    let level = parseInt(document.getElementById("level_field").value)
    document.getElementById("level-span").innerText = level;
    document.getElementById("level-up-span").innerText = Math.floor(xp / 100);
    if (xp / 100 >= (level + 1)) {
      document.getElementById("level_field").value = Math.floor(xp / 100);
    return true
    }
    return false
  }

  update_conflict() {
    document.getElementById("time_field").value = seconds_absolute;
    document.getElementById("status_field").value = "complete";
    document.getElementById("winner_field").value = user_id;
    document.getElementById("conflict_form").requestSubmit();
  }
  update_user_record() {
    document.getElementById("xp_field").value = parseInt(document.getElementById("xp_field").value) + 100
  }

  experience_roller() {
    let target = 100;
    let count = parseInt(document.getElementById("xp-value").innerText);
    let increment = 1;
    if (count < target) {
      count += increment;
      document.getElementById("xp-value").innerText = `${count}`;
      setTimeout(() => {
        this.experience_roller()
      }, 5);
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
    setTimeout(() => {
      document.getElementById('conclussionModal').classList.remove("hidden");
      document.getElementById('popup-button').addEventListener("click", () => {
        document.getElementById('conclussionModal').style.display = "none";
        // document.getElementById('kanji-data').classList.add("expanded");
        // document.getElementById('highscores').classList.add("expanded");
      });
      if (this.check_for_level_up) {
        setTimeout(() => {
          document.getElementById('level-up').classList.remove("hidden");
          setTimeout(() => {
            document.getElementById('level-up').classList.add("expanded");
          },1)

          //document.getElementById('level-up-image').classList.remove("hidden");
        },1500)
      }
      this.experience_roller();
      this.check_for_level_up();
      this.update_user_record();
      this.update_conflict();
    },1000)

  };
}
