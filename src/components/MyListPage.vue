<template>
  <div class="page">
    <h1>Ma liste</h1>

    <p v-if="myList.length === 0" class="empty">
      Vous n'avez encore ajouté aucun animé depuis le catalogue.
    </p>

    <ul v-else class="list">
      <li v-for="anime in myList" :key="anime.id">
        <div class="left">
          <img :src="anime.imageUrl" class="cover" />
          <div>
            <div class="title">{{ anime.title }}</div>
            <div class="note">Note : {{ anime.note }} / 10</div>
          </div>
        </div>

        <div class="actions">
          <button @click="goToDetail(anime.id)">Voir</button>
          <button class="remove" @click="removeFromList(anime.id)">Retirer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAnimeStore } from '../store/animeStore'

const router = useRouter()
const { myList, removeFromList } = useAnimeStore()

function goToDetail(id: number) {
  router.push(`/animes/${id}`)
}
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.empty {
  text-align: center;
  color: #9ca3af;
}

.list {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

li {
  background: #020617;
  border-radius: 12px;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(244, 114, 182, 0.4);
}

.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cover {
  width: 40px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
}

.title {
  font-size: 0.95rem;
}

.note {
  font-size: 0.85rem;
  color: #fb7185;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 10px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
}

button:not(.remove) {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff;
}

button.remove {
  background: #ef4444;
  color: #fff;
}
</style>
