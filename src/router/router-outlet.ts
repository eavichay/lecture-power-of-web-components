import {tag, template, useShadow} from "slim-js/Decorators";
import {Slim} from "slim-js";

@tag('router-outlet')
@template(`

<slot name="header"></slot>
<hr/>
<slot name="outlet"></slot>
<div s:if="isError">
    <h1>404!!</h1>
    <p>The page you are looking for does not exists</p>
</div>
<hr/>
<slot name="footer"></slot>

`)
@useShadow(true)
class RouterOutlet extends Slim {

    private isError: boolean;

    protected onAdded ():void {
        window.addEventListener('hashchange', this.onRoute_)
    }

    protected onRemoved ():void {
        window.removeEventListener('hashchange', this.onRoute_)
    }

    protected onCreated () {
        this.scanRoutes()
        this.onRoute_(<HashChangeEvent>{newURL: window.location.href})
    }

    private routeMap:Object = {}

    private onRoute_:EventListener = this.onRoute.bind(this)

    private currentView:HTMLElement

    private scanRoutes():void {
        const routes = this.querySelectorAll('route')
        for (const route of routes) {
            const path = route.getAttribute('path')
            const parts = path.split('/')
            const component = route.getAttribute('component')

            this.routeMap[parts[0]] = {
                parts,
                component
            }
        }
    }

    private onRoute (event:HashChangeEvent):void {
        const {newURL: url} = event
        const idx = url.indexOf('#') + 2
        const parts = url.slice(idx).split('/')
        const route = this.routeMap[parts[0]]
        const params = {}
        if (this.currentView) {
            this.currentView.remove()
        }
        if (route) {
            this.isError = false
            parts.forEach( (part:String, index:number):void => {
                if (route.parts[index].startsWith(':')) {
                    const param = route.parts[index].substr(1)
                    params[param] = part
                }
            })
            const {component} = route
            const view:any|HTMLElement = document.createElement(component)
            view.routeParams = params
            view.setAttribute('slot', 'outlet')

            this.appendChild(view)
            this.currentView = view
        } else {
            this.isError = true
        }
    }
}