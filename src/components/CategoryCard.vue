<template>
  <router-link
    class="flip-card text-decoration-none"
    :to="{ name: 'quiz', params: { id: String(id) }, query: { name } }"
    :aria-label="`Open ${name}`"
  >
    <div class="flip-inner">
      <div class="face face-front">
        <i :class="['bi', iconClass]" aria-hidden="true"></i>
      </div>

      <div class="face face-back">
        <h5 class="mb-1 text-dark text-center">{{ name }}</h5>
        <small class="text-muted">Tap to start</small>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CategoryCard",
  props: {
    id: { type: [Number, String], required: true },
    name: { type: String, required: true },
  },
  computed: {
    iconClass() {
      const n = this.name.toLowerCase();

      if (n.includes("general")) return "bi-lightbulb";
      if (n.includes("book")) return "bi-book";
      if (n.includes("film")) return "bi-film";
      if (n.includes("television")) return "bi-tv";
      if (n.includes("music")) return "bi-music-note-beamed";
      if (n.includes("musicals") || n.includes("theatre")) return "bi-mic";
      if (n.includes("video game")) return "bi bi-controller";
      if (n.includes("board game")) return "bi-dice-5";
      if (n.includes("cartoon") || n.includes("animation"))
        return "bi-emoji-smile";
      if (n.includes("comics")) return "bi-journal-richtext";
      if (n.includes("anime")) return "bi-emoji-smile";
      if (n.includes("science") && n.includes("nature")) return "bi-tree";
      if (n.includes("science") && n.includes("computer"))
        return "bi bi-pc-display-horizontal";
      if (n.includes("mathematics")) return "bi-calculator";
      if (n.includes("mythology")) return "bi-moon-stars";
      if (n.includes("sports")) return "bi-trophy";
      if (n.includes("geography")) return "bi-geo-alt";
      if (n.includes("history")) return "bi-hourglass-split";
      if (n.includes("politics")) return "bi-building";
      if (n.includes("art")) return "bi-brush";
      if (n.includes("celeb")) return "bi-star-fill";
      if (n.includes("animals")) return "bi-bug";
      if (n.includes("vehicles")) return "bi bi-car-front-fill";
      if (n.includes("gadgets")) return "bi-phone";

      return "bi-collection";
    },
  },
};
</script>

<style scoped>
.flip-card {
  display: block;
  perspective: 1000px;
  border-radius: 14px;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 110px;
  border-radius: 14px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.06);
  transform-style: preserve-3d;
  transition: transform 0.5s ease, box-shadow 0.2s ease;
}

@media (hover: hover) and (pointer: fine) {
  .flip-card:hover .flip-inner {
    transform: rotateY(180deg);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
  }
}

.face {
  position: absolute;
  inset: 0;
  padding: 16px;
  border-radius: 14px;
  backface-visibility: hidden;
  display: grid;
  place-items: center;
}

.face-front .bi {
  font-size: 2rem;
  color: var(--primary, #7c3aed);
  text-shadow: 0 2px 6px rgba(124, 58, 237, 0.25);
}

.face-back {
  transform: rotateY(180deg);
  padding: 12px 16px;
}
</style>
