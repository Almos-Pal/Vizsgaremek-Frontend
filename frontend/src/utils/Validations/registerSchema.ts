import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    email: Yup.string().email("Helytelen email formátum").required("Email megadása kötelező"),
    username: Yup.string().required("Felhasználónév megadása kötelező"),
    password: Yup.string().required("Jelszó megadása kötelező")
        .min(6, "A felhasználónévnek legalább 6 karakter hosszúnak kell lennie")
        .matches(/[A-Z]/, "A felhasználónévnek tartalmaznia kell legalább egy nagybetűt")
        .matches(/[0-9]/, "A felhasználónévnek tartalmaznia kell legalább egy számot")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "A felhasználónévnek tartalmaznia kell legalább egy speciális karaktert"),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), undefined], 'A jelszavaknak egyezniük kell')
});

export {registerSchema}