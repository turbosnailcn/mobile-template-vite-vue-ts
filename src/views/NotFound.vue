<template>
  <h1 class="text-center text-4xl">404 Not Found</h1>
</template>
<script setup lang="ts">
useHead({ title: "404 Not Found" });
const router = useRouter();

const { start } = useTimeoutFn(() => {
  useHead({ title: "Vite app" });
  router.push("/");
}, 3000);
start();
</script>
