type Theme = "light" | "dark";

const THEME_KEY = "doneday-theme";

function applyTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
}

export function initTheme(): void {
    const savedTheme = localStorage.getItem(THEME_KEY);

    const initialTheme: Theme =
        savedTheme === "dark" ? "dark" : "light";

    applyTheme(initialTheme);
}

export function toggleTheme(): Theme {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme: Theme =
        currentTheme === "light" ? "dark" : "light";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    return newTheme;
}
