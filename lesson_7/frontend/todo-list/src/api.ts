import { ITask } from "./types";

// !!!!!!!!
const BackendURL = "/api"
// =========

export const getTasksApi = async (): Promise<ITask[]> => {
    try {
        const tasksJson = await fetch(BackendURL)

        if (!tasksJson.ok) {
            throw new Error(tasksJson.statusText)
          }

        const tasks = await tasksJson.json()        
        return tasks as unknown as Promise<ITask[]>
    } catch (e) {       
        throw e
    }
}

export const putTasksApi = async (newTask: Omit<ITask, "id">): Promise<string> => {
    try {
        const tasksJson = await fetch(BackendURL, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })

        if (!tasksJson.ok) {
            throw new Error(tasksJson.statusText)
          }

        const id = await tasksJson.json()
        return id.id
    } catch (e) {       
        throw e
    }
}


export const updateTasksApi = async (task: ITask) => {
    try {
        const tasksJson = await fetch(BackendURL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        if (!tasksJson.ok) {
            throw new Error(tasksJson.statusText)
          }
    } catch (e) {       
        throw e
    }
}

export const deleteTaskApi = async (task: ITask) => {
    try {
        const tasksJson = await fetch(BackendURL, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        if (!tasksJson.ok) {
            throw new Error(tasksJson.statusText)
          }
    } catch (e) {       
        throw e
    }
}

