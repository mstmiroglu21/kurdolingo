async function loadLang(langCode) {
    try {
      const response = await fetch(`i18n/${langCode}.json`);
      const data = await response.json();
  
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });
  
      document.title = data["title"] || document.title;
    } catch (error) {
      console.error("Dil dosyası yüklenemedi:", error);
    }
  }
  
  // Otomatik tarayıcı dilini algıla
  const browserLang = navigator.language.slice(0, 2);
  const supportedLangs = ["tr", "en", "ku"];
  const defaultLang = supportedLangs.includes(browserLang) ? browserLang : "tr";
  
  // LocalStorage'da kullanıcı tercihi varsa onu kullan
  const storedLang = localStorage.getItem("kurdolingo_lang") || defaultLang;
  loadLang(storedLang);
  