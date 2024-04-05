import { instance } from "./auth";

export const getRecipes = async () => {
    try {
        const res = await instance.get(`/recipe/feed/`)
        return res
    } catch (error) {
        throw error
    }
}

export const getRecipeById = async (id) => {
    try {
        const res = await instance.get(`recipe/${id}/`)
        return res

    } catch (error) {
        throw error
    }
}

export const postRate = async (obj) => {
    try {
        const res = await instance.post("recipe/rates/", {
            recipe: obj.id,
            rate_number: obj.count
        })
        return res
    } catch (error) {
        throw error
    }
}

export const postComment = async (obj) => {
    try {
        const res = await instance.post("recipe/comments/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const postRecipe = async (obj) => {
    try {
        const res = await instance.post("recipe/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const putRecipe = async (obj)=>{
    try {
        const res = await instance.put(`recipe/${obj.id}/`, obj.data)
        return res
    } catch (error) {
        throw error
    }
}

export const postRecipeBookmark = async (obj) => {
    try {
        const res = await instance.post("recipe/bookmarks/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const deleteRecipe = async (id) => {
    try {
        const res = await instance.delete(`recipe/${id}/`)
        return res
    } catch (error) {
        throw error
    }
}

