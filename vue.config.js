module.exports = {
    baseUrl:'./',//设置baseUrl,在index.html中导入js,其它文件的时候用到
    productionSourceMap:false,
    lintOnSave:false,
    configureWebpack:{
        externals: { 
          // 左边的名字是 import xx from '包名'  包名
          // 右边的名字是 xx 建议使用平时使用的名字即可
          //在打包的时候不会把这些包打包进去
          vue: 'Vue',
          axios:'axios',
          'vue-router':'VueRouter',
          vuex:'Vuex',
          moment:'moment',
          'vue-lazyload':'VueLazyload',
          'v-distpicker':'VDistpicker'
        }
      }
}