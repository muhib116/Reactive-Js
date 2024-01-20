let regex = /({{\s*)(.*)(\s}})/ig

export const handleExpression = ({stringContent, parentElement, setupScript}) => 
{
    if(parentElement?.tagName?.toLowerCase() !== 'script' && stringContent.search(regex) >= 0)
    {
        let stringMatch = _extractExpression(stringContent)
        return setupScript[stringMatch]
    }
    return stringContent
}


function _extractExpression(text) {
    const regex = /\{\{\s*(.*?)\s*\}\}/g
    return regex.exec(text)[1]
}

export const handleAttribute = () => {
    console.log(working);
}

export const domeRegistry = {}