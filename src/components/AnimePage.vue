<template>
  <div class="app">
    <h1>Mes animés</h1>

    <div class="form">
      <input v-model="newTitle" placeholder="Titre de l'animé" />
      <input
        type="number"
        v-model.number="newRating"
        min="0"
        max="10"
        placeholder="Note /10"
      />
      <button @click="addAnime">Ajouter</button>
    </div>

    <div class="cards">
      <div
        v-for="(anime, index) in animes"
        :key="index"
        class="card"
      >
        <h2>{{ anime.title }}</h2>
        <p class="rating">{{ anime.rating }} / 10</p>
        <button class="delete-btn" @click="removeAnime(index)">
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Anime {
  title: string
  rating: number
}

const animes = ref<Anime[]>([
  { title: 'Naruto', rating: 8 },
  { title: 'One Piece', rating: 10 },
  { title: 'Attack on Titan', rating: 9 }
])

const newTitle = ref('')
const newRating = ref<number | null>(5)

function addAnime() {
  if (!newTitle.value.trim()) return

  animes.value.push({
    title: newTitle.value,
    rating: newRating.value ?? 0
  })

  newTitle.value = ''
  newRating.value = 5
}

function removeAnime(index: number) {
  animes.value.splice(index, 1)
}
</script>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  background: #181818;
  border-radius: 16px;
  color: #f5f5f5;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.form input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: none;
  background: #262626;
  color: #f5f5f5;
}

.form button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #22c55e;
  color: #111;
  font-weight: 600;
  cursor: pointer;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  text-align: center;
  color: #111;
}

.rating {
  color: #e67e22;
  font-weight: 600;
  margin-bottom: 10px;
}

.delete-btn {
  background: #e74c3c;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}
</style>
