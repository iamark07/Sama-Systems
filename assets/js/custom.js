
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
