import { Client } from "@stomp/stompjs";

let StompClient = null;

const connectNotes = (setNotes) => {
    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe("/topic/notes", (message) => {
                setNotes(message)
            })
            getAllNotes()
        },
        onStompError: (error) => {
            console.error("erro: " + error)
        }
    })
   // StompClient = client
}

const getAllNotes = () => {
//     if(StompClient.connected) {
//         console.log("entrou aqui")
//     }
}
export {connectNotes, getAllNotes}