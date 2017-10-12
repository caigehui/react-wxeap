'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.convert = convert;
function convert(originalContent) {
    var newContent = '';
    while (originalContent.length > 0) {
        if (originalContent.indexOf('\n') < 0) {
            newContent += '<p>' + originalContent + '</p>';
            break;
        }
        newContent += '<p>' + (originalContent.substring(0, originalContent.indexOf('\n')) || '<br/>') + '</p>';
        originalContent = originalContent.substring(originalContent.indexOf('\n') + 2);
    }
    return newContent;
}