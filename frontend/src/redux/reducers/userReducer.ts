import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersServices from "../../services/UserServices";

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}
interface ApiResponse<T> {
    message: string;
    status: number;
    data: T;
}

interface UserState {
    loading: boolean;
    user: User | null;
}

type GetUserResponse = ApiResponse<User>;
type LoginRequest = Pick<User, "email"> & { password: string };
type RegisterRequest = LoginRequest & Pick<User, "name">;

export const getMe = createAsyncThunk<GetUserResponse, void>(
    "users/getMe",
    async (_, { rejectWithValue }) => {
        try {
            const res = await UsersServices.getMe();
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const login = createAsyncThunk<GetUserResponse, LoginRequest>(
    "users/login",
    async (req, { rejectWithValue }) => {
        try {
            const res = await UsersServices.login(req);
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk('users/logout', async (_, { rejectWithValue }) => {
    try {
        const res = await UsersServices.logout();
        return res;
    } catch (error: any) {
        return rejectWithValue(error);
    }
})

export const register = createAsyncThunk<GetUserResponse, RegisterRequest>(
    "users/register",
    async (req, { rejectWithValue, }) => {
        try {
            const res = await UsersServices.register(req);
            return res;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);
const user = (localStorage.getItem("user") && localStorage.getItem("user") !== "undefined") ? JSON.parse(localStorage.getItem("user") as string) : null;
const initialState: UserState = {
    loading: false,
    user: user ? user : null,
};

export const users = createSlice({
    name: "users",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(getMe.rejected, (state) => {
                state.loading = false;
            })

            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                window.localStorage.setItem("token", action.payload.data.token)
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                window.localStorage.setItem("token", action.payload.data.token)
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            });
    },
});
export const { reset } = users.actions;
export default users.reducer;
