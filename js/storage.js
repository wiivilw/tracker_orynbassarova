import { initialTasks } from "./data.js";

const STORAGE_KEY = "doneday-tasks";

//Get tasks from localStorage
export function getTasks() {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {
        return JSON.parse(savedTasks);
    }

    return initialTasks;

}

//Save tasks to localStorage
export function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
