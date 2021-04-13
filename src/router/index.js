import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    component: () => import(/* webpackChunkName: "DestinationDetails" */ "@/views/DestinationDetails"),
    props: true,
    children: [
      {
        path: ":experienceSlug",
        name: "experienceDetails",
        component: () => import(/* webpackChunkName: "ExperienceDetails" */ "@/views/ExperienceDetails"),
        props: true,
      }
    ],
    beforeEnter: (to, from, next) => {
      const exists = store.destinations.find(
        destination => destination.slug === to.params.slug
      )
      if(exists){
        next()
      }
      else{
        next({name: "notFound"})
      }
    }
  },
  {
    path: "/404",
    alias: "*",
    name: "notFound",
    component: () => import(/* webpackChunkName: "NotFound" */ "@/views/NotFound"),
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
