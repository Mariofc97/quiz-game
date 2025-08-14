<template>
  <!-- User Profile Card -->
  <div class="card shadow-lg">
    <div class="card-header bg-primary text-white text-center">
      <h3 class="mb-0">Your Profile</h3>
    </div>

    <div class="card-body text-center">
      <div class="d-flex flex-column align-items-center mb-3">
        <h4 class="text-uppercase">{{ user.name }}</h4>
        <div class="avatar-wrapper">
          <!-- catch the avatar selection if it exists, if not, use the first one -->
          <img :src="user.avatar || avatars[0]" class="avatar-img" />
        </div>
        <button
          class="btn btn-outline-primary btn-sm mt-2"
          @click="showAvatars = !showAvatars"
        >
          {{ showAvatars ? "Close" : "Change avatar" }}
        </button>
      </div>

      <div v-if="showAvatars" class="avatar-grid mb-3">
        <button
          v-for="(img, idx) in avatars"
          :key="idx"
          class="avatar-option"
          :class="{ selected: user.avatar === img }"
          @click="selectAvatar(img)"
        >
          <img :src="img" alt="Avatar" class="option-img" />
        </button>
      </div>

      <p class="text-muted">Username: {{ user.username }}</p>
      <p class="fw-bold">Email: {{ user.email }}</p>

      <button class="btn btn-danger mt-3 px-4 py-2" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
  </div>

  <!-- SCORE SECTION -->
  <div class="mt-4">
    <h2>SCORE SECTION</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      showAvatars: false,

      avatars: [
        new URL("../assets/avatars/user.png", import.meta.url).href,
        new URL("../assets/avatars/cowboy.png", import.meta.url).href,
        new URL("../assets/avatars/teacher.png", import.meta.url).href,
        new URL("../assets/avatars/dog.png", import.meta.url).href,
        new URL("../assets/avatars/frog.png", import.meta.url).href,
        new URL("../assets/avatars/lion.png", import.meta.url).href,
        new URL("../assets/avatars/mummy.png", import.meta.url).href,
        new URL("../assets/avatars/tiger.png", import.meta.url).href,
      ],
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const u = JSON.parse(loggedInUser);
      //create this,user with default avatar and the user data
      this.user = { avatar: u.avatar || this.avatars[0], ...u };
      if (!u.avatar)
        localStorage.setItem("loggedInUser", JSON.stringify(this.user)); // refresh LocalStorage to save the avatar
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    selectAvatar(img) {
      this.user = { ...this.user, avatar: img };
      localStorage.setItem("loggedInUser", JSON.stringify(this.user));
      this.showAvatars = false;
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.avatar-wrapper {
  width: 112px;
  height: 112px;
  border-radius: 15%;
  overflow: hidden;
  border: 3px solid #0d6efd20;
  display: grid;
  place-items: center;
  background: #f8f9fa;
}
.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
  gap: 12px;
}
.avatar-option {
  border: 2px solid transparent;
  border-radius: 15%;
  padding: 8px;
}
.avatar-option:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.avatar-option.selected {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
}
.option-img {
  width: 54px;
  height: 54px;
  object-fit: contain;
}
</style>
