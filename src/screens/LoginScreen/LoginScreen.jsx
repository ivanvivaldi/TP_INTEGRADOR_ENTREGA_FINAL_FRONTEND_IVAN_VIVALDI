import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import { login, requestPasswordReset } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import { AuthContext } from '../../context/AuthContext'
import './LoginScreen.css'

export const LoginScreen = () => {
    const { login: syncroLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const [showResetForm, setShowResetForm] = useState(false)
    const [resetEmail, setResetEmail] = useState('')

    const {
        sendRequest: sendRequestLogin,
        loading: loginRequestLoading,
        error: loginRequestError,
        response: loginRequestResponse
    } = useRequest()

    const {
        sendRequest: sendRequestReset,
        loading: resetRequestLoading,
        error: resetRequestError,
        response: resetRequestResponse
    } = useRequest()

    const initial_form_state = {
        email: '',
        password: ''
    }

    function onSubmit(formData) {
        sendRequestLogin(
            () => login(formData.email, formData.password)
        )
    }

    function handleResetSubmit(event) {
        event.preventDefault()

        sendRequestReset(
            () => requestPasswordReset(resetEmail)
        )
    }

    useEffect(() => {
        if (loginRequestResponse?.ok) {
            syncroLogin(loginRequestResponse?.data?.access_token)
            navigate('/home')
        }
    }, [loginRequestResponse, syncroLogin, navigate])

    const { formState, handleChange, handleSubmit } = useForm(initial_form_state, onSubmit)

    return (
        <div className="login-screen">
            <div className="login-card">

                <div className="login-header">
                    <h1>Iniciar sesión</h1>
                    <p>Volvé a tu espacio de trabajo y continuá organizando tus tareas.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>

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
                            placeholder="Ingresá tu contraseña"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="login-button"
                        disabled={loginRequestLoading || loginRequestResponse?.ok}
                    >
                        {
                            loginRequestLoading
                                ? 'Iniciando sesión...'
                                : 'Iniciar sesión'
                        }
                    </button>

                    {
                        loginRequestError && !loginRequestLoading &&
                        <span className="login-error">
                            Error: {loginRequestError}
                        </span>
                    }

                </form>

                <div className="forgot-password-box">
                    <p>
                        ¿Olvidaste tu contraseña?{' '}
                        <button
                            type="button"
                            className="forgot-password-button"
                            onClick={() => setShowResetForm(!showResetForm)}
                        >
                            Restablecer
                        </button>
                    </p>

                    {
                        showResetForm &&
                        <form className="reset-request-form" onSubmit={handleResetSubmit}>
                            <div className="form-group">
                                <label htmlFor="reset-email">Email de recuperación</label>
                                <input
                                    id="reset-email"
                                    type="email"
                                    placeholder="tuemail@ejemplo.com"
                                    value={resetEmail}
                                    onChange={(event) => setResetEmail(event.target.value)}
                                />
                            </div>

                            <button
                                className="reset-request-button"
                                disabled={resetRequestLoading || resetRequestResponse?.ok}
                            >
                                {
                                    resetRequestLoading
                                        ? 'Enviando...'
                                        : 'Enviar mail de recuperación'
                                }
                            </button>

                            {
                                resetRequestError && !resetRequestLoading &&
                                <span className="login-error">
                                    Error: {resetRequestError}
                                </span>
                            }

                            {
                                resetRequestResponse?.ok &&
                                <span className="login-success">
                                    Revisá tu email para restablecer la contraseña.
                                </span>
                            }
                        </form>
                    }
                </div>

                <p className="login-footer">
                    ¿No tenés cuenta? <Link to="/register">Crear cuenta</Link>
                </p>

            </div>
        </div>
    )
}




/* import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../../hooks/useForm'
import { login } from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import { AuthContext } from '../../context/AuthContext'
import './LoginScreen.css'

export const LoginScreen = () => {
    const { login: syncroLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const {
        sendRequest: sendRequestLogin,
        loading: loginRequestLoading,
        error: loginRequestError,
        response: loginRequestResponse
    } = useRequest()

    const initial_form_state = {
        email: '',
        password: ''
    }

    function onSubmit(formData) {
        sendRequestLogin(
            () => login(formData.email, formData.password)
        )
    }

    useEffect(() => {
        if (loginRequestResponse?.ok) {
            syncroLogin(loginRequestResponse?.data?.access_token)
            navigate('/home')
        }
    }, [loginRequestResponse])

    const { formState, handleChange, handleSubmit } = useForm(initial_form_state, onSubmit)

    return (
        <div className="login-screen">
            <div className="login-card">

                <div className="login-header">
                    <h1>Iniciar sesión</h1>
                    <p>Volvé a tu espacio de trabajo y continuá organizando tus tareas.</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>

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
                            placeholder="Ingresá tu contraseña"
                            value={formState.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="login-button"
                        disabled={loginRequestLoading || loginRequestResponse?.ok}
                    >
                        {
                            loginRequestLoading
                                ? 'Iniciando sesión...'
                                : 'Iniciar sesión'
                        }
                    </button>

                    {
                        loginRequestError && !loginRequestLoading &&
                        <span className="login-error">
                            Error: {loginRequestError}
                        </span>
                    }

                </form>

                <p className="login-footer">
                    ¿No tenés cuenta? <Link to="/register">Crear cuenta</Link>
                </p>

            </div>
        </div>
    )
} */