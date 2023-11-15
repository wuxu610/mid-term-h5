<template>
  <div
    class="lyl-article-list-1"
    v-for="item in articleList"
    :key="item.id"
    @click="getArticleById(item.id)"
  >
    <div
      class="lyl-article-list"
      v-if="showCat == item.articleCatId || showCat == '0'"
    >
      <div class="article-list-top">
        <div class="article-list-top_title">
          {{ item.title }}
        </div>
        <div class="article-list-top_time">
          {{ formatDate(item.createTime) }}
        </div>
      </div>
      <div class="article-list-middle">
        {{ item.content }}
      </div>
      <div class="article-list-button">
        <LYLArticleCatList
          :articleCatId="item.articleCatId"
        ></LYLArticleCatList>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import LYLArticleCatList from "@/components/LYLArticleCatList.vue";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    showCat: {
      type: String,
    },
    articleList: {
      type: Object,
    },
  },
  setup(props) {
    const router = useRouter();
    console.log(props.showCat + "showCat");

    const getArticleById = (id) => {
      router.push("/article/index?id=" + id);
      console.log("id:" + id);
    };

    const formatDate = (datetime) => {
      const date = new Date(datetime);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    return {
      getArticleById,
      formatDate,
    };
  },
};
</script>

<style scoped>
.lyl-article-list {
  width: 100%;
  height: 120px;
  margin-top: 20px;
  border-bottom: 1px solid;
}
.article-list-top {
  display: flex;
  padding: 0 24px;
  justify-content: space-between;
}
.article-list-top_title {
  width: 64%;
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-list-top_time {
  color: #d6d6d6;
}
.article-list-middle {
  height: 48px;
  padding: 0 24px;
  color: #949296;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制显示两行文本 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.article-list-middle {
  padding-top: 10px;
}
.article-list-button {
  margin-left: 10px;
}
</style>