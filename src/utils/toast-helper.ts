import { type ToastServiceMethods } from "primevue";

export const alertSuccess = (toast: ToastServiceMethods, message: string) => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
};

export const alertError = (toast: ToastServiceMethods, message: string) => {
  toast.add({
    severity: "error",
    summary: "Error",
    detail: message,
    life: 5000,
  });
};
