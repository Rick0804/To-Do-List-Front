import { Link } from "react-router-dom"
import "./sideBar.css"
function SideBar(){
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/metas">Metas</Link>
            <Link to="/notas">Notas</Link>
        </nav>
        </>
    )
}

export default SideBar