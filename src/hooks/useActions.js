import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { useMemo } from "react"
import { actions, fetchLogin, fetchRegister } from "../store/userSlice"
import { getCategories } from "../store/categoriesSlice"
import { fetchPutRecipe, fetchGetRecipes, fetchGetRecipeById, fetchPostRate, fetchPostComment, fetchPostRecipe, fetchDeleteRecipe, fetchRecipesByAll } from "../store/recipeSlice"
import { fetchPutProfilePassword, fetchPutProfileInfo, fetchGetOtherProfileInfo, fetchGetMyProfileInfo } from "../store/profileSlice"


const rootActions = {
    actions,
    fetchLogin,
    fetchRegister,
    getCategories,
    fetchGetRecipes,
    fetchGetRecipeById,
    fetchPostRate,
    fetchPostComment,
    fetchPostRecipe,
    fetchPutProfilePassword,
    fetchPutProfileInfo,
    fetchGetOtherProfileInfo,
    fetchGetMyProfileInfo,
    fetchDeleteRecipe,
    fetchPutRecipe,
    fetchRecipesByAll
}


// посмотри и поизучай про этот хук пж


export const useActions = () => {
    const dispatch = useDispatch()
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}