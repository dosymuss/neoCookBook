import { instance } from "./auth";


export const getProfileInfo = async (id) => {
    try {
        const res = await instance.get(`users/${id}/`)
        console.log(res);
        return res
    } catch (error) {
        throw error
    }
}

export const putProfilePassword = async (obj) => {
    try {
        const res = await instance.put("users/password/change/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const putProfileInfo = async (obj) => {
    try {
        const res = await instance.put("users/profile/me/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const getMyBookmark  = async ()=>{
    try {
        const res = await instance.get("recipe/bookmarks/")
        return res
    } catch (error) {
        throw error
    }
}

