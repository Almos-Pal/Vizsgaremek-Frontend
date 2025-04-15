import * as Yup from "yup";

const registerSchema = Yup.object().shape({
    email: Yup.string().email("Helytelen email formátum").required("Email megadása kötelező"),
    username: Yup.string().required("Felhasználónév megadása kötelező").min(3, "A felhasználónévnek legalább 3 karakter hosszúnak kell lennie"),
    password: Yup.string().required("Jelszó megadása kötelező")
        .min(8, "A jelszónak legalább 8 karakter hosszúnak kell lennie")
        .matches(/[A-Z]/, "A jelszónak tartalmaznia kell legalább egy nagybetűt")
        .matches(/[0-9]/, "A jelszónak tartalmaznia kell legalább egy számot")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "A jelszónak tartalmaznia kell legalább egy speciális karaktert"),
    passwordConfirm: Yup.string().required('A jelszó megerősítése kötelező').oneOf([Yup.ref('password')], 'A jelszavaknak egyezniük kell')
});

export {registerSchema}