<script setup></script>

<template>
  <div>
    <nav class="navbar navbar-expand bg-light px-3 mb-3">
      <div class="container">
        <div class="collapse navbar-collapse">
          <div class="navbar-nav">
            <router-link to="/categories" class="nav-link nav-anim"
              >Quizzes</router-link
            >
            <router-link to="/profile" class="nav-link nav-anim"
              >Profile</router-link
            >
          </div>
          <div class="navbar-nav ms-auto align-items-center gap-2">
            <router-link to="/login" class="nav-link nav-anim"
              >Log in</router-link
            >
            <router-link to="/register" class="btn btn-success"
              >Sign up</router-link
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.nav-anim {
  position: relative;
  font-weight: 600;
  color: black;
  transition: color 0.2s ease;
}

/* línea “escondida” (escala 0) */
.nav-anim::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  height: 2px;
  width: 100%;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s ease;
}

/* al pasar el ratón: color + subrayado animado */
.nav-anim:hover {
  color: var(--link);
}
.nav-anim:hover::after {
  transform: scaleX(1);
}

/* estado activo del router (mantén subrayado y color) */
.nav-anim.router-link-active,
.nav-anim.router-link-exact-active {
  color: var(--link);
}
.nav-anim.router-link-active::after,
.nav-anim.router-link-exact-active::after {
  transform: scaleX(1);
}
</style>
