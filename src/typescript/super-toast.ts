import Base from '../Base';
import attribute from '../attribute'
import template from '../template.js';

let counter = 0;

// noinspection JSUnusedGlobalSymbols
@template(`
<span id="container">
<slot name="icon"></slot>
{message}
</span>
<style>
    span {
        left: 2rem;
        top: -5rem;
        position: fixed;
        display: inline-block;
        background: var(--success);
        padding: 0.5rem;
        color: white;
        opacity: 0.9;
        border-radius: 0.5rem;
    }
    
    span.approach {
        top: {count}rem;
        transition: 800ms ease-out;
    }
</style>
`)
export default class SuperToast extends Base {

    private count:Number

    @attribute
    public message:String = ''

    @attribute
    public delay:String = '2000'

    private container: HTMLSpanElement

    constructor() {
        super()
        this.count = 3 + (counter++ * 3)
    }

    public connectedCallback ():void {
        super.connectedCallback()
        setTimeout(() => this.remove(), Number(this.delay))
    }

    public remove():void {
        const animation = (this.container as HTMLElement).animate([
            {left: '2rem', opacity: 0.8},
            {left: '0', opacity: 0.8},
            {left: '100vw', opacity: 0}
            ], {
                duration: 200,
                easing: 'ease-in'
            })
        animation.onfinish = (() => super.remove())
        counter--

    }

    componentDidRender () {
        this.container = this.shadowRoot.querySelector('span')
        window.requestAnimationFrame(() => this.container.classList.add('approach'))
    }

}

customElements.define('super-toast', SuperToast)