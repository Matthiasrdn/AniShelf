<template>
  <div class="detail-page" v-if="anime">
    <h1>{{ anime.title }}</h1>
    <p class="description">{{ anime.description }}</p>

    <button @click="$router.back()">Retour</button>
  </div>

  <div v-else class="detail-page">
    <p>Animé introuvable.</p>
    <button @click="$router.push('/animes')">Retour au catalogue</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { animeCatalog, type Anime } from '../data/animeCatalog'

const route = useRoute()

const anime = computed<Anime | undefined>(() => {
  const id = Number(route.params.id)
  return animeCatalog.find(a => a.id === id)
})
</script>

<style scoped>
.detail-page {
  font-family: system-ui, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 24px;
  background: #181818;
  border-radius: 16px;
  color: #f5f5f5;
}

h1 {
  margin-bottom: 8px;
}

.rating {
  color: #e67e22;
  font-weight: 600;
  margin-bottom: 12px;
}

.description {
  margin-bottom: 20px;
}

button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #2563eb;
  color: white;
  cursor: pointer;
}
</style>
