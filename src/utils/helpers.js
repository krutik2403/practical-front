import { toast } from "react-toastify";

export const toastFormErrors = (errors) => {
  for (const err in errors) {
    toast.error(errors[err][0]);
  }
};
