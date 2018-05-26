export function lookup(target, path) {
  let o = target
  let i = 0
  while (o && i < path.length) {
    o = o[path[i++]]
  }
  return o
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
  }
  for (const childNode of node.childNodes) {
    traverse.call(this, childNode)
  }
}