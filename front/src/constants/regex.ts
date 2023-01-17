export const POSTAL_CODE_REG = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
export const CITY_REG = /^[a-zA-Z\u0080-\u024F\s/\-\\)\\(\\`\\.\\"\\']+$/;
export const TEXT_REG = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
export const TTITLE_REG = /^(.|\s)*[a-zA-Z]+(.|\s){5,}$/;
export const POSTAL_ADDRESS_REG = /^\s*\S+(?:\s+\S+){2,}/;
export const PRICE_REG= /^([0-9]{0,2}((.)[0-9]{0,2}))$/;
export const NOT_NEGATIVE_INTEGER_REG = /[01-9]+\d*$/;