<template>
  <div class="search">
    <div class="container clearfix">
      <div class="left">
        <div class="root-nav text-center">
          搜索结果
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
              搜索结果
            </el-breadcrumb-item>

          </el-breadcrumb>
          <el-divider/>
        </div>
        <div class="list" v-loading="loading">
          <ul v-if="dataList" class="list-ul ">
            <li class="list-li" v-for="(item,index) in dataList">
              <router-link class="title txt-elise"
                           :to="'/detail/'+ (item.type == 'tongzhi' ? '1' : item.type == 'zhaobiao' ? '2' : item.type == 'jiaoyu' ? '3' : item.type)   +'/'+item.id"
                           :title="item.title">
                <i class="fa fa-circle" aria-hidden="true"></i>{{ item.title }}
              </router-link>
              <div class="time"><span class="">{{ item.source }}</span>
                <span class="text-center">{{ item.createTime.split(" ")[0] }}</span>
              </div>
            </li>
          </ul>
          <div v-if="!dataList" class="clearfix page-box" style="margin-top:1em;margin-bottom:1em;">
            <div style=" COLOR: #222222; ">
              <div> 找不到和您的查询&nbsp;" <b> {{ title }} </b> " &nbsp;相符的内容。 <br> <br></div>
              <div> 建议:</div>
              <div style="text-indent: 2rem;">
                <div> 请检查输入字词有无错误。</div>
                <div> 请换用另外的查询字词。</div>
                <div> 请改用较常见的字词。</div>
              </div>


            </div>
          </div>
        </div>
        <el-config-provider :locale="zhCn">
          <el-pagination
              v-model:currentPage="pageNo"
              v-model:page-size="pageSize"
              :page-sizes="pageSizes"
              :small="true"
              :hide-on-single-page="true"
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

  name: "Search",
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      total: 0,
      type: '0',
      loading: false,
      pageSizes: [20, 40, 60, 80, 100],
      title: '',
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
  watch: {
    '$route'(to, from) {
      if (to.query.q != from.query.q) {
        this.pageNo = 1;
        this.title = to.query.q
        this.getData();
      }

    }
  },
  created() {
    this.title = this.$route.query.q
    console.log(this.title)
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true
      apis.scarchByTitle(this.title, this.pageNo, this.pageSize).then(res => {
        console.log(res)
        this.total = res.data.result.total
        this.dataList = res.data.result.records
        this.loading = false
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()

    },
    handleCurrentChange(pageNo) {
      this.loading = true
      this.getData()
    },

  }
}
</script>

<style lang="stylus" scoped>
.search {
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


      }

      .el-pagination {
        justify-content center;
      }
    }
  }

}
</style>

