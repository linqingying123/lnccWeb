<template>

  <div class="news-card">
    <router-link :to="'/detail/0/'+news.id" :title="news.title">
      <el-card shadow="hover">
        <div class="img">
          <!--        <a :href="news.linksrc" :title="news.title">-->

          <div>
            <img :src="news.coverImg">
            <div class="time">
              <span>{{ news.createTime.split(" ")[0].split("-")[1] }}</span><br>
              <span style="font-size: 25px;font-weight: bold;">{{ news.createTime.split(" ")[0].split("-")[2] }}</span>
            </div>
            <!--        </a>-->
          </div>
        </div>
        <div class="content">
          <div class="title">
            {{ news.title }}
          </div>
          <div class=" detail" v-html="news.content"></div>
        </div>
      </el-card>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NewsCard",
  props: {
    news: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
}
</script>

<style lang="stylus" scoped>
.news-card {
  //width: 30%;

  a {
    display block;
    width 100%;
    height 100%;
  }

  .img {
    position relative;

    div {

      display: block;
      width: 100%;
      height: 0;
      padding-top: 57%;

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }

      .time {
        position: absolute;
        left: 15px;
        padding-top: 13px;
        bottom: -15px;
        width: 80px;
        height: 80px;
        background: #ca1c1d;
        text-align: center;
        font-size: 16px;
        color: #fff;
      }
    }

  }

  .content {
    margin-top: 45px;

    .title {
      font-size: 18px;
      COLOR: #555;
      text-align center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title:hover {
      text-decoration: none;
      color: #ca1c1d;
    }

    .detail {
      color: #777;
      line-height: 25px;
      font-family: "微软雅黑", Helvetica, "黑体", Arial, Tahoma;
      //margin-top: 15px;
      height: 120px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;

      >>> p, >>> p span {
        color: #777 !important;
        line-height: 25px !important;
        margin-top: 15px !important;
        font-family: "微软雅黑", Helvetica, "黑体", Arial, Tahoma !important;
      }

      >>> p:not(:first-child) {
        display none;
      }

    }
  }


}
</style>
