import { useState } from "react"
import { postTask } from "../services/getServices";
import { useLocation } from "react-router-dom";
export default function Forms() {

  const location = useLocation();
  const [infos, setinfos] = useState({
    title: '',
    description: '',
    enum: 'CONCLUIDO'
  })


  const handleChange = (event) => {
    const {name, value} = event.target;
    
    setinfos((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }))
  }


  const typeHand = async () => {
    switch (location.pathname){
      case '/': return  {
          taskTitle: infos.title,
          taskDescription: infos.description,
          taskEnum: infos.enum
        }
      case '/metas': return  {
          goalTitle: infos.title,
          goalDescription: infos.description,
          goalEnum: infos.enum
        } 
      case '/notes': return  {
          goalTitle: infos.title,
          goalDescription: infos.description,
          goalEnum: infos.enum
        } 
    }   
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    await typeHand().then((response) => {postTask(response)}).catch((err) => err)
  }



  return (
    <form onSubmit={handlerSubmit} method="POST">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                Título da tarefa
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="title"
                  type="text"
                  autoComplete="given-name"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Descrição da tarefa
              </label>
              <div className="mt-2">
                <textarea
                  id="last-name"
                  name="description"
                  rows="5"
                  cols="33"
                  autoComplete="family-name"
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                Status
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="status"
                  name="taskEnum"
                  autoComplete="status-chose"
                  onChange={handleChange}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  required
                >
                  <option>CONCLUIDO</option>
                  <option>PENDENTE</option>
                </select>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
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
  )
}
