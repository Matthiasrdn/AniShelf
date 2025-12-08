<template>
  <div class="page">
    <h1>Catalogue d'animés</h1>

    <p class="subtitle">
      Parcours le catalogue et ajoute tes animés préférés à ta liste.
    </p>

    <div class="cards">
      <div
        v-for="anime in catalog"
        :key="anime.id"
        class="card"
      >
        <div class="img-wrapper">
          <img :src="anime.imageUrl" class="cover" />
        </div>

        <div class="card-body">
          <h2>{{ anime.title }}</h2>
          <p class="description">{{ anime.description }}</p>

          <div class="actions">
            <button
              v-if="!isInList(anime.id)"
              class="btn primary"
              @click="openRatingPopup(anime)"
            >
              Ajouter à ma liste
            </button>

            <button class="btn secondary" @click="goToDetail(anime.id)">
              Voir la fiche
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedAnime" class="popup">
      <div class="popup-content">
        <h3>Note pour {{ selectedAnime.title }}</h3>

        <input
          type="number"
          v-model.number="rating"
          min="1"
          max="10"
          class="rating-input"
        />

        <div class="popup-actions">
          <button class="btn primary" @click="confirmRating">
            Valider
          </button>
          <button class="btn secondary" @click="cancelPopup">
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimeStore } from '../store/animeStore'
import type { Anime } from '../data/animeCatalog'

const router = useRouter()
const { catalog, myList, addToListWithNote } = useAnimeStore()

const selectedAnime = ref<Anime | null>(null)
const rating = ref<number>(5)

function isInList(id: number) {
  return myList.value.some(a => a.id === id)
}

function goToDetail(id: number) {
  router.push(`/animes/${id}`)
}

function openRatingPopup(anime: Anime) {
  selectedAnime.value = anime
  rating.value = 5
}

function cancelPopup() {
  selectedAnime.value = null
}

function confirmRating() {
  if (!selectedAnime.value) return
  addToListWithNote(selectedAnime.value, rating.value)
  selectedAnime.value = null
}
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  margin-bottom: 8px;
  font-size: 2rem;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.subtitle {
  margin: 0 0 24px;
  font-size: 0.95rem;
  color: #9ca3af;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background: radial-gradient(circle at top, #1f2937, #020617);
  color: #f9fafb;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(244, 114, 182, 0.2);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
  border-color: rgba(244, 114, 182, 0.6);
}

.img-wrapper {
  width: 100%;
  height: 260px;
  overflow: hidden;
}

.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 0.25s ease;
}

.card:hover .cover {
  transform: scale(1.06);
}

.card-body {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-body h2 {
  margin: 0;
  font-size: 1rem;
}

.description {
  font-size: 0.85rem;
  color: #e5e7eb;
  opacity: 0.9;
  min-height: 40px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.btn {
  padding: 7px 12px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
}

.btn.primary {
  background: linear-gradient(135deg, #fb7185, #f9a8d4);
  color: #111827;
}

.btn.secondary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #eef2ff;
}

.popup {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.popup-content {
  background: #020617;
  padding: 24px;
  border-radius: 16px;
  width: 260px;
  text-align: center;
  border: 1px solid rgba(244, 114, 182, 0.5);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.9);
}

.rating-input {
  width: 70px;
  margin: 14px 0;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  text-align: center;
  font-size: 1rem;
  background: #020617;
  color: #f9fafb;
}

.popup-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
</style>
