// const domain = "http://localhost:8090/jeecg-boot/lncc/api";
const domain = "http://lncc.linqingying.xyz/jeecg-boot/lncc/api";
const axios = require('axios');

import util from "@/util";

function httpRequest(url, method, data) {
    return axios({
        method: method,
        url: url,
        data: data
    });

    // return new Promise((resolve,reject) => {
    //   axios({
    //     method: method ,
    //     url: url,
    //     data: data
    //   }).then(res => {
    //     resolve(res.data.result);
    //   })
    //     .catch(err => {
    //   reject(err);
    // });
    // });
}

function getAll() {

    //
    // return new Promise((resolve, reject) => {
    //     httpRequest(domain + '/all', 'GET').then(res => {
    //         util.setAllData(res.data.result)
    //
    //         resolve(res.data.result)
    //
    //     })
    // })
    return httpRequest(domain + '/all', 'GET')
}

function getNavById(id) {
    return httpRequest(domain + '/nav/' + id, 'GET');
}


function getContentDetailByTypeAndByType(type, id) {
    return httpRequest(domain + '/contentDetail?type=' + type + '&id=' + id, 'GET');
}

function getByTypePageList(type, pageNo, pageSize) {
    return httpRequest(domain + '/contentList?type=' + type + '&pageNo=' + pageNo + '&pageSize=' + pageSize, 'GET');
}

function scarchByTitle(title,pageNo,pageSize) {
    return httpRequest(domain + '/search?title=' + title + '&pageNo=' + pageNo + '&pageSize=' + pageSize, 'GET');
}

export default {
    getAll,
    getContentDetailByTypeAndByType,
    getByTypePageList,
    scarchByTitle
}
