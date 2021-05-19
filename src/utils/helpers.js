import Vue from 'vue';

export const scrollTo = function (element) {
  const el = document.querySelector(element);
  el.scrollIntoView({
    behavior: 'smooth'
  });
};

export const EventBus = new Vue();

export default {
  scrollTo
};
