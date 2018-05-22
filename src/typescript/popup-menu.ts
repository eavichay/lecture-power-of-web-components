import {Slim} from "slim-js";
import {tag, template, useShadow} from "slim-js/Decorators";
import attribute from "../attribute";

@tag('popup-menu')
@template(`
<span s:id="trigger" click="triggerClick">
    <i class="material-icons" bind>{{iconType}}</i>
</span>
<div s:id="content" bind:is-visible="isOpen" click="triggerClick">
    <ul><slot></slot></ul>
</div>
<style>
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    :host {
        display: block;
        position: relative;
    }
    
    i:hover {
        cursor: context-menu;
        background: black;
        color: white;
    }

    div {
        display: none;
        position: absolute;
        bottom: 0;
        left: 30px;
        background: var(--light);
        border: 1px solid black;
        border-radius: 0.5rem;
    }
    
    div[is-visible="true"] {
        display: block;
    }
    ul {
        list-style-type: none;
        padding: 0.5rem;
    }
    
    ::slotted(li) {
        margin-left: 0;
        cursor: pointer;
        text-overflow: ellipsis;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
    }
    
    ::slotted(li:hover) {
        background: var(--primary);
        color: var(--light);
    }
    
</style>
`)
@useShadow(true)
export default class PopupMenu extends Slim {

    public isOpen:Boolean = false
    private anyClick_:EventListener = this.anyClick.bind(this)

    @attribute
    public iconType:String

    triggerClick(event:MouseEvent):void {
        this.isOpen = !this.isOpen
    }

    anyClick (event:MouseEvent):void {
        const path = event['path']
        if (path.indexOf(this) === -1) {
            this.isOpen = false
        }
    }

    onAdded () {
        window.addEventListener('mousedown', this.anyClick_)
    }

    onRemoved () {
        window.removeEventListener('mousedown', this.anyClick_)
    }


}