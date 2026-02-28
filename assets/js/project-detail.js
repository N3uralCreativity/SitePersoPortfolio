(() => {
  const STORAGE_KEY = "portfolio-language";
  const VALID_LANGS = new Set(["fr", "en"]);

  const i18n = {
    fr: {
      "meta.title": "Leo Peron | Fiche Projet",
      "meta.description": "Detail complet d'un projet du portfolio de Leo Peron.",
      "skip.link": "Aller au contenu",
      "brand.role": "Detail Projet",
      "nav.back_home": "Retour accueil",
      "nav.back_catalog": "Retour catalogue",
      "nav.details": "Fiche detail",
      "nav.open_menu": "Ouvrir le menu",
      "nav.aria": "Navigation principale",
      "lang.aria": "Selection de langue",
      "hero.eyebrow": "FICHE PROJET COMPLETE",
      "hero.back": "Retour a la bibliotheque",
      "hero.group": "Domaine",
      "hero.tags": "Tags",
      "hero.media_caption": "Visuel projet",
      "hero.missing_title": "Projet introuvable",
      "hero.missing_text": "Le projet demande n'existe pas ou n'a pas pu etre charge.",
      "hero.language_notice": "Mode anglais: contenu detaille conserve en francais pour garder la precision de la description originale.",
      "section.fallback_title": "Apercu",
      "section.empty": "Aucun detail supplementaire pour cette section.",
      "insight.challenge": "Difficulte cle",
      "insight.solution": "Solution mise en place",
      "insight.impact": "Impact mesurable",
      "insight.timeline": "Roadmap technique",
      "insight.challenge_fallback": "Structurer le projet avec un niveau de qualite eleve et un comportement stable.",
      "insight.solution_fallback": "Approche modulaire, iteration continue et verification des points critiques.",
      "insight.impact_template": "Projet #{number} avec {sections} sections detaillees et {tags} tags techniques.",
      "timeline.empty": "Timeline non disponible pour ce projet.",
      "timeline.points": "points",
      "links.title": "Liens utiles",
      "links.none": "Aucun lien externe reference pour ce projet.",
      "nav.previous": "Projet precedent",
      "nav.next": "Projet suivant",
      "related.title": "Projets lies",
      "related.open": "Ouvrir cette fiche",
      "footer.text": "Portfolio engineering library - Leo Peron"
    },
    en: {
      "meta.title": "Leo Peron | Project Detail",
      "meta.description": "Full detail page for a project in Leo Peron's portfolio.",
      "skip.link": "Skip to content",
      "brand.role": "Project Detail",
      "nav.back_home": "Back home",
      "nav.back_catalog": "Back catalog",
      "nav.details": "Detail page",
      "nav.open_menu": "Open menu",
      "nav.aria": "Main navigation",
      "lang.aria": "Language selection",
      "hero.eyebrow": "COMPLETE PROJECT PAGE",
      "hero.back": "Back to library",
      "hero.group": "Domain",
      "hero.tags": "Tags",
      "hero.media_caption": "Project visual",
      "hero.missing_title": "Project not found",
      "hero.missing_text": "The requested project does not exist or could not be loaded.",
      "hero.language_notice": "English mode: detailed content remains in French to preserve original precision.",
      "section.fallback_title": "Overview",
      "section.empty": "No additional details available for this section.",
      "insight.challenge": "Key challenge",
      "insight.solution": "Implemented solution",
      "insight.impact": "Measurable impact",
      "insight.timeline": "Technical roadmap",
      "insight.challenge_fallback": "Structure the project with high quality and stable behavior.",
      "insight.solution_fallback": "Modular approach, iterative refinement, and verification on critical points.",
      "insight.impact_template": "Project #{number} with {sections} detailed sections and {tags} technical tags.",
      "timeline.empty": "No timeline available for this project.",
      "timeline.points": "points",
      "links.title": "Useful links",
      "links.none": "No external links referenced for this project.",
      "nav.previous": "Previous project",
      "nav.next": "Next project",
      "related.title": "Related projects",
      "related.open": "Open this detail page",
      "footer.text": "Portfolio engineering library - Leo Peron"
    }
  };

  const SECTION_TRANSLATION_RULES = [
    { pattern: /objectif/i, fr: "Objectif", en: "Objective" },
    { pattern: /ce que tu as fait|ce que tu avais fait|ce que tu voulais|travail/i, fr: "Travail realise", en: "Work done" },
    { pattern: /details de codage|details/i, fr: "Details techniques", en: "Engineering details" },
    { pattern: /livrables/i, fr: "Livrables", en: "Deliverables" },
    { pattern: /idee/i, fr: "Idee", en: "Concept" },
    { pattern: /objectif \/ idee/i, fr: "Objectif et idee", en: "Objective and concept" }
  ];

  const state = {
    language: "fr",
    groups: [],
    projects: [],
    current: null
  };

  const refs = {
    navToggle: document.querySelector(".nav-toggle"),
    nav: document.querySelector(".site-nav"),
    langButtons: document.querySelectorAll(".lang-btn[data-lang]"),
    metaDescription: document.querySelector("#meta-description"),
    note: document.querySelector("#language-note"),
    heroEyebrow: document.querySelector("#project-eyebrow"),
    heroTitle: document.querySelector("#project-title"),
    heroSummary: document.querySelector("#project-summary"),
    heroMedia: document.querySelector("#project-media"),
    heroNumber: document.querySelector("#project-number"),
    heroGroup: document.querySelector("#project-group"),
    heroTags: document.querySelector("#project-tags"),
    insightChallenge: document.querySelector("#insight-challenge"),
    insightSolution: document.querySelector("#insight-solution"),
    insightImpact: document.querySelector("#insight-impact"),
    timeline: document.querySelector("#project-timeline"),
    sectionsContainer: document.querySelector("#detail-sections"),
    linksContainer: document.querySelector("#detail-links"),
    prevLink: document.querySelector("#nav-prev"),
    nextLink: document.querySelector("#nav-next"),
    relatedContainer: document.querySelector("#related-grid"),
    backToCatalog: document.querySelectorAll("[data-back-to-catalog]"),
    year: document.querySelector("#year")
  };

  function getText(key) {
    return i18n[state.language][key] || i18n.fr[key] || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getLanguageFromStorage() {
    try {
      const lang = localStorage.getItem(STORAGE_KEY);
      if (lang && VALID_LANGS.has(lang)) {
        return lang;
      }
    } catch {
      return "fr";
    }

    return "fr";
  }

  function setLanguageToStorage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore localStorage errors.
    }
  }

  function getUrlParam(name) {
    return new URLSearchParams(window.location.search).get(name) || "";
  }

  function getGroupLabel(groupId) {
    const group = state.groups.find((entry) => entry.id === groupId);
    if (!group) {
      return groupId;
    }
    return group.label[state.language] || group.label.fr || groupId;
  }

  function getProjectById(id) {
    return state.projects.find((project) => project.id === id) || null;
  }

  function getLocalSectionTitle(rawTitle) {
    const fallback = getText("section.fallback_title");
    const title = String(rawTitle || fallback).trim();

    for (const rule of SECTION_TRANSLATION_RULES) {
      if (rule.pattern.test(title)) {
        return state.language === "en" ? rule.en : rule.fr;
      }
    }

    return title || fallback;
  }

  function renderSectionLines(lines) {
    if (!Array.isArray(lines) || !lines.length) {
      return `<p>${escapeHtml(getText("section.empty"))}</p>`;
    }

    let html = "";
    let listBuffer = [];

    const flushList = () => {
      if (!listBuffer.length) {
        return;
      }
      html += `<ul>${listBuffer.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      listBuffer = [];
    };

    lines.forEach((line) => {
      if (line.type === "li") {
        listBuffer.push(line.text);
        return;
      }

      flushList();
      html += `<p>${escapeHtml(line.text)}</p>`;
    });

    flushList();
    return html;
  }

  function getSectionLinesByPattern(project, pattern) {
    if (!project || !Array.isArray(project.sections)) {
      return [];
    }

    const regex = pattern instanceof RegExp ? pattern : /.*/;
    return project.sections
      .filter((section) => regex.test(section.title))
      .flatMap((section) => section.lines.map((line) => line.text));
  }

  function getFirstLongLine(lines) {
    if (!Array.isArray(lines)) {
      return "";
    }
    return lines.find((line) => typeof line === "string" && line.length > 22) || "";
  }

  function computeInsights(project) {
    const objectiveLines = getSectionLinesByPattern(project, /objectif|idee/i);
    const workLines = getSectionLinesByPattern(project, /ce que tu|travail|fait|wanted|done/i);
    const engineeringLines = getSectionLinesByPattern(project, /details|codage|technique|architecture|engineering/i);
    const deliverableLines = getSectionLinesByPattern(project, /livrables|deliverables/i);

    const challenge =
      getFirstLongLine(objectiveLines) ||
      getFirstLongLine(workLines) ||
      getText("insight.challenge_fallback");

    const solution =
      getFirstLongLine(engineeringLines) ||
      getFirstLongLine(workLines.slice(1)) ||
      getText("insight.solution_fallback");

    const directImpact =
      getFirstLongLine(deliverableLines) ||
      getFirstLongLine(engineeringLines.slice(1));

    if (directImpact) {
      return { challenge, solution, impact: directImpact };
    }

    const fallbackImpact = getText("insight.impact_template")
      .replace("{number}", String(project.number))
      .replace("{sections}", String(project.sections.length))
      .replace("{tags}", String(project.tags.length));

    return { challenge, solution, impact: fallbackImpact };
  }

  function renderTimeline(project) {
    if (!refs.timeline) {
      return;
    }

    if (!project || !project.sections.length) {
      refs.timeline.innerHTML = `<li>${escapeHtml(getText("timeline.empty"))}</li>`;
      return;
    }

    refs.timeline.innerHTML = project.sections
      .map((section, index) => {
        const title = getLocalSectionTitle(section.title);
        const pointCount = section.lines.length;
        return `
          <li>
            <span class="timeline-step">0${index + 1}</span>
            <div>
              <strong>${escapeHtml(title)}</strong>
              <p>${pointCount} ${escapeHtml(getText("timeline.points"))}</p>
            </div>
          </li>
        `;
      })
      .join("");
  }

  function renderMedia(project) {
    if (!refs.heroMedia) {
      return;
    }

    if (!project || !project.image) {
      refs.heroMedia.innerHTML = `<div class="catalog-placeholder detail-media-placeholder" aria-hidden="true"></div>`;
      return;
    }

    refs.heroMedia.innerHTML = `
      <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">
      <figcaption>${escapeHtml(getText("hero.media_caption"))}</figcaption>
    `;
  }

  function renderMissingProject() {
    refs.heroTitle.textContent = getText("hero.missing_title");
    refs.heroSummary.textContent = getText("hero.missing_text");
    refs.heroNumber.textContent = "--";
    refs.heroGroup.textContent = "-";
    refs.heroTags.innerHTML = "";
    if (refs.heroMedia) {
      refs.heroMedia.innerHTML = `<div class="catalog-placeholder detail-media-placeholder" aria-hidden="true"></div>`;
    }
    if (refs.insightChallenge) {
      refs.insightChallenge.textContent = "";
    }
    if (refs.insightSolution) {
      refs.insightSolution.textContent = "";
    }
    if (refs.insightImpact) {
      refs.insightImpact.textContent = "";
    }
    if (refs.timeline) {
      refs.timeline.innerHTML = "";
    }
    refs.sectionsContainer.innerHTML = "";
    refs.linksContainer.innerHTML = `<p>${escapeHtml(getText("links.none"))}</p>`;
    refs.relatedContainer.innerHTML = "";
    refs.prevLink.removeAttribute("href");
    refs.nextLink.removeAttribute("href");
    refs.prevLink.classList.add("is-disabled");
    refs.nextLink.classList.add("is-disabled");
  }

  function renderProjectNavigation(currentIndex) {
    const prev = state.projects[currentIndex - 1] || null;
    const next = state.projects[currentIndex + 1] || null;
    const langQuery = `lang=${encodeURIComponent(state.language)}`;

    if (prev) {
      refs.prevLink.href = `ProjetDetails.html?id=${encodeURIComponent(prev.id)}&${langQuery}`;
      refs.prevLink.classList.remove("is-disabled");
      refs.prevLink.textContent = `${getText("nav.previous")} - #${prev.number}`;
    } else {
      refs.prevLink.removeAttribute("href");
      refs.prevLink.classList.add("is-disabled");
      refs.prevLink.textContent = getText("nav.previous");
    }

    if (next) {
      refs.nextLink.href = `ProjetDetails.html?id=${encodeURIComponent(next.id)}&${langQuery}`;
      refs.nextLink.classList.remove("is-disabled");
      refs.nextLink.textContent = `${getText("nav.next")} - #${next.number}`;
    } else {
      refs.nextLink.removeAttribute("href");
      refs.nextLink.classList.add("is-disabled");
      refs.nextLink.textContent = getText("nav.next");
    }
  }

  function renderRelatedProjects() {
    if (!state.current) {
      refs.relatedContainer.innerHTML = "";
      return;
    }

    const langQuery = `lang=${encodeURIComponent(state.language)}`;
    const related = state.projects
      .filter((project) => project.group === state.current.group && project.id !== state.current.id)
      .slice(0, 4);

    if (!related.length) {
      refs.relatedContainer.innerHTML = "";
      return;
    }

    refs.relatedContainer.innerHTML = related
      .map((project) => {
        const image = project.image
          ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">`
          : `<div class="catalog-placeholder" aria-hidden="true"></div>`;

        return `
          <article class="related-card">
            ${image}
            <div class="related-card-body">
              <p class="catalog-index">#${project.number.toString().padStart(2, "0")}</p>
              <h3>${escapeHtml(project.title)}</h3>
              <a class="text-link" href="ProjetDetails.html?id=${encodeURIComponent(project.id)}&${langQuery}">${escapeHtml(getText("related.open"))}</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderProjectContent() {
    if (!state.current) {
      renderMissingProject();
      return;
    }

    refs.heroTitle.textContent = state.current.title;
    refs.heroSummary.textContent = state.current.summary;
    refs.heroNumber.textContent = `#${state.current.number.toString().padStart(2, "0")}`;
    refs.heroGroup.textContent = getGroupLabel(state.current.group);
    refs.heroTags.innerHTML = state.current.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");
    renderMedia(state.current);

    const insights = computeInsights(state.current);
    if (refs.insightChallenge) {
      refs.insightChallenge.textContent = insights.challenge;
    }
    if (refs.insightSolution) {
      refs.insightSolution.textContent = insights.solution;
    }
    if (refs.insightImpact) {
      refs.insightImpact.textContent = insights.impact;
    }
    renderTimeline(state.current);

    refs.sectionsContainer.innerHTML = state.current.sections
      .map((section) => {
        const title = getLocalSectionTitle(section.title);
        return `
          <article class="detail-section-card">
            <h2>${escapeHtml(title)}</h2>
            ${renderSectionLines(section.lines)}
          </article>
        `;
      })
      .join("");

    if (state.current.links && state.current.links.length) {
      refs.linksContainer.innerHTML = `
        <h2>${escapeHtml(getText("links.title"))}</h2>
        <ul>
          ${state.current.links
            .map((link) => {
              const label = link.label?.[state.language] || link.label?.fr || link.url;
              return `<li><a class="text-link" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a></li>`;
            })
            .join("")}
        </ul>
      `;
    } else {
      refs.linksContainer.innerHTML = `<h2>${escapeHtml(getText("links.title"))}</h2><p>${escapeHtml(getText("links.none"))}</p>`;
    }

    const currentIndex = state.projects.findIndex((project) => project.id === state.current.id);
    renderProjectNavigation(currentIndex);
    renderRelatedProjects();
  }

  function applyStaticTranslations() {
    document.documentElement.lang = state.language;
    const genericTitle = getText("meta.title");
    document.title = state.current ? `${state.current.title} | ${genericTitle}` : genericTitle;
    if (refs.metaDescription) {
      refs.metaDescription.setAttribute("content", getText("meta.description"));
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = getText(key);
      if (value) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      const value = getText(key);
      if (value) {
        element.setAttribute("aria-label", value);
      }
    });

    refs.langButtons.forEach((button) => {
      const isActive = button.dataset.lang === state.language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (refs.note) {
      refs.note.hidden = state.language !== "en";
      refs.note.textContent = getText("hero.language_notice");
    }

    const langQuery = `lang=${encodeURIComponent(state.language)}`;
    refs.backToCatalog.forEach((link) => {
      link.href = `Projets.html?${langQuery}`;
    });
  }

  function setLanguage(language, persist) {
    state.language = VALID_LANGS.has(language) ? language : "fr";
    if (persist) {
      setLanguageToStorage(state.language);
    }
    applyStaticTranslations();
    renderProjectContent();
  }

  function setupLanguageButtons() {
    refs.langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const language = button.dataset.lang || "fr";
        setLanguage(language, true);
      });
    });
  }

  function setupNavigationMenu() {
    if (!refs.navToggle || !refs.nav) {
      return;
    }

    const setOpen = (open) => {
      refs.navToggle.setAttribute("aria-expanded", String(open));
      refs.nav.classList.toggle("is-open", open);
    };

    refs.navToggle.addEventListener("click", () => {
      const expanded = refs.navToggle.getAttribute("aria-expanded") === "true";
      setOpen(!expanded);
    });

    refs.nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  function getInitialLanguage() {
    const urlLang = getUrlParam("lang");
    if (urlLang && VALID_LANGS.has(urlLang)) {
      return urlLang;
    }
    return getLanguageFromStorage();
  }

  async function bootstrap() {
    setupNavigationMenu();
    setupLanguageButtons();

    const { groups, projects } = await window.PortfolioProjectsSource.loadProjects();
    state.groups = groups;
    state.projects = projects;

    const requestedId = getUrlParam("id");
    state.current = getProjectById(requestedId) || projects[0] || null;

    setLanguage(getInitialLanguage(), true);
  }

  if (refs.year) {
    refs.year.textContent = String(new Date().getFullYear());
  }

  bootstrap().catch((error) => {
    const localHint = window.location.protocol === "file:"
      ? " Open with a local server (example: `python -m http.server`)."
      : "";
    refs.heroTitle.textContent = getText("hero.missing_title");
    refs.heroSummary.textContent = `Error: ${error.message}${localHint}`;
  });
})();
