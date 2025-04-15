import * as Yup from "yup";


export const gyakorlatSchema = Yup.object().shape({
  gyakorlat_neve: Yup.string().required("A gyakorlat neve kötelező"),
  fo_izomcsoport: Yup.number() .required("Az izomcsoportok megadása kötelező")
  .test(
    "non-zero",
    "A fő izomcsoport kiválasztása kötelező",
    (value) => value !== 0
  ),

  izomcsoportok: Yup.array()
    .of(Yup.number())
    .min(1, "Legalább egy izomcsoportot ki kell választani")
    .required("Az izomcsoportok megadása kötelező"),
  // Optional fields – adjust as needed:
  gyakorlat_leiras: Yup.string(),
  eszkoz: Yup.string(),
});
