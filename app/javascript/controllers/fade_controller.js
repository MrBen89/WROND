import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.updateMask(); // Run once on load
    this.element.addEventListener("scroll", this.updateMask.bind(this));
  }

  disconnect() {
    this.element.removeEventListener("scroll", this.updateMask.bind(this));
  }

  updateMask() {
    const scrollTop = this.element.scrollTop;
    const scrollHeight = this.element.scrollHeight;
    const clientHeight = this.element.clientHeight;

    let mask;

    if (scrollTop === 0) {
      // At the top: No fade at the top
      mask = "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)";
    } else if (scrollTop + clientHeight >= scrollHeight - 5) {
      // At the bottom: No fade at the bottom
      mask = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 100%)";
    } else {
      // In the middle: Fade both top and bottom
      mask = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 15%, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)";
    }

    this.element.style.maskImage = mask;
    this.element.style.webkitMaskImage = mask; // Safari support
  }
}
