document.addEventListener("DOMContentLoaded", function () {
  var carousel = document.getElementById("paper-carousel");
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
  var dots = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-dot"));
  var prevBtn = carousel.querySelector(".carousel-btn.prev");
  var nextBtn = carousel.querySelector(".carousel-btn.next");
  if (!slides.length) return;

  var current = 0;
  var AUTO_ADVANCE_MS = 6000;
  var timer = null;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      var active = i === current;
      slide.hidden = !active;
      slide.setAttribute("aria-hidden", active ? "false" : "true");
    });
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
    });
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startAuto() {
    if (reduceMotion) return;
    stopAuto();
    timer = window.setInterval(next, AUTO_ADVANCE_MS);
  }
  function stopAuto() {
    if (timer) { window.clearInterval(timer); timer = null; }
  }
  function restartAuto() { stopAuto(); startAuto(); }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restartAuto(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restartAuto(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () { show(i); restartAuto(); });
  });

  carousel.addEventListener("mouseenter", stopAuto);
  carousel.addEventListener("mouseleave", startAuto);
  carousel.addEventListener("focusin", stopAuto);
  carousel.addEventListener("focusout", startAuto);

  show(0);
  startAuto();
});
