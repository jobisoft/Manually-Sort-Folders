(async function main () {

  function addMenuEntries(window) {
    console.log(window);
    
    // We can skip in case it is not a normal window.
    // https://thunderbird-webextensions.readthedocs.io/en/latest/windows.html#windowtype
    if (`${window.type}` !== "normal") {
      return;
    }

    const id = `${window.id}`;

    messenger.LegacyMenu.add(id, {
      "id": "menu_TestItem",
      "type": "menu-label",
      "reference": "activityManager",
      "position": "after",
      "label": messenger.i18n.getMessage("tbsf.menuentry.label"),
      "accesskey": "T",
      "oncommand": "window.openDialog('chrome://tbsortfolders/content/tbsortfolders.xhtml', '', 'chrome,titlebar,toolbar,centerscreen');"
    });
  }


  // Add a Listener for created windows, the passed window obj is described here: 
  // https://thunderbird-webextensions.readthedocs.io/en/latest/windows.html#window
  browser.windows.onCreated.addListener((window) => {
    addMenuEntries(window);
  });

  // Add our menu entries to all already open windows
  const windows = await browser.windows.getAll();
  for (let window of windows) {
    addMenuEntries(window);
  }

  messenger.WindowListener.registerChromeUrl([
    ["content",  "tbsortfolders",          "content/"],
    ["resource", "tbsortfolders",          "modules/"],
    ["locale",   "tbsortfolders", "da",    "locale/da/"],
    ["locale",   "tbsortfolders", "de",    "locale/de/"],
    ["locale",   "tbsortfolders", "en-US", "locale/en-US/"],
    ["locale",   "tbsortfolders", "es-ES", "locale/es-ES/"],
    ["locale",   "tbsortfolders", "fr",    "locale/fr/"],
    ["locale",   "tbsortfolders", "it",    "locale/it/"],
    ["locale",   "tbsortfolders", "ja",    "locale/ja/"],
    ["locale",   "tbsortfolders", "nl",    "locale/nl/"],
    ["locale",   "tbsortfolders", "nb-NO", "locale/nb-NO/"],
    ["locale",   "tbsortfolders", "pl",    "locale/pl/"],
    ["locale",   "tbsortfolders", "pt",    "locale/pt/"],
    ["locale",   "tbsortfolders", "pt-BR", "locale/pt-BR/"],
    ["locale",   "tbsortfolders", "ru-RU", "locale/ru-RU/"],
    ["locale",   "tbsortfolders", "sk",    "locale/sk/"],
    ["locale",   "tbsortfolders", "sr",    "locale/sr/"],
    ["locale",   "tbsortfolders", "sv-SE", "locale/sv-SE/"],
    ["locale",   "tbsortfolders", "zh-CN", "locale/zh-CN/"],
    ["locale",   "tbsortfolders", "zh-TW", "locale/zh-TW/"]
  ]);

  messenger.WindowListener.registerWindow(
    "chrome://messenger/content/messenger.xhtml",
    "chrome://tbsortfolders/content/folderPane.js");

  messenger.WindowListener.registerWindow(
    "chrome://tbsortfolders/content/tbsortfolders.xhtml",
    "chrome://tbsortfolders/content/tbsortfolders.js");

  messenger.WindowListener.startListening();
})()
