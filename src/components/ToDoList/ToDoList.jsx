import { useEffect, useState } from "react"
import { connect, getTodo } from "../../services/taskService";

function List (){
    const [tarefa, setTarefa] = useState([]);
    
    
    useEffect(() => {
        connect(setTarefa)
    }, [])
    
    
  
    
     return (
         <>
             <div className="list-tasks">
                <ul>
                    
                    {
                        tarefa.map((response) => {
                            return <li key={response.id}>{response.taskTitle}</li>
                        })
                    }
                </ul>
                <button onClick={() => {
                    getTodo()
                    console.log(tarefa.length)
                }}> teste </button>
                 
             </div>
         </>
     )
}

export default List;