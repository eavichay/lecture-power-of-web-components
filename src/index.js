import Base from './Base';
import sharedStyles, { mySharedStyles } from './sharedStyles'


@sharedStyles(mySharedStyles)
class MyApp extends Base {

  get template() {
    return `
      <div class="jumbotron">
        <h1>Hello, i am a custom element</h1>
        <button class="btn btn-primary">Click me</button>
        <hr />
        <x-greeting data-name="Javascript Israel"></x-greeting>
      </div>
    `
  }

  componentDidRender() {
    this.find('button').onclick = () => {
      alert('Hello')
    }
  }
}

@sharedStyles(mySharedStyles)
class Greeting extends Base {
  get template () {
    return `
      <div>Hello there, <span>${this.dataset.name}</span> !!!</div>
      <button class="btn btn-default">Thank you</button>
    `
  }

  static get observedAttributes() {
    return ['data-name']
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    this.render()
  }
}

customElements.define('x-greeting', Greeting)

customElements.define('my-app', MyApp)