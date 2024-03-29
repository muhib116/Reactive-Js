import { handleExpression } from './jsBinder.ts'
import { VDOM } from './types.ts'
import { generateVirtualDOM } from './virtualDomGenerator.ts'
import { domeRegistry } from './jsBinder.ts'

function _generateChildNodeContents(contents: (string | object)[], tag: Node): void 
{
    for (let i = 0; i < contents.length; i++) {
        if(typeof contents[i] ==='string') {
            let text = document.createTextNode(handleExpression(contents[i], tag))
            tag.appendChild(text)
        }else if(typeof contents[i] === 'object') {
            tag.appendChild(_generateVDOMToDOM(contents[i]))
        }
    }
}

function _generateVDOMToDOM (VirtualDOM: VDOM): Node {
    let tag
    if(VirtualDOM.tagName.toLowerCase() == 'svg'){
        const svgNS = "http://www.w3.org/2000/svg"
        tag = document.createElementNS(svgNS, 'svg')
    }else{
        tag = document.createElement(VirtualDOM.tagName)
    }

    //this is stored for future use, to access this dome directly from DOM
    VirtualDOM.elementReference = tag
    console.log(VirtualDOM)
    // domeRegistry

    for (let key in VirtualDOM.attributes) {
        tag.setAttribute(key, VirtualDOM.attributes[key])
    }

    _generateChildNodeContents(VirtualDOM.contents, tag)
    
    return tag
}

export const render = (
    DOMString: string, 
    parentElement: { append: (...children: Node[]) => void },
    isTemplate: boolean
) => {
    let DOMList: Node[] = []
    let VDOM = generateVirtualDOM(DOMString)
    
    if (!VDOM?.length) return

    if(isTemplate){
        // console.log(VDOM, isTemplate)
    }

    for (let i = 0; i < VDOM.length; i++) {
        DOMList.push(_generateVDOMToDOM(VDOM[i]))
    }

    // Append the generated DOM to parent Element
    if(parentElement){
        parentElement.append(...DOMList)
    }
};
