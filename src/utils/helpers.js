export const scrollTo = function (element) {
  const el = document.querySelector(element);
  el.scrollIntoView({
    behavior: 'smooth'
  });
};

export default {
  scrollTo
};