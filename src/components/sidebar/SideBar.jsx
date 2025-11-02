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
                    <Link className={stayPage("/goals") ? "choosed" : ""} to="/goals">Metas</Link>
                </nav>
            </div>
        </>
    )
}

export default SideBar