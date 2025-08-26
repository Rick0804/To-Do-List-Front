import { Client } from "stompjs";

let stompClient;

const connectGoals = (setTarefa) => {
    let client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('topic/goals')
        }
    })
}