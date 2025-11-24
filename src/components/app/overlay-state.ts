import { ref } from "vue";

export const isOverlay = ref(false);

export const overlayState = {
  show: () => {
    isOverlay.value = true;
  },
  hide: () => {
    isOverlay.value = false;
  },
  isShow: () => {
    return isOverlay.value;
  },
};
