import { Client } from "@stomp/stompjs";

let stompClient = null;

const connectGoals = (setTarefa, handleMessageReceived) => {
      
    let client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        onConnect: () => {
            client.subscribe('/topic/goals', (message) => {
                if (Array.isArray(JSON.parse(message.body))) {
                    setTarefa(JSON.parse(message.body).sort((a, b) => a.id - b.id))
                    console.log("teste absoluto no service ", JSON.parse(message.body))
                } else {
                    console.log(handleMessageReceived)
                    handleMessageReceived(JSON.parse(message.body))
                }
            })
            getGoals();
        },
    })
    stompClient = client;
    stompClient.activate();
}

const addGoal = (goal) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/addGoal',
            body: JSON.stringify(goal)
        })
    }
}

const getGoals = () => {
    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/app/getAllGoal',
            body: ''
        })
    }
}

const getGoal = async (id) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/getGoal',
            headers: {id},
            body: ''
        })
    }
}

const editGoals = (id, goal) => {
    if(stompClient && stompClient.connected){
        console.log("Editando")
        stompClient.publish({
            destination: '/app/editGoal',
            headers: {id},
            body: JSON.stringify(goal)
        })
    }
}

const deleteGoal = (id) => {
    if(stompClient && stompClient.connected){
        stompClient.publish({
            destination: '/app/deleteGoal',
            headers: {id},
            body: ''
        })
    }
}

const clearTaskGoal = () => {
    stompClient.deactivate();
}

export {connectGoals, getGoals, addGoal, getGoal, editGoals, deleteGoal, clearTaskGoal}