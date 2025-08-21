<template>
  <div class="background-home">
    <div class="container py-4">
      <div class="text-center d-none d-md-block mt-4">
        <h1>Welcome to</h1>
        <img :src="quizIconHome" class="img-fluid hero-img" alt="Quiz Icon" />
      </div>

      <div class="row g-4">
        <!-- Card 1 -->
        <div class="col-md-6">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-header text-white bg-primary text-center fw-bold">
              Basic plan
            </div>
            <div class="card-body">
              <h5 class="card-title">Start for free</h5>
              <p class="card-text">
                Popular categories and saved scores in your profile:
              </p>
              <ul class="mb-3">
                <li>Category-based quizzes</li>
                <li>Score history</li>
                <li>Limited tries</li>
              </ul>
              <RouterLink to="/register" class="btn btn-success">
                <i class="bi bi-play-circle me-1"></i> Start now
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="col-md-6">
          <div class="card h-100 shadow-sm border-0">
            <div class="card-header text-white bg-success text-center fw-bold">
              Pro plan
            </div>
            <div class="card-body">
              <h5 class="card-title">More control</h5>
              <p class="card-text">Only for smarty pants 😉:</p>
              <ul class="mb-3">
                <li>Unlimited tries</li>
                <li>More Avatars</li>
              </ul>
              <div style="margin-top: 40px">
                <RouterLink to="/register" class="btn btn-success">
                  <i class="bi bi-lightning-charge"></i> Try Pro
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quizIconHome from "../assets/quiz-icon-home.png";
export default {
  name: "HomePage",
  data() {
    return {
      quizIconHome,
    };
  },
};
</script>

<style scoped>
.background-home {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;

  background: linear-gradient(
    135deg,
    var(--primary, #7c3aed) 0%,
    #0ea5e9 50%,
    var(--success, #22c55e) 100%
  );

  min-height: calc(100vh - 72px);
}

.card {
  border-radius: 16px;
}
.card-header {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
</style>
