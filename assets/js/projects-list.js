(() => {
  const STORAGE_KEY = "portfolio-language";
  const VALID_LANGS = new Set(["fr", "en"]);

  const i18n = {
    fr: {
      "meta.title": "Leo Peron | Bibliotheque de Projets",
      "meta.description": "Catalogue complet de projets techniques de Leo Peron.",
      "skip.link": "Aller au contenu",
      "brand.role": "Bibliotheque Projets",
      "nav.back_home": "Retour accueil",
      "nav.catalog": "Catalogue",
      "nav.about_data": "A propos des donnees",
      "nav.open_menu": "Ouvrir le menu",
      "nav.aria": "Navigation principale",
      "lang.aria": "Selection de langue",
      "hero.eyebrow": "BASE PROJETS COMPLETE",
      "hero.title": "31 projets techniques, de Roblox a SQL, avec detail complet.",
      "hero.lead": "Cette page est construite a partir de Projets.md et centralise les objectifs, l'implementation et les livrables de chaque travail.",
      "hero.total_label": "Projets references",
      "hero.group_label": "Domaines",
      "hero.detail_label": "Pages detail",
      "toolbar.search_label": "Recherche",
      "toolbar.search_placeholder": "Rechercher un projet, une techno, un mot-cle...",
      "toolbar.group_label": "Filtrer par domaine",
      "toolbar.all": "Tout",
      "result.template": "{count} projets affiches sur {total}",
      "result.none": "Aucun projet ne correspond a ce filtre.",
      "card.group": "Domaine",
      "card.open": "Voir la fiche detaillee",
      "data.notice": "En mode anglais, l'interface est traduite mais le contenu detaille conserve la formulation francaise d'origine pour precision.",
      "data.about_title": "A propos des donnees",
      "data.about_p1": "Source unique: Projets.md. Le catalogue et les pages detail sont generes a partir de ce fichier.",
      "data.about_p2": "Tu peux enrichir simplement en editant Projets.md: la liste et les fiches se mettront a jour automatiquement.",
      "footer.text": "Portfolio engineering library - Leo Peron"
    },
    en: {
      "meta.title": "Leo Peron | Project Library",
      "meta.description": "Complete catalog of Leo Peron's technical projects.",
      "skip.link": "Skip to content",
      "brand.role": "Project Library",
      "nav.back_home": "Back home",
      "nav.catalog": "Catalog",
      "nav.about_data": "About data",
      "nav.open_menu": "Open menu",
      "nav.aria": "Main navigation",
      "lang.aria": "Language selection",
      "hero.eyebrow": "COMPLETE PROJECT BASE",
      "hero.title": "31 technical projects, from Roblox to SQL, with full detail pages.",
      "hero.lead": "This page is generated from Projets.md and centralizes goals, implementation details, and deliverables.",
      "hero.total_label": "Referenced projects",
      "hero.group_label": "Domains",
      "hero.detail_label": "Detail pages",
      "toolbar.search_label": "Search",
      "toolbar.search_placeholder": "Search project, tech, keyword...",
      "toolbar.group_label": "Filter by domain",
      "toolbar.all": "All",
      "result.template": "{count} projects shown out of {total}",
      "result.none": "No project matches this filter.",
      "card.group": "Domain",
      "card.open": "Open full details",
      "data.notice": "English mode translates the UI, while detailed content keeps original French wording for precision.",
      "data.about_title": "About this data",
      "data.about_p1": "Single source: Projets.md. Catalog and detail pages are generated from that file.",
      "data.about_p2": "You can enrich content by editing Projets.md and both pages will update automatically.",
      "footer.text": "Portfolio engineering library - Leo Peron"
    }
  };

  const state = {
    language: "fr",
    groups: [],
    projects: [],
    activeGroup: "all",
    search: ""
  };

  const refs = {
    navToggle: document.querySelector(".nav-toggle"),
    nav: document.querySelector(".site-nav"),
    langButtons: document.querySelectorAll(".lang-btn[data-lang]"),
    searchInput: document.querySelector("#catalog-search"),
    groupContainer: document.querySelector("#group-filters"),
    cardContainer: document.querySelector("#catalog-grid"),
    resultCount: document.querySelector("#result-count"),
    totalCount: document.querySelector("#stat-total"),
    groupCount: document.querySelector("#stat-groups"),
    detailCount: document.querySelector("#stat-detail"),
    englishNotice: document.querySelector("#language-note"),
    year: document.querySelector("#year"),
    metaDescription: document.querySelector("#meta-description")
  };

  function getText(key) {
    return i18n[state.language][key] || i18n.fr[key] || "";
  }

  function getFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_LANGS.has(stored)) {
        return stored;
      }
    } catch {
      return "fr";
    }

    return "fr";
  }

  function setStorage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore localStorage errors.
    }
  }

  function getQueryLanguage() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang && VALID_LANGS.has(lang)) {
      return lang;
    }
    return "";
  }

  function getGroupLabel(groupId) {
    const group = state.groups.find((entry) => entry.id === groupId);
    if (!group) {
      return groupId;
    }
    return group.label[state.language] || group.label.fr || groupId;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function translateStaticText() {
    document.documentElement.lang = state.language;
    document.title = getText("meta.title");
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

    if (refs.searchInput) {
      refs.searchInput.placeholder = getText("toolbar.search_placeholder");
    }

    refs.langButtons.forEach((button) => {
      const isActive = button.dataset.lang === state.language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (refs.englishNotice) {
      refs.englishNotice.hidden = state.language !== "en";
    }
  }

  function setupNavigation() {
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

  function renderGroupFilters() {
    if (!refs.groupContainer) {
      return;
    }

    const filters = [
      { id: "all", label: getText("toolbar.all") },
      ...state.groups.map((group) => ({
        id: group.id,
        label: group.label[state.language] || group.label.fr || group.id
      }))
    ];

    refs.groupContainer.innerHTML = filters
      .map((filter) => {
        const active = state.activeGroup === filter.id;
        return `<button type="button" class="chip${active ? " is-active" : ""}" data-group="${escapeHtml(filter.id)}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(filter.label)}</button>`;
      })
      .join("");

    refs.groupContainer.querySelectorAll("button[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeGroup = button.dataset.group || "all";
        renderGroupFilters();
        renderCatalog();
      });
    });
  }

  function projectMatchesQuery(project, query) {
    if (!query) {
      return true;
    }

    const haystack = [
      project.title,
      project.summary,
      ...project.tags,
      ...project.sections.map((section) => section.title),
      ...project.sections.flatMap((section) => section.lines.map((line) => line.text))
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  }

  function getFilteredProjects() {
    const query = state.search.trim().toLowerCase();
    return state.projects.filter((project) => {
      const groupOk = state.activeGroup === "all" || project.group === state.activeGroup;
      const searchOk = projectMatchesQuery(project, query);
      return groupOk && searchOk;
    });
  }

  function renderCatalog() {
    const filtered = getFilteredProjects();
    const total = state.projects.length;

    if (refs.totalCount) {
      refs.totalCount.textContent = String(total);
    }
    if (refs.groupCount) {
      refs.groupCount.textContent = String(state.groups.length);
    }
    if (refs.detailCount) {
      refs.detailCount.textContent = String(total);
    }

    if (refs.resultCount) {
      const message = getText("result.template")
        .replace("{count}", String(filtered.length))
        .replace("{total}", String(total));
      refs.resultCount.textContent = message;
    }

    if (!refs.cardContainer) {
      return;
    }

    if (!filtered.length) {
      refs.cardContainer.innerHTML = `<p class="catalog-empty">${escapeHtml(getText("result.none"))}</p>`;
      return;
    }

    const langQuery = `lang=${encodeURIComponent(state.language)}`;

    refs.cardContainer.innerHTML = filtered
      .map((project) => {
        const imageHtml = project.image
          ? `<img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.title)}" loading="lazy" decoding="async">`
          : `<div class="catalog-placeholder" aria-hidden="true"></div>`;

        const tags = project.tags
          .slice(0, 4)
          .map((tag) => `<li>${escapeHtml(tag)}</li>`)
          .join("");

        return `
          <article class="catalog-card reveal is-visible">
            ${imageHtml}
            <div class="catalog-card-body">
              <p class="catalog-index">#${project.number.toString().padStart(2, "0")}</p>
              <h3>${escapeHtml(project.title)}</h3>
              <p class="catalog-summary">${escapeHtml(project.summary)}</p>
              <p class="catalog-group"><strong>${escapeHtml(getText("card.group"))}:</strong> ${escapeHtml(getGroupLabel(project.group))}</p>
              <ul class="catalog-tags">${tags}</ul>
              <a class="btn btn-primary" href="ProjetDetails.html?id=${encodeURIComponent(project.id)}&${langQuery}">${escapeHtml(getText("card.open"))}</a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function setupSearch() {
    if (!refs.searchInput) {
      return;
    }

    refs.searchInput.addEventListener("input", () => {
      state.search = refs.searchInput.value || "";
      renderCatalog();
    });
  }

  function setLanguage(language, persist) {
    state.language = VALID_LANGS.has(language) ? language : "fr";
    if (persist) {
      setStorage(state.language);
    }
    translateStaticText();
    renderGroupFilters();
    renderCatalog();
  }

  function setupLanguage() {
    refs.langButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const lang = button.dataset.lang || "fr";
        setLanguage(lang, true);
      });
    });
  }

  async function bootstrap() {
    setupNavigation();
    setupLanguage();
    setupSearch();

    const queryLang = getQueryLanguage();
    const initialLang = queryLang || getFromStorage() || "fr";
    state.language = initialLang;

    const { groups, projects } = await window.PortfolioProjectsSource.loadProjects();
    state.groups = groups;
    state.projects = projects;

    setLanguage(state.language, true);
  }

  if (refs.year) {
    refs.year.textContent = String(new Date().getFullYear());
  }

  bootstrap().catch((error) => {
    const localHint = window.location.protocol === "file:"
      ? " Use a local server (example: `python -m http.server`)."
      : "";
    if (refs.cardContainer) {
      refs.cardContainer.innerHTML = `<p class="catalog-empty">Error while loading projects data: ${escapeHtml(error.message)}${escapeHtml(localHint)}</p>`;
    }
  });
})();
