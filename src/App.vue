<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import UserMsg from "./components/UserMsg.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    UserMsg
  },
}
</script>

<template>
  <AppHeader />
  <main class="main-content main-layout full">
    <RouterView />
  </main>
  <UserMsg />
  <AppFooter />
</template>

<style></style>
