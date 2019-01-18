import http from './http';
import config from './config';

let accountSignup = function (params = {}) {
    return http.post(config.accountSignup, params);
};
let accountLogin = function (params = {}) {
    return http.post(config.accountLogin, params);
};
let getDomainList = function (params = {}) {
    return http.get(config.getDomainList, params);
};

let addProduct = function (params = {}) {
    return http.post(config.addProduct, params);
};

let getOrderDdnsFormSetting = function (params = {}) {
    return http.get(config.getOrderDdnsFormSetting, params);
};
let ddnsValidateDomain = function (params = {}) {
    return http.get(config.ddnsValidateDomain, params);
};

let createOrder = function (params = {}) {
    return http.post(config.createOrder, params);
};

let ddnsRecordUpdate = function (params = {}) {
    return http.post(config.ddnsRecordUpdate, params);
};
//域名的综合记录
let getSynthesizeRecordList = function (params = {}) {
    return http.get(config.getSynthesizeRecordList, params);
};

export {
    accountSignup,
    accountLogin,
    getDomainList,
    addProduct,
    getOrderDdnsFormSetting,
    ddnsValidateDomain,
    ddnsRecordUpdate,
    createOrder,
    getSynthesizeRecordList,

};