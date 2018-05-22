import Base from '../Base';
import attribute from '../attribute'
import template from '../template.js';

// noinspection JSUnusedGlobalSymbols
@template(`
<span id="container">{message}</span>
<style>
    span {
        top: 0;
        position: relative;
        display: inline-block;
        background: black;
        padding: 1rem;
        color: white;
        border-radius: 0.5rem;
        opacity: 1;
        transition-timing-function: ease-out;
        transition-property: top, opacity;
        transition-duration: 500ms;
    }
    
    span.approach {
        background: red;
        top: 2rem;
        opacity: 0;
    }
</style>
`)
export default class SuperToast extends Base {

    @attribute
    public message:String = ''

    @attribute
    public delay:Number = 2000

    container: HTMLSpanElement

    public connectedCallback ():void {
        super.connectedCallback()
        window.requestAnimationFrame(() => {
            this.container.classList.remove('approach')
        })
        setTimeout(() => this.remove(), this.delay)
    }

    componentDidRender () {
        this.container = this.shadowRoot.querySelector('span')
        this.container.classList.add('approach')
    }

}

customElements.define('super-toast', SuperToast)