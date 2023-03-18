import { TaskDto } from "../_utils/model/dto/TaskDto";
import { Task } from "../_utils/model/task-model";
import Axios from "./axios.service";

const saveTask = (task: TaskDto) => {
    return Axios.post('/task/save', task);
}

const updateTask = (task: Task) => {
    return Axios.put('/task/update', task);
}

const getTaskList = async () => {
    const res = await Axios.get('/task/get');
    return res.data;
}
const getTaskCreatedBy = async (createdBy: string) => {
    const res = await Axios.get('/task/get-all-task-created-by/' + createdBy);
    return res.data;
}

const getTaskAssignedTo = async (assignedTo: string) => {
    const res = await Axios.get('/task/get-all-task-assigned-to/' + assignedTo);
    return res.data;
}

const removeTask = (taskId: string) => {
    return Axios.delete('/task/del/' + taskId);
}

const taskService = {
    saveTask,
    updateTask,
    getTaskList,
    getTaskCreatedBy,
    getTaskAssignedTo,
    removeTask,
};

export default taskService;