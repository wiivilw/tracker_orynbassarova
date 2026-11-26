import type { Task } from "./types";

export function renderTasks(
    tasks: Task[],
    onToggle: (id: number) => void,
    onDelete: (id: number) => void
): void {
    const taskList = document.querySelector(".task-list");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.textContent = "No tasks found. Add a new task!";
        return;
    }

    tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const title = document.createElement("span");
        title.textContent = task.title;

        const category = document.createElement("span");
        category.textContent = task.category;
        category.classList.add("task-category");

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.type = "button";

        completeButton.addEventListener("click", () => {
            onToggle(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            onDelete(task.id);
        });

        taskElement.append(
            title,
            category,
            completeButton,
            deleteButton
        );

        taskList.appendChild(taskElement);
    });
}
