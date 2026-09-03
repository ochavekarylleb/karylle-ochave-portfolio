(function () {
  "use strict";
  const data = window.portfolioData;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  function renderExperience() {
    const items = [...data.education, ...data.experience];
    $("#experience-list").innerHTML = items.map((item, index) => `
      <article class="timeline-item reveal">
        <button class="timeline-summary" type="button" aria-expanded="${index === 0}" aria-controls="timeline-${index}">
          <span class="timeline-type">${item.type}</span><span class="timeline-title"><strong>${item.title}</strong><small>${item.organization} · ${item.location}</small></span><span class="timeline-date">${item.dates}</span><span class="plus" aria-hidden="true">+</span>
        </button><div class="timeline-detail" id="timeline-${index}" ${index === 0 ? "" : "hidden"}><p>${item.detail}</p></div>
      </article>`).join("");
  }

  function renderSkills() {
    const categories = Object.keys(data.skills);
    $("#skill-filters").innerHTML = ["All", ...categories].map((name, i) => `<button type="button" class="filter-button ${i === 0 ? "active" : ""}" data-skill="${name}">${name}</button>`).join("");
    showSkills("All");
  }
  function showSkills(category) {
    const groups = category === "All" ? Object.entries(data.skills) : [[category, data.skills[category]]];
    $("#skill-list").innerHTML = groups.map(([name, skills]) => `<div class="skill-group"><p>${name}</p><div>${skills.map(skill => `<span>${skill}</span>`).join("")}</div></div>`).join("");
  }

  function renderSocial(filter = "All") {
    const accounts = filter === "All" ? data.socialAccounts : data.socialAccounts.filter(item => item.platform === filter);
    $("#social-grid").innerHTML = accounts.map((item, index) => `<article class="work-card reveal">
      <a class="work-art social-preview" href="${item.url}" target="_blank" rel="noopener" aria-label="Open ${item.name} on ${item.platform}"><img src="${item.image}" alt="${item.name} ${item.platform} profile preview" width="1206" height="900" loading="lazy"></a>
      <div class="work-card-copy"><div><span class="badge">${item.platform}</span><span class="industry">${item.industry}</span></div><h3>${item.name}</h3><p>${item.role}</p><a class="text-link" href="${item.url}" target="_blank" rel="noopener">View account <span aria-hidden="true">↗</span></a></div>
    </article>`).join("");
    observeReveals();
  }

  function renderCampaigns() {
    $("#campaign-process").innerHTML = data.process.map((step, i) => `<div><span>${String(i + 1).padStart(2, "0")}</span><p>${step}</p></div>`).join("");
    $("#campaign-grid").innerHTML = data.campaigns.map((item, i) => `<article class="campaign-card reveal"><a class="campaign-preview" href="${item.url}" target="_blank" rel="noopener" aria-label="Watch ${item.title} on Instagram"><img src="${item.image}" alt="Preview of ${item.title}" width="403" height="701" loading="lazy"><span aria-hidden="true">▶</span></a><div class="campaign-copy"><span>Campaign ${String(i + 1).padStart(2, "0")}</span><h3>${item.title}</h3><p>${item.industry}</p><hr><p>${item.objective}</p><a class="text-link" href="${item.url}" target="_blank" rel="noopener">Watch reel <span aria-hidden="true">↗</span></a></div></article>`).join("");
  }

  function renderWebsites() {
    $("#website-grid").innerHTML = data.websites.map((item, i) => `<article class="website-card reveal">
      <a class="browser website-preview" href="${item.url}" target="_blank" rel="noopener" aria-label="Open ${item.title} website"><div class="browser-bar"><i></i><i></i><i></i></div><img src="${item.preview}" alt="Homepage preview of ${item.title}" width="1600" height="871" loading="lazy"></a>
      <p>${item.client}</p><h3>${item.title}</h3><div class="tags">${item.tools.map(tool => `<span>${tool}</span>`).join("")}</div><div class="project-actions"><a class="button button-dark" href="${item.url}" target="_blank" rel="noopener">Live website <span aria-hidden="true">↗</span></a></div>
    </article>`).join("");
  }

  function renderUiux() {
    const screens = [
      { src: "assets/projects/adaptiv-alert-dashboard.png", alt: "Adaptiv Health patient dashboard showing a health alert and vital readings" },
      { src: "assets/projects/adaptiv-health-insights.png", alt: "Adaptiv Health insights screen showing health score, AI risk, and current vitals" },
      { src: "assets/projects/adaptiv-access-portal.png", alt: "Adaptiv Health access portal with patient app and doctor dashboard options" }
    ];
    $("#phone-stage").innerHTML = screens.map((screen, index) => `<div class="phone phone-${index + 1}"><div class="notch"></div><img src="${screen.src}" alt="${screen.alt}" width="399" height="864" loading="lazy"></div>`).join("");
  }

  function renderValuesAndContact() {
    $("#values-grid").innerHTML = data.values.map(item => `<article class="value reveal"><span>${item.number}</span><h3>${item.title}</h3><p>${item.text}</p></article>`).join("");
    $("#contact-details").innerHTML = `<a href="mailto:${data.personal.email}">${data.personal.email}</a><a href="tel:${data.personal.phone.replace(/\s/g, "")}">${data.personal.phone}</a><p>${data.personal.location}</p>`;
  }

  function observeReveals() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    $$(".reveal:not(.visible)").forEach(el => observer.observe(el));
  }
  function initNavigation() {
    const toggle = $(".menu-toggle"), nav = $("#site-nav");
    toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation"); document.body.classList.toggle("menu-open", !open); });
    $$("a", nav).forEach(link => link.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("menu-open"); }));
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { $$("nav a").forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`)); } }), { rootMargin: "-30% 0px -60%", threshold: 0 });
    $$('[data-section]').forEach(section => sectionObserver.observe(section));
    window.addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; $(".scroll-progress span").style.width = `${max ? (scrollY / max) * 100 : 0}%`; $("#site-header").classList.toggle("scrolled", scrollY > 30); }, { passive: true });
  }
  function initCounters() {
    const stats = $("#stats"); let done = false;
    new IntersectionObserver(([entry], observer) => { if (!entry.isIntersecting || done) return; done = true; $$('[data-count]', stats).forEach(el => { const target = Number(el.dataset.count); let current = 0; const timer = setInterval(() => { current += 1; el.textContent = current; if (current >= target) clearInterval(timer); }, 90); }); observer.disconnect(); }, { threshold: .5 }).observe(stats);
  }
  renderExperience(); renderSkills(); renderSocial(); renderCampaigns(); renderWebsites(); renderUiux(); renderValuesAndContact();
  $("#skill-filters").addEventListener("click", e => { if (!e.target.matches("button")) return; $$("button", e.currentTarget).forEach(b => b.classList.toggle("active", b === e.target)); showSkills(e.target.dataset.skill); });
  const platforms = ["All", ...new Set(data.socialAccounts.map(item => item.platform))]; $("#social-filters").innerHTML = platforms.map((name, i) => `<button type="button" class="filter-button ${i === 0 ? "active" : ""}" data-platform="${name}">${name}</button>`).join("");
  $("#social-filters").addEventListener("click", e => { if (!e.target.matches("button")) return; $$("button", e.currentTarget).forEach(b => b.classList.toggle("active", b === e.target)); renderSocial(e.target.dataset.platform); });
  $("#experience-list").addEventListener("click", e => { const button = e.target.closest("button"); if (!button) return; const panel = document.getElementById(button.getAttribute("aria-controls")); const open = button.getAttribute("aria-expanded") === "true"; button.setAttribute("aria-expanded", String(!open)); panel.hidden = open; });
  $(".back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#year").textContent = new Date().getFullYear(); initNavigation(); initCounters(); observeReveals();
})();
