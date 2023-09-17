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

// slider component
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slide-btn--right");
  const btnLeft = document.querySelector(".slide-btn--left");

  // setting current slide to 0
  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  // function to go change transform style of slides when arrows are pressed
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${600 * (i - slide)}%)`)
    );
  };

  // function to go to next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // function to go to previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // function for creating a dot for each slide
  const dotsContainer = document.querySelector(".dots");
  const createDots = function () {
    slides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot" data-slide='${i}'></button>`
      );
    });
  };

  // change color of dot when active
  const activateDot = function (slide) {
    // removing all active classes
    document
      .querySelectorAll(".dots-dot")
      .forEach((dot) => dot.classList.remove("dots-dot--active"));
    // adding active class
    document
      .querySelector(`.dots-dot[data-slide='${slide}']`)
      .classList.add("dots-dot--active");
  };

  // initialization function
  const init = function () {
    // set original position of slides
    goToSlide(0);
    // create dots
    createDots();
    // activate first dot
    activateDot(0);
  };
  init();

  // Event handlers
  // go to next and previous slides
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // sliding using dots
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots-dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};

slider();

// Revealing sections on scroll
const sections = document.querySelectorAll(".section");
//removing hidden class from sections
const revealSec = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    else entry.target.classList.remove("section--hidden");
    // stop observing sections after they are revealed
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSec, {
  root: null,
  threshold: 0.1,
});
// observing each section and hiding it
sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
