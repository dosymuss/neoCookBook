import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import categoriesReducer from "./categoriesSlice"
import recipeReducer from "./recipeSlice"
import profileReducer from "./profileSlice"


export default configureStore({
    reducer: {
        user: userReducer,
        category: categoriesReducer,
        recipe: recipeReducer,
        profile: profileReducer
    }
})