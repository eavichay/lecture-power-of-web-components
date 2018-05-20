export function lookup(target, path) {
  let o = target
  let i = 0
  while (o && i < path.length) {
    o = o[path[i++]]
  }
  return o
}

function unbind(node) {
  if (node.__bindings) {
    Object.keys(node.__bindings).forEach(key => {
      const arr = this.__bindings[key] || []
      const idx = arr.indexOf(node)
      if (idx >= 0) {
        arr.splice(idx, 1)
      }
    })
  }
  for (const child of node.childNodes) {
    unbind.call(this, child)
  }
}

export default function traverse(node) {
  switch (node.nodeType) {
    case Node.TEXT_NODE:
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
        node.__bindings = node.__bindings || {}
        node.__bindings[key] = true
      }
      if (keys.length) {
        node.__sourceText = node.textContent
        node.__bind = () => {
          let result = node.__sourceText
          keys.forEach((key, idx) => {
            const expression = matches[idx]
            const value = lookup(this, key.split('.'))
            result = result.split(expression).join(String(value))
          })
          node.textContent = result
        }
        node.__bind()
      }
      break;

    case Node.ELEMENT_NODE:
      if (node.localName === 'template') {
        if (node.hasAttribute('if')) {
          const path = node.getAttribute('if').split('.')
          const prop = path[0]
          let entries = []
          this.__bindings[prop] = this.__bindings[prop] || []
          this.__bindings[prop].push(node)
          node.__bind = () => {
            const value = lookup(this, path)
            if (value) {
              const clone = node.content.cloneNode(true)
              entries = [...clone.children]
              traverse.call(this, clone)
              this.shadowRoot.insertBefore(clone, node)
            } else {
              for (const entry of entries) {
                unbind.call(this, entry)
                entry.remove()
              }
            }
          }
        }
      }
      break;
  }
  for (const childNode of node.childNodes) {
    traverse.call(this, childNode)
  }
}