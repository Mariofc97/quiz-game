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
          v-for="(img, idx) in availableAvatars"
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
  <div class="mt-5">
    <h2 class="text-center fw-bold">Your Quiz Scores</h2>
    <table
      v-if="user.scores && user.scores.length > 0"
      class="table table-hover table-striped mt-3 shadow-sm"
    >
      <thead class="table-dark">
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in user.scores" :key="index">
          <td>{{ score.date }}</td>
          <td>{{ score.category }}</td>
          <td class="fw-bold text-primary">
            {{ score.score }}/{{ score.total }} ({{ score.percentage }}%)
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="text-center text-muted">No quiz scores available.</p>
  </div>
  <!-- PLAN SECTION -->
  <div class="mt-4">
    <h5 class="fw-bold">Your Plan</h5>
    <p>
      Current plan:
      <span class="badge bg-primary text-uppercase">{{ user.plan }}</span>
    </p>

    <div class="d-flex justify-content-center align-items-center gap-2">
      <select v-model="selectedPlan" class="form-select w-auto">
        <option value="basic">Basic</option>
        <option value="pro">Pro</option>
      </select>
      <button class="btn btn-success" @click="applyPlanChange">
        Update Plan
      </button>
    </div>
  </div>
</template>

<script>
import { usePlanLimit } from "../composables/usePlanLimit";
export default {
  data() {
    return {
      user: null,
      showAvatars: false,
      selectedPlan: "basic",
      avatars: [
        new URL("../assets/avatars/user.png", import.meta.url).href,
        new URL("../assets/avatars/cowboy.png", import.meta.url).href,
        new URL("../assets/avatars/teacher.png", import.meta.url).href,
        new URL("../assets/avatars/dog.png", import.meta.url).href,
        new URL("../assets/avatars/frog.png", import.meta.url).href,
        new URL("../assets/avatars/tiger.png", import.meta.url).href,
        new URL("../assets/avatars/chameleon.png", import.meta.url).href,
        new URL("../assets/avatars/whale.png", import.meta.url).href,
        new URL("../assets/avatars/ghost.png", import.meta.url).href,
        new URL("../assets/avatars/gundam.png", import.meta.url).href,
        new URL("../assets/avatars/hacker.png", import.meta.url).href,
        new URL("../assets/avatars/luffy.png", import.meta.url).href,
        new URL("../assets/avatars/psyduck.png", import.meta.url).href,
        new URL("../assets/avatars/staryu.png", import.meta.url).href,
        new URL("../assets/avatars/mummy.png", import.meta.url).href,
      ],
    };
  },
  computed: {
    whaleIndex() {
      return this.avatars.findIndex(
        (img) =>
          img === new URL("../assets/avatars/whale.png", import.meta.url).href
      );
    },
    availableAvatars() {
      if (!this.user) return [];
      const plan = this.user.plan || "basic";
      if (plan === "pro") {
        return this.avatars; // Pro users have access to all avatars
      } else {
        return this.avatars.slice(0, this.whaleIndex + 1); // Basic users have limited avatars
      }
    },
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const u = JSON.parse(loggedInUser);
      //create this,user with default avatar and the user data
      this.user = { avatar: u.avatar || this.avatars[0], ...u };
      this.selectedPlan = u.plan || "basic"; // set the plan from user data
      if (!u.avatar)
        localStorage.setItem("loggedInUser", JSON.stringify(this.user)); // refresh LocalStorage to save the avatar
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    selectAvatar(img) {
      this.user = { ...this.user, avatar: img };
      const { persistUser } = usePlanLimit();
      persistUser(this.user); // update the user in localStorage
      this.showAvatars = false;
    },
    applyPlanChange() {
      this.user.plan = this.selectedPlan;
      const { persistUser } = usePlanLimit();

      if (
        this.user.plan === "basic" &&
        !this.availableAvatars.includes(this.user.avatar)
      ) {
        this.user.avatar = this.availableAvatars[0]; // forzar uno permitido
      }

      persistUser(this.user);
      alert(`Plan updated to ${this.user.plan.toUpperCase()}`);
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
