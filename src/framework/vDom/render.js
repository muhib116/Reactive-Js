function _generateChildNodeContents(contents, tag, setupScript) {
    for (let i = 0; i < contents?.length; i++) {
        if(typeof contents[i] ==='string') {
            let text = document.createTextNode(contents[i])
            tag.appendChild(text)
        }else if(typeof contents[i] === 'object') {
            tag.appendChild(_generateVNodeToDOM(contents[i], setupScript))
        }
    }
}

function _generateVNodeToDOM (VirtualNode, setupScript) {
    if(!VirtualNode.tagName){
        return document.createTextNode(VirtualNode.contents[0])
    }


    let tag
    if(VirtualNode.tagName?.toLowerCase() == 'svg'){
        const svgNS = "http://www.w3.org/2000/svg"
        tag = document.createElementNS(svgNS, 'svg')
    }else{
        tag = document.createElement(VirtualNode.tagName)
    }

    //this is stored for future use, to access this dome directly from DOM
    VirtualNode.elementReference = tag

    for (let key in VirtualNode.attributes) {
        tag.setAttribute(key, VirtualNode.attributes[key])
    }

    _generateChildNodeContents(VirtualNode.contents, tag, setupScript)
    
    return tag
}

export const render = (vNodes=[], setupScript, style) => {
    let node = vNodes.map(node => _generateVNodeToDOM(node, setupScript))
    return node
}
