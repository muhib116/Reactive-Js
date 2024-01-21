import { _extractVariables, _expressionExecutor } from '../helpers.js'

export const handleTemplateExpression = (stringContent, setupScript) => {
    const regex = /\{\{\s*(.*?)\s*\}\}/g;
  
    const matches = stringContent.match(regex);
  
    if (matches) {
      for (const match of matches) {
        let expression = _extractExpression(match);
        // const variables = _extractVariables(expression);
  
        // for (const variable of variables) {
        //   const value = setupScript[variable] !== undefined ? `setupScript.${variable}` : variable;
        //   expression = expression.replace(new RegExp(variable, 'g'), value);
        // }
        
        expression = _expressionExecutor(expression, setupScript)
        stringContent = stringContent.replace(match, eval(expression));
      }
    }
  
    return stringContent;
}

function _extractExpression(text) {
    const regex = /\{\{\s*(.*?)\s*\}\}/g
    const match = regex.exec(text)
    return match ? match[1] : null
}