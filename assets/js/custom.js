// add shadow on scroll feature

window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  const logo = document.getElementById("site-logo");
  const isScrolled200 = window.scrollY > 200;
  const isScrolled150 = window.scrollY > 150;
  const isScrolled1 = window.scrollY <= 1;
  const isDesktop = window.innerWidth >= 768;

  if (isScrolled1) {
    header.classList.remove("py-5");
    header.classList.add("py-7");
    header.classList.remove("-top-[110px]");
    header.classList.add("-top-[0px]");
    header.classList.remove("sticky", "-top-[0px]");
  } else{
    if (isDesktop) {
      logo.classList.add("md:w-32");
      logo.classList.remove("w-28");
    }
  }

  if (isScrolled150) {
    header.classList.add("sticky", "-top-[110px]");
  }

  if (isScrolled200) {
    header.classList.remove("py-7", "-top-[110px]");
    header.classList.add("py-5", "-top-[0px]", "shadow-md");
    if (isDesktop) {
      logo.classList.remove("md:w-32");
      logo.classList.add("w-28");
    }
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
