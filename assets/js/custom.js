// add shadow on scroll feature 
window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  if (window.scrollY > 10) {
      header.classList.add('shadow-md');
  } else {
      header.classList.remove('shadow-md');
  }
});

// menu slider functions click on menu btn 
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuClose = document.getElementById("menu-close");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

menuClose.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  mobileMenu.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});
