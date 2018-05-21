import { dashToCamel } from './case'
import traverse from './traverse'

export default class Base extends HTMLElement {

  constructor() {
    super()
    this.__values = {}
    this.__bindings = {}
    this.attachShadow({mode:'open'})
    if (this.template) {
      window.requestAnimationFrame(() => this.render(this.template))
    }
  }

  find(selector) {
    return this.shadowRoot.querySelector(selector)
  }

  componentDidRender() {

  }

  update(key) {
    this.__bindings[key] && this.__bindings[key].forEach(node => node.__bind())
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const prop = dashToCamel(name)
    if (this.hasOwnProperty(prop) && oldValue !== newValue) {
      this[prop] = newValue
      this.update(prop)
    }
  }

  connectedCallback() {
    this.dispatchEvent(new Event('connected'))
  }

  disconnectedCallback() {
    this.dispatchEvent(new Event('disconnected'))
  }

  render (tpl) {
    const content = tpl.content.cloneNode(true)
    traverse.call(this, content)
    Object.keys(this.__bindings).forEach(key => {
      this.__values[key] = this[key]
      Object.defineProperty(this, key, {
        configurable: true,
        get: function () { return this.__values[key] },
        set: function (v) {
          this.__values[key] = v
          this.update(key)
          return v
        }
      })
    })
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.appendChild(content)
    const { sharedStyles } = this.constructor
    if (sharedStyles) {
      const style = document.createElement('style')
      style.textContent = sharedStyles.textContent
      this.shadowRoot.appendChild(style)
    }
    this.componentDidRender()
  }

}