import { reactive, ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import { router } from "../../router";

type Dialog = {
  visible: boolean;
  title: string;
  message: string;
};
type DialogConfig = {
  title?: string;
  btnOkText?: string;
  btnOkColor?: string;
  btnCancelText?: string;
  btnCancelColor?: string;
};
type Alert = Dialog & { type: "error" | "success" | "recovery" };
type AlertProp = {
  message: string;
  type?: "error" | "success" | "recovery";
  redirect?: RouteLocationRaw;
};

export const dialogConfig = reactive<DialogConfig>({});
export const overlay = ref(false);
export const dialog = reactive({
  visible: false,
  title: "Perhatian !",
  message: "",
});
export const alert = reactive<Alert>({
  visible: false,
  title: "",
  message: "",
  type: "success",
});

export const useLoading = {
  show: () => {
    overlay.value = true;
  },
  hide: () => {
    overlay.value = false;
  },
};

let resolvePromise: (value: boolean) => void;

export const useConfirmation = async (
  prop: DialogConfig & { message: string }
) => {
  dialogConfig.btnOkText = prop.btnOkText || "Save";
  dialogConfig.btnOkColor = prop.btnOkColor;
  dialogConfig.btnCancelText = prop.btnCancelText || "Cancel";
  dialogConfig.btnCancelColor = prop.btnCancelColor;
  if (prop.title) dialog.title = prop.title;
  dialog.message = prop.message;
  dialog.visible = true;
  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve;
  });
};

export const confirmAction = (confirmed: boolean) => {
  dialog.visible = false;
  resolvePromise(confirmed);
};

export const usePopup = async (prop: AlertProp) => {
  alert.title =
    prop.type === "error"
      ? "Terjadi Kesalahan"
      : prop.type === "recovery"
      ? "Proses Recovery Data"
      : "Berhasil";
  alert.message = prop.message;
  alert.type = prop.type || "success";
  alert.visible = true;
  return new Promise<boolean>((resolve) => {
    if (prop.type != "error") {
      setTimeout(() => {
        resolve(true);
        alert.visible = false;
        if (prop.redirect) {
          router.push(prop.redirect);
        }
      }, 800);
    }
  });
};
