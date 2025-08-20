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
  { path: "/result", name: "result", component: ResultPage },
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
  const loggedIn = localStorage.getItem("loggedInUser");

  if (loggedIn && (to.name === "login" || to.name === "register")) {
    alert("You must log out in your profile");
    return false;
  }

  // to protect the private pages in there is no session and no public return to home with a alert
  const publicPages = ["home", "login", "register"];
  const isPublic = publicPages.includes(to.name);
  if (!isPublic && !loggedIn) {
    alert("You must log in to access this page");
    return { name: "home" };
  }
});

export default router;
