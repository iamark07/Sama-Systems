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




// landing page form label animation features and form validation
document.addEventListener("DOMContentLoaded", function () {
  const fields = document.querySelectorAll(
    ".landing_page_form_input input, .landing_page_form_input textarea"
  );

  fields.forEach((field) => {
    const label = field.parentElement.querySelector("label");

    // Label animation
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

      // Input restrictions
      if (field.id === "first_name_input" || field.id === "last_name_input") {
        field.value = field.value.replace(/[^A-Za-z\s]/g, "");
      }

      if (field.id === "mobile_input") {
        field.value = field.value.replace(/[^0-9]/g, "").slice(0, 10);
      }
    });

    if (field.value.trim() !== "") {
      label.classList.add("floating-label");
    }
  });

  const form = document.getElementById("landing_page_form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    fields.forEach((field) => {
      field.classList.remove("border-red-500");
      const label = field.parentElement.querySelector("label");
      label.classList.remove("text-red-500");
    });

    const validations = [
      {
        id: "first_name_input",
        min: 3,
        max: 60,
        regex: /^[A-Za-z\s]+$/,
        message: "First Name must be 3–60 letters only.",
      },
      {
        id: "last_name_input",
        min: 3,
        max: 60,
        regex: /^[A-Za-z\s]+$/,
        message: "Last Name must be 3–60 letters only.",
      },
      {
        id: "email_input",
        min: 3,
        max: 60,
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid Email Address (3–60 characters).",
      },
      {
        id: "mobile_input",
        min: 10,
        max: 10,
        customValidation: function (value) {
          const isTenDigits = value.length === 10;
          const startsWithValidDigit = /^[6-9]/.test(value);
          if (!isTenDigits && !startsWithValidDigit) {
            return "Mobile Number must start with 6-9 and be exactly 10 digits.";
          } else if (!isTenDigits) {
            return "Mobile Number must be exactly 10 digits.";
          } else if (!startsWithValidDigit) {
            return "Mobile Number must start with 6-9.";
          }
          return "";
        },
      },
      {
        id: "com_or_brand_input",
        min: 3,
        max: 60,
        regex: /^[A-Za-z0-9\s]+$/,
        message: "Company/Brand must be 3–60 characters.",
      },
      {
        id: "massage_input",
        min: 10,
        max: 1000,
        regex: /^.{10,}$/,
        message: "Message must be at least 10 characters.",
      },
    ];

    validations.forEach(
      ({ id, min, max, regex, message, customValidation }) => {
        const input = document.getElementById(id);
        const value = input.value.trim();
        const label = input.parentElement.querySelector("label");

        if (value === "") {
          isValid = false;
          input.classList.add("border-red-500");
          label.classList.add("text-red-500");

          const error = document.createElement("p");
          error.className = "text-red-500 text-sm mt-1 error-message";
          error.textContent = "This field is required.";
          input.parentElement.appendChild(error);
        } else {
          let errorText = "";

          if (customValidation) {
            errorText = customValidation(value);
          } else if (
            value.length < min ||
            value.length > max ||
            !regex.test(value)
          ) {
            errorText = message;
          }

          if (errorText !== "") {
            isValid = false;
            input.classList.add("border-red-500");
            label.classList.add("text-red-500");

            const error = document.createElement("p");
            error.className = "text-red-500 text-sm mt-1 error-message";
            error.textContent = errorText;
            input.parentElement.appendChild(error);
          }
        }
      }
    );

    if (isValid) {
      const successMsg = document.createElement("p");
      successMsg.className = "text-green-400 text-sm py-5 font-medium";
      successMsg.textContent = "Form submitted successfully!";
      form
        .querySelector("button")
        .insertAdjacentElement("beforebegin", successMsg);

      form.reset();

      fields.forEach((field) => {
        const label = field.parentElement.querySelector("label");
        label.classList.remove("floating-label");
      });

      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
  });
});
