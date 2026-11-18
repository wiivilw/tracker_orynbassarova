import "./tasks.js";

import { initTheme, toggleTheme } from "./theme.js";

initTheme();

const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", () => {
    toggleTheme();

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    themeButton.textContent =
        currentTheme === "dark" ? "Light Mode" : "Dark Mode";
});

const contactForm = document.querySelector(".contact-form");
const contactSuccess = document.querySelector("#contact-success");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    contactSuccess.textContent =
        "Thank you! Your message has been received.";

    contactForm.reset();
});
