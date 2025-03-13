<template>
  <div class="flex flex-col bg-gradient-to-br from-[#00668a] to-[#1b8481] min-h-screen font-Roboto">
    <SiteNavigation />
    
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
 
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue"


</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>