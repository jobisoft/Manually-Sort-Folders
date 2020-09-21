var keyPrefix = "__MSG_";

let localization = {
  updateString(string) {
    let re = new RegExp(keyPrefix + "(.+?)__", "g");
    return string.replace(re, matched => {
      const key = matched.slice(keyPrefix.length, -2);
      return WL.messenger.i18n.getMessage(key) || matched;
    });
  },

  updateSubtree(node) {
    const texts = document.evaluate(
      'descendant::text()[contains(self::text(), "' + keyPrefix + '")]',
      node,
      null,
      window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = 0, maxi = texts.snapshotLength; i < maxi; i++) {
      const text = texts.snapshotItem(i);
      if (text.nodeValue.includes(keyPrefix)) text.nodeValue = this.updateString(text.nodeValue);
    }

    const attributes = document.evaluate(
      'descendant::*/attribute::*[contains(., "' + keyPrefix + '")]',
      node,
      null,
      window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = 0, maxi = attributes.snapshotLength; i < maxi; i++) {
      const attribute = attributes.snapshotItem(i);
      if (attribute.value.includes(keyPrefix)) attribute.value = this.updateString(attribute.value);
    }
  },

  async updateDocument() {
    this.updateSubtree(document);
  }
};

function onLoad(isAddonActivation) {
  console.log("tbsortfolders.js onLoad");
  localization.updateDocument();
  Services.scriptloader.loadSubScript("chrome://messenger/content/customElements.js", window, "UTF-8");
}

function onUnload(isAddonDeactivation) {
  console.log("tbsortfolders.js onUnload");
}
