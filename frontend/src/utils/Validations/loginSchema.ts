import * as Yup from "yup";



const loginSchema = Yup.object().shape({
    email: Yup.string().email("Helytelen email formátum").required("Email megadása kötelező"),
    password: Yup.string().required("Jelszó megadása kötelező"),
});


export { loginSchema }