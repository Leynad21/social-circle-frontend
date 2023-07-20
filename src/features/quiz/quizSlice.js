import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";


const initialState = {
    quizzes: [],
    quiz: {},
    quizScore: {
        totalAnswers: 0,
        correctAnswers: 0,
    },
    isError: false,
    isLoading: true,
    isSuccess: false,
    message: "",
}

export const getQuizzes = createAsyncThunk(
    "quiz/getQuizzes",
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.getQuizzes(accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getQuiz = createAsyncThunk(
    "quiz/getQuiz",
    async (quizData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.getQuiz(quizData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteQuiz = createAsyncThunk(
    "quiz/deleteQuiz",
    async (quizData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.deleteQuiz(quizData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createQuiz = createAsyncThunk(
    "quiz/createQuiz",
    async (quizData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.createQuiz(quizData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createQuestion = createAsyncThunk(
    "quiz/createQuestion",
    async (questionData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.createQuestion(questionData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getPlayQuiz = createAsyncThunk(
    "quiz/getPlayQuiz",
    async (quizData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await quizService.getPlayQuiz(quizData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        'reset': (state) => {
            state.quizzes = []
            state.quiz = {}
            state.quizScore = {
                score: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
            }
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
        updateTotalAnswers: (state, action) => {
            state.quizScore.totalAnswers = action.payload;
        },
        updateCorrectAnswers: (state, action) => {
            state.quizScore.correctAnswers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuizzes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuizzes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quizzes = action.payload
            })
            .addCase(getQuizzes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getQuiz.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuiz.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quiz = action.payload
            })
            .addCase(getQuiz.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteQuiz.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quiz = action.payload
            })
            .addCase(deleteQuiz.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createQuiz.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quiz = action.payload
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPlayQuiz.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlayQuiz.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.quiz = action.payload[0]
            })
            .addCase(getPlayQuiz.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

    }
})


export const { reset, updateTotalAnswers, updateCorrectAnswers } = quizSlice.actions

export default quizSlice.reducer