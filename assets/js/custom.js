// header menu slider features

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuOverlay = document.getElementById("menu-overlay");

// Toggle menu open/close
function toggleMenu() {
  if (mobileMenu.classList.contains("-left-full")) {
    mobileMenu.classList.remove("-left-full");
    mobileMenu.classList.add("left-0");
  } else {
    mobileMenu.classList.remove("left-0");
    mobileMenu.classList.add("-left-full");
  }
}

menuBtn.addEventListener("click", toggleMenu);
menuOverlay.addEventListener("click", toggleMenu);

// header size small when screen scroll
const header = document.getElementById("header-content");
const logo = document.getElementById("logo-img");

window.addEventListener("scroll", function () {
  if (window.scrollY > 150) {
    header.classList.remove("py-7");
    header.classList.add("py-4");
    logo.classList.remove("w-36");
    logo.classList.add("w-28");
  } else {
    header.classList.remove("py-4");
    header.classList.add("py-7");
    logo.classList.remove("w-28");
    logo.classList.add("w-36");
  }
});
