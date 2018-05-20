import { camelToDash } from './case'

export default function attribute(target, key, descriptor) {
  const clazz = target.constructor
  clazz.observedAttributes = clazz.observedAttributes || []
  clazz.observedAttributes.push(camelToDash(key))
  descriptor.writable = true
  descriptor.configurable = true
}