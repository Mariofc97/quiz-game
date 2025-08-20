<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-5 col-md-7 mx-auto">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white text-center">
            Register
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <input
                class="form-control mb-2"
                placeholder="Name"
                v-model="registerForm.name"
              />
              <input
                class="form-control mb-2"
                placeholder="Username"
                v-model="registerForm.username"
              />

              <div class="input-group mb-2">
                <select
                  v-model="registerForm.countryCode"
                  class="form-select"
                  style="max-width: 170px"
                >
                  <option v-for="p in prefixes" :key="p.value" :value="p.value">
                    {{ p.value }} — {{ p.name }}
                  </option>
                </select>
                <input
                  v-model="registerForm.phoneNumber"
                  class="form-control"
                  inputmode="tel"
                  pattern="[0-9]{6,15}"
                  minlength="6"
                  maxlength="15"
                  required
                  placeholder="Phone Number"
                />
              </div>

              <div class="mb-2">
                <label class="form-label">Plan</label>
                <select v-model="registerForm.plan" class="form-select">
                  <option value="basic">Basic Plan</option>
                  <option value="pro">Pro Plan</option>
                </select>
              </div>

              <input
                class="form-control mb-2"
                placeholder="Email"
                v-model="registerForm.email"
              />
              <input
                class="form-control mb-3"
                type="password"
                placeholder="Password"
                v-model="registerForm.password"
              />
              <button class="btn btn-primary w-100">
                <i class="bi bi-person-plus"></i> Register
              </button>
            </form>
          </div>
        </div>

        <p class="text-center mt-3">
          Already have an account? <RouterLink to="/login">Login</RouterLink>
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
  name: "RegisterPage",
  data() {
    return {
      registerForm: {
        name: "",
        username: "",
        countryCode: "+34",
        phoneNumber: "",
        email: "",
        password: "",
        plan: "basic",
      },
      prefixes: [
        { value: "+34", name: "Spain" },
        { value: "+44", name: "U.K." },
        { value: "+1", name: "USA/CAN" },
        { value: "+49", name: "Germany" },
      ],
      banner,
    };
  },
  created() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) this.$router.push("/profile"); // check for user and redirects to profile.
  },
  methods: {
    register() {
      const user = { ...this.registerForm }; // referral to the form user

      const num = this.registerForm.phoneNumber;
      if (!num) return alert("Phone is required, you can only write numbers!");

      // set the final phone, create a field phone, and delete the country and phoneNumber field.
      user.phone = `${this.registerForm.countryCode}${num}`;
      delete user.countryCode;
      delete user.phoneNumber;

      user.scores = []; // results history
      user.quizzesUsed = 0; // quizzes counter

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((u) => u.username === user.username)) {
        return alert("Username already");
      }
      users.push(user); // push user to save it into storage
      localStorage.setItem("users", JSON.stringify(users));
      alert("You completed your registration. Please log in.");

      // reset the form (must include the same fields the template v-models use)
      this.registerForm = {
        name: "",
        username: "",
        countryCode: "+34",
        phoneNumber: "",
        email: "",
        password: "",
        plan: "basic",
      };
    },
  },
};
</script>
