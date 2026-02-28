(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const storageKey = "portfolio-language";

  const translations = {
    fr: {
      "meta.title": "Leo Peron | Portfolio Developpeur Logiciel",
      "meta.description": "Portfolio de Leo Peron - developpeur logiciel axe qualite produit, securite et performance.",
      "a11y.skip_link": "Aller au contenu",
      "brand.home_aria": "Aller a l'accueil",
      "brand.role": "Developpeur Logiciel",
      "nav.open_menu": "Ouvrir le menu",
      "nav.aria_label": "Navigation principale",
      "nav.home": "Accueil",
      "nav.approach": "Approche",
      "nav.projects": "Projets",
      "nav.library": "Bibliotheque",
      "nav.stack": "Stack",
      "nav.timeline": "Parcours",
      "nav.contact": "Contact",
      "lang.aria_label": "Selection de langue",
      "noscript.banner": "JavaScript est desactive. Le site reste consultable, mais les animations et les filtres ne sont pas actifs.",
      "hero.eyebrow": "PORTFOLIO 2026",
      "hero.title": "Je conçois et livre des experiences logicielles robustes.",
      "hero.lead": "Je suis Leo Peron, developpeur logiciel focalise sur la qualite produit, une approche securite-first et des interfaces pensees avec intention.",
      "hero.cta_projects": "Explorer les projets",
      "hero.cta_contact": "Demarrer une discussion",
      "hero.metrics_aria": "Indicateurs cles",
      "hero.metric_lines": "Lignes sur Moon's Script Builder",
      "hero.metric_commands": "Commandes en production",
      "hero.metric_players": "Joueurs atteints",
      "hero.terminal_aria": "Apercu du workflow d'ingenierie",
      "hero.terminal_header": "quality-run.log",
      "hero.terminal_code": "$ npm run quality:full\n> lint ............. OK\n> accessibilite .... OK\n> tests ............ OK\n> perf-budget ...... OK\n> security-check ... OK\n\nCible de deploiement: production",
      "approach.eyebrow": "METHODE DE TRAVAIL",
      "approach.title": "Construire des choses complexes, les rendre fiables.",
      "approach.card1_title": "Architecture d'abord",
      "approach.card1_text": "Je priorise des frontieres claires, des contrats explicites et des composants maintenables avant de faire grossir les features.",
      "approach.card2_title": "Securite par defaut",
      "approach.card2_text": "Le code defensif, l'hygiene de dependances et les pratiques de hardening sont integres des le depart.",
      "approach.card3_title": "Pipeline qualite",
      "approach.card3_text": "Checks automatises, budgets de performance et tests de non-regression pilotent chaque livraison.",
      "projects.eyebrow": "PROJETS SELECTIONNES",
      "projects.title": "Des projets qui demontrent une vraie profondeur technique.",
      "projects.filters_aria": "Filtres de projets",
      "projects.filter_all": "Tout",
      "projects.filter_automation": "Automatisation",
      "projects.filter_web": "Web",
      "projects.filter_game": "Jeu",
      "projects.p1_alt": "Capture du projet Moon's Script Builder",
      "projects.p1_tag": "Game Tooling / Lua",
      "projects.p1_title": "Moon's Script Builder",
      "projects.p1_desc": "Environnement d'execution de scripts en direct sur Roblox avec systeme de commandes, sandbox utilisateur et workflows d'ingestion de contenu externe.",
      "projects.p1_b1": "8949 lignes de code au total",
      "projects.p1_b2": "206 commandes coeur",
      "projects.p1_b3": "Integration proxy et datastore",
      "projects.p1_link_live": "Projet live",
      "projects.p2_alt": "Capture de l'extension de traduction d'images",
      "projects.p2_tag": "Extension Navigateur",
      "projects.p2_title": "Image Translator Extension",
      "projects.p2_desc": "Extension Chrome qui extrait le texte depuis des images, le traduit et recompose le visuel pour accelerer la lecture de mangas et documents.",
      "projects.p2_b1": "Pipeline OCR integre",
      "projects.p2_b2": "Traitement cote client",
      "projects.p2_b3": "Flux d'overlay de traduction",
      "projects.p2_link_source": "Code source",
      "projects.p2_link_download": "Telecharger",
      "projects.p3_tag": "Frontend Engineering",
      "projects.p3_title": "Portfolio Platform v2",
      "projects.p3_desc": "Refonte complete centree sur une identite visuelle forte, l'accessibilite, la performance et une livraison statique securisee.",
      "projects.p3_b1": "Structure semantique et accessible",
      "projects.p3_b2": "Systeme de motion responsive",
      "projects.p3_b3": "Hardening via CSP et liens externes securises",
      "projects.p3_link": "Demander une presentation detaillee",
      "projects.full_library": "Voir la bibliotheque complete",
      "stack.eyebrow": "STACK D'INGENIERIE",
      "stack.title": "Outils et domaines avec lesquels je travaille.",
      "stack.belt": "JavaScript | TypeScript | Python | Lua | SQL | Git | API Design | UX Engineering | Secure Coding | Automation",
      "stack.card1_title": "Langages",
      "stack.card1_text": "Lua, Python, JavaScript, TypeScript, SQL, Java",
      "stack.card2_title": "Product Engineering",
      "stack.card2_text": "Architecture frontend, composants reutilisables, gestion d'etat et boucle d'amelioration UX.",
      "stack.card3_title": "Pratiques Dev",
      "stack.card3_text": "Strategie Git, code review, reflexes CI et durcissement progressif en production.",
      "timeline.eyebrow": "PARCOURS",
      "timeline.title": "De l'experimentation a la discipline produit.",
      "timeline.i1_title": "2013 - Phase d'inspiration",
      "timeline.i1_text": "Decouverte des ecosystemes de script builders et debut des experimentations sur des outils runtime.",
      "timeline.i2_title": "2021 - Changement d'echelle",
      "timeline.i2_text": "Moon's Script Builder atteint environ un million de joueurs et valide des choix d'architecture a grande echelle.",
      "timeline.i3_title": "2023+ - Evolution securite et moderation",
      "timeline.i3_text": "Adaptation des decisions produit face a des contraintes de moderation plus strictes et a la gestion de risques.",
      "timeline.i4_title": "Aujourd'hui - Portfolio v2",
      "timeline.i4_text": "Construction d'une vitrine plus forte avec des fondations frontend qualite et production-ready.",
      "contact.eyebrow": "CONTACT",
      "contact.title": "Disponible pour stage et collaborations de dev.",
      "contact.email_title": "Email",
      "contact.copy_email": "Copier l'email",
      "contact.copy_email_done": "Email copie",
      "contact.github_title": "GitHub",
      "contact.direct_title": "Direct",
      "contact.phone": "Telephone : 06 45 90 87 81",
      "contact.discord": "Discord : leoperon.",
      "footer.prefix": "Copyright",
      "footer.suffix": "Leo Peron. Tous droits reserves."
    },
    en: {
      "meta.title": "Leo Peron | Software Developer Portfolio",
      "meta.description": "Portfolio of Leo Peron - software developer focused on product quality, security, and performance.",
      "a11y.skip_link": "Skip to content",
      "brand.home_aria": "Go to home",
      "brand.role": "Software Developer",
      "nav.open_menu": "Open menu",
      "nav.aria_label": "Main navigation",
      "nav.home": "Home",
      "nav.approach": "Approach",
      "nav.projects": "Projects",
      "nav.library": "Library",
      "nav.stack": "Stack",
      "nav.timeline": "Timeline",
      "nav.contact": "Contact",
      "lang.aria_label": "Language selection",
      "noscript.banner": "JavaScript is disabled. The site still works, but animations and filters are not active.",
      "hero.eyebrow": "PORTFOLIO 2026",
      "hero.title": "I design and ship resilient software experiences.",
      "hero.lead": "I am Leo Peron, a software developer focused on product quality, security-first engineering, and interfaces built with intention.",
      "hero.cta_projects": "Explore projects",
      "hero.cta_contact": "Start a discussion",
      "hero.metrics_aria": "Key metrics",
      "hero.metric_lines": "Lines on Moon's Script Builder",
      "hero.metric_commands": "Production commands",
      "hero.metric_players": "Players reached",
      "hero.terminal_aria": "Engineering workflow snapshot",
      "hero.terminal_header": "quality-run.log",
      "hero.terminal_code": "$ npm run quality:full\n> lint ............. OK\n> accessibility .... OK\n> tests ............ OK\n> perf-budget ...... OK\n> security-check ... OK\n\nDeploy target: production",
      "approach.eyebrow": "WORK MINDSET",
      "approach.title": "Build hard things, keep them reliable.",
      "approach.card1_title": "Architecture First",
      "approach.card1_text": "I prioritize clean boundaries, explicit contracts, and maintainable components before scaling features.",
      "approach.card2_title": "Security by Default",
      "approach.card2_text": "Defensive coding, dependency hygiene, and hardening practices are integrated from day one.",
      "approach.card3_title": "Quality Pipeline",
      "approach.card3_text": "Automated checks, measurable performance budgets, and regression tests drive every release.",
      "projects.eyebrow": "SELECTED WORK",
      "projects.title": "Projects that demonstrate real engineering depth.",
      "projects.filters_aria": "Project filters",
      "projects.filter_all": "All",
      "projects.filter_automation": "Automation",
      "projects.filter_web": "Web",
      "projects.filter_game": "Game",
      "projects.p1_alt": "Moon's Script Builder project screenshot",
      "projects.p1_tag": "Game Tooling / Lua",
      "projects.p1_title": "Moon's Script Builder",
      "projects.p1_desc": "Live script execution environment on Roblox with command system, user sandboxing, and external content ingestion workflows.",
      "projects.p1_b1": "8949 total lines of code",
      "projects.p1_b2": "206 core commands",
      "projects.p1_b3": "Proxy and datastore integration",
      "projects.p1_link_live": "Live project",
      "projects.p2_alt": "Image translator extension screenshot",
      "projects.p2_tag": "Browser Extension",
      "projects.p2_title": "Image Translator Extension",
      "projects.p2_desc": "Chrome extension that extracts text from images, translates it, and rewrites visual content to speed up manga and document reading.",
      "projects.p2_b1": "OCR pipeline integration",
      "projects.p2_b2": "Client-side processing",
      "projects.p2_b3": "Translation overlay flow",
      "projects.p2_link_source": "Source code",
      "projects.p2_link_download": "Download",
      "projects.p3_tag": "Frontend Engineering",
      "projects.p3_title": "Portfolio Platform v2",
      "projects.p3_desc": "Full redesign focused on strong visual identity, accessibility, performance, and secure static delivery.",
      "projects.p3_b1": "Semantic and accessible structure",
      "projects.p3_b2": "Responsive motion system",
      "projects.p3_b3": "Hardening via CSP and secure external linking",
      "projects.p3_link": "Request a detailed walkthrough",
      "projects.full_library": "Open full project library",
      "stack.eyebrow": "ENGINEERING STACK",
      "stack.title": "Tools and domains I work with.",
      "stack.belt": "JavaScript | TypeScript | Python | Lua | SQL | Git | API Design | UX Engineering | Secure Coding | Automation",
      "stack.card1_title": "Languages",
      "stack.card1_text": "Lua, Python, JavaScript, TypeScript, SQL, Java",
      "stack.card2_title": "Product Engineering",
      "stack.card2_text": "Frontend architecture, reusable components, state management, and UX quality loops.",
      "stack.card3_title": "Dev Practices",
      "stack.card3_text": "Git strategy, code review, CI mindset, and progressive production hardening.",
      "timeline.eyebrow": "JOURNEY",
      "timeline.title": "From experimentation to product discipline.",
      "timeline.i1_title": "2013 - Inspiration Phase",
      "timeline.i1_text": "Discovered script-builder ecosystems and started experimenting with runtime tooling.",
      "timeline.i2_title": "2021 - Scale Shift",
      "timeline.i2_text": "Moon's Script Builder reached around one million players and validated large-scale architecture decisions.",
      "timeline.i3_title": "2023+ - Security and Moderation Shift",
      "timeline.i3_text": "Adapted product decisions to stricter moderation constraints and stronger risk ownership.",
      "timeline.i4_title": "Today - Portfolio v2",
      "timeline.i4_text": "Building a stronger engineering presence with quality-driven, production-ready frontend foundations.",
      "contact.eyebrow": "CONTACT",
      "contact.title": "Open for internships and developer collaborations.",
      "contact.email_title": "Email",
      "contact.copy_email": "Copy email",
      "contact.copy_email_done": "Email copied",
      "contact.github_title": "GitHub",
      "contact.direct_title": "Direct",
      "contact.phone": "Phone: 06 45 90 87 81",
      "contact.discord": "Discord: leoperon.",
      "footer.prefix": "Copyright",
      "footer.suffix": "Leo Peron. All rights reserved."
    }
  };

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const langButtons = document.querySelectorAll(".lang-btn[data-lang]");
  const metaDescription = document.querySelector("#meta-description");
  const counters = document.querySelectorAll(".metric-value[data-counter]");

  let currentLanguage = "fr";

  const getTranslation = (key) => {
    return (
      translations[currentLanguage]?.[key] ??
      translations.fr[key] ??
      ""
    );
  };

  const updateLanguageButtons = (language) => {
    langButtons.forEach((button) => {
      const isActive = button.dataset.lang === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const formatCounter = (value, format) => {
    const locale = currentLanguage === "fr" ? "fr-FR" : "en-US";

    if (format === "compact") {
      return new Intl.NumberFormat(locale, {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }).format(value);
    }

    return new Intl.NumberFormat(locale).format(value);
  };

  const refreshAnimatedCounters = () => {
    counters.forEach((counter) => {
      if (counter.dataset.animated !== "true") {
        return;
      }

      const target = Number.parseInt(counter.dataset.counter || "0", 10);
      const format = counter.dataset.format || "default";
      counter.textContent = formatCounter(target, format);
    });
  };

  const applyTranslations = (language) => {
    currentLanguage = language in translations ? language : "fr";
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const value = getTranslation(key);
      if (value) {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      const value = getTranslation(key);
      if (value) {
        element.setAttribute("aria-label", value);
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const key = element.dataset.i18nAlt;
      const value = getTranslation(key);
      if (value) {
        element.setAttribute("alt", value);
      }
    });

    const title = getTranslation("meta.title");
    const description = getTranslation("meta.description");

    if (title) {
      document.title = title;
    }

    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }

    refreshAnimatedCounters();
    updateLanguageButtons(currentLanguage);
  };

  const setLanguage = (language, persist) => {
    applyTranslations(language);

    if (persist) {
      try {
        localStorage.setItem(storageKey, currentLanguage);
      } catch {
        // Ignore storage errors (private mode / strict browsers).
      }
    }
  };

  const getInitialLanguage = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && stored in translations) {
        return stored;
      }
    } catch {
      // Ignore storage access errors.
    }

    return "fr";
  };

  setLanguage(getInitialLanguage(), false);

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.lang || "fr";
      setLanguage(language, true);
    });
  });

  const setMenuState = (open) => {
    if (!navToggle || !siteNav) {
      return;
    }

    navToggle.setAttribute("aria-expanded", String(open));
    siteNav.classList.toggle("is-open", open);
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      setMenuState(!expanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const sections = document.querySelectorAll("main section[id]");
  const navById = new Map();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      return;
    }
    navById.set(href.slice(1), link);
  });

  const setCurrentNav = (id) => {
    navLinks.forEach((link) => link.classList.remove("is-current"));
    const activeLink = navById.get(id);
    if (activeLink) {
      activeLink.classList.add("is-current");
    }
  };

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const filterButtons = document.querySelectorAll(".chip[data-filter]");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  const applyFilter = (filter) => {
    projectCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      applyFilter(button.dataset.filter || "all");
    });
  });

  const animateCounters = () => {
    counters.forEach((counter) => {
      const target = Number.parseInt(counter.dataset.counter || "0", 10);
      const format = counter.dataset.format || "default";

      if (!Number.isFinite(target) || target <= 0) {
        return;
      }

      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        counter.textContent = formatCounter(value, format);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.dataset.animated = "true";
        }
      };

      counter.textContent = "0";
      requestAnimationFrame(tick);
    });
  };

  if (counters.length > 0) {
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      const firstCounter = counters[0];
      const counterObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            animateCounters();
            observer.disconnect();
          });
        },
        { threshold: 0.5 }
      );

      counterObserver.observe(firstCounter);
    } else {
      animateCounters();
    }
  }

  const copyEmailButton = document.querySelector("#copy-email");

  if (copyEmailButton instanceof HTMLButtonElement) {
    copyEmailButton.addEventListener("click", async () => {
      const email = copyEmailButton.dataset.email || "";
      if (!email) {
        return;
      }

      try {
        await navigator.clipboard.writeText(email);
        copyEmailButton.textContent = getTranslation("contact.copy_email_done");

        window.setTimeout(() => {
          copyEmailButton.textContent = getTranslation("contact.copy_email");
        }, 1500);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  document.querySelectorAll("a[target='_blank']").forEach((link) => {
    const relValue = link.getAttribute("rel") || "";
    const safeRel = relValue.includes("noopener") && relValue.includes("noreferrer");
    if (!safeRel) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  const year = document.querySelector("#year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
