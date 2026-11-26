export function getItem<T>(key: string, fallback: T): T {
    const savedData = localStorage.getItem(key);

    if (savedData === null) {
        return fallback;
    }

    try {
        return JSON.parse(savedData) as T;
    } catch {
        return fallback;
    }
}

export function setItem<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
}
