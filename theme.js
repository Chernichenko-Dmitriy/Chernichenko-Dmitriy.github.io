(() => {
  "use strict";

  const STORAGE_KEY = "resume-theme";
  const WINDOW_NAME_KEY = "portfolio-theme";
  const DEFAULT_THEME = "dark";
  const VALID_THEMES = new Set(["dark", "light"]);
  const THEME_COLORS = {
    dark: "#030712",
    light: "#f3f6fb"
  };

  const isValidTheme = (value) => VALID_THEMES.has(value);

  const readQueryTheme = () => {
    try {
      const value = new URL(window.location.href).searchParams.get("theme");
      return isValidTheme(value) ? value : null;
    } catch {
      return null;
    }
  };

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return isValidTheme(value) ? value : null;
    } catch {
      return null;
    }
  };

  const readWindowNameTheme = () => {
    const match = window.name.match(/(?:^|\|)portfolio-theme=(dark|light)(?=\||$)/);
    return match ? match[1] : null;
  };

  const writeWindowNameTheme = (theme) => {
    const marker = `${WINDOW_NAME_KEY}=${theme}`;
    const parts = window.name
      .split("|")
      .filter(Boolean)
      .filter((part) => !part.startsWith(`${WINDOW_NAME_KEY}=`));

    parts.push(marker);
    window.name = parts.join("|");
  };

  const storeTheme = (theme) => {
    writeWindowNameTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* file:// pages and privacy-restricted contexts may block shared storage. */
    }
  };

  const getTheme = () =>
    readQueryTheme() ||
    readStoredTheme() ||
    readWindowNameTheme() ||
    (isValidTheme(document.documentElement.dataset.theme)
      ? document.documentElement.dataset.theme
      : DEFAULT_THEME);

  const updateThemeMeta = (theme) => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", THEME_COLORS[theme]);
    }
  };

  const updateToggle = (theme) => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    const isLight = theme === "light";
    toggle.textContent = isLight ? "Dark Theme" : "Light Theme";
    toggle.setAttribute(
      "aria-label",
      `Switch to ${isLight ? "dark" : "light"} theme`
    );
    toggle.setAttribute("aria-pressed", String(isLight));
  };

  const isPortfolioPage = (url) => {
    const decodedPath = decodeURIComponent(url.pathname);
    return (
      decodedPath.endsWith("/index.html") ||
      decodedPath.endsWith("/fluid-typography-showcase.html") ||
      decodedPath.endsWith("/Profile Card/profile-card.html")
    );
  };


  const updateCurrentUrlTheme = (theme) => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("theme", theme);
      window.history.replaceState(window.history.state, "", url.href);
    } catch {
      /* Some embedded previews may not allow history replacement. */
    }
  };

  const updateInternalLinks = (theme) => {
    document.querySelectorAll("a[href]").forEach((anchor) => {
      try {
        const url = new URL(anchor.getAttribute("href"), window.location.href);
        if (!isPortfolioPage(url)) return;

        url.searchParams.set("theme", theme);
        anchor.href = url.href;
      } catch {
        /* Ignore malformed or unsupported links. */
      }
    });
  };

  const applyTheme = (theme, { persist = false } = {}) => {
    const safeTheme = isValidTheme(theme) ? theme : DEFAULT_THEME;
    document.documentElement.dataset.theme = safeTheme;
    updateThemeMeta(safeTheme);
    updateToggle(safeTheme);

    if (document.readyState !== "loading") {
      updateInternalLinks(safeTheme);
    }

    if (persist) {
      updateCurrentUrlTheme(safeTheme);
      storeTheme(safeTheme);
    } else {
      writeWindowNameTheme(safeTheme);
    }

    return safeTheme;
  };

  // Apply immediately from <head> to avoid a light/dark flash.
  applyTheme(getTheme());

  document.addEventListener("DOMContentLoaded", () => {
    const activeTheme = applyTheme(getTheme());
    const toggle = document.getElementById("themeToggle");

    if (toggle) {
      toggle.addEventListener("click", () => {
        const nextTheme =
          document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, { persist: true });
      });
    }

    updateInternalLinks(activeTheme);
  });

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY && isValidTheme(event.newValue)) {
      applyTheme(event.newValue);
    }
  });

  window.addEventListener("pageshow", () => applyTheme(getTheme()));
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) applyTheme(getTheme());
  });
})();
