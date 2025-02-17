import * as Yup from "yup";


const bmiSchema = Yup.object().shape({
    suly: Yup.number()
        .required("A testsúly megadása kötelező")
        .min(20, "A testsúly nem lehet kevesebb, mint 20 kg")
        .max(635, "A testsúly nem lehet több, mint 635 kg"),
    magassag: Yup.number()
        .required("A testmagasság megadása kötelező")
        .min(50, "A testmagasság nem lehet kevesebb, mint 50 cm")
        .max(255, "A testmagasság nem lehet több, mint 255 cm"),
});

export { bmiSchema }