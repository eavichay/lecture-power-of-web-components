import template from './template';
import Base from './Base';
import attribute from './attribute'
import connect, { dispatch } from './connect'
import sharedStyles from './sharedStyles'

import './typescript/super-toast.ts'

@template(`
    <div class="jumbotron">
    <h1>Simple text binding demo</h1>
    <h4>Binding to a single property: Hello {fullName}</h4>
    <input id="inpFirst" type="text" placeholder="Enter your first name" />
    <input id="inpLast" type="text" placeholder="Enter your last name" />
    </div>
    <div class="container">
      <div>
          <h5>Binding to multiple properties with deep nesting</h5>
          Another text node with nested values and multiple properties:
          <br/>
          The text field is bound to { { user.first } } and { { user.last } }
          {user.first}, {user.last}
      </div>
      <hr />
      <div>This comes from attributes: {firstName}, {lastName}</div>
      <hr />
      <p>Example of condition (boolean if) templating, click the button to toggle on/off. The current value is {user.myBoolean}</p>
      <button id="toggleButton">Toggle</button>
      <template if="user.myBoolean">
        <div class="container" style="padding: 1rem">
          <div class="alert alert-primary" role="alert">
            Great success!
          </div>
        </div>
      </template>
      <hr/>
      <h4>Type your email</h4>
      <input id="inpEmail" type="email" />
      <p>
        Clicking the submit button will invoke redux's action "SET_EMAIL" which will be processed by the reducer.
        <br/>
        The value, then, will be updated on the component using the "connect" feature, used as a @connect() decorator
      </p>
      <button id="emailButton">Update email</button>
      <h5>Your email is {user.email}</h5>
      <super-toast message="Hello there, toast"></super-toast>
    </div>
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
    const inpEmail = this.find('#inpEmail')
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

    inpEmail.value = this.user.email

    const emailButton = this.find('#emailButton')
    emailButton.onclick = () => {
      const email = inpEmail.value
      dispatch({
        type: 'SET_EMAIL',
        data: email
      })
    }
  }
}

customElements.define('my-app', MyApp)