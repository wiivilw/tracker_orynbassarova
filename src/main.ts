import "./tasks";
import { initTheme, toggleTheme } from "./theme";

initTheme();

const themeButton = document.querySelector<HTMLButtonElement>("#theme-toggle");

themeButton?.addEventListener("click", (): void => {
    const newTheme = toggleTheme();

    themeButton.textContent =
        newTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
});

const contactForm =
    document.querySelector<HTMLFormElement>(".contact-form");

const contactSuccess =
    document.querySelector<HTMLParagraphElement>("#contact-success");

contactForm?.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    if (!contactSuccess) return;

    contactSuccess.textContent =
        "This is a demo form. Your message was not sent.";

    contactForm.reset();
});
