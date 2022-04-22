import Login from './pages/Login'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={!user ? <Login /> : <Navigate to="/home" />}
            />

            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/home" />}
            />

            <Route
              path="/home"
              element={user ? <Home /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
