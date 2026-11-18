import { getTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./render.js";

let tasks = getTasks();

if (!Array.isArray(tasks)) {
    tasks = [];
}

tasks = tasks.filter(task => {
    return task && typeof task.title === "string";
});

saveTasks(tasks);

const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskCategory = document.querySelector("#task-category");
const taskError = document.querySelector("#task-error");

function updateTasks() {
    const searchValue = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory =
            categoryValue === "All" ||
            task.category === categoryValue;

        return matchesSearch && matchesCategory;
    });

    renderTasks(filteredTasks, toggleTask, deleteTask);
}

function addTask(title, category) {
    const newTask = {
        id: Date.now(),
        title: title,
        category: category,
        completed: false
    };

    tasks.push(newTask);

    saveTasks(tasks);
    updateTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks(tasks);
    updateTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks(tasks);
    updateTasks();
}

searchInput.addEventListener("input", updateTasks);

categoryFilter.addEventListener("change", updateTasks);

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();
    const category = taskCategory.value;

    if (title.length < 2) {
        taskError.textContent =
            "Task name must contain at least 2 characters.";
        return;
    }

    if (title.length > 80) {
        taskError.textContent =
            "Task name cannot exceed 80 characters.";
        return;
    }

    taskError.textContent = "";

    addTask(title, category);

    taskForm.reset();
});

updateTasks();
