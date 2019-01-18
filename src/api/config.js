const prefix = '/api'; // api地址前缀
export default(config => {
    return Object.keys(config).reduce((copy, name) => {
        copy[name] = prefix + config[name];
        return copy;
    }, {});
})({
    // example api
    'accountSignup': '/account/signup',
    'accountLogin': '/account/login', 
    'getDomainList': '/ddns/index',
    'getOrderDdnsFormSetting': '/package/ddns/setting',
    'ddnsValidateDomain':'/ddns/domain/validate',
    'createOrder':'/order/create',
    'ddnsRecordUpdate':'/ddns/record/update',
    'getSynthesizeRecordList': '/ddns/record/synthesize',
});