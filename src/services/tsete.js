import { Client } from '@stomp/stompjs';

const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/ws', // Endereço do WebSocket
    onConnect: () => {
        console.log('Conectado ao WebSocket!');

        // Inscrever-se no tópico de tarefas
        stompClient.subscribe('/topic/tasklist', (message) => {
            console.log('Lista de tarefas recebida:', JSON.parse(message.body));
        });

        // Solicitar a lista de tarefas
        stompClient.publish({
            destination: '/app/editTask',
            headers: {id: 3},
            body: JSON.stringify({taskTitle: "vailguard", taskDescription: "testetarefa", taskEnum: "PENDENTE"})
        });
    },
    onStompError: (error) => {
        console.error('Erro no STOMP:', error);
    },
});

stompClient.activate();