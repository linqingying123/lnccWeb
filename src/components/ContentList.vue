<template>
  <div class="contentList">
    <div class="container clearfix">
      <div class="left">
        <div class="root-nav text-center">
          {{ title[type].title }}
        </div>


      </div>
      <div class="right">
        <div class="nav-b">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{path:'/home'}">
              <i class="fa fa-home" aria-hidden="true" style="color:#d51515"></i>
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <!--              {{ navData.name }}-->
              {{ title[type].title }}
            </el-breadcrumb-item>

          </el-breadcrumb>
          <el-divider/>
        </div>
        <div class="list" v-loading="loading">
          <ul v-if="type != '4'" class="list-ul ">
            <li class="list-li" v-for="(item,index) in dataList">
              <router-link class="title txt-elise" :to="'/detail/'+this.type+'/'+item.id" :title="item.title">
                <i class="fa fa-circle" aria-hidden="true"></i>{{ item.title }}
              </router-link>
              <div class="time"><span class="">{{ item.source }}</span>
                <span class="text-center">{{ item.createTime.split(" ")[0] }}</span>
              </div>
            </li>
          </ul>
          <ul v-else class="img-list">
            <li v-for="(item,index) in dataList">
              <div class="img-list-box">
                <div class="img-list-img img-hide">
                  <router-link :to="'/detail/4/'+item.id" :title="item.title" class="imgbed">
                    <img :src="item.coverImg">
                  </router-link>
                </div>
                <router-link :to="'/detail/4/'+item.id" :title="item.title" class="img-list-bottom">
                  <div class="txt-elise">{{ item.title }}</div>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <el-config-provider :locale="zhCn">
          <el-pagination
              v-model:currentPage="pageNo"
              v-model:page-size="pageSize"
              :page-sizes="pageSizes"
              :small="true"

              :background="true"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </el-config-provider>


      </div>
    </div>

  </div>
</template>

<script>
import apis from "@/apis";

export default {

  name: "ContentList",
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      total: 0,
      type: '0',
      loading: false,
      pageSizes: [20, 40, 60, 80, 100],
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
      zhCn: {
        name: 'zh-ch',
        el: {
          pagination: {
            total: '共{total} 条',
            pagesize: "条/页",
            goto: "前往",
            pageClassifier: "页"
          }
        }
      }


    }
  },
  created() {


    window.localStorage.setItem('path', this.$route.path)


    if (this.$store.newsPage || this.$store.tongzhiPage || this.$store.jiaoyuPage || this.$store.zhaobiao || this.$store.impressionPage) {
      console.log(this.$route.params.type)
      this.type = this.$route.params.type
      this.setData(this.$route.params.type)
    } else {
      this.$router.push('/index')
    }


    // console.log(this.$store.newsPage.records)
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.loading = true
      apis.getByTypePageList(this.type, this.pageNo, pageSize).then(res => {
        console.log(res)
        this.dataList = res.data.result.records
        this.loading = false
      })


    },
    handleCurrentChange(pageNo) {
      this.loading = true
      this.pageNo = pageNo
      apis.getByTypePageList(this.type, pageNo, this.pageSize).then(res => {
        this.dataList = res.data.result.records
        this.loading = false
      })
    },
    setData(type) {
      switch (type) {
        case "0":   //新闻事件
          this.dataList = this.$store.newsPage.records
          this.total = this.$store.newsPage.total
          break
        case '1': //通知公告
          this.dataList = this.$store.tongzhiPage.records
          this.total = this.$store.tongzhiPage.total
          console.log('通知公告')
          break
        case '2': //招标公告
          this.dataList = this.$store.zhaobiaoPage.records
          this.total = this.$store.zhaobiaoPage.total
          console.log('招标公告')
          break
        case '3': //教育动态
          this.dataList = this.$store.jiaoyuPage.records
          this.total = this.$store.jiaoyuPage.total
          console.log('教育动态')
          break
        case '4'://交专印象

          this.pageSizes = [12, 21, 30, 39, 48]
          this.pageSize = 12
          this.dataList = this.$store.impressionPage.records
          this.total = this.$store.impressionPage.total
          console.log('交专印象')
          break
        default:
          this.pageNo = 1
          // this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.contentList {
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

      .list {
        margin-bottom: 10px;

        .list-ul {
          .list-li {
            display flex;
            height: 35px;
            line-height: 35px;

            .title {
              flex: 5;
              font-size: 16px;
              color: #333;

              &:hover {
                color: #aa2224;
              }

              i {
                margin-right 3px;
                font-size: 1px;
                color #aa2224;
                position: relative;
                top: -2px;
              }


            }

            .time {
              flex: 2;
              display flex;
              font-size: 14px;

              span {
                flex 1;
                //padding 0 5px;
                margin-left 5px;
                color: #999;
                text-align right;
              }
            }
          }
        }

        .img-list {
          display flex;
          flex-wrap: wrap;
          justify-content: space-between;
          column-count 3;

          li {


            //flex 33.33333%;
            width 33.33333%;
            padding: 0 15px;
            margin-bottom: 30px;

            .img-list-box {
              padding 5px;

              &:hover {
                //  添加阴影
                box-shadow: 0 0 10px #999;
              }

              .img-list-img {
                overflow hidden;

                a {
                  position: relative;
                  display: block;
                  height: 0;
                  width: 100%;
                  padding-top: 50.25%;
                  overflow: hidden;

                  img {
                    display block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                  }
                }
              }

              .img-list-bottom {

                &:hover {
                  color #aa2224;
                }

                background: #f4f4f4;
                display: block;
                padding: 15px 15px;
                font-size: 16px;
                color: #555;
                line-height: 30px;
              }
            }

          }

        }
      }

      .el-pagination {
        justify-content center;
      }
    }
  }

}
</style>
