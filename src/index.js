import Base from './Base';

class MyApp extends Base {

  get template() {
    return `
      <div class="jumbotron">
        <h1>Hello, i am a custom element</h1>
        <button class="btn btn-primary">Click me</button>
        <hr />
        <x-greeting data-name="Javascript Israel"></x-greeting>
      </div>
      <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css')</style>
    `
  }

  componentDidRender() {
    this.find('button').onclick = () => {
      alert('Hello')
    }
  }
}

class Greeting extends Base {
  get template () {
    return `
      <div>Hello there, <span>${this.dataset.name}</span> !!!</div>
      <style>@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css')</style>
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