import * as yup from "yup";

// Define your yup schema
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Invalid email format"),
  password: yup.string().required("Password is required"),
});
