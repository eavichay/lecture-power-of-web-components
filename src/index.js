import template from './template';
import Base from './Base';
import attribute from './attribute'
import sharedStyles from './sharedStyles'

import './typescript/popup-menu.ts'

@template(`
    <div class="jumbotron">
      <h1>Simple text binding demo</h1>
      <h4>Binding to a single property: Hello, your name is: {fullName}</h4>
      <input id="inpFirst" type="text" placeholder="Enter your first name" />
      <input id="inpLast" type="text" placeholder="Enter your last name" />
      <hr />
      <div>
        Finally, an example of a custom element from another library
        <popup-menu icon-type="menu">
          <li>Fire missiles</li>
          <li>Abort Abort Abort</li>
          <!--<hr/>-->
          <!-- Show HR as an example for agnostic children in slots -->
          <li>Eat Sushi</li>
          <li>Throw away react</li>
        </popup-menu>
      </div>
    </div>
    
    <hr />
    
    <div class="container">
      <h5>Deep nesting bindings</h5>
      The text field is bound to { { user.first } } and { { user.last } }
      {user.first}, {user.last}
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
    <hr/>
`)
@sharedStyles('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css')
class MyApp extends Base {

  constructor () {
    super()
    this.items = ['Apple', 'Banana', 'Juice']
    this.myBoolean = true
    this.fullName = ''

  }

  user = {}

  @attribute
  firstName

  @attribute
  lastName

  componentDidRender() {
    const menuItems = this.shadowRoot.querySelectorAll('popup-menu > li')
    menuItems.forEach(li => {
      li.onmouseup = () => {
        alert(li.textContent)
      }
    })
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
  }
}

customElements.define('my-app', MyApp)