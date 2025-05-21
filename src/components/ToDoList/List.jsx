import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { connectTask, deleteTodo, clearTask } from "../../services/taskService";
import { connectNotes, getAllNotes } from "../../services/notesService";
import FormEdit from "../formEdit/FormEdit";


function List (){
    const [infos, setInfos] = useState([]);
    const [mostrar, setMostrar] = useState(false);
    const [infosEdit, setTarefaEdit] = useState();
    const location = useLocation()


    useEffect(() => {
        if(location.pathname == '/'){
            connectTask(setInfos, () => {})
            return () => {
                clearTask()
            }
        } else if (location.pathname == '/notes') {
            connectNotes(setInfos)
           // return () => {
                
            //}
            console.log("entrou aqui!")
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
                            console.log("teste id: ", response.id)
                            return <li key={response.id}>
                                <div className="card">
                                    <div className="title-card">
                                        {response.title}
                                    </div>
                                    <div className="description">
                                        {response.description}
                                    </div>
                                    <div className="status">
                                        {response.status}
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
                    getAllNotes()
                    console.log('informação: ', infos)
                    console.log(infos.length)
                }}> teste </button>
                 
             </div>
         </>
     )
}

export default List;