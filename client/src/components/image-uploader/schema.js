import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  description: Yup.string().min(5, "Too Short!").max(200, "Too Long!"),
  file: Yup.mixed()
    .test("fileFormat", "Only PDF files are allowed", (value) => {
      const fileType = value?.name.split(".").pop();
      return ["jpg", "png"].includes(fileType);
    })
    .test("fileSize", "File size must not be more than 3MB", (value) => {
      return value?.size <= 3145728;
    })
    .required("required"),
});
