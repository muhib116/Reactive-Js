import { _extractVariables } from '../helpers.js'

const regex = /\{\{\s*(.*?)\s*\}\}/g

export const handleTemplateExpression = (stringContent, setupScript) => {
    if (regex.test(stringContent)) {
        let stringMatch = _extractExpression(stringContent)
        const varFromUserProvidedExpression = _extractVariables(stringMatch)


        /**
         * need to destructure an object dynamically
         */

        // for(let i = 0; i < varFromUserProvidedExpression.length; i++)
        // {
        //     const property = varFromUserProvidedExpression[i]
        //     let value = setupScript[property] || property
        //     stringMatch = stringMatch.replace(new RegExp(property, 'g'), value)
        //     console.log(property);
        // }


        // return stringContent.replace(regex, eval(stringMatch))
    }
    return stringContent
}

function _extractExpression(text) {
    const regex = /\{\{\s*(.*?)\s*\}\}/g
    const match = regex.exec(text)
    return match ? match[1] : null
}