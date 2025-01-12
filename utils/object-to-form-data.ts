const objectToFormData = (
  obj: Record<string, any>,
  form: FormData = new FormData(),
  namespace: string = "",
): FormData => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const formKey = namespace ? `${namespace}[${key}]` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !(obj[key] instanceof File)
      ) {
        // Recursively handle nested objects
        objectToFormData(obj[key], form, formKey);
      } else {
        // Append the key-value pair to FormData
        form.append(formKey, obj[key]);
      }
    }
  }

  return form;
};

export default objectToFormData;
