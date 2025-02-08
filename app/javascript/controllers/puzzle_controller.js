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
  static targets = ["root"]
  connect() {
    console.log("puzzle connected")
    const rootDiv = this.rootTarget;
    for (let i = 0; i < 16; i++){
      let row = document.createElement("div")
      row.classList.add(`row${i}`);
      row.classList.add("row");
      rootDiv.appendChild(row);
      for (let n = 0; n < 16; n++){
          let box = document.createElement("div");
          box.classList.add(`col${n}`);
          box.classList.add(`cell`);
          box.dataset.add
          box.dataset.x = n;
          box.dataset.y = i;
          row.appendChild(box);
      }
    }
  }

}
