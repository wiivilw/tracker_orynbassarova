import { initialTasks } from "./data";
import { getItem, setItem } from "./storage";
import { renderTasks } from "./render";
import type { Task, TaskCategory, CategoryFilter } from "./types";

const STORAGE_KEY = "doneday-tasks";

let tasks: Task[] = getItem<Task[]>(STORAGE_KEY, initialTasks);

const searchInput = document.querySelector<HTMLInputElement>("#search-input");
const categoryFilter = document.querySelector<HTMLSelectElement>("#category-filter");
const taskForm = document.querySelector<HTMLFormElement>("#task-form");
const taskInput = document.querySelector<HTMLInputElement>("#task-input");
const taskCategory = document.querySelector<HTMLSelectElement>("#task-category");
const taskError = document.querySelector<HTMLParagraphElement>("#task-error");

function updateTasks(): void {
    if (!searchInput || !categoryFilter) return;

    const searchValue: string = searchInput.value.toLowerCase();
    const categoryValue: CategoryFilter = categoryFilter.value as CategoryFilter;

    const filteredTasks: Task[] = tasks.filter((task: Task) => {
        const matchesSearch: boolean = task.title
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory: boolean =
            categoryValue === "All" ||
            task.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    renderTasks(filteredTasks, toggleTask, deleteTask);
}

function addTask(title: string, category: TaskCategory): void {
    const newTask: Task = {
        id: Date.now(),
        title,
        category,
        completed: false
    };

    tasks.push(newTask);
    setItem<Task[]>(STORAGE_KEY, tasks);
    updateTasks();
}

function toggleTask(id: number): void {
    tasks = tasks.map((task: Task): Task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    setItem<Task[]>(STORAGE_KEY, tasks);
    updateTasks();
}

function deleteTask(id: number): void {
    tasks = tasks.filter((task: Task) => task.id !== id);

    setItem<Task[]>(STORAGE_KEY, tasks);
    updateTasks();
}

searchInput?.addEventListener("input", updateTasks);
categoryFilter?.addEventListener("change", updateTasks);

taskForm?.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    if (!taskInput || !taskCategory || !taskError) return;

    const title: string = taskInput.value.trim();
    const category: TaskCategory = taskCategory.value as TaskCategory;

    if (title.length < 2) {
        taskError.textContent = "Task name must contain at least 2 characters.";
        return;
    }

    if (title.length > 80) {
        taskError.textContent = "Task name cannot exceed 80 characters.";
        return;
    }

    taskError.textContent = "";
    addTask(title, category);
    taskForm.reset();
});

updateTasks();
