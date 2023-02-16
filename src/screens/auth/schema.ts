import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup.string().email("Email is not valid"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password length min 8 chars"),
});

export const schemaLogin = yup.object().shape({
  email: yup.string().email("Email is not valid"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password length min 8 chars"),
});
