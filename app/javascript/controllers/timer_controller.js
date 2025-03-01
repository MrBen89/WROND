import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="timer"
export default class extends Controller {
  connect() {
    let seconds = 0;
    let minutes = 0;
    let seconds_absolute = 0;
    let timer = document.getElementById('timerBox')
    window.setInterval(() => {
      seconds ++;
      seconds_absolute ++;
      timer.innerHTML=
      (minutes > 9 ? minutes : "0" + minutes) + ':'+ (seconds > 9 ? seconds : "0" + seconds);
      document.getElementById("seconds_abs").innerText = seconds_absolute;

      if (seconds >= 60) {
          minutes ++;
          seconds = 0
        }
      }, 1000);
  }
}
