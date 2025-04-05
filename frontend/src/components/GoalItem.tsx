import { deleteGoal, Goal } from '../redux/reducers/goalReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';

export default function GoalItem({ key, goal }: { key: string; goal: Goal }) {
    const dispatch = useDispatch<AppDispatch>();
    const handleDelete = (_id: string) => {
        dispatch(deleteGoal({ _id }));
    }
    return (
        <div key={key} className="goal">
            <div>
                {new Date(goal.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{goal.text}</h2>
            <button className="close" onClick={() => handleDelete(goal?._id)}>X</button>
        </div>
    )
}
