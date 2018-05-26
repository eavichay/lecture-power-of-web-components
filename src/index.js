import template from './template';
import Base from './Base';
import sharedStyles from './sharedStyles'
import attribute from './attribute'

@template(`
    <div class="jumbotron">
      <h1>Simple text binding demo</h1>
      <h4>Binding to a single property: Hello, your name is: {fullName}</h4>
      <input id="inpFirst" type="text" placeholder="Enter your first name" />
      <input id="inpLast" type="text" placeholder="Enter your last name" />
    </div>
    <div class="container">
    <h2>My magic number is {magicNumber}</h2>
    </div>
    <style>
        h2 {
            background: {myColor}
        }
    </style>
`)
@sharedStyles('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/css/bootstrap.css')
class MyApp extends Base {

  constructor () {
    super()
    this.fullName = ''
  }

  @attribute
  magicNumber

  @attribute
  myColor = 'red'

  componentDidRender() {
    const inpFirst = this.find('#inpFirst')
    const inpLast = this.find('#inpLast')
    inpFirst.oninput = inpLast.oninput = () => {
      this.fullName = inpFirst.value + ' ' + inpLast.value
    }
  }
}

customElements.define('my-app', MyApp)