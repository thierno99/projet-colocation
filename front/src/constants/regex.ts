export const POSTAL_CODE_REG = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
// eslint-disable-next-line no-useless-escape
export const CITY_REG = /^[a-zA-Z\u0080-\u024F\s\/\-\)\(\`\.\"\']+$/;
export const TEXT_REG = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;