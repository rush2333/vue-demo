<template>
  <div class="goodsList">
    <NavBar title="商品列表" />

    <div class="page-loadmore">
      <div class="page-loadmore-wrapper">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          @bottom-status-change="handleBottomChange"
          ref="loadmore"
        >
          <ul class="page-loadmore-list">
            <li v-for="(items,index) in goodsList" :key="index">
              <a href="javascript:void(0)">
                <img :src="items.img_url" alt="items.zhaiyao" />
                <div class="title">{{items.title | controllShow(8)}}</div>
                <div class="desc">
                  <div class="sell">
                    <span>${{items.sell_price}}</span>
                    <s>${{items.market_price}}</s>
                  </div>
                  <div class="detail">
                    <div class="hot">热卖中</div>
                    <div class="count">剩{{items.stock_quantity}}件</div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      page: this.$route.params.page,
      goodsList: [],
      allLoaded: false
    };
  },
  methods: {
    loadBottom() {
      console.log("上拉被调用了");
      this.getGoodsList();
      // this.allLoaded = true;
      // this.$refs.loadmore.onBottomLoaded();
    },
    handleBottomChange(status) {
      console.log(status);
    },
    getGoodsList() {
      this.$axios
        .get("getGoodsList", {
          params: {
            pageIndex: this.page
          }
        })
        .then(res => {
          if (this.page == 1) {
            this.goodsList = res.data.message;
          } else {
            this.goodsList = this.goodsList.concat(res.data.message);
          }
          this.page++;
          if (res.data.message.length < 10) {
            this.$toast("数据加载完毕");
            this.allLoaded = true;
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getGoodsList();
  }
};
</script>

<style>
.goodsList {
  padding-bottom: 100px;
}
.page-loadmore-wrapper {
  overflow: scroll;
}
.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}
.page-loadmore-list {
  overflow: hidden;
  height: 100%;
}
.page-loadmore-list li {
  width: 50%;
  float: left;
}
.page-loadmore-list li > a:not(min-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #cccccc;
  width: 100%;
  display: block;
}
.page-loadmore-list li > a:not(min-btn) img {
  width: 100%;
}
.title {
  color: #000;
}
.sell > span {
  float: left;
  color: red;
  text-align: left;
}
.detail > .hot {
  float: left;
  text-align: left;
  font-size: 15px;
}
.detail > .count {
  float: right;
  text-align: right;
  font-size: 15px;
}
.detail {
  overflow: hidden;
}
.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(0, 0, 0, 0.2);
}
.goodsList .page-loadmore-list img {
  height: 200px;
}
.mint-loadmore-button span {
  display: inline-block;
  transition: 0.2s linear;
  -webkit-transition: 0.2s linear;
  vertical-align: middle;
}
.mint-loadmore-button span.is-rotate {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
</style>