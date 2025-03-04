import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.update(); // Run once on load
    this.element.addEventListener("scroll", this.update.bind(this)); // Add event listener
  }

  disconnect() {
    this.element.removeEventListener("scroll", this.update.bind(this)); // Cleanup event listener
  }

  update() {
    const scrollTop = this.element.scrollTop;
    const scrollHeight = this.element.scrollHeight;
    const clientHeight = this.element.clientHeight;

    let fadeEffect;

    if (scrollTop <= 1) {  // Top fade
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 1) 98%, rgba(0, 0, 0, 0) 100%)";
    } else if (scrollTop + clientHeight >= scrollHeight - 1) {  // Bottom fade
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 2%)";
    } else {  // Mid-scroll effect
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)";
    }

    this.element.style.transition = "mask-image 1.5s ease, opacity 1.4s ease"; // Faster but smooth transition
    this.element.style.maskImage = fadeEffect;
    this.element.style.webkitMaskImage = fadeEffect;
  }

  setMask(position) {
    if (position === "top") {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 1) 98%, rgba(0, 0, 0, 0) 100%)";
    } else if (position === "bottom") {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 98%, rgba(0, 0, 0, 0) 100%)";
    } else {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)";
    }
    this.element.style.webkitMaskImage = this.element.style.maskImage; // Safari support
  }
}
