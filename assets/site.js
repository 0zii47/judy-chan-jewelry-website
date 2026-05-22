const body = document.body;
const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-link");

const syncHeader = () => {
  header?.classList.toggle("is-solid", window.scrollY > 24);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));

const filters = document.querySelectorAll("[data-filter]");
const pieces = document.querySelectorAll("[data-category]");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const active = filter.dataset.filter;
    filters.forEach((button) => button.classList.toggle("is-active", button === filter));
    pieces.forEach((piece) => {
      const matches = active === "all" || piece.dataset.category === active;
      piece.classList.toggle("is-hidden", !matches);
    });
  });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxMeta = document.querySelector(".lightbox-meta");
const closeLightbox = document.querySelector(".lightbox-close");

const hideLightbox = () => {
  lightbox?.classList.remove("is-open");
  lightbox?.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
};

document.querySelectorAll("[data-lightbox-image]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxMeta) {
      return;
    }

    lightboxImage.src = button.dataset.lightboxImage;
    lightboxImage.alt = button.dataset.lightboxAlt || "";
    lightboxTitle.textContent = button.dataset.lightboxTitle || "";
    lightboxMeta.textContent = button.dataset.lightboxMeta || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
    closeLightbox?.focus();
  });
});

closeLightbox?.addEventListener("click", hideLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hideLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideLightbox();
  }
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent = "Thank you. The studio will reply with appointment availability.";
    }
    form.reset();
  });
});
