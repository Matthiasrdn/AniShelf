<template>
  <div class="page">
    <h1>Catalogue d'animés</h1>

    <p class="subtitle">
      Parcours le catalogue et ajoute tes animés préférés à ta liste.
    </p>

    
    <div class="search-wrapper">
      <input
        v-model="searchTerm"
        type="text"
        class="search-input"
        placeholder="Rechercher un animé (titre, description...)"
      />
    </div>

    <div class="cards">
      <div
        v-for="anime in filteredCatalog"
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
        <div class="popup-header">
          <div class="popup-cover-wrapper">
            <img
              :src="selectedAnime.imageUrl"
              :alt="selectedAnime.title"
              class="popup-cover"
            />
          </div>

          <div class="popup-header-text">
            <h3 class="popup-title">{{ selectedAnime.title }}</h3>
            <p class="popup-description">
              {{ selectedAnime.description }}
            </p>
          </div>
        </div>

        <div class="popup-fields">
          <div class="field">
            <label class="field-label">
              Note (1 à 10)
            </label>
            <input
              type="number"
              v-model.number="rating"
              min="1"
              max="10"
              class="rating-input"
            />
          </div>

          <div class="field">
            <label class="field-label">
              Commentaire
            </label>
            <textarea
              v-model="comment"
              class="comment-input"
              placeholder="Ce que tu as pensé de l'animé, ce que tu attends, ton perso préféré..."
              rows="3"
            ></textarea>

            <div class="quick-comments">
              <span class="quick-label">Idées rapides :</span>
              <button
                v-for="text in quickComments"
                :key="text"
                type="button"
                class="quick-btn"
                @click="appendQuickComment(text)"
              >
                {{ text }}
              </button>
            </div>
          </div>
        </div>

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAnimeStore } from '../store/animeStore'
import type { Anime } from '../data/animeCatalog'

const router = useRouter()
const { catalog, myList, addToListWithNote } = useAnimeStore()

const selectedAnime = ref<Anime | null>(null)
const rating = ref<number>(5)
const comment = ref<string>('')


const searchTerm = ref('')


const filteredCatalog = computed(() =>
  catalog.value.filter((anime: Anime) => {   
    const q = searchTerm.value.trim().toLowerCase()
    if (!q) return true
    return (
      anime.title.toLowerCase().includes(q) ||
      anime.description.toLowerCase().includes(q)
    )
  })
)

const quickComments = [
  'À voir absolument',
  'Très bon début',
  'Animation incroyable',
  'Persos super attachants',
  'Histoire prometteuse',
  'Je le recommande'
]

function isInList(id: number) {
  return myList.value.some(a => a.id === id)
}

function goToDetail(id: number) {
  router.push(`/animes/${id}`)
}

function openRatingPopup(anime: Anime) {
  selectedAnime.value = anime
  rating.value = 5
  comment.value = ''
}

function cancelPopup() {
  selectedAnime.value = null
}

function confirmRating() {
  if (!selectedAnime.value) return
  addToListWithNote(selectedAnime.value, rating.value, comment.value)
  selectedAnime.value = null
}

function appendQuickComment(text: string) {
  if (!comment.value) {
    comment.value = text
  } else if (!comment.value.includes(text)) {
    comment.value =
      comment.value.trim() + (comment.value.endsWith('.') ? ' ' : ' · ') + text
  }
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
  margin: 0 0 16px;
  font-size: 0.95rem;
  color: #9ca3af;
}


.search-wrapper {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 380px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #4b5563;
  background: rgba(15, 23, 42, 0.9);
  color: #f9fafb;
  font-size: 0.9rem;
  outline: none;
}

.search-input::placeholder {
  color: #6b7280;
  font-size: 0.8rem;
}

.search-input:focus {
  border-color: rgba(244, 114, 182, 0.8);
  box-shadow: 0 0 0 1px rgba(244, 114, 182, 0.3);
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
  transition: transform 0.15s ease, box-shadow 0.15s ease,
    border-color 0.15s ease;
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
  background: radial-gradient(circle at top, #020617, #020617 60%);
  padding: 22px 22px 18px;
  border-radius: 18px;
  width: 520px;
  max-width: 100%;
  border: 1px solid rgba(244, 114, 182, 0.5);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.95);
  color: #f9fafb;
}

.popup-header {
  display: flex;
  gap: 14px;
  margin-bottom: 14px;
}

.popup-cover-wrapper {
  flex: 0 0 110px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.85);
}

.popup-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.popup-header-text {
  flex: 1;
}

.popup-title {
  margin: 0 0 6px;
  font-size: 1.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.popup-description {
  margin: 0;
  font-size: 0.85rem;
  color: #e5e7eb;
  opacity: 0.9;
  max-height: 74px;
  overflow: hidden;
}

.popup-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 6px;
}

.field {
  text-align: left;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: #e5e7eb;
}

.field-hint {
  margin: 4px 0 0;
  font-size: 0.75rem;
  color: #9ca3af;
}

.rating-input {
  width: 80px;
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  text-align: center;
  font-size: 0.95rem;
  background: #020617;
  color: #f9fafb;
}

.comment-input {
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #4b5563;
  font-size: 0.85rem;
  background: #020617;
  color: #f9fafb;
  resize: vertical;
}

.quick-comments {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
  align-items: center;
}

.quick-label {
  font-size: 0.75rem;
  color: #9ca3af;
}

.quick-btn {
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.7);
  background: rgba(15, 23, 42, 0.9);
  font-size: 0.75rem;
  padding: 3px 8px;
  cursor: pointer;
  color: #e5e7eb;
}

.quick-btn:hover {
  border-color: rgba(244, 114, 182, 0.8);
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

@media (max-width: 600px) {
  .popup-header {
    flex-direction: column;
  }

  .popup-cover-wrapper {
    margin: 0 auto;
  }

  .popup-header-text {
    text-align: center;
  }

  .popup-actions {
    justify-content: center;
  }
}
</style>
