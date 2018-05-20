import template from './template';
import Base from './Base';
import attribute from './attribute'

@template(`
    <h1>Hello {fullName}</h1>
    <input id="inpFirst" type="text" placeholder="Enter your first name" />
    <input id="inpLast" type="text" placeholder="Enter your last name" />
    <div>Another text node with nested values {user.first}, {user.last}</div>
    <hr />
    <div>This comes from attributes: {firstName}, {lastName}</div>
    <template if="user.myBoolean">
        <hr/>
        <div>Value is TRUE and your name is {fullName}</div>
        <hr/>
    </template>
    <template repeat="items">
        <div>{item}</div>
    </template>
    <button>Toggle</button>
`)
class MyApp extends Base {

  constructor () {
    super()
    this.user = {
      first: '',
      last: '',
      myBoolean: false
    }
    this.items = ['Apple', 'Banana', 'Juice']
    this.myBoolean = true
    this.fullName = ''

  }

  @attribute
  firstName

  @attribute
  lastName

  componentDidRender() {
    const inpFirst = this.find('#inpFirst')
    const inpLast = this.find('#inpLast')
    inpFirst.oninput = inpLast.oninput = () => {
      this.user.first = inpFirst.value
      this.user.last = inpLast.value
      this.fullName = inpFirst.value + ' ' + inpLast.value
      this.update('user')
    }
    const button = this.find('button')
    button.onclick = () => {
      this.user.myBoolean = !this.user.myBoolean
      this.update('user')
    }
  }
}

customElements.define('my-app', MyApp)