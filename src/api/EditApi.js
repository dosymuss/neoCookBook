import { instance } from "./auth";


export const postImage = async (formData) => {
    try {
        const res = await instance.post("common/image/", formData)
        return res
    } catch (error) {
        throw error
    }
}

