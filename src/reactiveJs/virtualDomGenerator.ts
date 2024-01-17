import { VDOM } from "./types"

function _prepareAttribute (attributes) {
    let _attributes = {}
    for (let i = 0; i < attributes.length; i++) {
        _attributes[attributes[i].name] = attributes[i].value
    }
    return _attributes
}
function _prepareChildNodesVDOM (nodes:[]): [] {
    let childNodes = []
    for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i]
        if(node.nodeType === 1){
            childNodes.push(_generateVDOM(node.outerHTML))
        }else if(node.nodeType === 3 && node.textContent.trim()) {
            childNodes.push(node.textContent.trim())
        }
    }

    return childNodes
}


function _generateVDOM (HTMLString) 
{
    let tempTag = document.createElement('div')
    tempTag.innerHTML = HTMLString.trim()

    let tag = tempTag.firstElementChild
    let attributes = tag.attributes
    let childNodes = tag.childNodes

    return {
        tagName: tag.tagName.toLowerCase(),
        attributes: _prepareAttribute(attributes),
        contents: _prepareChildNodesVDOM(childNodes)
    }
}




export function generateVirtualDOM (HTMLString: string):VDOM[] {
    const generatedVDOMS = []
    let tempTag = document.createElement('div')
    tempTag.innerHTML = HTMLString.trim()
    if(tempTag.childNodes.length){
        generatedVDOMS.push(..._prepareChildNodesVDOM(tempTag.childNodes))
        return generatedVDOMS
    }
    return []
}