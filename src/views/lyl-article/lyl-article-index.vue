<template>
  <div class="lyl-article-index">
    <div class="article-index-top">
      <div class="article-index-top_bg">
        <p>文章内容</p>
      </div>
    </div>
    <div class="article-index-middle">
      <h2>{{ articles.title }}</h2>
      <p>{{ articles.content }}</p>
      <p>{{ formattedDate }}</p>
    </div>
    <div class="article-index-button">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { getArticleOne } from "@/http/article.js";
import { format } from "date-fns";
import { ElMessage } from "element-plus";

const $route = useRoute();
const articles = ref({});
const formattedDate = ref("");
import router from "@/router";

const data = {
  token: localStorage.getItem("auth_token"),
  id: $route.query.id,
};
const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  getArticleOne(data)
    .then((res) => {
      if (res.success) {
        articles.value = res.data.article;
        formattedDate.value = format(
          new Date(articles.value.createTime),
          "yyyy-MM-dd"
        );
        console.log("res:", articles.value);
      } else {
        ElMessage.error("获取不到数据");
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
});
</script>

<style scoped>
.article-index-top_bg {
  width: 100%;
  height: 60px;
  background-color: #6e48e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9c6fb;
}
.article-index-middle {
  padding: 24px;
}
.article-index-button {
  text-align: center;
}
</style>
