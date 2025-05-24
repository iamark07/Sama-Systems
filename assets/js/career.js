document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("careerForm");
  const fields = {
    full_name: {
      minLength: 3,
      maxLength: 60,
      pattern: /^[a-zA-Z\s]*$/,
      errorMessages: {
        required: "This field is required",
        minLength: "Name must be at least 3 characters",
        maxLength: "Name cannot exceed 60 characters",
        pattern: "Name can only contain letters and spaces",
      },
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessages: {
        required: "This field is required",
        pattern: "Please enter a valid email address",
      },
    },
    phone: {
      pattern: /^[6-9][0-9]{9}$/,
      errorMessages: {
        required: "This field is required",
        pattern: "Please enter a valid 10-digit number starting with 6 to 9",
      },
    },
    position: {
      errorMessages: {
        required: "Please select a position",
      },
    },
    resume: {
      errorMessages: {
        required: "Please upload your resume",
        fileType: "Only PDF files are allowed",
      },
    },
  };

  // Setup floating labels
  const formInputs = document.querySelectorAll(
    ".career_page_form_input input, .career_page_form_input select"
  );

  formInputs.forEach((field) => {
    const label = field.parentElement.querySelector("label");

    // Prevent numbers in full name and handle max length
    if (field.name === "full_name") {
      field.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[0-9]/g, "");
        if (e.target.value.length > 60) {
          e.target.value = e.target.value.slice(0, 60);
        }
      });
    }

    // Prevent letters in phone number and handle max length
    if (field.name === "phone") {
      field.addEventListener("input", (e) => {
        // Only allow numbers
        e.target.value = e.target.value.replace(/[^0-9]/g, "");

        // Limit to 10 digits
        if (e.target.value.length > 10) {
          e.target.value = e.target.value.slice(0, 10);
        }
      });
    }

    field.addEventListener("focus", () => {
      if (label) label.classList.add("career-floating-label");
    });

    field.addEventListener("blur", () => {
      if (label && field.value.trim() === "") {
        label.classList.remove("career-floating-label");
      }
      // Validate on blur for select and file inputs
      if (field.name === "position" || field.name === "resume") {
        validateField(field.name, field);
      }
    });

    // Initial check
    if (label && field.value.trim() !== "") {
      label.classList.add("career-floating-label");
    }
  });

  // File input handling
  const fileInput = document.getElementById("resume_input");
  const fileName = document.getElementById("file_name");
  const fileErrorElement = fileInput.parentElement.parentElement.querySelector(
    ".career-error-message"
  );

  // Remove initial validation
  if (fileErrorElement) {
    fileErrorElement.textContent = "";
  }

  fileInput.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const file = this.files[0];
      if (file.type === "application/pdf") {
        fileName.textContent = file.name;
        if (fileErrorElement) {
          fileErrorElement.textContent = "";
          fileErrorElement.className = "career-error-message mt-12";
        }
      } else {
        fileName.textContent = "";
        this.value = ""; // Clear the file input
        if (fileErrorElement) {
          fileErrorElement.textContent = fields.resume.errorMessages.fileType;
          fileErrorElement.className =
            "career-error-message mt-12 text-red-500 !text-[10px]";
        }
      }
    } else {
      fileName.textContent = "";
      if (fileErrorElement) {
        fileErrorElement.textContent = fields.resume.errorMessages.required;
        fileErrorElement.className =
          "career-error-message mt-12 text-red-500 !text-[10px]";
      }
    }
  });

  // Add click event to file input label to trigger validation
  const fileLabel = document.querySelector('label[for="resume_input"]');
  if (fileLabel) {
    fileLabel.addEventListener("click", () => {
      if (!fileInput.files || fileInput.files.length === 0) {
        if (fileErrorElement) {
          fileErrorElement.textContent = fields.resume.errorMessages.required;
          fileErrorElement.className =
            "career-error-message mt-12 text-red-500 !text-[10px]";
        }
      }
    });
  }

  // Add change event listener for select
  const positionSelect = document.getElementById("position_select");
  positionSelect.addEventListener("change", function () {
    validateField("position", this);
  });

  // Real-time validation
  formInputs.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field.name, field);
    });
    field.addEventListener("blur", () => {
      validateField(field.name, field);
    });
  });

  function validateField(fieldName, field) {
    const rules = fields[fieldName];
    let errorElement;

    // Special handling for file input
    if (fieldName === "resume") {
      errorElement = field.parentElement.parentElement.querySelector(
        ".career-error-message"
      );
    } else {
      errorElement = field.parentElement.querySelector(".career-error-message");
    }

    let isValid = true;
    let errorMessage = "";

    // Special handling for file input
    if (fieldName === "resume") {
      if (!field.files || field.files.length === 0) {
        isValid = false;
        errorMessage = rules.errorMessages.required;
      } else if (field.files[0].type !== "application/pdf") {
        isValid = false;
        errorMessage = rules.errorMessages.fileType;
      }
    } else {
      // Check if field is empty
      if (!field.value.trim()) {
        isValid = false;
        errorMessage = rules.errorMessages.required;
      } else {
        // Check other validation rules
        if (rules.minLength && field.value.length < rules.minLength) {
          isValid = false;
          errorMessage = rules.errorMessages.minLength;
        } else if (rules.maxLength && field.value.length > rules.maxLength) {
          isValid = false;
          errorMessage = rules.errorMessages.maxLength;
        } else if (rules.pattern && !rules.pattern.test(field.value)) {
          isValid = false;
          errorMessage = rules.errorMessages.pattern;
        }

        // Special handling for phone number
        if (fieldName === "phone" && field.value.length === 10) {
          const firstDigit = parseInt(field.value[0]);
          if (firstDigit < 6 || firstDigit > 9) {
            isValid = false;
            errorMessage = rules.errorMessages.pattern;
          }
        }
      }
    }

    // Special handling for select
    if (fieldName === "position") {
      if (field.value === "" || field.value === null) {
        isValid = false;
        errorMessage = rules.errorMessages.required;
      }
    }

    // Update error message
    if (errorElement) {
      errorElement.textContent = isValid ? "" : errorMessage;
      if (fieldName === "resume") {
        errorElement.className = isValid
          ? "career-error-message mt-12"
          : "career-error-message mt-12 text-red-500 !text-[10px]";
      } else {
        errorElement.className = isValid
          ? "career-error-message"
          : "career-error-message text-red-500 !text-[10px] mt-1";
      }
    }

    return isValid;
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isFormValid = true;

    // Validate all fields
    Object.keys(fields).forEach((fieldName) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field && !validateField(fieldName, field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Hide the form
      const popup_career_form = document.querySelector(".popup_career_form");
      if (popup_career_form) {
        popup_career_form.classList.add("hidden");
      }

      // Show success message
      const successMsg = document.getElementById("successMsg");
      if (successMsg) {
        successMsg.classList.remove("hidden");
        successMsg.classList.add("flex");
      }

      // Reset form
      form.reset();
      // Reset floating labels
      formInputs.forEach((field) => {
        const label = field.parentElement.querySelector("label");
        if (label) label.classList.remove("career-floating-label");
      });
      fileName.textContent = "";
    }
  });
});
