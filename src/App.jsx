/* import React from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen'
import { HomeScreen } from './screens/HomeScreen/HomeScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen/ResetPasswordScreen'
import { WorkspaceScreen } from './screens/WorkspaceScreen/WorkspaceScreen'
import { AuthContextProvider } from './context/AuthContext'
import { WorkspacesContextProvider } from './context/WorkspacesContext'
import AuthMiddleware from './middlewares/AuthMiddleware'
import AlreadyAuthMiddleware from './middlewares/AlreadyAuthMiddleware'
import { WelcomeScreen } from "./Screens/WelcomeScreen/WelcomeScreen";


const App = () => {
  return (
    <AuthContextProvider>
      <Routes>

        <Route element={<AlreadyAuthMiddleware />}>
          <Route
            path='/login'
            element={<LoginScreen />}
          />
          <Route
            path='/register'
            element={<RegisterScreen />}
          />
          <Route
            path='/reset-password'
            element={<ResetPasswordScreen />}
          />
          <Route
            path='/'
            element={<LoginScreen />}
          />
        </Route>

        <Route
          element={<AuthMiddleware />}
        >
          <Route element={<WorkspacesContextProvider />}>
            <Route
              path='/home'
              element={<HomeScreen />}
            />
             <Route
                          path='/workspace/:workspace_id'
                          element={<WorkspaceScreen />}
                        />
          </Route>
        </Route>

        <Route
          path='/*'
          element={<Navigate to={'/home'} />}
        />

      </Routes>
    </AuthContextProvider>
  )
}

export default App */


import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

//import { WelcomeScreen } from './screens/WelcomeScreen/WelcomeScreen'

import { WelcomeScreen } from './screens/Welcomescreen/Welcomescreen'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen'
import { HomeScreen } from './screens/HomeScreen/HomeScreen'
import { ResetPasswordScreen } from './screens/ResetPasswordScreen/ResetPasswordScreen'
import { WorkspaceScreen } from './screens/WorkspaceScreen/WorkspaceScreen'

import { AuthContextProvider } from './context/AuthContext'
import { WorkspacesContextProvider } from './context/WorkspacesContext'

import AuthMiddleware from './middlewares/AuthMiddleware'
import AlreadyAuthMiddleware from './middlewares/AlreadyAuthMiddleware'

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>

        <Route element={<AlreadyAuthMiddleware />}>

          <Route
            path="/"
            element={<WelcomeScreen />}
          />

          <Route
            path="/login"
            element={<LoginScreen />}
          />

          <Route
            path="/register"
            element={<RegisterScreen />}
          />

          <Route
            path="/reset-password"
            element={<ResetPasswordScreen />}
          />

        </Route>

        <Route element={<AuthMiddleware />}>

          <Route element={<WorkspacesContextProvider />}>

            <Route
              path="/home"
              element={<HomeScreen />}
            />

            <Route
              path="/workspace/:workspace_id"
              element={<WorkspaceScreen />}
            />

          </Route>

        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </AuthContextProvider>
  )
}

export default App
