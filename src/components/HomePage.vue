<template>
  <div class="home">
    <h1>Bienvenue</h1>
    <button @click="$router.push('/animes')">
      Entrer dans l'application
    </button>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f5f5f5;
  font-family: system-ui, sans-serif;
}

h1 {
  font-size: 3rem;
  margin-bottom: 8px;
}

p {
  margin: 0;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  background: #22c55e;
  color: #111;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
}
</style>
