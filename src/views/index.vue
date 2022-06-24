<template>
  <div class="index">
    <div class="loading" v-if="!isShow" v-loading="!isShow"></div>
    <div class="main" v-show="isShow">
      <div class="header">
        <div class="container clearfix">
          <div class="float-start logo">
            <a href title="辽宁省交通高等专科学校">
              <img src="https://www.lncc.edu.cn/images/logo_new.png">
            </a>
          </div>
          <div class="search-box float-end">
            <ul class="linkbox clearfix">
              <li><a href="https://ehall.lncc.edu.cn/EIP/nonlogin/user/index.htm" target="_blank"
              >考生与访客</a></li>
              <li><a href="https://ehall.lncc.edu.cn/EIP/nonlogin/user/index.htm" target="_blank"
              >校友</a></li>
              <li><a href="https://ehall.lncc.edu.cn/EIP/nonlogin/user/index.htm" target="_blank"
              >教职工</a></li>
              <li><a href="https://ehall.lncc.edu.cn/EIP/nonlogin/user/index.htm" target="_blank"
              >在校生</a></li>
            </ul>
            <div class="seach" style="position:relative;">
              <input type="text" class="form-control" placeholder="请输入关键字" @keyup.enter="seach" autocomplete="off"
                     ref="seachInput">
              <input type="button" class="btn btn-search" value=""
                     @click="seach()">
            </div>
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="container">

          <ul v-if="!menuMode" class="nav-list-pe " ref="navUl">
            <li v-for="(item,index) in navList">
              <my-router-link :parentId="item.id" :to="item.linksrc == null?  item.id :item.linksrc">{{
                  item.name
                }}
              </my-router-link>
              <span v-if="item.hasChild != '0'" class="nav-click" @click="childDeplay($event)">
                <span class="caret"></span>
              </span>
              <ul v-if="item.hasChild != '0'" class="nav-down">
                <li v-for="(itemChild,index) in item.children">
                  <my-router-link :parentId="item.id"
                                  :to="itemChild.linksrc == null?  itemChild.id :itemChild.linksrc">{{
                      itemChild.name
                    }}
                  </my-router-link>
                </li>


              </ul>
            </li>


          </ul>

          <ul v-if="menuMode" class="nav-list clearfix text-center">
            <li v-for="(item,index) in navList" :key="index">

              <el-dropdown show-timeout="120" :trigger="item.hasChild == '0'? 'contextmenu':'hover'">
                <my-router-link :parentId="item.id" :to="item.linksrc == null?  item.id :item.linksrc">{{
                    item.name
                  }}
                </my-router-link>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-for="(itemChild,index) in item.children">
                      <my-router-link :parentId="item.id"
                                      :to="itemChild.linksrc == null?  itemChild.id :itemChild.linksrc">{{
                          itemChild.name
                        }}
                      </my-router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </li>
          </ul>
          <!--          <a-menu class="nav-list clearfix text-center"  ref="navUl" :mode="menuMode">-->

          <!--            <a-sub-menu v-for="(item,index) in navList">-->
          <!--              <template #title>-->
          <!--                <my-router-link :parentId="item.id" :to="item.linksrc == null?  item.id :item.linksrc">{{-->
          <!--                    item.name-->
          <!--                  }}-->
          <!--                </my-router-link>-->
          <!--              </template>-->
          <!--              <a-menu-item v-for="(itemChild,index) in item.children">-->
          <!--                <my-router-link :parentId="item.id"-->
          <!--                                :to="itemChild.linksrc == null?  itemChild.id :itemChild.linksrc">{{-->
          <!--                    itemChild.name-->
          <!--                  }}-->
          <!--                </my-router-link>-->
          <!--              </a-menu-item>-->
          <!--            </a-sub-menu>-->

          <!--          </a-menu>-->
        </div>
        <div class="menu-button" :class="{'cross':isCross}" @click="deployment($event)">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
      </div>
      <!--      <keep-alive>-->
      <router-view></router-view>
      <!--      </keep-alive>-->


      <div class="bottom">

        <div class="bottom-info">
          <div class="container clearfix">
            <div class="float-start footer-p">
              <p>地址：辽宁省沈阳市沈北新区建设南一路5号 邮编：110122</p>
              <p>办公室电话：024-89708710 招生电话：89708729 就业电话：89708730 </p>
              <p>站点建设与维护： 信息技术中心</p>
              <p>版权所有：辽宁省交通高等专科学校 </p>

            </div>
            <div class="float-end ewm text-center">
              <ul class="clearfix">
                <li>
                  <img src="	https://www.lncc.edu.cn/images/weibo-1.jpg">
                  <br>扫码进入微博
                </li>
                <li>
                  <img src="	https://www.lncc.edu.cn/images/weixin-1.jpg">
                  <br>扫码关注官方微信
                </li>
              </ul>

            </div>
          </div>

          <div class="icp">
            <a href="https://beian.miit.gov.cn/" target="_self">
              <span>辽ICP备:2021013066号-1</span>
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import MyRouterLink from "@/components/MyRouterLink";
import apis from "@/apis/index";
import util from "@/util"
import {ElMessage} from 'element-plus'

export default {
  name: "index",
  components: {MyRouterLink},
  data() {
    return {
      isShow: false,
      navList: [],
      isCross: false,
      menuMode: true,
      currentIndex: 0
    }
  },
  async created() {
    window.screenwidth = document.body.clientWidth
    if (window.screenwidth > 973) {
      this.menuMode = true
      this.$store.state.swiperItemNumber = 4
    } else {
      this.menuMode = false
      if (window.screenwidth > 767) {
        this.$store.state.swiperItemNumber = 3
      } else if (window.screenwidth > 575) {
        this.$store.state.swiperItemNumber = 2
      } else {
        this.$store.state.swiperItemNumber = 1
      }

    }


    // this.isShow = true
    console.log(this.isShow)
    console.log("创建index")
    apis.getAll().then(res => {

      this.navList = res.data.result.navList
      this.$store.navList = res.data.result.navList
      this.$store.bannerList = res.data.result.bannerList
      this.$store.newsPage = res.data.result.newsList
      this.$store.tongzhiPage = res.data.result.tongzhiList
      this.$store.zhaobiaoPage = res.data.result.zhaobiaoList
      this.$store.jiaoyuPage = res.data.result.jiaoyuList
      this.$store.impressionPage = res.data.result.impressionList
      // console.log(this.$store.bannerList)
      this.isShow = true

      console.log(res.data.result)


      console.log("当前导航:", this.$route.path)

      if (this.$route.path == "/index") {
        if (window.localStorage.getItem('path')) {
          if (window.localStorage.getItem('path') == '/home') {
            this.$router.push("/home")
          } else if (window.localStorage.getItem('path') == '/nav') {
            this.$router.push("/nav")
          } else if (window.localStorage.getItem('path').includes('contentList')) {
            this.$router.push(window.localStorage.getItem('path'))
          } else {
            this.$router.push("/home")
          }
        } else {
          this.$router.push("/home")
        }
      }
      //如果路由不是index,home,则跳转到home


      // if (this.$route.path == "/index" || this.$route.path == "/home") {
      //
      //   this.$router.push("/home")
      // }else if(this.$route.path == "/nav"){
      //   this.$router.push("/nav")
      // }


    })


  },


  mounted() {
    //  监听窗口变化
    window.onresize = () => {

      return (() => {
        window.screenwidth = document.body.clientWidth
        console.log(this.menuMode)

        //其实这段代码没有什么必要
        // console.log(document.body.offsetWidth)
        // if (window.screenwidth > 973) {
        //   // this.$refs.navUl.style.display = "block"
        //   // this.isCross = false
        //   // console.log("大于992")
        //   this.menuMode = true
        // } else {
        //   // this.isCross = false
        //   // this.$refs.navUl.style.display = "none"
        //   // console.log("小于992")
        //   this.menuMode = false
        // }


        if (window.screenwidth > 973) {
          this.menuMode = true
          this.$store.state.swiperItemNumber = 4
        } else {
          this.menuMode = false
          if (window.screenwidth > 767) {
            this.$store.state.swiperItemNumber = 3
          } else if (window.screenwidth > 575) {
            this.$store.state.swiperItemNumber = 2
          } else {
            this.$store.state.swiperItemNumber = 1
          }

        }


      })()

    }
  },
  //路由发生变化隐藏菜单
  watch: {
    '$route': function (to, from) {
      this.$refs.navUl.style.display = "none"
      this.isCross = false
    }
  },

  methods: {
    childDeplay(e) {
      console.log(e.target.className)
      //上下展开和收起动画


      //将当前点击的元素的class为nav-down设置为block
      if (e.target.className.includes('nav-click')) {//父元素
        if (e.target.nextElementSibling.style.display == "block") {
          //添加一个动画过度效果


          e.target.nextElementSibling.style.display = "none"
          //  添加active
          e.target.classList.remove("active")
        } else {
          let navDown = document.getElementsByClassName("nav-down")
          for (var i = 0; i < navDown.length; i++) {
            navDown[i].style.display = "none"
            //  移除说有active的class
            navDown[i].parentElement.children[1].classList.remove('active')

          }
          //  添加active
          e.target.classList.add("active")
          e.target.nextElementSibling.style.display = "block"
        }
      } else {//子元素
        if (e.target.parentNode.nextElementSibling.style.display == "block") {
          e.target.parentNode.nextElementSibling.style.display = "none"
          //  添加说有active的class
          e.target.parentNode.classList.remove("active")
        } else {
          let navDown = document.getElementsByClassName("nav-down")
          for (var i = 0; i < navDown.length; i++) {
            navDown[i].style.display = "none"

            //移除同级元素class为nav-click的active的class
            navDown[i].parentElement.children[1].classList.remove('active')
            // console.log(navDown[i].classList)
          }
          e.target.parentNode.classList.add("active")
          e.target.parentNode.nextElementSibling.style.display = "block"
        }

        // e.target.parentNode.nextElementSibling.style.display = "block"
      }


      // e.target.setAttribute("style", "display:block")


    },

    deployment(e) {
      // console.log(this.$refs.navUl.$el.style)
      if (this.$refs.navUl.style.display == "block") {
        this.isCross = false
        this.$refs.navUl.style.display = "none"
        console.log("隐藏")
      } else {
        this.isCross = true
        this.$refs.navUl.style.display = "block"
        console.log("显示")
      }
      // console.log(e.target)
      // console.log("展开 or 收起")
      // console.log(this.$refs.navUl.style.display)
      // this.$refs.navUl.style.display = this.$refs.navUl.style.display == "block" ? "none" : "block"

    },
    seach() {

      if (this.$refs.seachInput.value == "") {
        ElMessage({
          message: '请输入关键字',
          type: 'warning',
        })
      } else {
        this.$router.push({
          path: "/search",
          query: {
            q: this.$refs.seachInput.value
          }
        })
      }
      console.log(this.$refs.seachInput.value);

    }
  }

}
</script>

<style lang="stylus" scoped>
.index {

  .loading {
    width: 100vw;
    height: 100vh;
  }

  .main {

    .header {
      height: 150px;
      background: url(https://www.lncc.edu.cn/images/header.jpg) center no-repeat;
      background-size: cover;

      .logo {
        /* margin-top: 25px; */
        width: calc(100% - 360px);
        float: left;

        a {
          color: #333;

          img {
            max-width: 100%;
          }
        }
      }

      .search-box {
        width: 280px;
        padding-right: 46px;
        margin-top: 30px;
        position: relative;

        float: right;

        .linkbox {
          margin-bottom: 20px;

          li:last-child {
            margin-left: 0px;
          }

          li {

            float: right;
            height: 30px;
            line-height: 30px;
            font-size: 15px;
            margin-left: 10px;

            a {
              color: #fff;
              text-decoration: none;
            }
          }
        }

        .seach {
          .form-control {
            border: none;
            border-radius: 4px 0 0 4px;
            height: 32px;
            box-shadow: none;
            background-color: rgba(255, 255, 255, 0.8);
          }

          .btn-search {
            position: absolute;
            width: 46px;
            height: 32px;
            right: -2px;
            top: 0;
            border: none;
            background: url(https://www.lncc.edu.cn/images/search-input.png) center no-repeat;
          }
        }
      }
    }

    .nav {
      background: #770606;
      position: relative;
      z-index: 1000;


      .cross {
        margin-top: -8px;

        .bar {
          margin: 13px auto !important;

          &:nth-of-type(1) {
            -webkit-transform: translateY(15px) rotate(-45deg);
            -ms-transform: translateY(15px) rotate(-45deg);
            transform: translateY(15px) rotate(-45deg);
          }

          &:nth-of-type(2) {
            opacity: 0;
          }

          &:nth-of-type(3) {
            -webkit-transform: translateY(-15px) rotate(45deg);
            -ms-transform: translateY(-15px) rotate(45deg);
            transform: translateY(-15px) rotate(45deg);
          }
        }

      }

      .menu-button {
        position: absolute;
        display: none;
        top: 18px;
        right: 15px;
        z-index: 1000;
        cursor: pointer;
        -webkit-transition: .3s;
        transition: .3s;


        .bar {

          &:nth-of-type(1) {
            margin-top: 0px !important;
          }

          position: relative;
          display: block;
          width: 24px;
          height: 2px;
          margin: 5px auto;
          background-color: #fff;
          border-radius: 10px;
          -webkit-transition: .3s;
          transition: .3s;
        }
      }

      .container {
        .nav-list-pe {
          position: absolute;
          display: none;
          z-index: 10000000;
          border-top: solid 1px #ddd;
          left: 0;
          top: 100%;
          right: 0;
          box-shadow: 1px 2px 3px #ddd;
          background: #ca1c1d;

          li {
            width: 100%;
            float: none;
            margin: 0;
            text-align: left;
            line-height: 40px;
            position: relative;

            a {


              &:hover {
                background: #a50c0d;
              }
              display: block;
              line-height: 50px;
              color: #fff;
              font-size: 16px;
              height: 40px;
              line-height: 40px;
              padding: 0 15px;

            }

            .active {
              transform: rotate(180deg);
            }

            .nav-click {


              display: block;
              transition: 0.3s all;
              z-index: 10000;
              position: absolute;
              color: #fff;
              right: 0;
              top: 0;
              width: 40px;
              height: 40px;
              text-align: center;
              line-height: 40px;

              .caret {
                display: inline-block;
                width: 0;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-top: 4px dashed;
                border-top: 4px solid \9;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
              }

            }

            .nav-down {
              position: static;
              left: 0;
              top: 100%;
              width: 100%;
              background: #ce3032;
              display: none;

              li {

                width: 100%;
                padding-left 10px;
                margin: 0;
                text-align: left;
                line-height: 40px;


                a {
                  border-bottom solid 1px #de7475;
                }
              }
            }

          }
        }

        .nav-list {
          //display block;
          //background-color transparent;
          //border-bottom: none;

          li {
            float: left;
            width: 8.33%;
            //position: relative;
            //padding 0;

            //&:after {
            //  border-bottom none;
            //}

            .el-dropdown {
              width: 100%;

              >>> .el-tooltip__trigger {
                width: 100%;


              }
            }

            a {
              display: block;
              line-height: 50px;
              color: #fff;
              font-size: 16px;

            }

            a:hover {
              background: #a50c0d;
            }

          }
        }
      }


    }


    .bottom {
      .bottom-link {
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

      .bottom-info {
        background: url(https://www.lncc.edu.cn/images/footer-back.png) center no-repeat;
        padding: 45px 0;
        background-size: cover;

        .icp {
          //position absolute;
          //bottom:5;
          margin 30px 0 5px 0;
          width: 100%;
          text-align: center;

          a {
            font-size: 20px;
            color: #eee;
          }
        }

        .container {
          .footer-p {
            font-size: 16px;
            color: #fff;
            margin-top: 25px;

            p {
              margin: 0px 0px 10px;
            }
          }

          .ewm {
            color: #fff;
            /* margin-right: 85px; */

            ul {
              li {
                float: left;
                margin: 0 5px;

                img {
                  width: 109px;
                  height: 109px;
                  margin-bottom: 5px;
                }
              }
            }
          }
        }
      }


    }
  }
}
</style>
