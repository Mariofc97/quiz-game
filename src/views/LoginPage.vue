<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-5 col-md-7 mx-auto">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white text-center">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
              <input
                class="form-control mb-2"
                placeholder="Username"
                v-model="loginForm.username"
              />
              <input
                class="form-control mb-3"
                type="password"
                placeholder="Password"
                v-model="loginForm.password"
              />
              <button class="btn btn-success w-100">
                <i class="bi bi-box-arrow-in-right"></i> Login
              </button>
            </form>
          </div>
        </div>

        <p class="text-center mt-3">
          Don't have an account?
          <RouterLink to="/register">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </div>
  <div class="text-center d-none d-md-block mt-4">
    <img :src="banner" class="img-fluid hero-img" alt="Quiz Games banner" />
  </div>
</template>

<script>
import banner from "../assets/banner.png";
export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      banner,
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) this.$router.push("/profile"); // check for user and redirects to profile.
  },
  methods: {
    login() {
      const users = JSON.parse(localStorage.getItem("users") || "[]"); // will get user from storage
      const user = users.find(
        (u) =>
          u.username === this.loginForm.username &&
          u.password === this.loginForm.password
      );
      if (user) {
        // if user was found
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        this.$router.push("/profile");
      } else {
        // if user auth fails
        alert("Invalid username or password");
      }
    },
  },
};
</script>
