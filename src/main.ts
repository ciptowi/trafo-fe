import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import { Form } from "@primevue/forms";

import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

import Aura from "@primeuix/themes/aura";
import { definePreset } from "@primeuix/themes";

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{blue.50}",
      100: "{blue.100}",
      200: "{blue.200}",
      300: "{blue.300}",
      400: "{blue.400}",
      500: "{blue.500}",
      600: "{blue.600}",
      700: "{blue.700}",
      800: "{blue.800}",
      900: "{blue.900}",
      950: "{blue.950}",
    },
  },
});

import Button from "primevue/button";
import { router } from "./router";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: false || "none",
    },
  },
});

app.component("Button", Button);
app.component("Form", Form);
app.use(router);
app.mount("#app");
