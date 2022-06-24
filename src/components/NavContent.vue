<template>
  <div class="nav-content">
    <div class="container clearfix">
      <div class="left">
        <div class="root-nav text-center">
          {{ navData.name }}
        </div>
        <ul class="child-nav text-center">
          <li v-for="(item,index) in navData.children" key="index" :class="item.id == id?'active':''">
            <my-router-link class="link" :to="item.linksrc == null?  item.id :item.linksrc" :parentId="navData.id"
                            :title="item.title">{{ item.name }}
            </my-router-link>
          </li>
        </ul>

      </div>
      <div class="right">
        <div class="nav-b">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/home'}">
              <i class="fa fa-home" aria-hidden="true" style="color:#d51515"></i>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{name:'NavContent',params:{id:navData.id,parentId:navData.id}}">
              {{ navData.name }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-if="id != parentId">{{ currentName }}</el-breadcrumb-item>

          </el-breadcrumb>
          <el-divider/>
        </div>
        <div class="content" v-html="content">

        </div>


      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import MyRouterLink from "@/components/MyRouterLink";
// import {setIdAndParentId, getIdAndParentId} from "@/util";
import util from "@/util";

export default {
  name: "NavContent",
  components: {MyRouterLink},
  // props:['id'],
  // ref可以接收props里的值

  data() {
    return {
      navData: {},
      id: null,
      parentId: null,
      content: '',
      currentName: '',

    }
  },

  watch: {
    '$route'(to, from) { //监听路由是否变化
      // console.log("to:", to)
      // console.log("from:", from)
      let isRefrsh = false
      let id, parentid
      if (to.params.parentId != from.params.parentId) {
        // this.$store.state.nav.parentId = this.$route.params.parentId
        // this.parentId = this.$store.state.nav.parentId
        parentid = this.$route.params.parentId
      }
      if (to.params.id != from.params.id) {
        // this.$store.state.nav.id = this.$route.params.id;
        // this.id = this.$store.state.nav.id
        id = this.$route.params.id;
      }
      // this.$store.funs.setIdAndParentId()
      util.setIdAndParentId(id, parentid)

      this.setData()
    }
  },
  setup() {
    // const route = useRoute()
    // console.log(route.params)


    // console.log(this.$route.params)

  },
  methods: {

    setData() {
      let navid = util.getIdAndParentId()
      // console.log(navid)
      this.id = navid.id
      this.parentId = navid.parentId

      // console.log("parentId", this.parentId)
      // console.log("id", this.id)

    if(this.$store.navList ){
      this.navData = this.$store.navList.filter(item => item.id == this.parentId)[0]

      if (this.parentId == this.id) {
        //  判断父内容是否为空，如果为空将第一个子向的id赋值给this.id
        if (this.navData.content == null) {
          this.id = this.navData.children[0].id
          this.content = this.navData.children[0].content
          this.currentName = this.navData.children[0].name
        } else {
          this.content = this.navData.content
        }
      } else {
        this.currentName = this.navData.children.filter(item => item.id == this.id)[0].name
        this.content = this.navData.children.filter(item => item.id == this.id)[0].content
      }
    }else{
    //  销毁组件
      this.$router.push('/index')
    }

    }
  },

  created() {
window.localStorage.setItem('path','/nav')

    util.setIdAndParentId(this.$route.params.id, this.$route.params.parentId)

    this.setData()
  },

}
</script>

<style lang="stylus" scoped>
.nav-content {


  .container {
    display flex;
    padding 35px 0;

    .left {
      width 280px;


      .root-nav {
        background: #ca1c1d;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #fff;
      }

      .child-nav {
        .active {
          .link {
            background: #f8dadc;
            color: #a50c0d;

            &:before {
              display: block;
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              width: 4px;
              height: 100%;
              background: #a50c0d;
            }
          }
        }

        .link {
          display: block;
          position: relative;
          line-height: 47px;
          border-top: solid 1px #fff;
          font-size: 16px;
          color: #333;
          background: #eef0ef;

          &:hover {

            background: #f8dadc;
            color: #a50c0d;

            &:before {
              background: #a50c0d;


              display: block;
              content: "";
              position: absolute;
              left: 0;
              top: 0;
              width: 4px;
              height: 100%;
              background: #a50c0d;
            }
          }
        }


      }
    }

    .right {
      margin-left: 3vw;
      flex 1;
      max-width: 73%;
      width 70%;

      .nav-b {

        .el-breadcrumb {
          font-size 16px;
        }
      }

      .content {
        overflow hidden;
        padding 10px 0;

        text-indent: 2em;
        line-height: 1.75 !important;
        font-size: 15px !important;
        text-align: justify;
        font-family: "Microsoft yahei", "Simsun" !important;
        min-height: 420px;


        >>> p, span {
          line-height: 1.75 !important;
          font-size: 15px !important;
          text-align: justify;
          font-family: "Microsoft yahei", "Simsun" !important;
          color: #333 !important;

          >>> img {
            width: 100% !important;
            height: 100% !important;
          }
        }
      }

    }
  }

}
</style>
