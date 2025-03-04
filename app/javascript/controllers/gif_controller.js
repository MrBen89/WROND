import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="gif"
export default class extends Controller {
  static targets = ["wrondarou"]

  connect() {
    // console.log(this.gifTarget)

  }
  bob() {
    console.log(this.wrondarouTarget)
  }

}
