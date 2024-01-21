import { _extractVariables } from '../helpers.js'

const regex = /\{\{\s*(.*?)\s*\}\}/g

export const handleTemplateExpression = (stringContent, setupScript) => {
    const regex = /\{\{\s*(.*?)\s*\}\}/g;
  
    const matches = stringContent.match(regex);
  
    if (matches) {
      for (const match of matches) {
        let variableExpression = _extractExpression(match);
        const variables = _extractVariables(variableExpression);
  
        for (const variable of variables) {
            const value = setupScript[variable] !== undefined ? `setupScript.${variable}` : variable;
            variableExpression = variableExpression.replace(new RegExp(variable, 'g'), value);
        }
        
        stringContent = stringContent.replace(match, eval(variableExpression));
      }
    }
  
    return stringContent;
}

function _extractExpression(text) {
    const regex = /\{\{\s*(.*?)\s*\}\}/g
    const match = regex.exec(text)
    return match ? match[1] : null
}