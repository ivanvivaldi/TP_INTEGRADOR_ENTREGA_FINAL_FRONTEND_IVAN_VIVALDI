import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import './RegisterScreen.css'

export const RegisterScreen = () => {
    const navigate = useNavigate()

    const {
        sendRequest: sendRequestRegister,
        loading: registerRequestLoading,
        error: registerRequestError,
        response: registerRequestResponse
    } = useRequest()

    const initial_form_state = {
        username: '',
        email: '',
        password: ''
    }

    function onSubmit(formData) {
        sendRequestRegister(
            () => register(formData.username, formData.email, formData.password)
        )
    }

    useEffect(() => {
        if (registerRequestResponse?.ok) {
            setTimeout(() => {
                navigate('/login')
            }, 2500)
        }
    }, [registerRequestResponse, navigate])

    const { formState, handleChange, handleSubmit } = useForm(initial_form_state, onSubmit)

    return (
        <div className="register-screen">
            <div className="register-card">

                <div className="register-header">
                    <h1>Crear cuenta</h1>
                    <p>Registrate para crear espacios de trabajo, organizar tareas y colaborar con tu equipo.</p>
                </div>

                <form className="register-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="username">Nombre de usuario</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Ingresá tu nombre"
                            value={formState.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="tuemail@ejemplo.com"
                            value={formState.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Creá una contraseña segura"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="register-button"
                        disabled={registerRequestLoading || registerRequestResponse?.ok}
                    >
                        {
                            registerRequestLoading
                                ? 'Registrando usuario...'
                                : 'Crear cuenta'
                        }
                    </button>

                    {
                        registerRequestError && !registerRequestLoading &&
                        <span className="register-error">
                            Error: {registerRequestError}
                        </span>
                    }

                    {
                        registerRequestResponse?.ok &&
                        <span className="register-success">
                            Revisá tu email para verificar la cuenta.
                        </span>
                    }

                </form>

                <p className="register-footer">
                    ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
                </p>

            </div>
        </div>
    )
}