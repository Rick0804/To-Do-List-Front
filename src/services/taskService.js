import { Client } from "@stomp/stompjs";

let stompClientTask = null;

const connectTask = async (setTarefa, handleMessageReceived) => {
  
    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('/topic/tasklist', (message) => {
                if(Array.isArray(JSON.parse(message.body))){
                    setTarefa(JSON.parse(message.body).sort((a, b) => a.id - b.id));
                } else {
                    console.log(handleMessageReceived)
                    handleMessageReceived(JSON.parse(message.body))
                }
            })
            getTodo()
        },
         onStompError: (error) => {
            console.log("erro: " + error);
         }
    })
    client.activate();
    stompClientTask = client;
}

const addTodo = (task) => {
    if(stompClientTask && stompClientTask.connected){
        stompClientTask.publish({
            destination: '/app/addTask',
            body: JSON.stringify(task)
        })
    } else {
    }
}

const getTodo = () => {
    if(stompClientTask && stompClientTask.connected){
        stompClientTask.publish({
            destination: '/app/getTasks',
            body: ''
        })
    }
}

const getTodoById = async (id) => {
    if(stompClientTask && stompClientTask.connected){
        stompClientTask.publish({
            destination: '/app/getTaskId',
            headers: {id},
            body: ''
        })
    }
}

const deleteTodo = (id) => {
    if(stompClientTask && stompClientTask.connected){
        stompClientTask.publish({
            destination: "/app/deleteTask",
            headers: {id},
            body: ''
        })
    }

}

const editTodo = (task, id) => {
    if(stompClientTask && stompClientTask.connected){
        stompClientTask.publish({
            destination: "/app/editTask",
            headers: {id},
            body: JSON.stringify(task)
        })
    }
}

const clearTaskTodo = () => {
    stompClientTask.deactivate(() => {
        console.log("desconectado");
    });
}


export {connectTask, addTodo, getTodo, deleteTodo, editTodo, getTodoById, clearTaskTodo}