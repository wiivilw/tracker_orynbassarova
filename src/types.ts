export type TaskCategory = "Study" | "Personal" | "Work";

export type CategoryFilter = TaskCategory | "All";

export interface Task {
    id: number;
    title: string;
    category: TaskCategory;
    completed: boolean;
}
