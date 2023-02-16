export const POSTAL_CODE_REG = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;
export const CITY_REG = /^[a-zA-Z\u0080-\u024F\s/\-\\)\\(\\`\\.\\"\\']+$/;
export const TEXT_REG = /^(.|\s)*[a-zA-Z]+(.|\s)*$/;
export const TTITLE_REG = /^(.|\s)*[a-zA-Z]+(.|\s){5,}$/;
export const POSTAL_ADDRESS_REG = /^\s*\S+(?:\s+\S+){2,}/;
export const PRICE_REG= /^([0-9]{0,2}((.)[0-9]{0,2}))$/;
export const NOT_NEGATIVE_INTEGER_REG = /[01-9]+\d*$/;

// eslint-disable-next-line no-useless-escape
export const EMAIL_REG  = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const DATE_DD_MM_YYYY_FORMAT_REG = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
export const DATE_YYYY_MM_DD_FORMAT_REG = /^\d{4}-\d{2}-\d{0,1}[1-9]/;
export const FR_PHONE_NUMBER_FORMAT_REG = /^((\+)33|0|0033)[1-9](\d{2}){4}$/;
export const PASSWORD_FORMAT_REG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;