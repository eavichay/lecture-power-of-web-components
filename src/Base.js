export default class Base extends HTMLElement {

  constructor() {
    super()
    this.__values = {}
    this.__bindings = {}
    this.attachShadow({mode:'open'})
    if (this.template) {
      this.render(this.template)
    }
  }

  static lookup(target, path) {
    let o = target
    let i = 0
    while (o && i < path.length) {
      o = o[path[i++]]
    }
    return o
  }

  find(selector) {
    return this.shadowRoot.querySelector(selector)
  }

  componentDidRender() {

  }

  update(key) {
    this.__bindings[key] && this.__bindings[key].forEach(node => node.__bind())
  }

  render (tpl) {
    const content = tpl.content.cloneNode(true)
    this.__values = {}
    this.__bindings = {}
    function traverse(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // test
        const rgx = /(\{(\S+)\})+/gm
        let matches = []
        let keys = []
        let match
        while (match = rgx.exec(node.textContent)) {
          const key = match[2]
          const keyRoot = key.split('.')[0]
          matches.push(match[0])
          keys.push(key)
          this.__bindings[keyRoot] = this.__bindings[keyRoot] || []
          this.__bindings[keyRoot].push(node)
        }
        if (keys.length) {
          node.__sourceText = node.textContent
          node.__bind = () => {
            let result = node.__sourceText
            keys.forEach((key, idx) => {
              const expression = matches[idx]
              const value = Base.lookup(this, key.split('.'))
              result = result.split(expression).join(String(value))
            })
            node.textContent = result
          }
        }
      } else {
        for (const childNode of node.childNodes) {
          traverse.call(this, childNode)
        }
      }
    }
    traverse.call(this, content)
    Object.keys(this.__bindings).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        get: () => this.__values[key],
        set: (v) => {
          this.__values[key] = v
          this.update(key)
        }
      })
    })
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.appendChild(content)
    this.componentDidRender()
  }

}