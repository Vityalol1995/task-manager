import { defineStore } from 'pinia';
import {Task} from "../types/task";
export const useTasksStore = defineStore('tasks', () => {
    let tasks = reactive({
        TODO: [],
        IN_PROGRESS: [],
        DONE: []
    });

    const loader = ref<boolean>(true)

    setTimeout(() => {
        const getTaskInLocalStorage = localStorage.getItem("tasks");
        if (getTaskInLocalStorage) {
            tasks['TODO'] = JSON.parse(getTaskInLocalStorage)['TODO']
            tasks['DONE'] = JSON.parse(getTaskInLocalStorage)['DONE']
            tasks['IN_PROGRESS'] = JSON.parse(getTaskInLocalStorage)['IN_PROGRESS']
        }

        loader.value = false
    })

    const updateLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const createTask = (task:object) => {
        tasks[task.status].push(task);
        updateLocalStorage()
    }

    const updateTask = (updatedTask: Task, oldStatus:string) => {
        const statusTasks = tasks[updatedTask.status];

        if (oldStatus) {
            tasks[oldStatus] = tasks[oldStatus].filter(task => task.id !== updatedTask.id);
            createTask(updatedTask)
        }

        if (!statusTasks.length) {
            createTask(updatedTask)
        } else {
            const taskIndex = statusTasks.findIndex((t) => t.id === updatedTask.id);

            if (taskIndex !== -1) {
                statusTasks[taskIndex] = { ...statusTasks[taskIndex], ...updatedTask };
            }
        }

        updateLocalStorage()
    };

    const updateTaskStatus = (task:object, newStatus:string, oldStatus:string) => {
        tasks[newStatus].forEach(item => {
            if (item.id === task.id) {
                item.status = newStatus
            }
        })

        updateLocalStorage()
    }

    const deleteTask = (task:Task) => {
        tasks[task.status] = tasks[task.status].filter(item => item.id !== task.id);
        updateLocalStorage()
    }

    const currentTasks = computed(() => tasks)


    return { tasks, createTask, deleteTask, currentTasks, updateTask, updateTaskStatus, loader };
});
