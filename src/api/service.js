import http from './http';
import config from './config';

let accountSignup = function (params = {}) {
    return http.post(config.accountSignup, params);
};
let accountLogin = function (params = {}) {
    return http.post(config.accountLogin, params);
};
let getProductList = function (params = {}) {
    return http.get(config.getProductList, params);
};

let addProduct = function (params = {}) {
    return http.post(config.addProduct, params);
};

export {
    accountSignup,
    accountLogin,
    getProductList,
    addProduct,

};