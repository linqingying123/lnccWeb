<template>
  <div class="home">

    <div class="banner">
      <div class="loading" style="width: 100%;height:100%;" v-loading="!isShow" v-if="!isShow"></div>
      <el-carousel height="100%" v-if="isShow">
        <el-carousel-item v-if="isShow" class="carouse-item" v-for="(item,index) in bannerList" :key="index">
          <a style="display:block;width:100%;height:100%;" :href="item.linksrc" target="_blank">
            <img style="height: 100%;width:100%" :src="item.imgsrc">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="body container">
      <div v-if="news" class="news">
        <div class="news-title">
          新闻+事件<br>
          <span>NEWS</span>

          <router-link class="more-a" to="/contentList/0">MORE+</router-link>
        </div>
        <div class="news-content">
          <news-card v-if="news[0] != undefined" :news="news[0]"></news-card>
          <news-card v-if="news[1] != undefined" :news="news[1]"></news-card>
          <news-card v-if="news[2] != undefined" :news="news[2]"></news-card>
        </div>
      </div>
      <div class="notice">
        <notice-card v-if="tongzhiNotice" :notice="tongzhiNotice" :type="0"></notice-card>
        <notice-card v-if="zhaobiaoNotice" :notice="zhaobiaoNotice" :type="1"></notice-card>
        <notice-card v-if="jiaoyuNotice" :notice="jiaoyuNotice" :type="2"></notice-card>
      </div>


      <div class="impression">
        <div class="title">
          交专映像
          <span style="float:right;">

            <router-link to="/contentList/4" style="top:50%;" class="more-a">MORE+</router-link>
          </span><br>
          <span>IMAGES videos</span>
        </div>
        <my-swiper :data="swiperData"></my-swiper>
      </div>
    </div>
    <div class="link">
      <div class="container clearfix">

        <div class="float-start ">
          <img src="	https://www.lncc.edu.cn/images/friends-tt.png">
        </div>
        <ul class="friends-list ">
          <li><a href="https://www.lncc.edu.cn/yjx.jsp?urltype=tree.TreeTempUrl&wbtreeid=1148" title=""
                 target="_blank"
          >意见箱</a></li>
          <li><a href="http://ehall.lncc.edu.cn" title="" target="_blank"
          >网上办事大厅</a></li>
          <li><a href="http://im.lncc.edu.cn/im/" title="" target="_blank"
          >统一身份认证</a></li>
          <li><a href="http://oa.lncc.edu.cn/" title="" target="_blank"
          >办公自动化(OA)</a></li>
          <li><a href="https://www.lncc.edu.cn/xxzlnb.htm" title="" target="_blank"
          >学校质量年报</a></li>
          <li><a href="http://wsb.ln.gov.cn/xxgk/zlzt/yqfk/" title="" target="_blank"
          >省外办疫情防控专栏</a></li>
          <li><a href="http://swxy.lncc.edu.cn:8090/jiaoxiao/" title="" target="_blank"
          >三维校园</a></li>
          <li><a href="http://xq70.lncc.edu.cn/" title="" target="_blank"
          >70年校庆专栏</a></li>
          <li><a href="https://www.lncc.edu.cn/xue/" title="" target="_blank"
          >学习十九届六中全会精神专栏</a></li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
// import {getAll } from '@/apis/index'
// import apis from '@/apis'
import NewsCard from "@/components/NewsCard";
import NoticeCard from "@/components/NoticeCard";
import MySwiper from "@/components/MySwiper";
import apis from "@/apis";

import util from "@/util";

export default {
  name: "Home",
  components: {MySwiper, NoticeCard, NewsCard},
  // props: ['bannerList'],
  data() {
    return {

      bannerList: [],
      isShow: true,
      news: null,
      tongzhiNotice: null,
      zhaobiaoNotice: null,
      jiaoyuNotice: null,
      swiperData: null

    }
  },
  //异步
  async created() {

    window.localStorage.setItem("path",'/home');

    //因为请求时异步的，子界面获取数据时，请求还未完成，所以数据就变成Undefined，这里只能在请求一次轮播图以及其他数据
    console.log("创建home")

    //如果this.$store.bannerList为空，则销毁此界面
    if (this.$store.bannerList) {
      //不为空
      this.bannerList = this.$store.bannerList
      this.news = this.$store.newsPage.records
      this.tongzhiNotice = this.$store.tongzhiPage.records
      this.zhaobiaoNotice = this.$store.zhaobiaoPage.records
      this.jiaoyuNotice = this.$store.jiaoyuPage.records

      //如果长度大于15，则只取前15个

      this.swiperData = this.$store.impressionPage.records


    } else {
      //销毁此界面
      // this.$destroy()

      console.log("跳转到index")
      this.$router.push("/index")
    }

    console.log(this.$store.bannerList)


  },
  unmounted() {
    console.log("销毁home")
  },
  methods: {

    // seach() {
    //   console.log(this.$refs.seachInput.value);
    // },

  }
}
</script>

<style lang="stylus" scoped>
.home {

  .banner {
    //width: 100%;
    height: 29.59vw;
    //font-size: 20px;
    //text-align: center;
    //line-height: 300px;
    //border 3px solid #ccc;

    .el-carousel {
      height: 100%;


      >>> .el-carousel__indicators--horizontal {
        width: 75%;
        text-align center;
      }

      .carouse-item {
        height 100%;
      }
    }
  }


  .body {

    .news {
      .news-title {
        font-size: 30px;
        line-height: 30px;
        margin-top: 30px;
        position: relative;

        span {
          font-size: 14px;
          color: #333;
        }

        .more-a {
          //margin-top: 0;
          //position: absolute;
          ////top: 50%;
          //right: 0;
          //transform: translateY(-50%);
          //  display: inline-block;
          //  text-align: center;
          //  width: 120px;
          //  height: 35px;
          //  border-radius: 30px;
          //
          //  line-height: 35px;
          //  color: #ca1c1d;
          //  font-size: 16px;
          //  border: solid 1px #ca1c1d;
        }
      }

      .news-content {
        margin-top: 20px;
        display flex;
        justify-content space-around;

        .news-card {
          padding 0 10px;
          flex: 1;
          width 0; //完全由flex布局控制
          //width: 33.333333333333333333333%;
        }
      }
    }

    .notice {
      display flex;
      justify-content space-between;
      margin: 10px;
      //padding 0 10px;

      border-radius: 4px;
      border: 1px solid #e4e7ed;

      .notice-card {
        width: 0;
        flex: 1;
      }
    }

    .impression {
      .title {
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        color: #333;
        font-family: "微软雅黑", Helvetica, "黑体", Arial, Tahoma;
        box-sizing: border-box;
        font-size: 30px;
        line-height: 30px;
        margin-top: 30px;
        margin-bottom: 15px;
        position: relative;

        span {
          font-size: 14px;
          color: #333;
        }
      }
    }

  }

  .link {
    background: #f2f2f2;
    padding: 20px 0;

    margin-top: 15px;

    .container {

      img {
        max-width: 100%;
      }

      .friends-list li {
        float: left;
        margin-top: 15px;
        padding: 0 20px;
        height: 18px;
        line-height: 18px;
        border-right: solid 1px #555555;

        a {
          font-size: 18px;
          color: #555;
        }

        a:hover {
          color: #aa2224;
        }

      }
    }

  }

  //.bottom {
  //  .bottom-link {
  //    background: #f2f2f2;
  //    padding: 20px 0;
  //
  //    margin-top: 15px;
  //
  //    .container {
  //
  //      img {
  //        max-width: 100%;
  //      }
  //
  //      .friends-list li {
  //        float: left;
  //        margin-top: 15px;
  //        padding: 0 20px;
  //        height: 18px;
  //        line-height: 18px;
  //        border-right: solid 1px #555555;
  //
  //        a {
  //          font-size: 18px;
  //          color: #555;
  //        }
  //
  //        a:hover {
  //          color: #aa2224;
  //        }
  //
  //      }
  //    }
  //
  //  }
  //
  //  .bottom-info {
  //    background: url(https://www.lncc.edu.cn/images/footer-back.png) center no-repeat;
  //    padding: 45px 0;
  //    background-size: cover;
  //
  //    .icp {
  //      //position absolute;
  //      //bottom:5;
  //      margin 30px 0 5px 0;
  //      width: 100%;
  //      text-align: center;
  //
  //      a {
  //        font-size: 20px;
  //        color: #eee;
  //      }
  //    }
  //
  //    .container {
  //      .footer-p {
  //        font-size: 16px;
  //        color: #fff;
  //        margin-top: 25px;
  //
  //        p {
  //          margin: 0px 0px 10px;
  //        }
  //      }
  //
  //      .ewm {
  //        color: #fff;
  //        /* margin-right: 85px; */
  //
  //        ul {
  //          li {
  //            float: left;
  //            margin: 0 5px;
  //
  //            img {
  //              width: 109px;
  //              height: 109px;
  //              margin-bottom: 5px;
  //            }
  //          }
  //        }
  //      }
  //    }
  //  }
  //
  //
  //}
}
</style>
