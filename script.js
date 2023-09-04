"use strict";

// responsive nav
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav_links");

hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// sticky nav (using intersection observer API)
// selecting header & nav
const headerNav = document.querySelector("header");
const nav = document.querySelector(".nav");
// add sticky class when the header is not intersecting the viewport
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserve = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
// selecting the element to be observed (the header navbar)
headerObserve.observe(headerNav);
