import { Controller } from "@hotwired/stimulus"

let checkArrays = (arr1, arr2) => {
  for (let i=0; i<4; i++){
      for (let n=0; n<4; n++){
          if (arr1[i][n] != arr2[i][n]){
              return false;
          }
      }
  }
  return true;
}

// Connects to data-controller="puzzle"
export default class extends Controller {
  static targets = ["rootDiv"]
  connect() {
    console.log("puzzle connected");
    let current_pattern = []
    const puzzledata = this.data.get("variable");
    const rootDiv = this.rootDivTarget;
    for (let i = 0; i < 16; i++){
      let row = document.createElement("div")
      row.classList.add(`row${i}`);
      row.classList.add("row");
      rootDiv.appendChild(row);
      current_pattern.push([]);
      for (let n = 0; n < 16; n++){
          current_pattern[i].push(0)
          let box = document.createElement("div");
          box.classList.add(`col${n}`);
          box.classList.add(`cell`);
          box.dataset.add
          box.dataset.x = n;
          box.dataset.y = i;
          box.addEventListener("mousedown", () => {
            current_pattern[i][n] == 0 ?  current_pattern[i][n] = 1 :  current_pattern[i][n] = 0;
            event.currentTarget.classList.toggle("selected")

            if (checkArrays(current_pattern, puzzledata)){
                window.alert("Done")
            }
        })
          row.appendChild(box);
      }
    }
  }

}
