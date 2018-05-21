import template from './template';
import Base from './Base';
import attribute from './attribute'
import connect, { dispatch } from './connect'
import sharedStyles from './sharedStyles'

@template(`
    <div class="jumbotron">
    <h1>Simple text binding demo</h1>
    <h4>Binding to a single property: Hello {fullName}</h4>
    <input id="inpFirst" type="text" placeholder="Enter your first name" />
    <input id="inpLast" type="text" placeholder="Enter your last name" />
    </div>
    <div>
        <h5>Binding to multiple properties with deep nesting</h5>
        Another text node with nested values and multiple properties:
        <br/>
        The text field is bound to { { user.first } } and { { user.last } }
        {user.first}, {user.last}
    </div>
    <hr />
    <div>This comes from attributes: {firstName}, {lastName}</div>
    <template if="user.myBoolean">
        <hr/>
        <div>Value is TRUE and your name is {fullName}</div>
        <hr/>
    </template>
    <button id="toggleButton">Toggle</button>
    <hr/>
    <h4>Type your email</h4>
    <input id="inpEmail" type="email" />
    <button id="emailButton">Update email</button>
    <h5>Your email is {user.email}</h5>
`)
@sharedStyles('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css')
class MyApp extends Base {

  constructor () {
    super()
    this.items = ['Apple', 'Banana', 'Juice']
    this.myBoolean = true
    this.fullName = ''

  }

  @attribute
  firstName

  @attribute
  lastName

  @connect('user')
  user

  componentDidRender() {
    const inpFirst = this.find('#inpFirst')
    const inpLast = this.find('#inpLast')
    inpFirst.oninput = inpLast.oninput = () => {
      this.user.first = inpFirst.value
      this.user.last = inpLast.value
      this.fullName = inpFirst.value + ' ' + inpLast.value
      this.update('user')
    }
    const button = this.find('#toggleButton')
    button.onclick = () => {
      this.user.myBoolean = !this.user.myBoolean
      this.update('user')
    }

    const emailButton = this.find('#emailButton')
    emailButton.onclick = () => {
      const email = this.find('#inpEmail').value
      dispatch({
        type: 'SET_EMAIL',
        data: email
      })
    }
  }
}

customElements.define('my-app', MyApp)