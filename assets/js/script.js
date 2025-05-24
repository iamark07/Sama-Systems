//  Hero section typing animation

const texts = [
  "Converting Ideas into Reality",
  "IT Marketing",
  "Consultation Solution",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeEffect() {
  const currentText = texts[textIndex];
  const typingElement = document.getElementById("typing-text");

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingDelay = 2000; // Pause at the end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingDelay = 500; // Pause before starting new text
  }

  setTimeout(typeEffect, typingDelay);
}

// Start the typing animation when the page loads
window.addEventListener("load", typeEffect);

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

// Floating Labels Functions
function setupFloatingLabels() {
    const fields = document.querySelectorAll(
        ".landing_page_form_input input, .landing_page_form_input textarea, .landing_page_form_input select"
    );

    fields.forEach((field) => {
        const label = field.parentElement.querySelector("label");
        setupFieldLabelAnimation(field, label);
        setupInputRestrictions(field);
        setupRealTimeValidation(field);
        checkInitialLabelState(field, label);
    });
}

function setupFieldLabelAnimation(field, label) {
    field.addEventListener("focus", () => {
        if (label) label.classList.add("floating-label");
    });

    field.addEventListener("blur", () => {
        if (label && field.value.trim() === "") {
            label.classList.remove("floating-label");
        }
    });

    field.addEventListener("input", () => {
        if (label) {
            if (field.value.trim() !== "") {
                label.classList.add("floating-label");
            } else if (document.activeElement !== field) {
                label.classList.remove("floating-label");
            }
        }
    });
}

function setupInputRestrictions(field) {
    field.addEventListener("input", () => {
        if (field.id === "first_name_input") {
            field.value = field.value.replace(/[^A-Za-z\s]/g, "");
        }
        if (field.id === "mobile_input") {
            field.value = field.value.replace(/[^0-9]/g, "").slice(0, 10);
        }
    });
}

function setupRealTimeValidation(field) {
    field.addEventListener("input", () => {
        validateField(field);
    });
}

function checkInitialLabelState(field, label) {
    if (label && field.value.trim() !== "") {
        label.classList.add("floating-label");
    }
}

// Validation Functions
function getValidationRules() {
    return [
        {
            id: "first_name_input",
            min: 3,
            max: 60,
            regex: /^[A-Za-z\s]+$/,
            message: "Full Name must be 3–60 letters only.",
        },
        {
            id: "email_input",
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid Email Address.",
        },
        {
            id: "mobile_input",
            customValidation: (value) => {
                const isTen = value.length === 10;
                const startsWithValid = /^[6-9]/.test(value);
                if (!isTen && !startsWithValid)
                    return "Mobile must start with 6–9 and be 10 digits.";
                if (!isTen) return "Mobile must be 10 digits.";
                if (!startsWithValid) return "Mobile must start with 6–9.";
                return "";
            },
        },
        {
            id: "designation_input",
            min: 2,
            message: "Please enter your Designation.",
        },
        {
            id: "com_or_brand_input",
            min: 3,
            message: "Company or Brand must be at least 3 characters.",
        },
        {
            id: "massage_input",
            min: 10,
            message: "Please enter at least 10 characters.",
        },
        {
            id: "services_select",
            customValidation: (value) => {
                if (value === "" || value === null) return "Please select a service.";
                return "";
            },
        },
    ];
}

function validateField(field) {
    const validations = getValidationRules();
    const validation = validations.find((v) => v.id === field.id);
    if (!validation) return;

    const value = field.value.trim();
    let error = "";

    // First check if field is empty
    if (value === "") {
        error = "This field is required.";
    } else {
        // Then check other validations
        if (validation.min && value.length < validation.min)
            error = validation.message;
        else if (validation.max && value.length > validation.max)
            error = validation.message;
        else if (validation.regex && !validation.regex.test(value))
            error = validation.message;
        else if (validation.customValidation)
            error = validation.customValidation(value);
    }

    showFieldError(field, error);
}

function showFieldError(field, error) {
    // Remove existing error message
    const existingError = field.parentElement.querySelector(".error-message");
    if (existingError) existingError.remove();

    // If there's an error, show it
    if (error) {
        const errorElement = document.createElement("p");
        errorElement.className =
            "error-message text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1";
        errorElement.textContent = error;
        field.parentElement.appendChild(errorElement);
    }
}

// Form Submission Functions
function setupFormValidation() {
    const form = document.getElementById("landing_page_form");
    form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    let isValid = true;

    // Clear old errors
    clearAllErrors();

    // Validate all fields
    const validations = getValidationRules();
    validations.forEach((validation) => {
        const field = document.getElementById(validation.id);
        if (!field) return;

        const value = field.value.trim();
        let error = "";

        if (value === "") {
            error = "This field is required.";
        } else {
            if (validation.min && value.length < validation.min) error = validation.message;
            else if (validation.max && value.length > validation.max) error = validation.message;
            else if (validation.regex && !validation.regex.test(value)) error = validation.message;
            else if (validation.customValidation) error = validation.customValidation(value);
        }

        if (error) {
            isValid = false;
            showFieldError(field, error);
        }
    });

    if (isValid) {
        handleFormSuccess();
    }
}

function clearAllErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

function handleFormSuccess() {
    const form = document.getElementById("landing_page_form");
    form.reset();
    setupFloatingLabels();
    showSuccessAnimation();
}

function showSuccessAnimation() {
    const successDiv = document.getElementById("successAnimation");
    const hide_form = document.getElementById("hide_form");
    hide_form.classList.add("hidden");
    successDiv.classList.remove("hidden");
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    setupFloatingLabels();
    setupFormValidation();
});

// Function for slider 1
function initCarouselSlider1() {
  const carousel_slider_1 = document.getElementById("carousel_slider_1");
  if (!carousel_slider_1) return;

  const clone = carousel_slider_1.cloneNode(true);

  const wrapper = document.createElement("div");
  wrapper.id = "carousel_slider_1-container";
  wrapper.style.display = "flex";

  carousel_slider_1.parentNode.insertBefore(wrapper, carousel_slider_1);
  wrapper.appendChild(carousel_slider_1);
  wrapper.appendChild(clone);

  clone.classList.add("carousel_slider_1");
}

// Function for slider 2
function initCarouselSlider2() {
  const carousel_slider_2 = document.getElementById("carousel_slider_2");
  if (!carousel_slider_2) return;

  const clone = carousel_slider_2.cloneNode(true);

  const wrapper = document.createElement("div");
  wrapper.id = "carousel_slider_2-container";
  wrapper.style.display = "flex";

  carousel_slider_2.parentNode.insertBefore(wrapper, carousel_slider_2);
  wrapper.appendChild(carousel_slider_2);
  wrapper.appendChild(clone);

  clone.classList.add("carousel_slider_2");
}

// Call both functions when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  initCarouselSlider1();
  initCarouselSlider2();
});
