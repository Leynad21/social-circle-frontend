import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import profileReducer from "../features/profiles/profileSlice"
import quizReducer from "../features/quiz/quizSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        quiz: quizReducer,
    },
})
