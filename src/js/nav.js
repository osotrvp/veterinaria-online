/* nav.js — Navbar hamburger y scroll */

(function () {
  "use strict";

  const toggle = document.getElementById("navToggle");
  const menu   = document.getElementById("navMenu");
  const navbar = document.getElementById("navbar");

  /* Hamburger */
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    menu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Navbar compacto al hacer scroll */
  if (navbar) {
    window.addEventListener("scroll", function () {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
  }

  /* Enlace activo según sección visible */
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link[href^='#']");

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (section) { observer.observe(section); });

})();