(() => {
  const GROUPS = [
    { id: "A", label: { fr: "Projets Roblox (jeux, systemes, UI, plugin)", en: "Roblox projects (games, systems, UI, plugins)" } },
    { id: "B", label: { fr: "Web, UI et branding", en: "Web, UI and branding" } },
    { id: "C", label: { fr: "Python et automatisation", en: "Python and automation" } },
    { id: "D", label: { fr: "Java, SAE et algorithmique", en: "Java, coursework and algorithms" } },
    { id: "E", label: { fr: "SQL et bases de donnees", en: "SQL and databases" } },
    { id: "F", label: { fr: "Linux, DevOps, reseau et outils", en: "Linux, DevOps, networking and tools" } },
    { id: "G", label: { fr: "Gestion de projet, docs et oraux", en: "Project management, docs and speaking" } },
    { id: "H", label: { fr: "Assets graphiques", en: "Graphic assets" } }
  ];

  const GROUP_BY_NUMBER = [
    { min: 1, max: 5, group: "A" },
    { min: 6, max: 9, group: "B" },
    { min: 10, max: 13, group: "C" },
    { min: 14, max: 19, group: "D" },
    { min: 20, max: 22, group: "E" },
    { min: 23, max: 25, group: "F" },
    { min: 26, max: 29, group: "G" },
    { min: 30, max: 31, group: "H" }
  ];

  const CATEGORIES = {
    A: ["Roblox", "Lua", "Game Dev"],
    B: ["Web", "UI", "Product"],
    C: ["Python", "Automation", "Data"],
    D: ["Java", "Algorithms", "OOP"],
    E: ["SQL", "Database", "Data Modeling"],
    F: ["Linux", "DevOps", "Tooling"],
    G: ["Project Mgmt", "Docs", "Presentation"],
    H: ["Design", "Branding", "Assets"]
  };

  const MOJIBAKE_MAP = [
    ["\u00e2\u20ac\u201d", "-"],
    ["\u00e2\u20ac\u201c", "-"],
    ["\u00e2\u20ac\u2122", "'"],
    ["\u00e2\u20ac\u0153", "\""],
    ["\u00e2\u20ac\u009d", "\""],
    ["\u00e2\u20ac\u00a6", "..."],
    ["\u00c2\u00ab", "\""],
    ["\u00c2\u00bb", "\""],
    ["\u00c2", ""],
    ["\u00c3\u00a0", "a"],
    ["\u00c3\u00a2", "a"],
    ["\u00c3\u00a4", "a"],
    ["\u00c3\u00a9", "e"],
    ["\u00c3\u00a8", "e"],
    ["\u00c3\u00aa", "e"],
    ["\u00c3\u00ab", "e"],
    ["\u00c3\u00ae", "i"],
    ["\u00c3\u00af", "i"],
    ["\u00c3\u00b4", "o"],
    ["\u00c3\u00b6", "o"],
    ["\u00c3\u00b9", "u"],
    ["\u00c3\u00bb", "u"],
    ["\u00c3\u00bc", "u"],
    ["\u00c3\u00a7", "c"],
    ["\u00c3\u20ac", "A"],
    ["\u00c3\u2030", "E"]
  ];

  const SPECIAL_IMAGES = {
    1: "Images/Roblox_SbProject.png",
    2: "Images/Roblox_SbProject.png",
    10: "Images/ChromeExtenstion.png"
  };

  const cache = {
    loaded: null
  };

  function inferGroupByNumber(number) {
    const hit = GROUP_BY_NUMBER.find((entry) => number >= entry.min && number <= entry.max);
    return hit ? hit.group : "H";
  }

  function cleanupText(value) {
    let out = String(value || "");
    MOJIBAKE_MAP.forEach(([from, to]) => {
      out = out.split(from).join(to);
    });
    out = out.replace(/[\u2019]/g, "'");
    out = out.replace(/[\u201c\u201d]/g, "\"");
    out = out.replace(/[\u2010\u2011\u2012\u2013\u2014]/g, "-");
    out = out.replace(/\u00A0/g, " ");
    out = out.replace(/\s+/g, " ").trim();
    out = out.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    return out;
  }

  function slugify(value) {
    return cleanupText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function startSection(project, titleRaw) {
    const title = cleanupText(titleRaw || "Apercu");
    const section = {
      key: slugify(title) || "apercu",
      title,
      lines: []
    };
    project.sections.push(section);
    return section;
  }

  function computeSummary(project) {
    for (const section of project.sections) {
      const paragraph = section.lines.find((line) => line.type === "p" && line.text.length > 40);
      if (paragraph) {
        return paragraph.text;
      }
    }

    for (const section of project.sections) {
      const bullet = section.lines.find((line) => line.type === "li");
      if (bullet) {
        return bullet.text;
      }
    }

    return "Projet detaille dans la bibliotheque.";
  }

  function computeTags(project) {
    const corpus = `${project.title} ${project.summary} ${project.sections.map((section) => section.title).join(" ")}`.toLowerCase();
    const base = new Set(CATEGORIES[project.group] || []);

    const keywordTags = [
      { keys: ["roblox", "lua"], tag: "Roblox" },
      { keys: ["python", "tkinter"], tag: "Python" },
      { keys: ["java", "maven"], tag: "Java" },
      { keys: ["sql", "oracle"], tag: "SQL" },
      { keys: ["ux", "ui"], tag: "UX/UI" },
      { keys: ["plugin"], tag: "Plugin" },
      { keys: ["ansible", "linux", "ssh"], tag: "Infra" },
      { keys: ["git"], tag: "Git" },
      { keys: ["presentation", "oral"], tag: "Communication" },
      { keys: ["design", "icone", "banniere", "branding"], tag: "Design" }
    ];

    keywordTags.forEach((item) => {
      if (item.keys.some((key) => corpus.includes(key))) {
        base.add(item.tag);
      }
    });

    return Array.from(base).slice(0, 6);
  }

  function parseProjectsMarkdown(markdown) {
    const lines = String(markdown || "").split(/\r?\n/);
    const projects = [];

    let currentGroup = "";
    let currentProject = null;
    let currentSection = null;

    const pushProject = () => {
      if (!currentProject) {
        return;
      }

      if (!currentProject.sections.length) {
        startSection(currentProject, "Apercu");
      }

      currentProject.summary = computeSummary(currentProject);
      currentProject.tags = computeTags(currentProject);
      currentProject.id = `${currentProject.number}-${slugify(currentProject.title)}`;
      currentProject.image = SPECIAL_IMAGES[currentProject.number] || "";
      projects.push(currentProject);
      currentProject = null;
      currentSection = null;
    };

    lines.forEach((rawLine) => {
      const line = rawLine.trim();

      if (!line || line === "---") {
        return;
      }

      const groupMatch = line.match(/^#\s*([A-H])\)\s*(.+)$/i);
      if (groupMatch) {
        currentGroup = groupMatch[1].toUpperCase();
        return;
      }

      const projectMatch = line.match(/^##\s*(\d+)\)\s*\*\*(.+?)\*\*$/);
      if (projectMatch) {
        pushProject();

        const number = Number.parseInt(projectMatch[1], 10);
        const title = cleanupText(projectMatch[2]);

        currentProject = {
          id: "",
          number,
          group: currentGroup || inferGroupByNumber(number),
          title,
          summary: "",
          tags: [],
          image: "",
          sections: []
        };

        currentSection = startSection(currentProject, "Apercu");
        return;
      }

      if (!currentProject) {
        return;
      }

      const sectionMatch = line.match(/^###\s*(.+)$/);
      if (sectionMatch) {
        currentSection = startSection(currentProject, sectionMatch[1]);
        return;
      }

      const bulletMatch = line.match(/^[*-]\s+(.+)$/);
      if (bulletMatch) {
        if (!currentSection) {
          currentSection = startSection(currentProject, "Apercu");
        }
        currentSection.lines.push({
          type: "li",
          text: cleanupText(bulletMatch[1])
        });
        return;
      }

      if (!currentSection) {
        currentSection = startSection(currentProject, "Apercu");
      }

      currentSection.lines.push({
        type: "p",
        text: cleanupText(line)
      });
    });

    pushProject();

    return projects.sort((a, b) => a.number - b.number);
  }

  async function loadProjects() {
    if (cache.loaded) {
      return cache.loaded;
    }

    cache.loaded = fetch("./Projets.md", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load Projets.md (${response.status})`);
        }
        return response.text();
      })
      .then((content) => {
        const projects = parseProjectsMarkdown(content);
        return { groups: GROUPS, projects };
      });

    return cache.loaded;
  }

  window.PortfolioProjectsSource = {
    loadProjects
  };
})();
