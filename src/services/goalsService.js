import { Client } from "stompjs";



let stompClient;

const connectGoals = (setTarefa) => {
    let client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('/topic/goals', (message) => {
                if (Array.isArray(JSON.parse(message.body))) {
                    setTarefa(JSON.parse(message.body).sort((a, b) => a.id - b.id))
                }
            })
            getGoals();
        },
    })
    stompClient = client;
    stompClient.activate();
}

const getGoals = () => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/getAllGoal',
            body: ''
        })
    }
}

export {connectGoals, getGoals}