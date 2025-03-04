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

    if (scrollTop === 0) {
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 95%)";
      this.element.style.opacity = "0.95"; // Keeps a slight visibility instead of disappearing instantly
    } else if (scrollTop + clientHeight >= scrollHeight - 5) {
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 5%)";
      this.element.style.opacity = "0.95";
    } else {
      fadeEffect = "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 90%)";
      this.element.style.opacity = "1";
    }

    this.element.style.transition = "mask-image 15s ease-in-out, -webkit-mask-image 15s ease-in-out, opacity 15s ease-in-out";
    this.element.style.maskImage = fadeEffect;
    this.element.style.webkitMaskImage = fadeEffect;
  }

  setMask(position) {
    if (position === "top") {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 95%)";
    } else if (position === "bottom") {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 5%)";
    } else {
      this.element.style.maskImage =
        "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 90%)";
    }
    this.element.style.webkitMaskImage = this.element.style.maskImage; // Safari support
  }
}
