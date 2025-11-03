
import { useState } from "react"
import { useLocation } from "react-router-dom";
import { addTodo } from '../../services/taskService'
import { addGoal } from "../../services/goalsService";
import './form.css'

export default function FormCreate(props) {

  const location = useLocation();
  const [infos, setinfos] = useState({
    title: '',
    description: '',
    enum: 'PENDENTE'
  })

  const handleChange = (event) => {
    const { name, value } = event.target;

    setinfos((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }))
    console.log(location.pathname)
    console.log(name, ' ', value)
  }


  const typeHand = async () => {
    switch (location.pathname) {
      case '/': return {
        taskTitle: infos.title,
        taskDescription: infos.description,
        taskEnum: infos.enum
      }
      case '/goals': return {
        goalTitle: infos.title,
        goalDescription: infos.description,
        goalEnum: "CONCLUIDO"
      }
      
    }
  }
 
  const handlerSubmit = async (e) => {
    const path = location.pathname;
    e.preventDefault();
    if(path == '/'){
      typeHand().then((response) => {addTodo(response)})
    } else {
      typeHand().then((response) => {addGoal(response)})

    }
    props.setMostrar(!props.mostrar);
  }


  return (
    <div className="form-container">
    <form onSubmit={handlerSubmit}>
        <div className="form-grid">
            {/* Campo Título */}
            <div className="form-group">
                <label htmlFor="title">
                    Título
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    className="form-input title-input"
                    required
                />
            </div>

            {/* Campo Status */}
            {location.pathname == "/" &&(
            <div className="form-group">
                <label htmlFor="status">
                    Status
                </label>
                <div className="select-wrapper">
                    <select
                        id="status"
                        name="enum"
                        onChange={handleChange}
                        className="form-select"
                        required
                    >
                        <option>PENDENTE</option>
                        <option>CONCLUIDO</option>
                    </select>
                </div>
            </div>
            )}
            {/* Campo Descrição */}
            <div className="form-group full-width">
                <label htmlFor="description">
                    Descrição da tarefa
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="5"
                    onChange={handleChange}
                    className="form-input description-input"
                    required
                />
            </div>
        </div>

        {/* Botões de Ação */}
        <div className="form-actions">
            <button type="button" onClick={() => props.setMostrar(!props.mostrar)} className="btn btn-secondary">
                Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </div>
    </form>
</div>
  )
}
