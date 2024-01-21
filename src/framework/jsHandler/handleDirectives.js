import { keyWordsWithAction } from './keywords'

export const handleDirectives = (directive, setupScript) => {
    const { name, value } = directive
    return {
        [name]: keyWordsWithAction[name](setupScript[value])
    }
}