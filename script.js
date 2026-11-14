/* =========================================================
   EDIT YOUR CONTACT DETAILS HERE
   They are used by every Call / WhatsApp / Email button,
   the footer and the enquiry form.
   ========================================================= */
const CONFIG = {
  phone: "+91 90410 80555",       // shown on the site
  whatsapp: "919041080555",       // country code + number, digits only
  email: ""                       // add later, e.g. "info@newnextrealty.com"; Email buttons stay hidden while empty
};

(function () {
  const digits = CONFIG.phone.replace(/[^\d+]/g, "");
  const links = {
    call: "tel:" + digits,
    whatsapp: "https://wa.me/" + CONFIG.whatsapp + "?text=" +
      encodeURIComponent("Hi New Next Realty, I'm interested in the flats in Sector 66A, Aeropolis City."),
    email: "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent("Enquiry: New Next Realty, Sector 66A")
  };
  if (!CONFIG.email) {
    document.querySelectorAll('[data-link="email"]').forEach((a) => {
      const br = a.previousElementSibling;
      if (br && br.tagName === "BR") br.remove();
      a.remove();
    });
  }
  document.querySelectorAll("[data-link]").forEach((a) => {
    a.href = links[a.dataset.link];
    if (a.dataset.show) a.textContent = CONFIG[a.dataset.show];
  });

  /* ---------- Header on scroll ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const setNav = (open) => {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setNav(!document.body.classList.contains("nav-open")));
  document.querySelectorAll(".main-nav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Pause off-screen videos (saves data on phones) ---------- */
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("video").forEach((v) => {
    if (reduce) { v.removeAttribute("autoplay"); v.pause(); return; }
    if (!("IntersectionObserver" in window)) return;
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { const p = v.play(); if (p) p.catch(() => {}); }
      else v.pause();
    }, { threshold: 0.1 }).observe(v);
  });

  /* ---------- Gallery lightbox ---------- */
  const items = [...document.querySelectorAll(".g-item")];
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  let idx = 0;
  const show = (i) => {
    idx = (i + items.length) % items.length;
    lbImg.src = items[idx].dataset.full;
    lbImg.alt = items[idx].querySelector("img").alt;
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ""; items[idx].focus(); };
  items.forEach((btn, i) => btn.addEventListener("click", () => {
    show(i); lb.hidden = false; document.body.style.overflow = "hidden"; lb.querySelector(".lb-close").focus();
  }));
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
  // swipe on touch screens
  let x0 = null;
  lb.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });

  /* ---------- Enquiry form → WhatsApp ---------- */
  const form = document.getElementById("enquiry-form");
  const msg = form.querySelector(".form-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const bad = !f.value.trim();
      f.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) { msg.textContent = "Please enter your name and phone number."; return; }
    const d = new FormData(form);
    const text = `Hi New Next Realty,\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nInterested in: ${d.get("interest")}\n${d.get("message") || ""}`;
    window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    msg.textContent = "Thank you! WhatsApp is opening so you can send your enquiry.";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
