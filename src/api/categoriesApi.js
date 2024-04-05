import { instance } from "./auth";
import axios from "axios";


export const fetchCategories = async (page) => {
    try {
        const res = await instance.get(`/recipe/categories/?page=${page}`)
        return res
    } catch (error) {
        throw error
    }
}