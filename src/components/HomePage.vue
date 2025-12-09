<template>
  <section class="home" role="main" aria-label="Page d'accueil AniShelf">
    <div class="hero">
      <h1 class="title">AniShelf</h1>
      <p class="subtitle">La bibliothèque d'animés pensée pour organiser tes séries.</p>

      <div class="cta">
        <button
          class="btn primary"
          @click="$router.push('/catalog')"
        >
          Entrer dans l'application
        </button>

        <button
          class="btn secondary"
          @click="$router.push('/my-list')"
        >
          Ma liste
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  background-image:
    linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.45)),
    url('../assets/anime/background.jpg');
  background-size: cover;
  background-position: center;
  color: #f9fafb;
}

.hero {
  text-align: center;
  padding: 2rem 2.5rem;
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.7);
  border: 1px solid rgba(244, 114, 182, 0.25);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7);
  animation: fadeInUp 600ms ease both;
}

.title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  font-weight: 800;
  margin: 0 0 10px;
  background: linear-gradient(90deg, #f9a8d4, #c4b5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: clamp(1rem, 2.4vw, 1.2rem);
  color: #e5e7eb;
  opacity: 0.9;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
}

.btn.primary {
  background: linear-gradient(135deg, #fb7185, #f9a8d4);
  color: #111827;
  box-shadow: 0 10px 30px rgba(249, 168, 212, 0.45);
}

.btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(249, 168, 212, 0.55);
}

.btn.secondary {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #eef2ff;
}

.btn.secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 40px rgba(99, 102, 241, 0.35);
}

.cta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 520px) {
  .hero {
    padding: 2rem 1.25rem;
  }
  .btn {
    width: 100%;
  }
}
</style>
