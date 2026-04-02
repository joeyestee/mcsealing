(function () {
  let headerInitialized = false;

  function initHeaderInteractions(root) {
    if (!root) return;
    const navbar = root.querySelector(".navbar");
    const nav = root.querySelector("nav");
    const toggle = root.querySelector(".menu-toggle");

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const active = nav.classList.toggle("active");
        toggle.innerHTML = active ? "&times;" : "&#9776;";
        toggle.setAttribute("aria-expanded", String(active));
      });
    }

    if (navbar && !headerInitialized) {
      const handleScroll = () => {
        if (window.scrollY > 20) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      };
      headerInitialized = true;
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  }

  function fetchFragment(target, src, cb) {
    if (!target || !src) return;
    fetch(src)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Include failed: " + res.status + " " + src);
        }
        return res.text();
      })
      .then((html) => {
        target.innerHTML = html;
        if (typeof cb === "function") cb(target);
      })
      .catch((err) => console.error(err));
  }

  function initIncludes() {
    const includeNodes = document.querySelectorAll("[data-include]");
    includeNodes.forEach((node) => {
      const src = node.getAttribute("data-src");
      const type = node.getAttribute("data-include");
      if (!src) return;
      fetchFragment(node, src, (container) => {
        if (type === "header") {
          initHeaderInteractions(container);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initIncludes);
})();
