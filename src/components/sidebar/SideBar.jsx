import { Link, useLocation } from "react-router-dom"
import "./sideBar.css"
function SideBar(){
    const location = useLocation();
    const stayPage = (title) => {
        if(title == location.pathname){
            return true;
        } 
    }
    return (
        <>
            <div className="navegation">
                <nav>
                    <Link className={stayPage("/") ? "choosed" : ""} to="/">Home</Link>
                    <Link className={stayPage("/metas") ? "choosed" : ""} to="/metas">Metas</Link>
                    <Link className={stayPage("/notes") ? "choosed" : ""} to="/notes">Notas</Link>
                </nav>
            </div>
        </>
    )
}

export default SideBar