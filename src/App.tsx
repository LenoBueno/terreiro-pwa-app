
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'

// Páginas públicas
const Login = React.lazy(() => import('./app/login/page'))
const Register = React.lazy(() => import('./app/register/page'))

// Contexto de autenticação
import { AuthProvider } from './contexts/auth-context'

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <React.Suspense fallback={<div>Carregando...</div>}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Redirecionar para login por padrão */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </React.Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}
