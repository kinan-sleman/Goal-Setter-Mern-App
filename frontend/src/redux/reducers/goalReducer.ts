import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GoalServices from "./../../services/GoalServices";

export interface Goal {
    _id: string;
    text: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ApiResponse<T> {
    message: string;
    status: number;
    data: T;
}

type GetUserResponse = ApiResponse<Goal[]>;
type CreateGoalRequest = Pick<Goal, "text">;
type UpdateGoalRequest = Goal;
type DeleteGoalRequest = Pick<Goal, "_id">;

export const getGoals = createAsyncThunk<GetUserResponse, void>(
    "goals/getGoals",
    async (_, { rejectWithValue }) => {
        try {
            return await GoalServices.getGoals();
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createGoal = createAsyncThunk(
    "goals/createGoal",
    async (req: CreateGoalRequest, { rejectWithValue }) => {
        try {
            return await GoalServices.createGoal(req);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateGoal = createAsyncThunk(
    "goals/updateGoal",
    async (req: UpdateGoalRequest, { rejectWithValue }) => {
        try {
            return await GoalServices.updateGoal(req);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteGoal = createAsyncThunk(
    "goals/deleteGoal",
    async (req: DeleteGoalRequest, { rejectWithValue }) => {
        try {
            return await GoalServices.deleteGoal(req);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

interface UserState {
    loading: boolean;
    goals: Goal[];
}

const initialState: UserState = {
    loading: false,
    goals: [],
};

export const goals = createSlice({
    name: "goals",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = action.payload.data;
            })
            .addCase(getGoals.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createGoal.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals.push(action.payload.data);
            })
            .addCase(createGoal.rejected, (state) => {
                state.loading = false;
            })

            .addCase(updateGoal.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.loading = false;
                const updatedGoal = action.payload.data;
                const index = state.goals.findIndex((g) => g._id === updatedGoal._id);
                if (index !== -1) {
                    state.goals[index] = updatedGoal;
                }
            })
            .addCase(updateGoal.rejected, (state) => {
                state.loading = false;
            })

            .addCase(deleteGoal.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.data._id);
            })
            .addCase(deleteGoal.rejected, (state) => {
                state.loading = false;
            });

    },
});
export const { reset } = goals.actions;
export default goals.reducer;
