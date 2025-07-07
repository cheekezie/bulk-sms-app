(() => {
  const LOADER_ID = "appLoader";

  // Script tag is called before body. wait for body before manipulating loader
  const waitForBody = async () => {
    return new Promise((resolve) => {
      if (document.body) return resolve();
      const observer = new MutationObserver(() => {
        if (document.body) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document.documentElement, { childList: true });
    });
  };
  const showLoader = async () => {
    await waitForBody();
    const loader = document.getElementById(LOADER_ID);
    if (loader) loader.style.display = "flex";
  };

  const hideLoader = () => {
    const loader = document.getElementById(LOADER_ID);
    if (loader) loader.style.display = "none";

    // document.getElementById(LOADER_ID)?.remove();
  };

  const setCookie = (name, value, days = 1) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/`;
  };

  const getCookie = (name) =>
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];

  const applyMetaConfig = (config) => {
    document.documentElement.style.setProperty(
      "--primary",
      config.primaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary",
      config.secondaryColor
    );

    document.documentElement.style.setProperty(
      "--dark-bg",
      config.darkBg ?? "#032e6e"
    );

    document.title = config?.htmlMetaTitle;

    const faviconUrl = config?.favicon;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = faviconUrl;

    const metaDescription = config?.htmlMetaDescription;
    let meta = document.querySelector("meta[name='description']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = metaDescription;
  };

  const setTenantMetaInfo = async () => {
    const hostname = window.location.hostname;
    const cookieKey = `tenant_config_${hostname}`;
    const cached = getCookie(cookieKey);

    // Parse and use saved config
    if (cached) {
      try {
        const cachedConfig = JSON.parse(decodeURIComponent(cached));
        applyMetaConfig(cachedConfig); // ✅ use cached immediately
      } catch (err) {
        console.warn("Invalid cached config. Ignoring...", err);
      }
    }

    // Refresh config in case of changes
    const canShowLoader = !cached;
    if (canShowLoader) await showLoader();

    try {
      const res = await fetch(
        `http://localhost:45000/api/v2/config/domain?url=${hostname}`
        //`https://api.prod.fees.ng/api/v2/config/domain?url=${hostname}`
      );
      if (!res.ok) throw new Error("Failed to fetch domain config");

      const config = (await res.json())?.data;
      if (!config) throw new Error("No config found");

      setCookie(cookieKey, JSON.stringify(config));
      applyMetaConfig(config);
    } catch (err) {
      console.log("Error setting tenant SEO data:", err.message);
      // Set fallbacks here
      document.title = "Fees.ng – Pay Your School Fees Online";

      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = "favicon.ico";

      let meta = document.querySelector("meta[name='description']");
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = "Securely pay your school fees online with Fees.ng.";
    } finally {
      if (canShowLoader) hideLoader();
      window.__tenantMetaReady = true;
    }
  };

  setTenantMetaInfo();
})();
