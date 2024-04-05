import * as yup from "yup"

export const validateLogin = yup.object().shape({
    email: yup.string().email("Почта введена неверно").required("Почта обязательна"),
    password: yup
        .string()
        .test(
            "password",
            "Пароль введен неверно",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "Минимальная длина пароля - 8 символов")
        .max(25, "Максимальная длина пароля - 25 символов")
        .required("Пароль обязателен"),
})


export const validateRegister = yup.object().shape({
    email: yup.string().email("Почта введена неверно").required("Почта обязательна"),
    username: yup.string().required("Имя обязательно"),
    password: yup
        .string()
        .test(
            "password",
            "_",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "_")
        .max(25, "_")
        .required("_"),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают").required("Пароль обязателен")
})

export const validateEmailForm = yup.object().shape({
    email: yup.string().email("Неверный формат").required("Почта обязательна"),
})

export const validateResetPassword = yup.object().shape({
    password: yup
        .string()
        .test(
            "password",
            "_",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "_")
        .max(25, "_")
        .required("_"),
    confirm_password: yup.string().oneOf([yup.ref("password")], "Пароли не совпадают").required("Пароль обязателен")
})

export const validateUpdateProfile = yup.object().shape({
    username: yup.string().required("Данные не введены"),
    email: yup.string().email("Неверный формат").required("Данные не введены")
})

export const validateUpdateProfilePassword = yup.object().shape({
    current_password: yup
        .string()
        .test(
            "current_password",
            "Текущий пароль введен неверно",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "Текущий пароль введен неверно")
        .max(25, "Текущий пароль введен неверно")
        .required("Поле обязательно для заполнения"),

    new_password: yup
        .string()
        .test(
            "new_password",
            "_",
            (value) => {
                return (
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value) &&
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)
                );
            }
        )
        .min(8, "_")
        .max(25, "_")
        .required("_"),
        confirm_password: yup.string().oneOf([yup.ref("new_password")], "Пароли не совпадают").required("Пароль обязателен")

})