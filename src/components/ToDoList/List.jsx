import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { connectTask, deleteTodo } from "../../services/taskService";
import { connectGoals } from "../../services/goalsService";

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
            case '/goals': setData(infos.map((response) => {
                return {
                    id: response.id,
                    title: response.goalTitle,
                    description: response.goalDescription,
                }
            })); 
        }
        
        console.log('goals', infos)
        
    }

    useEffect(() => {
        if (location.pathname == '/') {
            connectTask(setInfos, () => { })
            
        } else if (location.pathname == '/goals') {
            connectGoals(setInfos)
        }

    }, [])

    useEffect(() => {
        normalizeInfo(infos)
    }, [infos]);

    const erase = (id) => { 
        let path = location.pathname;
        if(path == '/'){
            apagarTarefa(id)
        } else {
            
        }
    }

    const edit = (id) => {
        setMostrar(!mostrar);
        setTarefaEdit(id)
    }

    const apagarTarefa = (id) => {
        deleteTodo(id);
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
                                    
                                    {location.pathname == "/" && (<div className={response.status == "PENDENTE" ? "status" : "concluido"} >
                                        {response.status}
                                    </div>)}
                                    <div className="buttons">
                                        <button onClick={() => {edit(response.id)}}>Editar</button>
                                        <button onClick={() => erase(response.id)}>Apagar</button>
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