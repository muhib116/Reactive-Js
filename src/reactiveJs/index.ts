import { render } from "./render.ts"
import { mounted, created } from "./lifeCycle.ts"

const _mount = (
    {cssSelector, component, parentElement}:
    {
        cssSelector:string,
        component: {
            template:string;
            script:string;
            style:string;
        },
        parentElement?: Node
    }
) => {
    let appWrap:(Node | undefined) = document.querySelector(cssSelector) || parentElement
    if(!appWrap || !component) return

    const {
        template,
        script,
        style
    } = component

    created()
    render(`<script type="module">${script}</script>`, document.head)
    
    render(`<style>${style}</style>`, document.head)
    render(template, appWrap, true)
    mounted()
}

export const createApp = (component:{
    template:string;
    script:string;
    style:string;
}) => {
    return {
        component,
        mount: (cssSelector:string) => _mount({cssSelector, component})
    }
}


export const createComponent = (componentString:string) => 
{
    let component = {}
    let tempElement = document.createElement('div')
    tempElement.innerHTML = componentString.trim()

    const childNodes = tempElement.childNodes
        
    if(childNodes?.length && childNodes.length > 3 && childNodes.length < 1) {
        console.error('Template is not ready to print')
        return
    }

    
    for(let i = 0; i < childNodes.length; i++) {
        let node = childNodes[i]
        if(node.nodeType === 1){
            component[node.tagName.toLowerCase()] = node.innerHTML.trim()
            component.render = render
        }
    }
    
    return component
}