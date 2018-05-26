import template from './template';
import Base from './Base';
import attribute from './attribute'
import connect, { dispatch } from './connect'
import sharedStyles from './sharedStyles'

import './typescript/super-toast.ts'
import './typescript/popup-menu.ts'
import './router/router-outlet.ts'
import './pages/route-profile'
import './pages/route-home'

@template(`
    
    <slot name="toasts"></slot>

    <div class="jumbotron">
      <h1>Simple text binding demo</h1>
      <h4>Binding to a single property: Hello, your name is: {fullName}</h4>
      <input id="inpFirst" type="text" placeholder="Enter your first name" />
      <input id="inpLast" type="text" placeholder="Enter your last name" />
    </div>
    
    <div class="container">
      <h5>Binding to multiple properties with deep nesting</h5>
      Another text node with nested values and multiple properties:
      <br/>
      The text field is bound to { { user.first } } and { { user.last } }
      {user.first}, {user.last}
      <hr />
      <div>This comes from attributes: {firstName}, {lastName}</div>
      <hr />
      <p>Example of condition (boolean if) templating, click the button to toggle on/off. The current value is <strong>{user.myBoolean}</strong></p>
      <button class="btn btn-primary" id="toggleButton">Toggle</button>
      
      <template if="user.myBoolean">
        <div class="container" style="padding: 1rem">
          <div class="alert alert-primary" role="alert">
            Great success, {fullName}!
          </div>
        </div>
      </template>
      
      <hr/>
    </div>
    <div class="container">
      <h2>Type your email</h2>
      <h5>Update via redux actions/reducers</h5>
      <div>
        <p>
        Clicking the submit button will invoke redux's action "SET_EMAIL" which will be processed by the reducer.
        <br/>
        The value, then, will be updated on the component using the "connect" feature, used as a @connect() decorator
        </p>
      </div>
      <input class="form-control" id="inpEmail" type="email" />
      <br/>
      <button class="btn btn-secondary" id="emailButton">Update email</button>
      <span>Your email is {user.email}</span>
    </div>
    <hr/>
    <div class="jumbotron">
      <p>Finally, an example of a custom element from another library</p>
      <popup-menu icon-type="menu">
          <li>Fire missiles</li>
          <li>Abort Abort Abort</li>
          <li>Eat Sushi</li>
          <li>Throw away react</li>
      </popup-menu>
    </div>
    <hr/>
    <div class="jumbotron">
      <h2>Routing with web components?</h2>
      <router-outlet>
          <route path="profile/:userId" component="route-profile"></route>
          <route path="home" component="route-home"></route>
          
          <div slot="header">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link" href="#/home">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/profile/eavichay">Avichay's Profile Page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#/profile/valadj">Valadj's profile page</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#/non-existing-page">Unknown page</a>
              </li>
            </ul>
          </div>
          <blockquote class="blockquote" slot="footer">
            <footer>
              The source code can be found
              <a href="https://github.com/eavichay/lecture-power-of-web-components" target="_blank">in github</a>
            </footer>
          </blockquote>
      </router-outlet>
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
    const menuItems = this.shadowRoot.querySelectorAll('popup-menu > li')
    menuItems.forEach(li => {
      li.onmouseup = () => {
        const toast = document.createElement('super-toast')
        toast.setAttribute('message', `Command sent: ${li.textContent}!`)
        toast.setAttribute('delay', '2500')
        toast.setAttribute('slot', 'toasts')
        toast.innerHTML = '<i class="material-icons" slot="icon">done</i>'
        this.appendChild(toast)
      }
    })
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