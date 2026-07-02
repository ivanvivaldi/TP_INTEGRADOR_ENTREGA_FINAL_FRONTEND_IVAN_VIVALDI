import React, { useEffect } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router'
import useForm from '../../hooks/useForm'
import useRequest from '../../hooks/useRequest'
import { resetPasswordConfirm } from '../../services/authService'
import './ResetPasswordScreen.css'

export const ResetPasswordScreen = () => {

    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    //const reset_password_token = searchParams.get('reset_password_token')
    const reset_password_token = searchParams.get('token')
    if (!reset_password_token) {
        return <Navigate to="/login" />
    }

    const {
        sendRequest,
        loading,
        error,
        response
    } = useRequest()

    const initialForm = {
        password: '',
        confirmPassword: ''
    }

    function onSubmit(formData) {

        if (formData.password !== formData.confirmPassword) {
            throw new Error('Las contraseñas no coinciden.')
        }

        sendRequest(() =>
            resetPasswordConfirm(
                reset_password_token,
                formData.password
            )
        )

    }

    const {
        formState,
        handleChange,
        handleSubmit
    } = useForm(initialForm, onSubmit)

    useEffect(() => {

        if (response?.ok) {

            setTimeout(() => {

                navigate('/login')

            }, 2500)

        }

    }, [response])

    return (

        <div className="reset-screen">

            <div className="reset-card">

                <div className="reset-header">

                    <h1>Restablecer contraseña</h1>

                    <p>

                        Ingresá una nueva contraseña para volver a acceder
                        a tu espacio de trabajo.

                    </p>

                </div>

                <form
                    className="reset-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>Nueva contraseña</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Nueva contraseña"
                            value={formState.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>Confirmar contraseña</label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmá la contraseña"
                            value={formState.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="reset-button"
                        disabled={loading || response?.ok}
                    >

                        {
                            loading
                                ? "Actualizando..."
                                : "Restablecer contraseña"
                        }

                    </button>

                    {
                        error &&
                        <span className="reset-error">
                            {error}
                        </span>
                    }

                    {
                        response?.ok &&
                        <span className="reset-success">

                            Contraseña actualizada correctamente.

                        </span>
                    }

                </form>

                <p className="reset-footer">

                    <Link to="/login">

                        Volver al inicio de sesión

                    </Link>

                </p>

            </div>

        </div>

    )

}




/* import React from 'react'
import { Navigate, useSearchParams } from 'react-router'

export const ResetPasswordScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const reset_password_token = searchParams.get('reset_password_token')
    if(!reset_password_token){
        return <Navigate to={'/login'}/>
    } 
    return (
        <div>
            <h1>Restablecer la contraseña</h1>
            <form action="">

            </form>
        </div>
    )
}
 */