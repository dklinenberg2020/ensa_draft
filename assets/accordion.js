document.addEventListener("DOMContentLoaded", function () {
  var triggers = document.querySelectorAll(".acc-trigger");
  if (!triggers.length) return;

  triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach(function (t) {
        t.setAttribute("aria-expanded", "false");
        var p = document.getElementById(t.getAttribute("aria-controls"));
        if (p) p.hidden = true;
      });

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        requestAnimationFrame(function () {
          trigger.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    });
  });
});
