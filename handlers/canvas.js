module.exports = {
    
    /**
     * Gets variables and types
     * @param {object} canvas The canvas
     * @param {object} text The text
     * @param {object} defaultFontSize The default font pixel size
     * @param {object} width The max width of the text
     * @param {object} font The text font
     * @returns The variable formatted
     */
    
    applyText(canvas, text, defaultFontSize, width, font){
        const ctx = canvas.getContext("2d");
        do {
            ctx.font = `${(defaultFontSize -= 1)}px ${font}`;
        } while (ctx.measureText(text).width > width);
        return ctx.font;
    }
}