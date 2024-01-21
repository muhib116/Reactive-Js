import { directiveAddToDom } from '../jsHandler/handleDirectives.js'

function _generateChildNodeContents(contents, tag, setupScript) {
    for (let i = 0; i < contents?.length; i++) {
        if(typeof contents[i] ==='string') {
            let text = document.createTextNode(contents[i])
            tag.appendChild(text)
        }else if(typeof contents[i] === 'object') {
            let DOM = _generateVNodeToDOM(contents[i], setupScript)
            DOM && tag.appendChild(DOM)
        }
    }
}

function _generateVNodeToDOM (VirtualNode, setupScript) 
{
    if(!VirtualNode.tagName){
        return document.createTextNode(VirtualNode.contents[0])
    }

    let tag
    let logicParts = VirtualNode.logicParts
    if(logicParts['$if'] == false) return false
    if(VirtualNode.tagName?.toLowerCase() == 'svg'){
        const svgNS = "http://www.w3.org/2000/svg"
        tag = document.createElementNS(svgNS, 'svg')
    }else{
        tag = document.createElement(VirtualNode.tagName)
    }

    if(logicParts['$show']){
        tag.style.display = 'none'
    }

    //this is stored for future use, to access this dome directly from DOM
    VirtualNode.elementReference = tag
    for (let key in VirtualNode.attributes) {
        tag.setAttribute(key, VirtualNode.attributes[key])
    }

    /**
     * directive bindings with dom
     */
    for(let directive in logicParts) {
        directiveAddToDom({tag, directive, logic: logicParts[directive]})
    }

    _generateChildNodeContents(VirtualNode.contents, tag, setupScript)
    
    return tag
}

export const render = (vNodes=[], setupScript, style) => {
    let node = vNodes.map(node => _generateVNodeToDOM(node, setupScript))
    return node
}
