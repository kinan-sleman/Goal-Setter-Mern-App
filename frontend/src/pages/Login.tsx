import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '../redux/store';
import { login, reset } from '../redux/reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

export default function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (user) {
            navigate("/")
            dispatch(reset())
        }
    }, [user, loading, dispatch])
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!password || !email) {
            toast.error("please fill all fields");
        }
        dispatch(login({
            email,
            password
        }))
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Login</h1>
                <p>Login And Start Setting Goals</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name='email' value={email} placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name='password' value={password} placeholder='Enter password' onChange={handleChange} />
                    </div>
                    <p>you don't have an account? <span className="text-underline"><Link to="/register">Register</Link></span></p>
                    <div className="form-block">
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
