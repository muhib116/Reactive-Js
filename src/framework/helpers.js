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

export const _getVNode = (node, setupScript) => {
    const tempElement = document.createElement('div')
    tempElement.innerHTML = node.trim()

    const childNodes = tempElement.childNodes
    const vNode = getVNode(childNodes, setupScript)
    return vNode
}

export const _extractVariables = (expression) => {
    const variableRegex = /\b\w+\b/g;
    return expression.match(variableRegex) || [];
}

/**
 * 
 * @param {*} expression: user provided expression like {{ price + 10 + 'tk }} or price > 10
 * @param {*} setupScript: user provided script
 * @returns string bindings with setupScript so that eval function can execute
 */
export const _expressionExecutor = (expression, setupScript) => {
    const variables = _extractVariables(expression);

    for (const variable of variables) {
        const value = setupScript[variable] !== undefined ? `setupScript.${variable}` : variable;
        expression = expression.replace(new RegExp(variable, 'g'), value);
    }

    return expression
}