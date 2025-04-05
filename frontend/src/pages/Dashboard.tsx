import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../redux/reducers/goalReducer'
import GoalItem from '../components/GoalItem'

export default function Dashboard() {
    const { user } = useSelector((state: RootState) => state.user)
    const { goals } = useSelector((state: RootState) => state.goal)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (!user) {
            navigate("/login")
            return;
        }
        dispatch(getGoals())
        return () => {
            reset();
        }
    }, [user, navigate])
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user?.name}</h1>
                <p>Goals Dashboard</p>
                <GoalForm />
            </section>
            <section className="content">
                {goals.length > 0 ? (
                    <div className="goals">
                        {goals.map((goal) => (
                            <GoalItem key={goal?._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You not have set any goals</h3>
                )}
            </section>
        </>
    )
}
