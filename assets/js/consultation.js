document.addEventListener("DOMContentLoaded", function () {
  const consultationFields = document.querySelectorAll(
    ".consultation_page_form_input input, .consultation_page_form_input textarea, .consultation_page_form_input select"
  );

  consultationFields.forEach((field) => {
    const label = field.parentElement.querySelector("label");

    // Label animation
    field.addEventListener("focus", () => {
      if (label) label.classList.add("consultation_form_floating_label");
    });

    field.addEventListener("blur", () => {
      if (label && field.value.trim() === "") {
        label.classList.remove("consultation_form_floating_label");
      }
    });

    field.addEventListener("input", () => {
      if (label) {
        if (field.value.trim() !== "") {
          label.classList.add("consultation_form_floating_label");
        } else if (document.activeElement !== field) {
          label.classList.remove("consultation_form_floating_label");
        }
      }

      // Input restrictions
      if (field.id === "first_name_input") {
        field.value = field.value.replace(/[^A-Za-z\s]/g, ""); // Only letters & spaces
      }
      if (field.id === "mobile_input") {
        field.value = field.value.replace(/[^0-9]/g, "").slice(0, 10);
      }

      // Real-time validation
      validateField(field);
    });

    // Initial check (if value pre-filled)
    if (label && field.value.trim() !== "") {
      label.classList.add("consultation_form_floating_label");
    }
  });

  // Function to validate a single field
  function validateField(field) {
    const validations = [
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
        id: "project_type",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a project type.";
          return "";
        },
      },
      {
        id: "designation_input",
        min: 2,
        message: "Please enter your Designation.",
      },
      {
        id: "budget_select",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a budget range.";
          return "";
        },
      },
      {
        id: "timeline_select",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a timeline.";
          return "";
        },
      },
      {
        id: "requirement_type",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select your requirement type.";
          return "";
        },
      },
      {
        id: "com_or_brand_input",
        min: 3,
        message: "Company or Brand must be at least 3 characters.",
      },
      {
        id: "message_input",
        min: 10,
        message: "Please enter at least 10 characters.",
      },
    ];

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

    // Remove existing error message
    const existingError = field.parentElement.querySelector(
      ".consultation-error-message"
    );
    if (existingError) existingError.remove();

    // If there's an error, show it
    if (error) {
      const errorElement = document.createElement("p");
      errorElement.className =
        "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
      errorElement.textContent = error;
      field.parentElement.appendChild(errorElement);
    }
  }

  // Form validation on submit
  const consultationForm = document.getElementById("consultation_page_form");

  consultationForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop default form submit
    let isValidConsultationForm = true;

    // Clear old errors
    document
      .querySelectorAll(".consultation-error-message")
      .forEach((el) => el.remove());

    const consultationValidations = [
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
        id: "project_type",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a project type.";
          return "";
        },
      },
      {
        id: "designation_input",
        min: 2,
        message: "Please enter your Designation.",
      },
      {
        id: "budget_select",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a budget range.";
          return "";
        },
      },
      {
        id: "timeline_select",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select a timeline.";
          return "";
        },
      },
      {
        id: "requirement_type",
        customValidation: (value) => {
          if (value === "" || value === null)
            return "Please select your requirement type.";
          return "";
        },
      },
      {
        id: "com_or_brand_input",
        min: 3,
        message: "Company or Brand must be at least 3 characters.",
      },
      {
        id: "message_input",
        min: 10,
        message: "Please enter at least 10 characters.",
      },
    ];

    consultationValidations.forEach(
      ({ id, min, max, regex, message, customValidation }) => {
        const input = document.getElementById(id);
        if (!input) return; // Skip if input not found

        const value = input.value.trim();
        const label = input.parentElement.querySelector("label");

        if (value === "") {
          isValidConsultationForm = false;
          const error = document.createElement("p");
          error.className =
            "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
          error.textContent = "This field is required.";
          input.parentElement.appendChild(error);
        } else if (customValidation) {
          const errorMessage = customValidation(value);
          if (errorMessage) {
            isValidConsultationForm = false;
            const error = document.createElement("p");
            error.className =
              "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
            error.textContent = errorMessage;
            input.parentElement.appendChild(error);
          }
        } else if (min && value.length < min) {
          isValidConsultationForm = false;
          const error = document.createElement("p");
          error.className =
            "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
          error.textContent = message;
          input.parentElement.appendChild(error);
        } else if (max && value.length > max) {
          isValidConsultationForm = false;
          const error = document.createElement("p");
          error.className =
            "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
          error.textContent = message;
          input.parentElement.appendChild(error);
        } else if (regex && !regex.test(value)) {
          isValidConsultationForm = false;
          const error = document.createElement("p");
          error.className =
            "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 !text-[10px] mt-1 consultation-error-message";
          error.textContent = message;
          input.parentElement.appendChild(error);
        }
      }
    );

    if (isValidConsultationForm) {
      // Show success message
      const successMsg = document.createElement("p");
      successMsg.className =
        "text-green-400 text-sm py-5 font-medium consultation-success-msg";
      successMsg.textContent = "Form submitted successfully!";
      consultationForm
        .querySelector("button")
        .insertAdjacentElement("beforebegin", successMsg);

      consultationForm.reset();

      // Reset labels
      consultationFields.forEach((field) => {
        const label = field.parentElement.querySelector("label");
        if (label) label.classList.remove("consultation_form_floating_label");
      });
    }
  });
});
