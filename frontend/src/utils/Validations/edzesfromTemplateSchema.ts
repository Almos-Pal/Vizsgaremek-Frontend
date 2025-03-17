import * as Yup from "yup";

export const edzesfromTemplateSchema = Yup.object().shape({
    templateId: Yup.number().required("Az edzésterv kiválasztása kötelező"),
});