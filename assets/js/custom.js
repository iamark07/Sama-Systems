// add shadow on scroll feature

window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  const logo = document.getElementById("site-logo");
  const isScrolled = window.scrollY > 10;
  const isDesktop = window.innerWidth >= 768;

  if (isScrolled) {
    header.classList.remove("py-6");
    header.classList.add("py-4");

    // Replace gradient classes (transparent ➜ #001633)
    header.classList.remove(
      "bg-[linear-gradient(to_right,_white_0%,_transparent_80%,_transparent_100%)]",
      "md:bg-[linear-gradient(to_right,_white_0%,_transparent_50%,_transparent_100%)]",
      "lg:bg-[linear-gradient(to_right,_white_0%,_white_15%,_transparent_30%,_transparent_50%,_transparent_75%,_transparent_100%)]"
    );

    header.classList.add(
      "bg-[linear-gradient(to_right,_white_0%,_rgba(0,22,51,0.7)_80%,_rgba(0,22,51,0.7)_100%)]",
      "md:bg-[linear-gradient(to_right,_white_0%,_rgba(0,22,51,0.7)_50%,_rgba(0,22,51,0.7)_100%)]",
      "lg:bg-[linear-gradient(to_right,_white_0%,_white_15%,_rgba(0,22,51,0.7)_30%,_rgba(0,22,51,0.7)_50%,_rgba(0,22,51,0.7)_75%,_rgba(0,22,51,0.7)_100%)]"
    );

    if (isDesktop) {
      header.classList.add("shadow-md", "bg-opacity-95", "backdrop-blur-xl");
      logo.classList.remove("md:w-32");
      logo.classList.add("w-24");
    } else {
      header.classList.add("shadow-md");
    }

  } else {
    header.classList.remove("py-4");
    header.classList.add("py-6");

    // Revert gradient back to transparent
    header.classList.remove(
      "bg-[linear-gradient(to_right,_white_0%,_rgba(0,22,51,0.7)_80%,_rgba(0,22,51,0.7)_100%)]",
      "md:bg-[linear-gradient(to_right,_white_0%,_rgba(0,22,51,0.7)_50%,_rgba(0,22,51,0.7)_100%)]",
      "lg:bg-[linear-gradient(to_right,_white_0%,_white_15%,_rgba(0,22,51,0.7)_30%,_rgba(0,22,51,0.7)_50%,_rgba(0,22,51,0.7)_75%,_rgba(0,22,51,0.7)_100%)]"
    );

    header.classList.add(
      "bg-[linear-gradient(to_right,_white_0%,_transparent_80%,_transparent_100%)]",
      "md:bg-[linear-gradient(to_right,_white_0%,_transparent_50%,_transparent_100%)]",
      "lg:bg-[linear-gradient(to_right,_white_0%,_white_15%,_transparent_30%,_transparent_50%,_transparent_75%,_transparent_100%)]"
    );

    if (isDesktop) {
      header.classList.remove("shadow-md", "bg-opacity-95", "backdrop-blur-xl");
      logo.classList.remove("w-24");
      logo.classList.add("md:w-32");
    } else {
      header.classList.remove("shadow-md");
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
