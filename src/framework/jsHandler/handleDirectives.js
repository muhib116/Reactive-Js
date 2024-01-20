import { keyWordsWithAction } from './keywords'

export const handleDirectives = (directive, setupScript) => {
    const { name, value } = directive
    try {
        console.log(keyWordsWithAction[name](value), setupScript);
    } catch (e) {
        console.log(e);
    }
}