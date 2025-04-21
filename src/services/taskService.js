import { Client } from "@stomp/stompjs";

let stompClient = null;

const connect = async (setTarefa, handleMessageReceived) => {
    console.log("conectado")
    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('/topic/tasklist', (message) => {
                if(Array.isArray(JSON.parse(message.body))){
                    setTarefa(JSON.parse(message.body).sort((a, b) => a.id - b.id));
                } else {
                    console.log("come to daddy ", JSON.parse(message.body))
                    handleMessageReceived(JSON.parse(message.body))
                }
            })
            getTodo()
        },
         onStompError: (error) => {
            console.log("erro: " + error);
         }
    })
    stompClient = client;
    stompClient.activate();

}

const addTodo = (task) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/addTask',
            body: JSON.stringify(task)
        })
        console.log("📨 Mensagem publicada com sucesso!");
    }
}

const getTodo = () => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/getTasks',
            body: ''
        })
    }
}

const getTodoById = async (id) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/getTaskId',
            headers: {id},
            body: ''
        })
    }
}

const deleteTodo = (id) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: "/app/deleteTask",
            headers: {id},
            body: ''
        })
    }

}

const editTodo = (task, id) => {
    if(stompClient && stompClient.connected){
        console.log("entrou aqui! ")
        stompClient.publish({
            destination: "/app/editTask",
            headers: {id},
            body: JSON.stringify(task)
        })
    }
}


export {connect, addTodo, getTodo, deleteTodo, editTodo, getTodoById}