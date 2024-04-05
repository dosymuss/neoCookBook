import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { putProfileInfo, putProfilePassword, getProfileInfo } from "../api/profileApi";
import { toastError, toastSuccess } from "../ui/Toast/toast";

export const fetchPutProfilePassword = createAsyncThunk(
    "profile/fetchPutProfilePassword",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await putProfilePassword(obj)
            return res
        } catch (error) {
            console.log(error);
            if (error.response.status === 406) {
                return rejectWithValue("Неправильные данные")
            }
            return rejectWithValue("Вы не зарегестрированы")
        }
    }
)
export const fetchPutProfileInfo = createAsyncThunk(
    "profile/fetchPutProfileInfo",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await putProfileInfo(obj)
            return res
        } catch (error) {
            console.log(error);
            if (error.response.status === 406) {
                return rejectWithValue("Не все данные заполнены")
            }
            return rejectWithValue("Вы не зарегестрированы")
        }
    }
)

export const fetchGetOtherProfileInfo = createAsyncThunk(
    'profile/fetchGetOtherProfileInfo',
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProfileInfo(id)
            console.log(res);
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchGetMyProfileInfo = createAsyncThunk(
    "profile/fetchGetMyProfileInfo",
    async (id, { rejectWithValue }) => {
        try {
            const res = await getProfileInfo(id)
            console.log(res);
            return res
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const profileSlice = createSlice({
    name: "profile",
    initialState: {
        otherProfile: {},
        profile: {},
        error: null,
        status: null
    },
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(fetchPutProfilePassword.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    toastSuccess("Пароль успешно изменен")
            })
            .addCase(fetchPutProfilePassword.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload,
                    toastError(action.payload)
            })
            .addCase(fetchPutProfileInfo.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.profile = { ...state.profile, ...action.payload }
                toastSuccess("Изменения успешно внесены")
            })
            .addCase(fetchPutProfileInfo.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload,
                    toastError(action.payload)
            })
            .addCase(fetchGetOtherProfileInfo.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.otherProfile = action.payload.data
            })
            .addCase(fetchGetMyProfileInfo.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.profile = action.payload.data
            })
    }
})

export const { } = profileSlice.actions
export default profileSlice.reducer