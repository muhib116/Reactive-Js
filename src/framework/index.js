import { _stringTemplateToHTML, _getVNode } from './helpers.js'
import { render } from './vDom/render.js'

export const createComponent = ({template: templateString, setupScript}) => 
{
    let parsedTemplate = _stringTemplateToHTML(templateString)
    let vNode = _getVNode(parsedTemplate.template, setupScript)

    return {
        vNode,
        setupScript,
        style: parsedTemplate.style,
        render
    }
}

export const mount = (elOrId, HTMLNodes) => {
    if(typeof elOrId === 'string') {
        elOrId = document.querySelector(elOrId)
    }
    
    elOrId.append(...HTMLNodes)
}

export const createApp = ({vNode, render=() => {}, setupScript, style}) => {
    let HTMLNodes = render(vNode, setupScript, style)

    return {
        mount: (idOrElement) => mount(idOrElement, HTMLNodes), 
    }
}