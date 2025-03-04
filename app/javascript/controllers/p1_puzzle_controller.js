import { Controller } from "@hotwired/stimulus"

let player = 0

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

// let timer = (() => {setInterval(() => {
//   document.getElementById('timerBox').innerHTML=
//   (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
//   seconds ++;
//   seconds_absolute ++;
//   if (seconds >= 60) {
//       minutes ++;
//       seconds = 0
//     }
//   }, 1000);
// })

// Connects to data-controller="puzzle"
export default class extends Controller {
  static targets = ["p1RootDiv"]
  connect() {
    const user_id = document.getElementById("user_id").innerText

    if (user_id == this.data.get("user1")){
      player = 1
    } else {
      player = 2
    }

    //rootDiv is where to mount the puzzle
    const rootDiv = this.p1RootDivTarget;
    let status = this.data.get("status")
    let winner = this.data.get("winner")
    this.start_puzzle = this.start_puzzle.bind(this);
    this.stop_puzzle = this.stop_puzzle.bind(this);
    this.check_for_start = this.check_for_start.bind(this);
    console.log(winner)
    if (status == "in_progress"){
      this.start_puzzle()
    } else if (status == "complete"){
      this.puzzle_ended()
    } else if((status == "p1ready" && player == 1) || (status == "p2ready" && player == 2)){
      this.check_for_start()
    } else if (this.data.get("user2") != 0){
      let button = document.createElement("button");
      button.innerHTML = "START!"
      button.classList.add("p1startButton")
      button.addEventListener("click", this.check_for_start);
      rootDiv.appendChild(button);
    }
  }

  check_for_start(){
    console.log(player)
    if ((this.data.get("status") == "p2ready" && player == 1) || (this.data.get("status") == "p1ready" && player == 2)){
      this.start_puzzle()
    } else if (player == 1){
      if (this.data.get("status") == "p1ready") {
        document.getElementById("waiting").classList.remove("hidden")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
      document.getElementById("status_field").value = "p1ready";
      document.getElementById("conflict_form").requestSubmit();
      }
    } else if (player == 2){
      if (this.data.get("status") == "p2ready") {
        document.getElementById("waiting").classList.remove("hidden")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
      document.getElementById("status_field").value = "p2ready";
      document.getElementById("conflict_form").requestSubmit();
      }
    }
  }

  start_puzzle() {
    const user_id = document.getElementById("user_id").innerText
    const rootDiv = this.p1RootDivTarget
    let mouse_status = "up"
    let mode = "draw"
    console.log(typeof user_id)

    if (document.querySelector(".p1startButton")) {document.querySelector(".p1startButton").remove()}
    // clearInterval(timer)
    // timer()
    //current pattern is the working array
    //puzzledata is the solution array
    const puzzledata = JSON.parse(this.data.get("variable"));


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
      document.getElementById("state_field").value = JSON.stringify(current_pattern);
      document.getElementById("conflict_form").requestSubmit()
    }
    //create the hints arrays
    let xValues = xWriter(puzzledata);
    let yValues = yWriter(puzzledata);

    const bg_style = this.data.get(`u${player}_background_style`).replace(" ", "_")
    const cell_style = this.data.get(`u${player}_cell_style`).replace(" ", "_")
    const active_style = this.data.get(`u${player}_active_style`).replace(" ", "_")
    const flagged_style = this.data.get(`u${player}_flagged_style`).replace(" ", "_")

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
    // box.setAttribute("id", "timerBox");
    // // box.innerText = "00:00";
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
                current_pattern[i][n] = "2";
                event.preventDefault();
                event.currentTarget.classList.remove("selected");
                event.currentTarget.classList.add("flagged");
              } else if (mode == "erase"){
                current_pattern[i][n] = "0";
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
              if (mode == "erase") {
                current_pattern[i][n] = "0";
                event.currentTarget.classList.remove("flagged");
              event.currentTarget.classList.remove("selected")
              } else if (mode == "draw"){
                current_pattern[i][n] = "1";
                event.currentTarget.classList.remove("flagged");
              event.currentTarget.classList.add("selected")
              }
            }
              //check for win
              console.log(current_pattern.map(x =>  x.map(y => y == "2" ? "0" : y)))
              if (checkArrays(current_pattern.map(x =>  x.map(y => y == "2" ? "0" : y)), puzzledata)){
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
              if (mode == "erase"){
                current_pattern[i][n] = "0";
                event.preventDefault();
                event.currentTarget.classList.remove("selected");
                event.currentTarget.classList.remove("flagged");
              } else if (mode == "draw"){
                current_pattern[i][n] = "2";
              event.preventDefault();
              event.currentTarget.classList.remove("selected");
              event.currentTarget.classList.add("flagged");
              }

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
  };

  check_for_level_up() {
    let level = parseInt(document.getElementById("level_field").value)
    let base_xp = this.data.get("base_xp")
    document.getElementById("level-span").innerText = level;
    document.getElementById("level-up-span").innerText = level + 1;
    if (base_xp + this.get_xp() >= (50 + level * 50) ) {
      document.getElementById("level_field").value = level + 1;
      return true
    }
    return false
  }

  update_conflict() {
    const user_id = document.getElementById("user_id")
    console.log(user_id)
    console.log(user_id.innerText)
    document.getElementById("time_field").value = parseInt(document.getElementById("seconds_abs").innerText);
    document.getElementById("status_field").value = "complete";
    document.getElementById("winner_field").value = user_id.innerText;
    document.getElementById("conflict_form").requestSubmit();
  }
  update_user_record() {
    document.getElementById("xp_field").value = parseInt(document.getElementById("xp_field").value) + 50
  }

  get_xp() {
    let winner = this.data.get("winner")
    if (winner == user_id){
      return 150;
    } else {
      return 50;
    }
  }

  experience_roller() {
    let target = this.get_xp();
    let count = parseInt(document.getElementById("xp-value").innerText);
    let increment = 1;
    if (count < target) {
      count += increment;
      document.getElementById("xp-value").innerText = `${count}`;
      setTimeout(() => {
        this.experience_roller()
      }, 10);
    }

  };

  update_xp_bar () {
    const xp_bar_level_element = document.getElementById("xp_bar_level");
    const xp_bar_current_element = document.getElementById("xp_bar_current");
    const xp_bar_level_next = document.getElementById("xp_bar_next");
    const fillbar = document.getElementById("fillbar");
    let level = parseInt(xp_bar_level_element.innerText)
    let total_xp = parseInt(xp_bar_current_element.innerText) + this.get_xp();
    let next_xp = parseInt(xp_bar_level_next.innerText)
    if (total_xp > next_xp){
      total_xp -= next_xp
      next_xp = (50 + level * 50)
      level += 1
    }
    xp_bar_current_element.innerText = total_xp
    xp_bar_level_next.innerText = next_xp
    xp_bar_level_element.innerText = level
    fillbar.style.width = `${100 - (total_xp / next_xp * 100)}%`
  }

  stop_puzzle(handleClick) {
    console.log(user_id.value)
    // let minutes = Math.floor(parseInt(document.getElementById("seconds_abs").innerText) / 60)
    // let seconds = Math.floor(parseInt(document.getElementById("seconds_abs").innerText) % 60)
    // document.getElementById("time-span").innerText = (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
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
    let winner = this.data.get("winner")
    setTimeout(() => {
      let conclussionModal = document.getElementById('conclussionModal')
      if (winner == user_id) {
        conclussionModal.classList.add("win")
      } else {
        conclussionModal.classList.add("lose")
      }
      conclussionModal.classList.remove("hidden");

      if (this.check_for_level_up) {
        setTimeout(() => {
          document.getElementById('level-up').classList.remove("hidden");
          setTimeout(() => {
            document.getElementById('level-up').classList.add("expanded");
            document.getElementById("level_up_audio").play()
          },1)

          //document.getElementById('level-up-image').classList.remove("hidden");
        },1500)
      }
      this.update_xp_bar()
      this.experience_roller();
      this.update_user_record();
      this.update_conflict(user_id);
      for(let i=0; i<100; i++)
        {
            window.clearInterval(i);
        }
    },1000)
    let conclussionModal = document.getElementById('conclussionModal')
    if (winner == user_id) {
      conclussionModal.classList.add("win")
    } else {
      conclussionModal.classList.add("lose")
    }
    conclussionModal.classList.remove("hidden");
  };

  puzzle_ended() {
    let winner = this.data.get("winner")

    setTimeout(() => {
      let conclussionModal = document.getElementById('conclussionModal')
      if (winner == user_id.innerText) {
        conclussionModal.classList.add("win")
      } else {
        conclussionModal.classList.add("lose")
      }
      conclussionModal.classList.remove("hidden");

      if (this.check_for_level_up) {
        setTimeout(() => {
          document.getElementById('level-up').classList.remove("hidden");
          setTimeout(() => {
            document.getElementById('level-up').classList.add("expanded");
          },1)

          //document.getElementById('level-up-image').classList.remove("hidden");
        },1500)
      }
    const p1data = JSON.parse(this.data.get("p1data"));
    const rootDiv = this.p1RootDivTarget
    for (let i = 0; i < 16; i++){
      let row = document.createElement("div")
      row.classList.add("row");
      rootDiv.appendChild(row);
      //create guide cell
      let box = document.createElement("div")
      box.classList.add("yGuide")
      row.appendChild(box);
      //create columns
      for (let n = 0; n < 16; n++){
          //add columns to current_patern
          let box = document.createElement("div");
          box.classList.add(`col${n}`);
          box.classList.add(`row${i}`);
          box.classList.add(`cell`);
          box.classList.add("finished")
          if (p1data[i][n] == 1){
            box.classList.add("selected")
          }
          box.dataset.x = n;
          box.dataset.y = i;
        row.appendChild(box);
      }
    }
  })}
}
