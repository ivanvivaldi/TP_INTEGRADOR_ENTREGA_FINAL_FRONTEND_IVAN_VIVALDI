import { useNavigate } from "react-router";
import "./WelcomeScreen.css";

export const WelcomeScreen = () => {

    const navigate = useNavigate();

    return (
        <div className="welcome-container">

            <div className="welcome-card">

                <h1>TaskFlow</h1>

                <h2>Organizá el trabajo de tu equipo</h2>

                <p>
                    Centralizá tareas, reuniones, ideas y objetivos
                    en un solo espacio colaborativo.
                </p>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/login")}
                >
                    Iniciar sesión
                </button>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/register")}
                >
                    Crear cuenta
                </button>

            </div>

        </div>
    )
}