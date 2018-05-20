export default function render(string, target) {
  if (string && !target.__tpl) {
    target.__tpl = document.createElement('template')
    target.__tpl.innerHTML = string
  }
  const content = target.__tpl.content.cloneNode(true)
  ;(target.shadowRoot || target).appendChild(content)
}
