import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { register, reset } from '../redux/reducers/userReducer';
import Spinner from '../components/Spinner';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { loading, user } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (user) {
            navigate("/");
        }
        dispatch(reset())
    }, [navigate, loading, user, dispatch])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { name, email, password, confirmPassword } = formData;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            toast.error("please fill all fields")
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1><FaUser /> Register</h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name='name' value={name} placeholder='Enter your name' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name='email' value={email} placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name='password' value={password} placeholder='Enter password' onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' onChange={handleChange} />
                    </div>
                    <p>Do you have an account? <span className="text-underline"><Link to="/login">Login</Link></span></p>
                    <div className="form-block">
                        <button type='submit' className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
