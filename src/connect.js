import store from './store'
export default function connect(namespace) {
  return function (proto, key, descriptor) {

    let unsubscribe

    descriptor.initializer = function () {
      const update = () => {
        this[key] = store.getState()[namespace]
      }

      this.addEventListener('connected', () => {
        if (unsubscribe) {
          unsubscribe()
        }
        unsubscribe = store.subscribe(update)
        update()
      })
      this.addEventListener('disconnected', () => unsubscribe())
    }
    descriptor.configurable = true
    descriptor.writable = true
    return descriptor
  }
}

export const dispatch = (action) => store.dispatch(action)