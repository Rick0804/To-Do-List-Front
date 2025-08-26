import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Metas from "../pages/goals/Goals";
function AppRouter(){
    return (
        <Routes> 
            <Route path="/" Component={Home}></Route>
            <Route path="/metas" Component={Metas}></Route>
        </Routes>
    )
}

export default AppRouter
