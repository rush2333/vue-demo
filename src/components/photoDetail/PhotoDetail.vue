<template>
  <div class="photo-detail">
    <NavBar title="图文详情" />
    <div class="photo-title">
      <p>{{imgInfo.title}}</p>
      <span>发起日期：{{imgInfo.add_time | coverTime('YYYY-MM-DD')}}</span>
      <span>{{imgInfo.click}}次浏览</span>
      <span>分类：民生经济</span>
      <!-- <ul>
        <li v-for="(item,index) in thumImgs" :key="index">
          <a href="javascript:void(0)">
            <img :src="item.msrc" alt />
          </a>
        </li>
      </ul>-->
      <!-- 使用vue-priview -->
      <vue-preview :slides="thumImgs" @close="handleClose"></vue-preview>
      <div class="photo-desc">
        <p v-html="imgInfo.content"></p>
      </div>
    </div>
    <Comment :cid='this.$route.query.id' />
  </div>
</template>

<script>
export default {
  name: "PhotoDetail",
  data() {
    return {
      thumImgs: [],
      imgInfo: {}
    };
  },
  methods: {
    handleClose() {
      console.log("close");
    }
  },
  created() {
    let id = this.$route.query.id;
    var getImagesInfo = () => {
      return this.$axios.get("getImageInfo", {
        params: { id: id }
      });
    };
    var getThumImages = () => {
      return this.$axios.get("getThumImages");
    };

    this.$axios.all([getThumImages(), getImagesInfo()]).then(
      this.$axios.spread((acct, perms) => {
        this.thumImgs = acct.data.data;
        this.imgInfo = perms.data.data[0];
      })
    );
  }
};
</script>

<style>
.photo-detail{
  padding-bottom:100px;
}
.photo-title p {
  font-size: 20px;
  font-weight: 600;
  color: #0f80ff;
  margin: 15px 0;
}
.photo-title span {
  padding: 10px 5px;
}
.photo-desc p {
  font-size: 18px;
  color: #333333;
}
.photo-title .my-gallery {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.photo-title .my-gallery figure {
  width: 33%;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
}
/* .photo-title ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.photo-title ul li {
  width: 33%;
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
} */
</style>