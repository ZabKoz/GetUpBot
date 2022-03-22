const { join } = require('path');
const i18n = require('i18n');

const LOCALE = process.env.LOCALE;

i18n.configure({
    locales: [
        "pl",
        "en"
    ],
    directory: join(__dirname, "..", "locales"),
    defaultLocale: "pl",
    retryInDefaultLocale: "true",
    objectNotation: true,
    register: global,
    
    mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false
    }
});

i18n.setLocale(LOCALE);

module.exports = i18n;

/**
 * 
 * @INFO
 * Bot Coded by ZabKoz#2744
 * @INFO
 * Please mention me when you use this code!
 *
 */