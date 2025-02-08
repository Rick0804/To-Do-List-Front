import { useState } from "react";
import Forms from "../../components/form/Forms";


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
                    {mostrar && <Forms mostrar={mostrar} setMostrar={setMostrar}></Forms>}
                </div>
            </section>
        </> 
    )
}

export default Home;