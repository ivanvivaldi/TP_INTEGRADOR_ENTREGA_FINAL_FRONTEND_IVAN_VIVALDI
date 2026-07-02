import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router";

function AlreadyAuthMiddleware() {

    const { isLogged } = useContext(AuthContext);

    const location = useLocation();

    const allowAccess =
        location.pathname === "/reset-password";

    if (!isLogged) {
        return <Outlet />;
    }

    if (allowAccess) {
        return <Outlet />;
    }

    return <Navigate to="/home" replace />;
}

export default AlreadyAuthMiddleware;


/* import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

function AlreadyAuthMiddleware (){
    const {isLogged} = useContext(AuthContext)

    if(!isLogged){
        //Es como next() en los middlewares, te lleva a la ruta que querias entrar
        return <Outlet/>
    }
    else{
        return <Navigate to={'/home'}/>
    }
}

export default AlreadyAuthMiddleware */