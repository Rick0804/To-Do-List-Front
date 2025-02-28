import { Client } from "@stomp/stompjs";

let stompClient = null;

const connect = (setTarefa) => {
    console.log("conectado")
    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('/topic/tasklist', (message) => {
                setTarefa(JSON.parse(message.body).sort((a, b) => a.id - b.id));
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
        console.log("teste enviado")
        console.log("enviando tarefa: " + JSON.stringify(task))
        stompClient.publish({
            destination: '/app/addTask',
            body: JSON.stringify(task)
        })
        console.log("📨 Mensagem publicada com sucesso!");
    }
}

const getTodo = async () => {
    if(stompClient && stompClient.connected){
        console.log("entrou no get tarefa")
        stompClient.publish({
            destination: '/app/getTasks',
            body: ''
        })
    }
}

const editTodo = (task, id) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: "/app/editTask",
            headers: {id},
            body: JSON.stringify(task)
        })
    }
}


export {connect, addTodo, getTodo}