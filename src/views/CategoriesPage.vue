<template>
  <div class="container my-4">
    <h2 class="mb-4 text-center">Categories</h2>

    <div v-if="loading">
      <LoadingSpinner />
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="cat in categories" :key="cat.id" class="col">
        <CategoryCard :id="cat.id" :name="cat.name" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryCard from "../components/CategoryCard.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const API_URL = "https://opentdb.com/api_category.php";

export default {
  name: "CategoryPage",
  components: { CategoryCard, LoadingSpinner },
  data() {
    return {
      categories: [],
      loading: false,
      error: null,
    };
  },
  created() {
    // fetch categories when the compo is created
    this.fetchCategoriesWithDelay();
  },
  methods: {
    async fetchCategoriesWithDelay(retryCount = 3, delay = 1000) {
      this.loading = true;
      try {
        const response = await axios.get(`${API_URL}`);
        this.categories = response.data.trivia_categories;
      } catch (error) {
        if (error.response && error.response.status === 429 && retryCount > 0) {
          console.warn(
            `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
          );
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.fetchCategoriesWithDelay(retryCount - 1, delay * 2);
        }
        this.error = "Failed to fetch categories. Please try again later.";
        console.error("Failed to fetch categories:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
