import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'

export default function AppRouter() {
    return (
        <Routes>
            <Route path={"/"} element={<Dashboard />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
        </Routes>
    )
}
