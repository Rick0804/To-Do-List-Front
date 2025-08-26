import { useState } from "react";
import FormCreate from "../../components/formCreate/FormCreate";
import List from "../../components/ToDoList/List";
import "./home.css"


function Home(){
    const [mostrar, setMostrar] = useState(false);
    

    return (
        <>
            <section id="home-content">
                <div className="task-content">
                    <div className="title-list">
                        <h2>To Do List</h2>
                    </div>
                    <button onClick={() => setMostrar(!mostrar)}>adicionar tarefa</button>
                    {mostrar && <FormCreate mostrar={mostrar} setMostrar={setMostrar}></FormCreate>}
                <div className="listTask">
                    <List></List>
                </div>

                </div>
            </section>
        </> 
    )
}

export default Home;