import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { connectTask, deleteTodo, clearTask } from "../../services/taskService";
import { connectNotes, getAllNotes } from "../../services/notesService";
import FormEdit from "../formEdit/FormEdit";
import "./list.css"

function List() {
    const [infos, setInfos] = useState([]);
    const [data, setData] = useState([])
    const [mostrar, setMostrar] = useState(false);
    const [infosEdit, setTarefaEdit] = useState();
    const location = useLocation()

    const normalizeInfo = (infos) => {
        switch (location.pathname) {
            case '/': setData(infos.map((response) => {
                return {
                    id: response.id,
                    title: response.taskTitle,
                    description: response.taskDescription,
                    status: response.taskEnum
                }
            }));
            break;
            case '/notes': setData(infos.map((response) => {
                return {
                    id: response.id,
                    title: response.title,
                    description: response.description,
                }
            })); 
        }

        console.log('notes', infos)
        
    }

    useEffect(() => {
        if (location.pathname == '/') {
            connectTask(setInfos, () => { })
            
        } else if (location.pathname == '/notes') {
            connectNotes(setInfos)
            // return () => {

            //}
            console.log("entrou aqui!")
        }

    }, [])
    useEffect(() => {
        normalizeInfo(infos)
    }, [infos]);

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
                        data.map((response) => {
                            return <li key={response.id}>
                                <div className="card">
                                    <div className="title-card">
                                        {response.title}
                                    </div>
                                    <div className="description">
                                        {response.description}
                                    </div>
                                    <div className={response.status == "PENDENTE" ? "status" : "concluido"} >
                                        {response.status}
                                    </div>
                                    <div className="buttons">
                                        <button onClick={() => { editTaskComp(response.id) }}>Editar</button>
                                        <button onClick={() => apagarTarefa(response.id)}>Apagar</button>
                                    </div>
                                </div>

                            </li>
                        })
                    }
                    {mostrar && <FormEdit mostrar={mostrar} setMostrar={setMostrar} id={infosEdit} />}

                </ul>
                

            </div>
        </>
    )
}

export default List;