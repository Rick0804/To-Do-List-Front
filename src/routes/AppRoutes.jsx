import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Metas from "../pages/goals/Goals";
import Notes from "../pages/notes/Notes";
function AppRouter(){
    return (
        <Routes> 
            <Route path="/" Component={Home}></Route>
            <Route path="/metas" Component={Metas}></Route>
            <Route path="/notes" Component={Notes}></Route>
        </Routes>
    )
}

export default AppRouter
