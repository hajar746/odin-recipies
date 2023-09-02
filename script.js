"use strict";

// responsive nav
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav_links");

hamburger.addEventListener("click", function () {
  nav.classList.toggle("active");
});
