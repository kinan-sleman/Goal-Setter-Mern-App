import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./reducers/userReducer"
import goalReducer from "./reducers/goalReducer"
const persistConfig = {
    key: "mern-app",
    version: 1,
    storage,
};

const allReducers = combineReducers({
    goal: goalReducer,
    user: userReducer
});
const persistedReducer = persistReducer(persistConfig, allReducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
