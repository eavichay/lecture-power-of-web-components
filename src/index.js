import template from './template';
import Base from './Base';

@template(`
    <h1>Hello {fullName}</h1>
    <input id="inpFirst" type="text" placeholder="Enter your first name" />
    <input id="inpLast" type="text" placeholder="Enter your last name" />
    <div>Another text node with nested values {user.first}, {user.last}</div>
`)
class MyApp extends Base {

  constructor () {
    super()
    this.user = {
      first: '',
      last: ''
    }
    this.fullName = ''
  }

  componentDidRender() {
    const inpFirst = this.find('#inpFirst')
    const inpLast = this.find('#inpLast')
    inpFirst.oninput = inpLast.oninput = () => {
      this.user.first = inpFirst.value
      this.user.last = inpLast.value
      this.fullName = inpFirst.value + ' ' + inpLast.value
      this.update('user')
    }
  }
}

customElements.define('my-app', MyApp)