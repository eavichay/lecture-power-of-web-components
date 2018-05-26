const createTemplate = html => {
  const templateElement = document.createElement('template')
  templateElement.innerHTML = html
  return templateElement
}

export default class Base extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({mode:'open'})
    if (this.template) {
      this.render(createTemplate(this.template))
    }
  }

  find(selector) {
    return this.shadowRoot.querySelector(selector)
  }

  componentDidRender() {

  }

  render (tpl) {
    if (!tpl) {
      tpl = createTemplate(this.template)
    }
    const content = tpl.content.cloneNode(true)
    this.shadowRoot.innerHTML = ''
    this.shadowRoot.appendChild(content)

    const { sharedStyles } = this.constructor
    if (sharedStyles) {
      this.shadowRoot.appendChild(sharedStyles)
    }

    this.componentDidRender()
  }

}