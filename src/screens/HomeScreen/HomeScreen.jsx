import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { WorkspacesContext } from '../../context/WorkspacesContext'
import { useNavigate } from 'react-router'
import './HomeScreen.css'

export const HomeScreen = () => {
  const { logout, userData } = useContext(AuthContext)

  const {
    workspaces,
    loading,
    error,
    actionLoading,
    actionError,
    refetch,
    createNewWorkspace,
    deleteWorkspaceById
  } = useContext(WorkspacesContext)

  const [search, setSearch] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  async function handleCreateWorkspace() {
    try {
      setFeedbackMessage('')
      await createNewWorkspace()
    } catch (error) {
      setFeedbackMessage(error.message)
    }
  }

  async function handleDeleteWorkspace(event, membership) {
    event.stopPropagation()

    if (membership.member_rol !== 'dueño') {
      setFeedbackMessage('No tenés permisos para eliminar este espacio.')
      return
    }

    try {
      setFeedbackMessage('')
      await deleteWorkspaceById(membership.workspace_id)
    } catch (error) {
      setFeedbackMessage(error.message)
    }
  }

  const ROLE_STYLES = {
    dueño: {
      label: 'Dueño',
      className: 'workspace-card__role-badge--owner'
    },
    owner: {
      label: 'Dueño',
      className: 'workspace-card__role-badge--owner'
    },
    colaborador: {
      label: 'Colaborador',
      className: 'workspace-card__role-badge--collaborator'
    },
    collaborator: {
      label: 'Colaborador',
      className: 'workspace-card__role-badge--collaborator'
    }
  }

  function getRoleInfo(role) {
    return ROLE_STYLES[role] || ROLE_STYLES.colaborador
  }

  function formatDate(date) {
    if (!date) {
      return 'Sin fecha'
    }

    return new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date))
  }

  const filteredWorkspaces = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return workspaces
    }

    return workspaces.filter((membership) => {
      const nombre = membership.workspace_nombre || ''
      const descripcion = membership.workspace_descripcion || ''

      return (
        nombre.toLowerCase().includes(normalizedSearch) ||
        descripcion.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [search, workspaces])

  if (!userData) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Cargando perfil de usuario...</p>
      </div>
    )
  }

  return (
    <div className="home-container">

      <header className="home-header">
        <div className="user-profile">
          <span className="avatar">
            {userData.nombre.charAt(0).toUpperCase()}
          </span>

          <div>
            <h2>¡Hola, {userData.nombre}!</h2>
            <p>Bienvenido nuevamente a tu espacio de trabajo.</p>
          </div>
        </div>

        <button className="btn-primary" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <section className="home-search" aria-label="Buscador de espacios de trabajo">
        <input
          className="home-search__input"
          type="search"
          placeholder="Buscar espacios, tareas o proyectos..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      <main className="home-main">

        <div className="section-title-container">
          <div>
            <h3>Mis espacios de trabajo</h3>
            <p>Organizá tareas, reuniones, ideas y objetivos en un solo lugar.</p>
          </div>

          <button
            className="btn-create-workspace btn-primary"
            onClick={handleCreateWorkspace}
            disabled={actionLoading}
          >
            {actionLoading ? 'Creando...' : '+ Nuevo espacio'}
          </button>
        </div>

        {(feedbackMessage || actionError) && (
          <div className="home-feedback" role="alert">
            {feedbackMessage || actionError}
          </div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando espacios de trabajo...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p>⚠️ Error: {error}</p>
            <button className="btn-retry" onClick={refetch}>
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {workspaces.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📂</div>
                <h4>Todavía no tenés espacios de trabajo.</h4>
                <p>
                  Creá tu primer espacio para comenzar a organizar tareas y colaborar con tu equipo.
                </p>
              </div>
            ) : filteredWorkspaces.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔎</div>
                <h4>No encontramos resultados.</h4>
                <p>Probá con otra búsqueda.</p>
              </div>
            ) : (
              <div className="workspaces-grid">
                {filteredWorkspaces.map((membership) => {
                  const workspaceTitle = membership.workspace_nombre || 'Espacio'
                  const workspaceDescription = membership.workspace_descripcion || 'Sin descripción'
                  const roleInfo = getRoleInfo(membership.member_rol)

                  return (
                    <div
                      key={membership.member_id}
                      className="workspace-card"
                      onClick={() => navigate(`/workspace/${membership.workspace_id}`)}
                    >
                      <div className="workspace-card-icon">
                        {workspaceTitle.substring(0, 2).toUpperCase()}
                      </div>

                      <div className="workspace-card-info">
                        <h4>{workspaceTitle}</h4>
                        <p>{workspaceDescription}</p>

                        <div className="workspace-card-meta">
                          <span className={`workspace-card__role-badge ${roleInfo.className}`}>
                            {roleInfo.label}
                          </span>

                          <span className="workspace-card__date">
                            Creado el {formatDate(membership.workspace_fecha_creacion)}
                          </span>
                        </div>
                      </div>

                      <div className="workspace-card-actions">
                        <span className="workspace-card-arrow">›</span>

                        <button
                          className="workspace-card__delete-button"
                          onClick={(event) => handleDeleteWorkspace(event, membership)}
                          disabled={actionLoading}
                          type="button"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}
