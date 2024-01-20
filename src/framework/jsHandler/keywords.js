export const keyWordsWithAction = {
    //return boolean: add display none style in inline
    $show: (value) => {
        return value
    }, 
    $if: () => {}, //boolean: don't print this dome
    $html: () => {}, //boolean: print content with innerHTML
    $text: () => {}, //boolean: print content with textContent
    $else: () => {}, //work with prev if
    $elseIf: () => {}, //work with prev if
    $for: () => {}, //print this item for specific time according to data
    $key: () => {}, //get the order of dom for internal use
    $click: () => {},
    $mouseover: () => {},
    $mouseout: () => {},
}