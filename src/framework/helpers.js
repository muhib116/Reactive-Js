import { getVNode } from './vDom/virtualDomGenerator.js'

export const _stringTemplateToHTML = (componentString) => {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = componentString.trim()

    const childNodes = tempElement.childNodes
    const parsedTemplate = {}
    
    if(childNodes?.length && childNodes.length > 3 && childNodes.length < 1) {
        console.error('Template is not ready to print')
        return
    }

    for(let i = 0; i < childNodes.length; i++){
        if(childNodes[i].nodeType === 1){
            parsedTemplate[childNodes[i].nodeName.toLowerCase()] = childNodes[i].innerHTML?.trim()
        }
    }

    return parsedTemplate
}

export const _getVNode = (node) => {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = node.trim()

    const childNodes = tempElement.childNodes
    const vNode = getVNode(childNodes)
    return vNode
}