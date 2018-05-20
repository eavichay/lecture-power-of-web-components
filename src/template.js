export default function template(str) {
  return function(constructor) {
    const t = document.createElement('template')
    t.innerHTML = str
    constructor.prototype.template = t
  }
}