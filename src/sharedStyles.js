export default function sharedStyles(value) {
  return function(clazz) {
    if (typeof value === 'string') {
      value = [value]
    }
    clazz.sharedStyles = document.createElement('style')
    clazz.sharedStyles.textContent = value.map(url => `@import url(${url})`).join('; ')
  }
}