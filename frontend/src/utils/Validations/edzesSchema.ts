import * as Yup from "yup";

const edzesSchema = Yup.object().shape({
  edzes_neve: Yup.string()
    .required("Az edzés nevének megadása kötelező")
    .min(3, "Az edzés nevének legalább 3 karakter hosszúnak kell lennie"),
  gyakorlatok: Yup.array().of(
    Yup.object().shape({
      gyakorlat_id: Yup.number().required("A gyakorlat kiválasztása kötelező"),
      gyakorlat_neve: Yup.string().required("A gyakorlat nevének megadása kötelező"),
      szettek: Yup.array().of(
        Yup.object().shape({
          reps: Yup.number()
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .required("Az ismétlések számának megadása kötelező")
            .min(1, "Az ismétlések számának legalább 1-nek kell lennie")
            .transform((value, originalValue) =>
              String(originalValue).trim() === "" ? undefined : value
            )
            .required("A súly megadása kötelező")
            .min(0, "A súly nem lehet negatív"),
        })
      ),
    })
  ),
});

export { edzesSchema };