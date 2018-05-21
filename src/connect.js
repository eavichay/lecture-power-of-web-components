import store from './store'

export default function connect(namespace) {
  return function (proto, key, descriptor) {

    let unsubscribe

    descriptor.initializer = function () {
      this.addEventListener('connected', () => {
        unsubscribe = store.subscribe( () => {
          this[key] = store.getState()[namespace]
          this.update(key)
        })
      })
      this.addEventListener('disconnected', () => unsubscribe())
    }
    descriptor.writable = true
  }
}

export const dispatch = (action) => store.dispatch(action)