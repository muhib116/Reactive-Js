let regex = /({{\s*)(.*)(\s}})/ig

export const handleExpression = (string, parentElement) => 
{
    if(parentElement.tagName.toLowerCase() !== 'script' && string.search(regex) >= 0)
    {
        let stringMatch = _extractExpression(string)
        
        return stringMatch
    }
    return string
}


function _extractExpression(text) {
    const regex = /\{\{\s*(.*?)\s*\}\}/g
    return regex.exec(text)[1]
}

export const domeRegistry = {}