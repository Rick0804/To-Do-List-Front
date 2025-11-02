import './form.css'

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { connectTask, editTodo, getTodoById, clearTaskTodo } from '../../services/taskService'
import { connectGoals, editGoals, getGoal, clearTaskGoal } from '../../services/goalsService';
export default function FormEdit(props) {

  const location = useLocation();
  const [infos, setinfos] = useState({
    title: '',
    description: '',
    enum: ''
  })

  useEffect(() => {

    const handleMessageReceived = async (data) => {
      const path = location.pathname
      const normalizedData = await normalizedTransformer(path, data);
      
      
      console.log("Dados normalizados:", normalizedData);
      setinfos(normalizedData)
      console.log("dados")

    };
  
    const normalizedTransformer = async (path, data) => {
      console.log("ele vem aqui?")
      if(path == '/'){
        return {
          title: data.taskTitle,
          description:  data.taskDescription,
          enum: data.taskEnum
        }
      } else {
        return {
          title: data.goalTitle,
          description:  data.goalDescription,
        }
      }
    }

    const fetchTask = async (path) => {
      try {
        if(path == '/'){
          console.log("Buscando tarefa específica..."); 
          getTodoById(props.id); 
          //clearTaskTodo();

        } else {
          console.log("Buscando meta específica..."); 
          getGoal(props.id);
          //clearTaskGoal()
        }
      } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
      }
      console.log('caminho ', path)
    };
  
    
    const setupWebSocket = () => {
      const path = location.pathname;
      console.log("Teste setupWebSocket ", path)
      if(path == '/'){
        connectTask(
          () => {
            fetchTask(path);
          },
          handleMessageReceived 
          
        );
      } else {
        console.log("Teste dentro do if do websocket ", path)
        connectGoals(
          () => {
            fetchTask(path);
          },
          handleMessageReceived
        );
      }
    };
  
    setupWebSocket(); 

  }, [])

  
  const handleChange = (event) => {
    console.log("teste maniaco do handleChange", )
    const { name, value } = event.target;

    setinfos((prevInfos) => ({
      ...prevInfos,
      [name]: value
    })
    )
  }

  const typeHand = async () => {
    console.log("teste type hand")
    switch (location.pathname) {
      case '/': return {
        taskTitle: infos.title,
        taskDescription: infos.description,
        taskEnum: infos.enum
      }
      case '/goals': console.log("infos: ", infos); return {
        goalTitle: infos.title,
        goalEnum: "CONCLUIDO",
        goalDescription: infos.description,
      }

    }
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if(location.pathname == '/'){
      typeHand().then((response) => {editTodo(response, props.id) })
      props.setMostrar(!props.mostrar);
    } else {
      typeHand().then((response) => {editGoals(response, props.id) })
      props.setMostrar(!props.mostrar);
    }
  }


  return (
    <div className="content-form">
      <form onSubmit={handlerSubmit} method="POST">

        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                  Título
                </label>
                <div className="mt-2">
                  <input
                    id="first-name"
                    name="title"
                    type="text"
                    autoComplete="given-name"
                    onChange={handleChange}
                    defaultValue={infos.title}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                  Descrição
                </label>
                <div className="mt-2">
                  <textarea
                    id="last-name"
                    name="description"
                    rows="5"
                    cols="33"
                    autoComplete="family-name"
                    onChange={handleChange}
                    defaultValue={infos.description}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                  Status
                </label>
                {
                  location.pathname == '/' && (<div className="mt-2 grid grid-cols-1">
                  <select
                    id="status"
                    name="enum"
                    autoComplete="status-chose"
                    value={infos.enum}
                    onChange={handleChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    required
                  >
                    <option>CONCLUIDO</option>
                    <option>PENDENTE</option>
                  </select>
                </div>)
                }
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 options-btn flex items-center justify-end gap-x-6">
          <button type="button" onClick={() => { props.setMostrar(!props.mostrar)}} className="text-sm/6 font-semibold text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
