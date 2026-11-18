const THEME_KEY = "doneday-theme";

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

export function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    const initialTheme = savedTheme || "light";

    applyTheme(initialTheme);
}

export function toggleTheme() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";

    const newTheme = currentTheme === "light" ? "dark" : "light";

    applyTheme(newTheme);

    localStorage.setItem(THEME_KEY, newTheme);
}
