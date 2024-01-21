import { keyWordsWithAction } from '../jsHandler/keywords.js'
import { handleDirectives } from '../jsHandler/handleDirectives.js'
import { handleTemplateExpression } from '../jsHandler/jsBinder.js'

/**
 * this is a helper function of "_generateVNode" function, 
 * used to generate generate attributes and logic for vNode
 * @param {*} attributes 
 * @returns object like: {attributes: {}, logic: {}}
 */
function _prepareAttribute (attributes, setupScript) {
    let _attributes = {}
    let _logicParts = {}

    for (let i = 0; i < attributes.length; i++) 
    {
        /**
         * check if the attribute name matches with specified keyword,
         * this skip it for handle with framework logic
         */
        if(keyWordsWithAction.hasOwnProperty(attributes[i].name)){
            _logicParts = handleDirectives(attributes[i], setupScript)
        } else {
            _attributes[attributes[i].name] = attributes[i].value
        }
    }
    return {
        attributes: _attributes,
        logicParts: _logicParts
    }
}

/**
 * prepare VNode for a wrapper VNode from real DOM, 
 * data came like: DOM.children
 * @param {*} ArrayOfNodes 
 * @returns array of virtual nodes
 */
function _prepareChildNodesVNodes (ArrayOfNodes, setupScript) {
    let vNodes = []
    for (let i = 0; i < ArrayOfNodes.length; i++) {
        let node = ArrayOfNodes[i]
        if(node.nodeType === 1){
            vNodes.push(_generateVNode(node.outerHTML, setupScript))
        }else if(node.nodeType === 3 && node.textContent.trim())
        {
            // string logic process here
            let textContent = handleTemplateExpression(node.textContent, setupScript)
            vNodes.push({
                tagName: '',
                attributes: {},
                contents: [
                    textContent
                ],
            })
        }
    }

    return vNodes
}


/**
 * this function is a helper function for "_prepareChildNodesVNodes" function,
 * used to convert single HTML DOM string to VNode
 * @param {*} HTMLString 
 * @returns single VNode, with preparing attributes and logic
 */
export const _generateVNode = (HTMLString, setupScript) => {
    let tempTag = document.createElement('div')
    tempTag.innerHTML = HTMLString.trim()

    const node = tempTag.firstChild
    
    let attributes = node.attributes
    let childNodes = node.childNodes
    
    return {
        tagName: node.tagName.toLowerCase(),
        ..._prepareAttribute(attributes, setupScript),
        contents: _prepareChildNodesVNodes(childNodes, setupScript),
    }
}


/**
 * this is a starter function to generate VNode from DOM Elements
 * @param {*} ArrayOfNodes 
 * @returns array of VNode
 */
export function getVNode (ArrayOfNodes, setupScript) {
    const generatedVNodes = []

    if(ArrayOfNodes || ArrayOfNodes.length){
        generatedVNodes.push(..._prepareChildNodesVNodes(ArrayOfNodes, setupScript))
        return generatedVNodes
    }
    return []
}