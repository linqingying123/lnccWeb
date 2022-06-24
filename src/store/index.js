import {createStore} from 'vuex'


/**
 * 创建仓库和导出
 */
export default createStore({
    navList: {},
    bannerList: null,
    newsPage: null,
    tongzhiPage: null,
    zhaobiaoPage: null,
    jiaoyuPage: null,
    impressionPage: null,


    //自适应状态
    state: {
        swiperItemNumber: 4
    },
    // funs
})
