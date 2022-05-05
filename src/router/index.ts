import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/Home.vue";
import AddView from "@/views/Add.vue";
import EditView from "@/views/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add",
      name: "add",
      component: AddView,
    },
    {
      path: "/edit/:id",
      name: "edit",
      props: true,
      component: EditView,
    },
  ],
});

export default router;
