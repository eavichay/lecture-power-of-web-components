import template from '../template'
import Base from '../Base'

@template(`
<div class="jumbotron">
    <h1>Profile Page</h1>
    <h2>Welcome, {routeParams.userId}</h2>
</div>
`)
class RouteProfile extends Base {

}

customElements.define('route-profile', RouteProfile)