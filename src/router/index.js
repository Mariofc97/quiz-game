import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CategoriesPage from "../views/CategoriesPage.vue";
import QuizPage from "../views/QuizPage.vue";
import ResultPage from "../views/ResultPage.vue";
import ProfilePage from "../views/ProfilePage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/categories", name: "categories", component: CategoriesPage },
  { path: "/categories/:id", name: "quiz", component: QuizPage },
  { path: "/results", name: "results", component: ResultPage },
  { path: "/profile", name: "profile", component: ProfilePage },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/register", name: "register", component: RegisterPage },
];

const router = createRouter({
  // to define what component is gonna show each URL and to redirect to index.html
  history: createWebHistory(), // this is to use the cleans URL '/categories/id'
  routes,
});

router.beforeEach((to) => {
  // protect the access of routes, login for every page less home
  const publicPages = ["home", "login", "register"];
  const isPublic = publicPages.includes(to.name);
  const loggedIn = localStorage.getItem("loggedInUser");
  if (!isPublic && !loggedIn) return { name: "home" };
});

export default router;
