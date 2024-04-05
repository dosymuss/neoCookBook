import axios from "axios"

export const register = async (obj) => {
    try {
        const res = await axios.post("https://neobook.online/neorecipe/users/register/", obj)
        return res
    } catch (error) {
        throw error
    }
}

export const login = async (obj) => {
    try {
        const res = await axios.post("https://neobook.online/neorecipe/users/login/", obj)
        localStorage.setItem("token", JSON.stringify(res.data))
        return res
    } catch (error) {
        throw error
    }
}

export const fetchSendCodeEmail = async (email) => {
    try {
        const res = await axios.post("https://neobook.online/neorecipe/users/password/reset/request/", email)
        console.log(res);
        return res
    } catch (error) {
        throw error
    }
}

export const fetchConfirmEmail = async (userId, code) => {
    try {
        const res = await axios.post(`https://neobook.online/neorecipe/users/${userId}/password/reset/verify/`, code)
        if (res.status === 200) {
            localStorage.setItem("passw_token", JSON.stringify(res.data))
        }
        return res
    } catch (error) {
        throw error
    }
}

export const fetchResetPass = async (obj) => {
    try {
        const res = await axios.put("https://neobook.online/neorecipe/users/password/reset/change/", obj, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("passw_token")).access}`
            }
        })
        console.log(res);
        return res
    } catch (error) {
        throw error
    }
}


export const getInfoForG = async (token) => {
    try {
        const data = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

const token = localStorage.getItem("token");

// Создаем заголовок Authorization
const authHeader = token ? { Authorization: `Bearer ${JSON.parse(token).access}` } : {};

// Создаем экземпляр axios с настройками
export const instance = axios.create({
    baseURL: "https://neobook.online/neorecipe",
    headers: authHeader
});


instance.interceptors.response.use(
    res => {
        console.log(res);
        return res
    },
    async (err) => {
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(err);
        if (axios.isAxiosError(err)) {
            if (err.response.status === 401) {
                try {
                    const { data } = await axios.post(
                        "https://neobook.online/neorecipe/users/login/refresh/",
                        {
                            refresh: token.refresh,
                        }
                    );
                    console.log(data)
                    localStorage.setItem("token", JSON.stringify({
                        access: data.access,
                        refresh: token.refresh
                    }));
                    location.reload();
                    // localStorage.setItem("refresh", data.refresh);
                    // Перенаправляем пользователя на другую страницу (замените URL на нужный)
                    return axios(err.config);
                } catch (error) {
                    if (error) {
                        // Обработка ошибки обновления токена
                        console.log(error);
                    }
                }
            }
        }
        return Promise.reject(err);
    }
)