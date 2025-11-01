import { Client } from "@stomp/stompjs";

let StompClient = null;

const connectNotes = async (setNotes) => {
    console.log("teste connect notes")
    const client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            console.log('conectado no notes')
            client.subscribe("/topic/notes", (message) => {
                if(Array.isArray(JSON.parse(message.body))){
                    const mess = JSON.parse(message.body);
                    console.log('teste mess: ', mess)
                    let arr = [];
                    mess.map((response) => {
                        arr.push({
                            id: response.noteId,
                            title: response.noteTitle,
                            description: response.noteDescription
                        })
                    })
                    console.log('epa: ', arr, ' ', arr.id)
                    //setNotes(arr.sort((a, b) => a.id - b.id))
                    setNotes(arr);
                } else {
                    console.log(JSON.parse(message.body))
                }
                
            })
            getAllNotes()
        },
        onDisconnect: () => {
            console.log("desconectado")  
        },
        onStompError: (error) => {
            console.error("erro: " + error)
        }
    })
    client.activate()
   StompClient = client
}

const getAllNotes = () => {
    if(StompClient.connected) {
        console.log('teste esd')
        StompClient.publish({
            destination: "/app/getNotes",
            body: ''
        })
    }
}
export {connectNotes, getAllNotes}