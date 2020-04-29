import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home";
import BookCard from "../components/BookCard";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/card",
      name: "bookcard",
      component: BookCard
    }
  ]
});
