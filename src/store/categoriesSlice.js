import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../api/categoriesApi";

export const getCategories = createAsyncThunk(
    "categories/getCategories",
    async function (_, { dispatch, rejectWithValue }) {
        try {
            const res = await fetchCategories(1)
            // console.log(res);
            dispatch(setCategories(res.data.list))
            const res2 = await fetchCategories(2)
            // console.log(res2);
            dispatch(setCategories(res2.data.list))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        category: "",
        error: null,
        status: null
    },
    reducers: {
        setCategory: (state, action) => {
            return {
                ...state, category: action.payload
            }
        },
        setCategories: (state, action) => {
            const newCategories = action.payload.filter(newCategory => {
                // Проверяем, есть ли уже такой объект в массиве
                return !state.categories.some(category => category.id === newCategory.id);
            });

            return {
                ...state,
                categories: [...state.categories, ...newCategories]
            }
        }
    },
    extraReducers: (build) => {

    }
})

export const { setCategories, setCategory } = categoriesSlice.actions

export default categoriesSlice.reducer