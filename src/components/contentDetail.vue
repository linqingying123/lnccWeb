<template>
  <div class="contentDetail">
    <div class="container clearfix">
      <div class="left">
        <div class="root-nav text-center">
          {{ title[type].title }}
        </div>
        <div class="recent-update   ">
          <div class="text text-center">最近更新</div>

          <div style=" margin-top: 35px;" v-loading="!isShow" v-if="!isShow"></div>

          <ul v-if="isShow">
            <li v-for="(item,index) in updateList">
              <!--              <a href="19839.htm" target="_blank">建筑工程系“绿城装饰订单班”岗前线上培训圆满完成</a>-->
              <router-link :to="'/detail/'+this.type+'/'+item.id">{{ item.title }}</router-link>
              <span>{{ item.createTime.split(" ")[0] }}</span>
            </li>


          </ul>
        </div>

      </div>
      <div class="right">
        <div class="nav-b">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/home'}">
              <i class="fa fa-home" aria-hidden="true" style="color:#d51515"></i>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="'/contentList/'+type">
              {{ title[type].title }}
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              正文
            </el-breadcrumb-item>

          </el-breadcrumb>
          <el-divider/>
        </div>
        <div style="margin-top: 35px;" v-loading="!isShow" v-if="!isShow"></div>

        <div class="content" v-if="isShow">


          <div class="content-title text-center">{{ currentData.title }}</div>
          <div class="content-date text-center ">
            <span>日期：{{ currentData.createTime.split(" ")[0] }}</span>
            <span>作者：{{ currentData.author }}</span>
            <span>稿件来源：{{ currentData.source }}</span>
            <span>阅读：{{ currentData.readCount }}</span>
          </div>

          <div class="content-p" v-html="currentData.content"></div>

        </div>

      </div>
    </div>

  </div>

</template>

<script>
import apis from "@/apis";

export default {
  name: "contentDetail",
  data() {
    return {
      title: [
        {
          title: '新闻事件',
        },
        {
          title: '通知公告',
        },
        {
          title: '招标公告',
        },
        {
          title: '教育动态',

        },
        {
          title: '交专印象'
        }
      ],
      type: '0',
      updateList: null,
      currentData: null,
      isShow: false
    }
  },
  //路由发生变化
  watch: {
    '$route': function (to, from) {
      if (to.params.type != from.params.type || to.params.id != from.params.id) {
        apis.getContentDetailByTypeAndByType(to.params.type, to.params.id).then(res => {
          console.log(res)
          this.currentData = res.data.result
          this.updateList = res.data.result.updateList
          this.isShow = true
        })
      }

    },
  },
  created() {
    console.log("创建contentDetail")
    this.type = this.$route.params.type;
    console.log(this.$route.params.type)
    console.log(this.$route.params.id)
    apis.getContentDetailByTypeAndByType(this.$route.params.type, this.$route.params.id).then(res => {
      console.log(res)
      this.currentData = res.data.result
      this.updateList = res.data.result.updateList
      this.isShow = true
    })
  },
  unmounted() {
    console.log("销毁contentDetail")
  },


}
</script>

<style lang="stylus" scoped>
.contentDetail {
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

      .recent-update {
        margin-top: 50px;

        .text {
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          background: #ca1c1d;

          color: #fff;
        }

        ul {
          li {
            line-height: 22px;
            font-size: 14px;
            padding: 8px 0;
            border-bottom: 1px solid #e6e6e6;

            a {
              color: #333;
              display: block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;

              &:hover {
                color: #ca1c1d;
              }
            }

            span {
              display: block;
              color: #999;
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
        .content-title {
          font-size: 20px;
          color: #333;
          margin: 20px 0;
        }

        .content-date {
          background: #f3f3f3;
          padding: 10px 0;
          color: #666;

          span {
            padding: 0 10px;
          }
        }

        .content-p {
          padding: 15px 0;

          p, p span, p strong {
            font-size: 14px !important;
            color: #333 !important;
            line-height: 28px !important;
            text-align: justify;
            font-family: "微软雅黑" !important;
          }
        }
      }

    }
  }

}
</style>
