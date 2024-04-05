import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../api/auth";
import {toastSuccess} from "../ui/Toast/toast"

export const fetchRegister = createAsyncThunk(
    "user/fetchRegister",
    async function (obj, { rejectWithValue }) {
        console.log(obj);
        try {
            const res = await register(obj)
            if (!res.status === 201) {
                throw new Error("Password fields didn't match")
            }
            return res.data

        } catch (error) {
            rejectWithValue(error.errors)
        }
    }
)

export const fetchLogin = createAsyncThunk(
    "user/fetchLogin",
    async function (obj, { rejectWithValue }) {
        try {
            const res = await login(obj)
            if (!res.status === 201) {
                throw new Error("Password fields didn't match")
            }
            return res.data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const errorState = (state, action) => {
    state.status = "rejected"
    state.error = action.payload
}



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        status: null,
        error: null,
        registered:null,
        logined: null
    },
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(fetchRegister.pending, (state, actions) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = "panding";
                state.user = action.payload
                state.registered = true
            })
            .addCase(fetchRegister.rejected, errorState)
            .addCase(fetchLogin.pending, (state, action)=>{
                state.status = "loading";
                state.error = null
            })
            .addCase(fetchLogin.fulfilled, (state, action)=>{
                state.status = "panding";
                state.user = action.payload
                state.logined = true                
            })
    }
})

export const {actions } = userSlice

export default userSlice.reducer