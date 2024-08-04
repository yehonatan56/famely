import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  file: Yup.mixed()
    .test("fileFormat", "Only PDF files are allowed", (value) => {
      const fileType = value?.name.split(".").pop();
      return ["jpg", "JPG", "png", "jpeg"].includes(fileType);
    })
    .required("required"),
});
