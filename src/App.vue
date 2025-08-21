<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import quizIconMobile from "./assets/quiz_icon_mobile.png";

const navOpen = ref(false);
const userOpen = ref(false);

function handleClickOutside(e) {
  if (!e.target.closest(".user-dropdown")) userOpen.value = false;
}
onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light px-3 mb-3">
      <div class="container">
        <RouterLink
          to="/"
          aria-label="Go to Home"
          class="navbar-brand d-md-none"
        >
          <img :src="quizIconMobile" alt="Quiz home" class="brand-img" />
        </RouterLink>

        <div class="d-flex align-items-center ms-auto d-md-none gap-2">
          <div class="dropdown user-dropdown">
            <button
              class="btn p-0 user-btn"
              type="button"
              aria-label="User menu"
              :aria-expanded="userOpen"
              @click="userOpen = !userOpen"
            >
              <i class="bi bi-person-circle fs-4"></i>
            </button>
            <ul
              :class="[
                'dropdown-menu',
                'dropdown-menu-end',
                userOpen && 'show',
              ]"
            >
              <li>
                <RouterLink class="dropdown-item" to="/profile">
                  Profile
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/login">
                  Log in
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/register">
                  Sign up
                </RouterLink>
              </li>
            </ul>
          </div>

          <button
            class="hamburger-btn"
            type="button"
            aria-label="Toggle navigation"
            :aria-expanded="navOpen"
            aria-controls="mainNav"
            @click="navOpen = !navOpen"
          >
            <span :class="['hamburger', navOpen && 'active']">
              <span></span><span></span><span></span>
            </span>
          </button>
        </div>

        <div
          :class="['collapse', 'navbar-collapse', navOpen && 'show']"
          id="mainNav"
        >
          <div class="navbar-nav">
            <RouterLink to="/" class="nav-link nav-anim">Home</RouterLink>
            <RouterLink to="/categories" class="nav-link nav-anim"
              >Quizzes</RouterLink
            >

            <RouterLink
              to="/profile"
              class="nav-link nav-anim d-none d-md-block"
            >
              Profile
            </RouterLink>

            <RouterLink to="/support" class="nav-link nav-anim"
              >Support</RouterLink
            >
          </div>

          <div
            class="navbar-nav ms-auto align-items-center gap-2 d-none d-md-flex"
          >
            <RouterLink to="/login" class="nav-link nav-anim"
              >Log in</RouterLink
            >
            <RouterLink to="/register" class="btn btn-success"
              >Sign up</RouterLink
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
.brand-img {
  width: 32px;
  height: 32px;
  display: block;
  object-fit: contain;
  border-radius: 8px;
  transition: transform 0.18s ease, filter 0.18s ease;
}
@media (hover: hover) {
  .brand-img:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
  }
}
.brand-img:active {
  transform: scale(0.94);
}

.user-btn {
  color: var(--primary);
  line-height: 1;
}
.user-btn:focus,
.user-btn:hover {
  color: var(--primary);
  opacity: 0.9;
}

.hamburger-btn {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
}
.hamburger {
  position: relative;
  width: 22px;
  height: 16px;
  display: inline-block;
}
.hamburger > span {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary);
  border-radius: 1px;
  transition: transform 0.25s ease, top 0.25s ease, opacity 0.2s ease;
}
.hamburger > span:nth-child(1) {
  top: 0;
}
.hamburger > span:nth-child(2) {
  top: 7px;
}
.hamburger > span:nth-child(3) {
  top: 14px;
}

.hamburger.active > span:nth-child(1) {
  top: 7px;
  transform: rotate(45deg);
}
.hamburger.active > span:nth-child(2) {
  opacity: 0;
  transform: translateX(6px);
}
.hamburger.active > span:nth-child(3) {
  top: 7px;
  transform: rotate(-45deg);
}

.nav-anim {
  position: relative;
  font-weight: 600;
  color: black;
  transition: color 0.2s ease;
}
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
.nav-anim:hover {
  color: var(--link);
}
.nav-anim:hover::after,
.nav-anim.router-link-active::after,
.nav-anim.router-link-exact-active::after {
  transform: scaleX(1);
}
.nav-anim.router-link-active,
.nav-anim.router-link-exact-active {
  color: var(--link);
}
</style>
