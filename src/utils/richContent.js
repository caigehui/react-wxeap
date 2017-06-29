export function convertToRichContent(originalContent) {
    let newContent = '';
    while(originalContent.length > 0) {
        if(originalContent.indexOf('\n') < 0) {
            newContent += `<p>${originalContent}</p>`;
            break;
        }
        newContent += `<p>${originalContent.substring(0, originalContent.indexOf('\n')) || '<br/>'}</p>`;
        originalContent = originalContent.substring(originalContent.indexOf('\n')+2);
    }
    return newContent;
}