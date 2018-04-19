const Style = (_ => {

  const prop = new Map();
  const prefix = 'webkit,moz,ms,chrome,o,khtml'.split(',');
  const NONE = {};
  const getKey = k => {
    let key = prop.get(k);

    if (!key) {
      const s = document.body.style;
      if (k in s) prop.set(k, key = k);
      else if (!prefix.some(v => {
          const newKey = v + k[0].toUpperCase() + k.substr(1);
          if (newKey in s) return prop.set(k, key = newKey);
        })) prop.set(k, key = NONE);
    }
    return key;
  }

  return class {

    constructor(style) {
      this._style = style;
    }

    set(k, v) {
      const key = getKey(k);
      if (key !== NONE) this._style[key] = v;
    }

    get(k) {
      const key = getKey(k);
      return key === NONE ? null : this._style[key];
    }
  };
})();

const Rule = (_ => {

  const trap = {
    get(rule, key) {
      return rule._style.get(key);
    },
    set(rule, key, val) {
      rule._style.set(key, val);
    }
  };

  return class {
    constructor(rule) {
      this._rule = rule;
      this._style = new Style(rule.style);
      return new Proxy(this, trap);
    }
  };

})();

const CSS = class {

  constructor(sheet) {
    this._sheet = sheet;
    this._rules = new WeakMap();
  }

  log() {
    console.log(
      Array.from(this._sheet.cssRules).reduce(
        (prev, curr) => {
          return prev + `${curr.cssText}\n`;
        }, ''
      )
    );
  }

  add(selector, index = -1) {
    const sheet = this._sheet,
      rules = sheet.cssRules;
    if (index == -1) index = rules.length;
    const rule = rules[sheet.insertRule(`${selector}{}`, index)];
    const ret = new Rule(rule);
    this._rules.set(rule, ret);
    return ret;

  }

  remove(key = null) {
    const sheet = this._sheet,
      rules = sheet.cssRules;
    if (key === null) {
      let i = rules.length;
      while (i--) sheet.deleteRule(i);
    } else switch (typeof key) {
      case 'number':
        sheet.deleteRule(i);
        break;
      case 'string':
        let i = rules.length;
        while (i--)
          if (rules[i].selectorText == key) sheet.deleteRule(i);
        break;
    }
  }
  get(key) {
    const sheet = this._sheet,
      rules = sheet.cssRules;
    switch (typeof key) {
      case 'number':
        return this._rules.get(rules[key]);
      case 'string':
        return Array.from(rules)
          .filter(r => r.selectorText == key)
          .map(r => this._rules.get(r));
    }
  }
}
