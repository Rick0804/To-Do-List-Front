import "./goals.css"
import { useState } from "react";
import FormCreate from "../../components/formCreate/FormCreate";
import List from "../../components/ToDoList/List";
function Goals() {
    const [mostrar, setMostrar] = useState(false);


    return (
        <>
            <section id="home-content">
                <div className="task-content">
                    <div className="title-list">
                        <h2>Metas</h2>
                    </div>
                    <button onClick={() => setMostrar(!mostrar)}>adicionar Meta</button>
                    {mostrar && <FormCreate mostrar={mostrar} setMostrar={setMostrar}></FormCreate>}
                    <div className="listTask">
                        <List></List>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Goals