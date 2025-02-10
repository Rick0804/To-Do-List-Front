import { useEffect, useState } from "react"
import { getTask } from "../../services/taskService"

function List (){
    const [tarefa, setTarefa] = useState([]);
    
    
    useEffect(() => {
        
        const tarefas = async() => {
            try {
                await getTask().then((response) => {setTarefa(response.data)})
            } catch(err) {
                console.error("ERRO: ", err)
            }
        }

        tarefas()
        const taskReload = setInterval(tarefas, 5000);
        return () => {clearInterval(taskReload)}
    }, [])
    
     return (
         <>
             <div className="list-tasks">
                <ul>
                    {tarefa.map((response) => (
                        <li key={response.id}>{response.taskTitle}</li>
                        
                    ))}
                </ul>

                 
             </div>
         </>
     )
}

export default List;