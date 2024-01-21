import { keyWordsWithAction } from './keywords'

export const handleDirectives = (directive, setupScript) => {
    const { name, value:expression } = directive
    return {
        [name]: keyWordsWithAction[name](expression, setupScript)
    }
}

export const directiveAddToDom = ({tag, directive, logic}) => 
{
    const { expression, setupScript } = logic
    if(keyWordsWithAction.hasOwnProperty(directive) && directive.search('on') === 0)
    {
        tag.addEventListener(directive.replace('on', ''), (event) => {
            // if expression has event dependencies, then automatically pass it through
            eval(expression)
        })
    }
}