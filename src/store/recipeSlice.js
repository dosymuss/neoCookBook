import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipes, getRecipeById, postRate, postComment, postRecipe, deleteRecipe, putRecipe } from "../api/recipeApi";
import { toastError, toastSuccess } from "../ui/Toast/toast";
import { instance } from "../api/auth";

export const fetchGetRecipes = createAsyncThunk(
    "recipes/fetchGetRecipes",
    async function (_, { rejectWithValue }) {
        try {
            const res = await getRecipes()
            return res
        } catch (error) {
            return rejectWithValue
        }
    }
)

export const fetchGetRecipeById = createAsyncThunk(
    "recipes/fetchGetRecipeById",
    async function (id, { rejectWithValue }) {
        try {
            const res = await getRecipeById(id)
            return res
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const fetchPostRate = createAsyncThunk(
    "recipes/fetchPostRate",
    async function (obj, { rejectWithValue }) {
        try {
            const res = await postRate(obj)
            return res
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Вы не авторизованы")
            }
        }
    }
)

export const fetchPostComment = createAsyncThunk(
    "recipes/fetchPostComment",
    async function (obj, { rejectWithValue }) {
        try {
            const res = await postComment(obj)
            console.log(res);
            return res
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Вы не авторизованы")
            }
        }
    }
)

export const fetchPostRecipe = createAsyncThunk(
    "recipes/fetchPostRecipes",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await postRecipe(obj)
            console.log(res);
            return res
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Вы не авторизованы")
            }
        }
    }
)

export const fetchDeleteRecipe = createAsyncThunk(
    "recipes/fetchDeleteRecipe",
    async (id, { rejectWithValue }) => {
        try {
            const res = await deleteRecipe(id)
            return res
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Вы не авторизованы")
            }
            if (error.response.status === 404) {
                return rejectWithValue("Пользователь не найден")
            }
            return rejectWithValue("Произошла ошибка")
        }
    }
)

export const fetchPutRecipe = createAsyncThunk(
    "recipes/fetchPutRecipe",
    async (obj, { rejectWithValue }) => {
        try {
            const res = await putRecipe(obj)
            return res
        } catch (error) {
            if (error.response.status === 401) {
                return rejectWithValue("Вы не авторизованы")
            }
            if (error.response.status === 406) {
                return rejectWithValue("Неправильные данные")
            }
            return rejectWithValue("Произошла ошибка")
        }
    }
)



// !напиши санк, для обработки всех запросов, и попробуй все реализовать
// ? если ты забыл что ты сделал, ты сделал надпись для того, если данных нет


const recipeSlice = createSlice({
    name: "recipes",
    initialState: {
        recipes: [],
        recipe: {},
        page: 1,
        comments: [],
        totalCount: 0,
        totalPages: 0,
        search: "",
        category: {
            id: 0,
            name: "Все рецепты"
        },
        ordering: "-avg_rating",
        status: null,
        error: null,
        titleText: "Все рецепты"
    },
    reducers: {
        setCategoryAction: (state, action) => {
            return { ...state, category: action.payload }
        },
        setTitleText: (state, action) => {
            return { ...state, titleText: action.payload }
        },
        setOrdering: (state, action) => {
            return { ...state, ordering: action.payload }
        },
        setPage: (state, action) => {
            return { ...state, page: action.payload }
        },
        setSearch: (state, action) => {
            return { ...state, search: action.payload }
        }

    },
    extraReducers: (build) => {
        build
            .addCase(fetchGetRecipes.pending, (state, action) => {
                state.status = "pending",
                    state.error = null
            })
            .addCase(fetchGetRecipes.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.recipes = action.payload.data.list
            })
            .addCase(fetchGetRecipes.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload,
                    state.recipes = []
            })
            .addCase(fetchGetRecipeById.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.recipe = action.payload.data,
                    state.comments = action.payload.data.comments
            })
            .addCase(fetchPostRate.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    toastSuccess("Ваша оценка записана")
            })
            .addCase(fetchPostRate.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload
                toastError(action.payload)
            })
            .addCase(fetchPostComment.fulfilled, (state, action) => {
                console.log(state);
                state.status = "fulfilled",
                    state.error = null
                state.comments = [...state.comments, action.payload.data]
            })
            .addCase(fetchPostComment.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload
                toastError(action.payload)
            })
            .addCase(fetchPostRecipe.fulfilled, (state, actions) => {
                state.status = "fulfilled",
                    state.error = null
                toastSuccess("Рецепт успешно добавлен")
            })
            .addCase(fetchDeleteRecipe.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null
                toastSuccess("Рецепт успешно удален")
            })
            .addCase(fetchDeleteRecipe.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload
            })
            .addCase(fetchPutRecipe.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null
                toastSuccess("Рецепт успешно изменен")
            })
            .addCase(fetchPutRecipe.rejected, (state, action) => {
                state.status = "rejected",
                    state.error = action.payload,
                    toastError(action.payload)
            })
            .addCase(fetchRecipesByAll.fulfilled, (state, action) => {
                state.status = "fulfilled",
                    state.error = null,
                    state.recipes = action.payload.data.list,
                    state.totalCount = action.payload.data.total_count,
                    state.totalPages = action.payload.data.total_pages

            })

    }
})

export const fetchRecipesByAll = createAsyncThunk(
    "recipes/fetchRecipesByCategory",
    async (_, { rejectWithValue, getState }) => {
        try {
            const category = getState().recipe.category;
            const ordering = getState().recipe.ordering;
            const page = getState().recipe.page
            const searchValue = getState().recipe.search

            console.log(category);
            // Проверяем, что id определен и не равен undefined
            const categoryParam = category.category.id !== 0 ? `&category=${category.category.id}` : "";

            const res = await instance.get(`recipe/feed/?limit=10${categoryParam}&ordering=${ordering}&page=${page}&search=${searchValue}`);
            return res;

            "recipe/feed/?category=1jnmk&page=1"
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const { setCategoryAction, setTitleText, setOrdering, setPage, setSearch } = recipeSlice.actions

export default recipeSlice.reducer