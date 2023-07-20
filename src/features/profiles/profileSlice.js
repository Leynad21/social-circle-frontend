import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";


const initialState = {
    profile: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await profileService.getProfile(accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData, thunkAPI) => {
        try {
            const accessToken = thunkAPI.getState().auth.user.access
            return await profileService.updateProfile(profileData, accessToken)
        } catch (error) {
            const message = (error.response && error.response.data
                && error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)



export const profileSlice = createSlice({
    name: "profiles",
    initialState,
    reducers: {
        'reset': (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ""
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profile = action.payload.profile
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profile = action.payload
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = profileSlice.actions

export default profileSlice.reducer