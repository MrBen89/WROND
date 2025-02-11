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
    yValues.push(numberWriter(puzzledata[i]))
  }
  return yValues;
})

// Connects to data-controller="puzzle"
export default class extends Controller {
  static targets = ["rootDiv"]
  connect() {
    //current patern is the working array
    let current_pattern = []
    //puzzledata is the solution array
    const puzzledata = JSON.parse(this.data.get("variable"));
    //create the hints arrays
    let xValues = xWriter(puzzledata);
    let yValues = yWriter(puzzledata);

    //rootDiv is where to mount the puzzle
    const rootDiv = this.rootDivTarget;

    //create a puzzle guides row
    let row = document.createElement("div")
    row.classList.add("header");
    row.classList.add("row");
    let box = document.createElement("div")
    box.classList.add("cornerBlock")
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
      row.classList.add(`row${i}`);
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
          box.classList.add(`cell`);
          box.dataset.add
          box.dataset.x = n;
          box.dataset.y = i;

          //add click listener to each cell
          box.addEventListener("mousedown", () => {
            current_pattern[i][n] == "0" ?  current_pattern[i][n] = "1" :  current_pattern[i][n] = "0";
            event.currentTarget.classList.toggle("selected")

            //check for win
            if (checkArrays(current_pattern, puzzledata)){
                window.alert("Done")
            }
        })
        //add everything to the mount
        row.appendChild(box);
      }
    }
  }

}
