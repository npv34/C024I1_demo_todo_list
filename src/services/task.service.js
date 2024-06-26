import axios from "axios";
import {URL_API} from "../config/backend.config";

class TaskService {
    static async getAllTasks(completed = 2) {
        return await axios.get(URL_API + `/tasks?_expand=author&completed=${completed}`);
    }

    static async getAllAuthor() {
        return await axios.get(URL_API + "/authors")
    }

    static async createTask(task) {
        return await axios.post(URL_API + "/tasks", task)
    }

    static async updateStatusTask(id, newStatus) {
        return await axios.patch(URL_API + "/tasks/" + id, {completed: newStatus})
    }

    static async totalTaskCompleted() {
        const tasks = await this.getAllTasks(1);
        return tasks.data.length;
    }
}

export default TaskService;