import api from "./api.js";

export const getTask = async() => {
    return api.get("/TaskList").then((response) => response).catch((err) => {console.log("erro: " + err)})
}

export const getTaskById = async(id) => {
    return api.get(`/TaskList/${id}`)
}

export const postTask = async(task) => {
    return api.post("/TaskList", task)
}
