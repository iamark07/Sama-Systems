// stats and achivment section count feature
const counters = document.querySelectorAll(".count");
let hasCounted = false;

const animateCount = () => {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    const updateCount = () => {
      const current = +counter.innerText.replace(/\D/g, "");
      const increment = target / 100;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment) + suffix;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + suffix;
      }
    };
    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasCounted) {
        animateCount();
        hasCounted = true;
        observer.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(document.querySelector("#stats"));
