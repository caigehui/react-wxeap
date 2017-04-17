'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = compressImage;
/**
 * 压缩图片
 * @param {string} src 
 * @param {number} maxWidth 
 * @param {func} cb 
 */
function compressImage(src, orientation, maxWidth, cb) {
    var _arguments = arguments;

    var img = new Image();
    img.onload = function () {
        var w = Math.min(maxWidth, img.width);
        var h = img.height * (w / img.width);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        if (ctx) {
            var drawImage = ctx.drawImage;
            ctx.drawImage = function (_img, sx, sy, sw, sh, dx, dy, dw, dh) {
                var vertSquashRatio = 1;
                // Detect if img param is indeed image
                if (!!_img && _img.nodeName === 'IMG') {
                    vertSquashRatio = detectVerticalSquash(_img);
                    if (typeof sw === 'undefined') {
                        sw = _img.naturalWidth;
                    }
                    if (typeof sh === 'undefined') {
                        sh = _img.naturalHeight;
                    }
                }
                // Execute several cases (Firefox does not handle undefined as no param)
                // by call (apply is bad performance)
                if (_arguments.length === 9) {
                    drawImage.call(ctx, _img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
                } else if (typeof sw !== 'undefined') {
                    drawImage.call(ctx, _img, sx, sy, sw, sh / vertSquashRatio);
                } else {
                    drawImage.call(ctx, _img, sx, sy);
                }
            };
            switch (orientation) {
                case 6:
                    //需要顺时针（向左）90度旋转  
                    canvas.width = h;
                    canvas.height = w;
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, -h, w, h);
                    break;
                case 8:
                    //需要逆时针（向右）90度旋转  
                    canvas.width = h;
                    canvas.height = w;
                    ctx.rotate(270 * Math.PI / 180);
                    ctx.drawImage(img, -w, 0, w, h);
                    break;
                case 3:
                    //需要180度旋转  
                    canvas.width = w;
                    canvas.height = h;
                    ctx.rotate(180 * Math.PI / 180);
                    ctx.drawImage(img, -w, -h, w, h);
                    break;
                default:
                    canvas.width = w;
                    canvas.height = h;
                    ctx.drawImage(img, 0, 0, w, h);
            }
            // get image type
            var type = src.substring(src.indexOf(':') + 1, src.indexOf(';'));
            //convert to base64
            var base64Url = canvas.toDataURL(type);
            cb(base64Url);
        }
    };
    img.src = src;
}

/**
   * Detecting vertical squash in loaded image.
   * Fixes a bug which squash image vertically while drawing into canvas for some images.
   * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
   */
function detectVerticalSquash(img) {
    var data = void 0;
    var ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return 1;
    }
    ctx.drawImage(img, 0, 0);
    try {
        // Prevent cross origin error
        data = ctx.getImageData(0, 0, 1, ih).data;
    } catch (err) {
        return 1;
    }
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = ey + sy >> 1;
    }
    var ratio = py / ih;
    return ratio === 0 ? 1 : ratio;
}