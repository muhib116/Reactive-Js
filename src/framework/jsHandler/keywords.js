import { _expressionExecutor } from '../helpers.js'

export const keyWordsWithAction = 
{
    //return boolean: add display none style in inline
    $show: (expression, setupScript) => {
        let modifiedExpression =  _expressionExecutor(expression, setupScript)
        return !!eval(modifiedExpression)
    }, 
    
    //return boolean: don't print this dome
    $if: (expression, setupScript) => {
        return keyWordsWithAction.$show(expression, setupScript)
    },

    $html: (expression, setupScript) => {}, //boolean: print content with innerHTML
    $text: (expression, setupScript) => {}, //boolean: print content with textContent
    $else: (expression, setupScript) => {}, //work with prev if
    $elseIf: (expression, setupScript) => {}, //work with prev if
    $for: (expression, setupScript) => {}, //print this item for specific time according to data
    $key: (expression, setupScript) => {}, //get the order of dom for internal use
    
    onclick: (expression, setupScript) => {
        let modifiedExpression =  _expressionExecutor(expression, setupScript)
        
        return {
            setupScript,
            expression: modifiedExpression
        }
    },
    ondblclick: (expression, setupScript) => {
        return keyWordsWithAction.onclick(expression, setupScript)
    },
    oncontextmenu: (expression, setupScript) => {
        return keyWordsWithAction.onclick(expression, setupScript)
    },
    onmouseover: (expression, setupScript) => {
        return keyWordsWithAction.onclick(expression, setupScript)
    },
    onmouseout: (expression, setupScript) => {
        return keyWordsWithAction.onclick(expression, setupScript)
    },
}