const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    // css: {
    //     loaderOptions: {
    //         // 给 stylus-loader 传递选项
    //         stylus: {
    //             import: '~@/stylus/index.styl'
    //
    //             // data: `@import: "~@/index.styl;"`   //sass的引入格式
    //         }
    //     }
    // },

})
