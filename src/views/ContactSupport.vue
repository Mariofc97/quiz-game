<template>
  <div class="container my-4">
    <div class="rounded-3 p-4 p-md-5 text-white hero-gradient mb-4">
      <h1 class="mt-2 mb-0 fw-bold">Submit a request</h1>
      <p class="mb-0">
        Our support team is happy to help. We usually respond within one
        business day.
      </p>
    </div>

    <div class="card shadow-sm mb-4">
      <button
        class="btn contact-toggle d-flex w-100 align-items-center p-3"
        @click="open = !open"
        :aria-expanded="open"
      >
        <div class="customerservice-container">
          <img
            src="../assets/customerservice.png"
            alt="customer service icon"
            class="customerservice-icon"
          />
        </div>
        <span class="fw-semibold me-auto">Contact our support team</span>
        <i class="bi" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
      </button>

      <transition name="fade">
        <div v-if="open" class="border-top p-3 p-md-4">
          <form @submit.prevent="onSubmit" novalidate>
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Your email address *</label>
                <input
                  type="email"
                  class="form-control"
                  v-model.trim="form.email"
                  required
                />
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label">What is your inquiry about? *</label>
                <select class="form-select" v-model="form.category" required>
                  <option disabled value="">Select…</option>
                  <option>Login issues</option>
                  <option>Quizzes not loading</option>
                  <option>Results not saving</option>
                  <option>Plan change problems</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label">Subject *</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.trim="form.subject"
                  required
                />
              </div>

              <div class="col-12">
                <label class="form-label">Description *</label>
                <textarea
                  class="form-control"
                  rows="6"
                  v-model.trim="form.description"
                  required
                  placeholder="Explain your issue. If there’s an error message, paste it here."
                ></textarea>
              </div>
              <div class="col-12 d-flex align-items-center gap-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="consent"
                  v-model="form.consent"
                />
                <label class="form-check-label" for="consent">
                  I agree to be contacted about this request.
                </label>
              </div>

              <div class="col-12 mt-2">
                <button
                  class="btn btn-primary px-4"
                  type="submit"
                  :disabled="loading"
                >
                  <span v-if="!loading">Submit request</span>
                  <span v-else class="d-inline-flex align-items-center gap-2">
                    <span class="spinner-border spinner-border-sm"></span>
                    Sending…
                  </span>
                </button>
                <span v-if="sent" class="ms-3 text-success fw-semibold">
                  Request sent! We’ll get back to you soon.
                </span>
                <span v-if="error" class="ms-3 text-danger">
                  {{ error }}
                </span>
              </div>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import emailjs from "@emailjs/browser";

export default {
  name: "ContactSupport",
  data() {
    const logged = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    return {
      open: true,
      loading: false,
      sent: false,
      error: "",
      form: {
        email: logged?.email || "",
        username: logged?.username || "",
        category: "",
        subject: "",
        description: "",
        consent: true,
      },
    };
  },
  methods: {
    async onSubmit() {
      this.error = "";
      this.sent = false;
      if (
        !this.form.email ||
        !this.form.category ||
        !this.form.subject ||
        !this.form.description
      ) {
        this.error = "Please complete all required fields.";
        return;
      }
      this.loading = true;

      try {
        const serviceId = "service_djmmv6t";
        const templateId = "template_hyonkjy";
        const publicKey = "1C4b0BTtS4j3t-J40";

        const params = {
          to_email: "ferroncanomario@gmail.com",
          subject: this.form.subject,
          message: this.form.description,
          from_email: this.form.email,
          reply_to: this.form.email,
          name: this.form.username,
          username: this.form.username,
          category: this.form.category,
          created_at: new Date().toLocaleString(),
        };

        await emailjs.send(serviceId, templateId, params, { publicKey });
        this.sent = true;
        this.form.subject = "";
        this.form.description = "";
      } catch (err) {
        this.error = "Could not send your request. Please try again.";
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.hero-gradient {
  background: var(--primary);
}

.contact-toggle {
  background: #fff;
  border: 0;
  text-align: left;
}
.customerservice-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.customerservice-icon {
  width: 50px;
  height: 50px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
