export const camelToDash = camel => camel.replace(/([A-Z])/g, '-$1').toLowerCase()
export const dashToCamel = dash => dash.indexOf('-') < 0 ? dash : dash.replace(/-[a-z]/g, m => m[1].toUpperCase())