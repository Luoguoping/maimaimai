<template>
    <div>
        <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        
        <div v-if="goods.goodsinfo" class="section">
         <!-- 防止重复渲染 -->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- 放大镜的代码写在这里 -->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">

    <div class="magnifier-container">

        <div class="images-cover"></div>

        <!--当前图片显示容器-->

        <div class="move-view"></div>

        <!--跟随鼠标移动的盒子-->

    </div>

    <div class="magnifier-assembly">
        <div class="magnifier-btn">
            <span class="magnifier-btn-left"></span>
            <span class="magnifier-btn-right"></span>
        </div>
        <!--按钮组-->
        <div class="magnifier-line">
            <ul class="clearfix animation03">
                <li v-for="item in goods.imglist" :key="item.id">
                    <div class="small-img">
                        <img :src="item.original_path" >
                    </div>
                </li>
            </ul>
        </div>
        <!--缩略图-->
    </div>

    <div class="magnifier-view"></div>

    <!--经过放大的图片显示容器-->

</div>

                            
                            
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{ goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number size = "mini" v-model="buyCount" :min="1" :max="goods.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                        <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="isShowComment=false" href="javascript:;" :class="isShowComment?'':'selected'">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isShowComment=true" href="javascript:;" :class="isShowComment?'selected':''">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="!isShowComment" class="tab-content entry" style="display: block;">
                                <div v-html="goods.goodsinfo.content"></div>
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="isShowComment" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textareaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length===0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageIndex"
                                            :page-sizes="[2, 5, 10, 20]"
                                            :page-size="pageSize"
                                            layout="total, sizes, prev, pager, next, jumper"
                                            :total="commentList.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img v-lazy="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--  动画元素 -->
    <transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    >
        <div v-show="isShow" ref="animateDivRef" v-if="goods.imglist" class="animateDiv">
            <img :src="goods.imglist[0].original_path" alt="">
        </div>
    </transition>
    </div>
</template>

<style scoped>
@import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';

.animateDiv{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
}
.animateDiv img{
    /* display: block; */
    width: 100%;
    height: 100%;
}

</style>

<script>
//导入渲染图册的js
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

//按需导入iview的Affix
import { Affix } from 'iview'

export default {
  components: {
    Affix
  },
  data() {
    return {
      goods: {}, //商品数据
      buyCount: 1,
      isShowComment: false, //是否显示商品评论
      commentList: {}, //评论列表
      pageIndex: 1, //页码
      pageSize: 2, //也容量
      addToShopCartOffset:null, //加入购物车按钮元素的偏移量
      shopCartOffset:null, //顶部购物车偏移量
      isShow:false
    }
  },
  created() {
    //获取商品数据
    this.getGoodsData()
    //获取商品评论列表
    this.getCommentListData()
  },
  updated() {
    //  初始化放大镜插件
    //放在这里是因为，我们点击了右边的连接之后，要重新图册
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
  watch: {
    $route() {
      //id变化后重新发出请求
      this.getGoodsData()

      this.getCommentListData()
    }
  },
  methods: {
    //获取商品数据
    getGoodsData() {
      //axios 配置
      //console.log(this.$route.params.goodsId)
      const url = 'site/goods/getgoodsinfo/' + this.$route.params.goodsId
      this.$axios.get(url).then(response => {
        //console.log(response.data)
        this.goods = response.data.message
      })

    //要获取了商品的数据后才能获取到其它元素的信息 需要一点延时才能去获取到
    setTimeout(()=>{
        //获取加入购物车dom元素的偏移量
        this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()
        //console.log(this.addToShopCartOffset);
        //给被动画元素,设置top.left
        $(this.$refs.animateDivRef).css({
            top:this.addToShopCartOffset.top,
            left:this.addToShopCartOffset.left

        })

        //获取结束位置偏移量
        this.shopCartOffset = $("#shoppingCartCount").offset()

        // console.log(this.addToShopCartOffset);
        // console.log(this.shopCartOffset);
    },200)


    },
    //获取商品评论列表
    getCommentListData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`

      this.$axios.get(url).then(response => {
        this.commentList = response.data
      })
    },
    //分页相关--更改了页容量
    handleSizeChange(pageSize) {
      //更改了页容量 需要从第一页开始查询渲染
      this.pageIndex = 1

      this.pageSize = pageSize

      this.getCommentListData()
    },
    //分页相关---更改了页码
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex

      this.getCommentListData()
    },
    //提交评论
    postComment() {
      const content = this.$refs.textareaRef.value

      if (content.trim().length === 0) {
        this.$message({
          message: '评论内容不能为空',
          type: 'warning'
        })
        return
      }
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`

      this.$axios.post(url, { commenttxt: content }).then(response => {
        //提示
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        //清空输入框
        this.$refs.textareaRef.value = ''
        //重新加载评论区内容
        this.pageIndex = 1
        this.getCommentListData()
      })
    },
    //动画相关
    addCart(){
        this.isShow=true   

        //准备好载荷  commit mutations中的addGoods
        const goods = {
            goodsId:this.$route.params.goodsId,
            count:this.buyCount
        }
        //commit() 提交
        this.$store.commit('addGoods',goods)


    },
    //起始动画
    beforeEnter: function (el) {
        el.style.top = this.addToShopCartOffset.top+"px"
        //console.log(el.style.top);
        el.style.left = this.addToShopCartOffset.left+"px"
        //console.log(el.style.left);
        el.style.transform = "scale(1.0)"
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function (el, done) {
    // 时长
        el.style.transition = "all .5s"
    
    //刷新动画帧
        el.offsetHeight

        el.style.top = this.shopCartOffset.top-5+"px"
        //console.log(el.style.top);
        el.style.left = this.shopCartOffset.left+"px"
        //console.log(el.style.left);
        el.style.transform = "scale(0.3)"

        done()
    },
    afterEnter: function (el) {
    // ...
        this.isShow=false 
    },
  }
}
</script>