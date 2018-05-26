export default function sharedStyles(value) {
  return function(clazz) {
    if (typeof value === 'string') {
      value = [value]
    }
    clazz.sharedStyles = document.createElement('style')
    clazz.sharedStyles.textContent = value.map(url => `@import url(${url})`).join('; ')
  }
}

export const mySharedStyles = [
  'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css'
]