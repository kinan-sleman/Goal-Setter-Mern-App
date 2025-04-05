import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { createGoal } from '../redux/reducers/goalReducer';

export default function GoalForm() {
    const [text, setText] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(createGoal({ text }))
        setText("")
    }
    return (
        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="text">Goal</label>
                    <input type="text" name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">Add Goal</button>
                </div>
            </form>
        </section>
    )
}
