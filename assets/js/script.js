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

// landing page form label animation features 
document.addEventListener("DOMContentLoaded", function () {
  const fields = document.querySelectorAll(
    ".landing_page_form_input input, .landing_page_form_input textarea"
  );

  fields.forEach((field) => {
    const label = field.parentElement.querySelector("label");

    field.addEventListener("focus", () => {
      label.classList.add("floating-label");
    });

    field.addEventListener("blur", () => {
      if (field.value.trim() === "") {
        label.classList.remove("floating-label");
      }
    });

    field.addEventListener("input", () => {
      if (field.value.trim() !== "") {
        label.classList.add("floating-label");
      } else if (document.activeElement !== field) {
        label.classList.remove("floating-label");
      }
    });

    if (field.value.trim() !== "") {
      label.classList.add("floating-label");
    }
  });
});
