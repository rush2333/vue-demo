<template>
  <div class="comment">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span>返回</span>
          </div>
        </li>
        <li class="text-comment">
          <textarea cols="30" rows="10" v-model="commentContent"></textarea>
        </li>
        <li>
          <mt-button size="large" type="primary" @click="handleComment">评论</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>44条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li
          v-for="(item,index) in comments"
          :key="index"
        >{{item.user_name}}：{{item.content}} {{item.add_time | relativeTime}}</li>
      </ul>
      <mt-button size="large" type="primary" @click="loadMore(page)">加载更多评论</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["cid"],
  data() {
    return {
      comments: [],
      page: 1,
      commentContent: ""
    };
  },
  methods: {
    handleComment() {
      this.$axios
        .post(`postComment/${this.cid}`, {
          content: this.commentContent
        })
        .then(res => {
          this.$toast(res.data.msg);
          this.commentContent = '';
          this.page = 1;
          this.loadMore();
        })
        .catch(err => {
          this.$toast('请输入评论内容');
          console.log(err);
        });
    },
    loadMore(page) {
      this.$axios
        .get(`getComment/${this.cid}?pageIndex=${this.page}`)
        .then(res => {
          if (page) {
            this.comments = this.comments.concat(res.data.data);
          } else {
            this.comments = res.data.data;
          }
          this.page++;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    let page = this.$route.query.page || "1";
    this.loadMore();
  }
};
</script>

<style>
.comment {
  padding-bottom: 55px;
}
.photo-comment > div span:nth-child(1) {
  float: left;
  font-weight: bold;
  margin-left: 5px;
}
.photo-comment > div span:nth-child(2) {
  float: right;
}
.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  line-height: 30px;
  margin-bottom: 5px;
}
.text-comment {
  padding: 5px 5px;
}
.text-comment textarea {
  margin-bottom: 5px;
}
textarea {
  width: 100%;
}
.comment-list li {
  font-size: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
}
</style>