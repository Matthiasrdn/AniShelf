<template>
  <div class="app">
    <h1>Mes animés</h1>

    
    <div class="form">
      <input
        v-model="newTitle"
        placeholder="Titre de l'animé"
      />

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
        @click="selectAnime(anime)"
      >
        <h2>{{ anime.title }}</h2>
        <p class="rating">{{ anime.rating }} / 10</p>
        <button class="delete-btn" @click.stop="removeAnime(index)">
          Supprimer
        </button>
      </div>
    </div>

 
    <div v-if="selectedAnime" class="detail">
      <h2>Animé sélectionné</h2>
      <p><strong>Titre :</strong> {{ selectedAnime.title }}</p>
      <p><strong>Note :</strong> {{ selectedAnime.rating }} / 10</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const animes = ref([
  { title: "Naruto", rating: 8 },
  { title: "One Piece", rating: 10 },
  { title: "Attack on Titan", rating: 9 }
])

const newTitle = ref("")
const newRating = ref(5)
const selectedAnime = ref(null)

function addAnime() {
  if (!newTitle.value.trim()) return

  animes.value.push({
    title: newTitle.value,
    rating: newRating.value || 0
  })

  newTitle.value = ""
  newRating.value = 5
}

function removeAnime(index) {
  if (selectedAnime.value === animes.value[index]) {
    selectedAnime.value = null
  }
  animes.value.splice(index, 1)
}

function selectAnime(anime) {
  selectedAnime.value = anime
}
</script>

<style scoped>
.app {
  font-family: system-ui, sans-serif;
  max-width: 900px;
  margin: 30px auto;
  color: #f9fafb;
  background: #18181b; 
  padding: 20px;
  border-radius: 12px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}


.form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.form input {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #3f3f46;
  background: #27272f;
  color: #f9fafb;
}

.form button {
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background: #22c55e;
  color: #111827;
  font-weight: 600;
}

.form button:hover {
  background: #16a34a;
}


.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.card {
  background: #fafafa;        
  color: #111827;             
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
}

.card h2 {
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.rating {
  color: #ea580c; 
  font-weight: 600;
  margin-bottom: 10px;
}


.delete-btn {
  padding: 4px 10px;
  font-size: 0.85rem;
  border: none;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  cursor: pointer;
}

.delete-btn:hover {
  background: #b91c1c;
}

.detail {
  background: #fafafa;
  color: #111827;
  border-radius: 12px;
  padding: 16px 20px;
  text-align: center;
}
.detail h2 {
  margin-bottom: 8px;
}
.detail p {
  margin: 4px 0;
}
</style>

