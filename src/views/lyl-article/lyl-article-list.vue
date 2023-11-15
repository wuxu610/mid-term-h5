<template>
  <div class="lyl-article-list">
    <div class="lyl-article-list-top">
      <div class="article-list-top_bg">
        <p class="article-list-top_btn" @click="goBack">返回</p>
        <p>文章列表</p>
      </div>
      <div class="article-list-top_nav">
        <div class="scrollbar-flex-content">
          <p class="scrollbar-demo-item" @click="onCat('0')">全部</p>
          <p
            v-for="item in articleCats"
            :key="item"
            class="scrollbar-demo-item"
            @click="onCat(item.id)"
          >
            {{ item.catName }}
          </p>
        </div>
        <div class="scrollbar-demo-item" @click="onShowPopup">所有分类</div>
      </div>
    </div>
    <div class="lyl-article-list-middle">
      <LYLArticleList
        title="用户文章"
        :showCat="showCat"
        :articleList="articles"
      ></LYLArticleList>
    </div>
    <div class="lyl-article-list-button"></div>
    <div class="category-popup-overlay" v-if="showPopup"></div>
    <div class="category-popup" style="padding: 28px" v-if="showPopup">
      <button class="delete-button" @click="onClosePopup">X</button>
      <div class="scrollbar-flex-content2">
        <p
          v-for="item in articleCats"
          :key="item"
          @click="onCat(item.id)"
          class="scrollbar-demo-item"
        >
          {{ item.catName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import LYLArticleList from "@/components/LYLArticleList.vue";
import { getArticleCatByUserId, getArticleCatAll } from "@/http/article.js";
import { onMounted, ref } from "vue";
import { getArticlesAll } from "@/http/article.js";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const articles = ref([]);
const articleCats = ref([]);
const showPopup = ref(false);
const showCat = ref("0");
const onShowPopup = () => {
  showPopup.value = true;
};
const onClosePopup = () => {
  showPopup.value = false;
};
const onCat = (cat) => {
  showCat.value = cat;
  showPopup.value = false;
};
const goBack = () => {
  router.push("/index");
};
onMounted(() => {
  const data = localStorage.getItem("auth_token");
  getArticlesAll(data)
    .then((res) => {
      if (res.success) {
        articles.value = res.data.articles;
      } else {
        ElMessage("获取不到数据");
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
  getArticleCatAll().then((res) => {
    if (res.success) {
      articleCats.value = res.data.articleCats;
    } else {
      ElMessage("获取不到数据");
    }
  });
});
</script>

<style scoped>
.article-list-top_bg {
  width: 100%;
  height: 60px;
  background-color: #6e48e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9c6fb;
}
.scrollbar-flex-content {
  display: flex;
  max-width: 70%; /* 你可以根据需要调整宽度 */
  overflow-x: auto;
  white-space: nowrap; /* 防止文字换行 */
}

.scrollbar-flex-content2 {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
}
.scrollbar-flex-content2 p {
  width: 89px;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 30px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.article {
  margin-left: 5%;
  border-bottom: 1px dashed rgb(181, 177, 248);
  padding-top: 5%;
}

.article-title {
  margin-left: 5%;
  margin-right: 5%;
}

.artice-time {
  margin-top: 5%;
  margin-left: 10%;
}
.article-list-top_nav {
  display: flex;
}
.category-popup {
  width: 80%;
  height: 34%;
  padding: 28px;
  border-radius: 10%;
  position: fixed; /* 让弹窗固定在视图中，不随滚动 */
  top: 50%; /* 使弹窗垂直居中 */
  left: 50%; /* 使弹窗水平居中 */
  transform: translate(-50%, -50%); /* 居中对齐 */
  background-color: white; /* 弹窗背景颜色 */
  padding: 20px; /* 弹窗内边距 */
  border: 1px solid #ccc; /* 弹窗边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  z-index: 999; /* 确保弹窗在最顶层 */
}
.delete-button {
  position: absolute;
  border-radius: 100px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: red; /* 设置按钮背景颜色 */
  color: white; /* 设置文本颜色 */
  border: none; /* 去掉边框 */
  padding: 5px 10px; /* 调整按钮的内边距 */
  border-radius: 4px; /* 添加圆角 */
}
.category-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  z-index: 998; /* 位于弹窗下方，但在弹窗上方 */
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* 背景虚化效果 */
}
.article-list-top_btn {
  position: absolute;
  left: 28px;
}
</style>