<template>
  <div class="myswiper">
    <swiper
        :slides-per-view="$store.state.swiperItemNumber"
        :modules="modules"
        navigation
    >
      <swiper-slide v-for="(item,index) in data.slice(0,15)">

        <div class="item">
          <router-link :to="'/detail/4/'+item.id" :title="item.title">
            <img :src="item.coverImg" :alt="item.title">
            <div>{{ item.title }}</div>
          </router-link>
        </div>

      </swiper-slide>


    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperSlide} from 'swiper/vue'
import {Navigation} from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation';


export default {
  name: "MySwiper",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      itemNumber: 4,
      modules: [Navigation],
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  // mounted() {
  //   //  监听窗口变化
  //   window.onresize = () => {
  //
  //     return (() => {
  //       window.screenwidth = document.body.clientWidth
  //
  //       if (window.screenwidth > 973) {
  //         this.itemNumber = 4
  //       } else if (window.screenwidth > 767) {
  //         this.itemNumber = 3
  //       } else if (window.screenwidth > 575) {
  //         this.itemNumber = 2
  //       } else {
  //         this.itemNumber = 1
  //       }
  //
  //
  //     })()
  //
  //   }
  // },
  created() {
    // window.screenwidth = document.body.clientWidth

    // if (window.screenwidth > 973) {
    //   this.itemNumber = 4
    // } else if (window.screenwidth > 767) {
    //   this.itemNumber = 3
    // } else if (window.screenwidth > 575) {
    //   this.itemNumber = 2
    // } else {
    //   this.itemNumber = 1
    // }
  },
  methods: {
    onSwiper: (swiper) => {
      console.log(swiper);
    },
    onSlideChange: () => {
      console.log('slide change');
    }
  }

}
</script>

<style lang="stylus" scoped>

.myswiper {
  .item {
    margin: 0 5px;
    padding: 10px;
    border 1px solid #ccc;
    border-radius 5px;
    padding-bottom 0;

    a {
      display block;
      cursor: pointer;

      img {
        width 100%;
        height: 130px;
      }

      div {
        color: #333;
        font-size: 15px;
        width 100%;
        margin: 7px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      div:hover {
        color: #23527c;

      }
    }
  }
}
</style>
