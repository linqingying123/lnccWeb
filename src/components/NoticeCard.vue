<template>
  <div class="notice-card">
    <el-card shadow="never">
      <template #header>
        <div class="title">
          <h3>{{ noticeType[type].title }}</h3>
          <span>{{ noticeType[type].titleEnglish }}</span>

          <router-link :to="'/contentList/'+noticeType[type].type" class="more-a">MORE+</router-link>
        </div>

      </template>
      <!--      <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>-->
      <div class="body">
        <div v-for="(item,index) in notice.slice(0, 10)" :key="index">
          <router-link :to="'/detail/'+noticeType[type].type+'/'+item.id" class="txt-elise" :title="item.title">
            <i class="fa fa-circle" aria-hidden="true"></i>
            {{ item.title }}
          </router-link>
          <span>{{ item.createTime.split(" ")[0] }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NoticeCard",
  props: {
    notice: {
      type: Array,
      default: {}
    },
    type: {
      type: Number,
      default: 1
    }

  },
  data() {
    return {
      noticeType: [
        {
          title: '通知公告',
          titleEnglish: 'NOTICE ANNOUNCEMENT',
          type: '1'  //通知公告
        },
        {
          title: '招标公告',
          titleEnglish: 'Bidding announcement',
          type: '2'  //招标公告
        },
        {
          title: '教育动态',
          titleEnglish: 'EDU NEWS',
          type: '3'  //教育动态
        }
      ]
    };
  },
}
</script>

<style lang="stylus" scoped>
.notice-card {
  .el-card {
    border-radius 0;
    border none;

    .title {
      //h3 {
      //  font-size: 30px;
      //  line-height: 30px;
      //}

      position: relative;

      span {

        font-size: 14px;
        color: #333;

      }

      a {
        top: 50%;
      }
    }

    .body {
      div {
        display flex;
        justify-content: space-between;

        line-height: 45px;


        a {
          font-size: 18px;
          color: #555;
          width: 69%;

          i {
            font-size: 1px;
            color: #aa2224;
            margin-right: 5px;
            position: relative;
            top: -2px;
          }
        }

        a:hover {
          color: #aa2224;
        }

        span {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
