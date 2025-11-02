import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Goals from "../pages/goals/Goals";
function AppRouter(){
    return (
        <Routes> 
            <Route path="/" Component={Home}></Route>
            <Route path="/goals" Component={Goals}></Route>
        </Routes>
    )
}

export default AppRouter
