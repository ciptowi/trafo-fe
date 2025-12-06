<script setup lang="ts">
import { ref } from "vue";
import { Menubar } from "primevue";
import type { MenuItem } from "primevue/menuitem";
import { useRoute } from "vue-router";

const route = useRoute();

const menuItems = ref<MenuItem[]>([
  { label: "Dashboard", route: "/dashboard" },
  { label: "Managemet User", route: "/management-user" },
  { label: "Managemet Trafo", route: "/trafo", class: "p-menuitem-active" },
  { label: "Group", route: "/trafo-group" },
  { label: "Report" },
]);

const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <div>
    <Menubar :model="menuItems">
      <template #item="{ item, props, hasSubmenu }">
        <RouterLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a
            :href="href"
            v-bind="props.action"
            :class="{ 'router-link-active-custom': isActive(item.route) }"
            class="p-menuitem-link"
            @click="navigate"
          >
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </RouterLink>
        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>
.router-link-active-custom {
  color: #3b82f6 !important;
}
</style>
