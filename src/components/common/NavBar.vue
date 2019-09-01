<template>
  <div class="navHeader">
    <h3 @click="goBack" class="back">&lt;</h3>
    <h3 class="desc_title">{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: ["title"],
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.navHeader {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: relative;
  background-color: #b29cc0;
}
h3 {
  float: left;
}
h3.back {
  margin-left: 15px;
}
h3.desc_title {
  position: absolute;
  width: 200px;
  left: 50%;
  height: 40px;
  margin-left: -100px;
  text-align: center;
}
</style>