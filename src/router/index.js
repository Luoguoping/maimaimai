import Vue from 'vue'
import VueRouter from 'vue-router'
//如果使用模块化的方式来开发,必须写下面的代码
Vue.use(VueRouter)

//在Vue原型上挂载一个属性 $axios
import axios from 'axios'

Vue.prototype.$axios = axios

//设置baseURL之后 ,发送请求的时候会把baseUrl和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true//让ajax携带cookie
//导入组件
// import goodslist from '../components/goods/goodslist.vue'
// import goodsinfo from '../components/goods/goodsinfo.vue'
// import shopcart from '../components/shopcart/shopcart.vue'
// import orde from '../components/orde/orde.vue'
// import login from '../components/account/login.vue'
// import payorder from '../components/pay/payorder.vue'
// import paySuccess from '../components/pay/paySuccess.vue'

const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const orde = () => import(/* webpackChunkName: "order" */ '../components/orde/orde.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const payorder = () => import(/* webpackChunkName: "payorder" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')

//制定规则
const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/toshopcart',component:shopcart},
        {path:'/login',component:login},
        /* 下面的路由规则,是需要进行登录校验的 */
        {path:'/orde',component:orde,meta: { checkoutLogin: true }},
        {path:'/pay',component:payorder,meta: { checkoutLogin: true }},
        {path:'/paySuccess',component:paySuccess,meta: { checkoutLogin: true }}
    ]
})

/* 
*这个方法可以拦截到所有的路由跳转
    如果不调用next, 就不会跳转
*/ 
router.beforeEach((to, from, next) => {

    //记录想跳转去的页面
    if(to.path!=='/login'){
        localStorage.setItem('wantVisitPsth',to.fullPath)
    }

    if(to.meta.checkoutLogin){//需要进行登录验证
        axios.get('site/account/islogin').then(response=>{
            // console.log(response.data);
            if(response.data.code==='logined'){//登录过了
                next()
            }else{//没有登录过
                router.push({path:'/login'})
            }
        })
    }else{//来到这里,是代表不需要进行登录验证
        next()
    }

  })

//es6中导出一个成员
export default router
