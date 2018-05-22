export default class Base extends HTMLElement {
    protected connectedCallback():void
    protected disconnectedCallback():void
    protected attributeChangedCallback(attr:String, oldValue:String, newValue:String):void
    public render(template:String|HTMLTemplateElement):void
    public find(selector:String):HTMLElement|undefined
    protected componentDidRender():void
    protected update(property:String):void
    public remove():void
}