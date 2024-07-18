import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
  
  file: Yup.mixed()
    .test("fileFormat", "Only PDF files are allowed", (value) => {
      const fileType = value?.name.split(".").pop();
      return ["jpg", "JPG", "png","jpeg"].includes(fileType);
    })
    .test("fileSize", "File size must not be more than 3MB", (value) => {
      return value?.size <= 3145728;
    })
    .required("required"),
});
