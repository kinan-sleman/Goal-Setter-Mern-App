import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { logout, reset } from '../redux/reducers/userReducer'

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.user)
    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">GoalSetter</Link>
            </div>
            {user ? (<>
            <button className="btn" onClick={handleLogout}>Logout</button>
            </>) : (
                <ul>
                    <li>
                        <Link to="/login"><FaSignInAlt /> Login</Link>
                    </li >
                    <li>
                        <Link to="/register"><FaUser /> Register</Link>
                    </li>
                </ul >
            )
            }
        </header >
    )
}
