import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { connectTask, deleteTodo, cleanDisconnect } from "../../services/taskService";
import { connectNotes } from "../../services/notesService";
import FormEdit from "../formEdit/FormEdit";


function List (){
    const [infos, setInfos] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [infosEdit, setTarefaEdit] = useState();
    const location = useLocation()


    useEffect(() => {
        if(location.pathname == '/'){
            connectTask(setInfos, () => {})
        } else if (location.pathname == '/notes') {
            //connectNotes(setInfos)
            //console.log("entrou aqui!")
        }
        return () => {
            cleanDisconnect()
        }
    }, [])
    
    
    const apagarTarefa = (id) => {
        deleteTodo(id);
    }

    const editTaskComp = (id) => {
        setMostrar(!mostrar);
        setTarefaEdit(id)
            
    }
    
     return (
         <>
             <div className="list-tasks">
                <ul>
                    
                    {
                        infos.map((response) => {
                            return <li key={response.id}>
                                <div className="card">
                                    <div className="title-card">
                                        {response.taskTitle}
                                    </div>
                                    <div className="description">
                                        {response.taskDescription}
                                    </div>
                                    <div className="status">
                                        {response.taskEnum}
                                    </div>
                                    <div className="buttons">
                                        <button onClick={() => {editTaskComp(response.id)}}>Editar</button>
                                        <button onClick={() => apagarTarefa(response.id)}>Apagar</button>
                                    </div>
                                </div>
                                
                                </li>
                        })
                    }
                    {mostrar && <FormEdit mostrar={mostrar} setMostrar={setMostrar} id={infosEdit}/>}

                </ul>
                <button onClick={() => {
                    //getTodo()
                    console.log(infos.length)
                }}> teste </button>
                 
             </div>
         </>
     )
}

export default List;