import * as Yup from "yup";

const SLAGIFY_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .max(20, "max 20 chars")
    .min(2)
    .matches(SLAGIFY_REGEX, "invalid name no spaces required")
    .required("name is required!"),

  password: Yup.string()
    .trim()
    .max(20, "max 20 chars")
    .min(6, "password is at least 6 chars")
    .required("name is required!"),
});

export default validationSchema;
