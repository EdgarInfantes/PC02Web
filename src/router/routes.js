const routes = [
  {
    path: "/Movies",
    component: () => import("pages/Movies.vue"),
  },
  {
    path: "/",
    component: () => import("components/auth/LogIn.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
