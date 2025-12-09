<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header class="navbar">
      <button class="brand" @click="$router.push('/')">
        AniShelf
      </button>

      <nav>
        <RouterLink to="/catalog">Catalogue</RouterLink>
        <RouterLink to="/my-list">Ma liste</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: radial-gradient(circle at top, #1f2937, #020617);
  border-bottom: 1px solid rgba(244, 114, 182, 0.3);
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.55);
}

.brand {
  background: none;
  border: none;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  padding: 6px 8px;
  color: transparent;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  transition: opacity 0.25s ease;
}

.brand:hover {
  opacity: 0.8;
}

nav {
  display: flex;
  gap: 18px;
}

nav a {
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.95rem;
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
  border-bottom: 2px solid transparent;
}

nav a:hover {
  color: #f9a8d4;
  border-color: #f9a8d4;
}

nav a.router-link-active {
  color: #f9a8d4;
  border-color: #f9a8d4;
  font-weight: 600;
}

.content {
  padding: 24px;
  min-height: calc(100vh - 60px);
}
</style>
