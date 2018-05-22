import store from './store'
export default function connect(namespace) {
  return function (proto, key, descriptor) {

    let unsubscribe

    descriptor.initializer = function () {
      const update = () => {
        if (!this.__values[key]) this.__values[key] = this[key] = store.getState()[namespace]
        this.update(key)
      }

      this.addEventListener('connected', () => {
        if (unsubscribe) {
          unsubscribe()
        }
        unsubscribe = store.subscribe(update)
        update()
        // update()
      })
      this.addEventListener('disconnected', () => unsubscribe())

      // store.dispatch({type:'_COMPONENT_INITIALIZED'})
    }
    descriptor.configurable = true
    descriptor.writable = true
    return descriptor
  }
}

export const dispatch = (action) => store.dispatch(action)