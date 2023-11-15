<template>
  <div class="lyl-articleCat-list">
    {{ articleCatName ? articleCatName : "无分类" }}
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getArticleCatById } from "@/http/article.js";
import { ElMessage } from "element-plus"; // 确保已正确引入 ElMessage

export default {
  props: {
    articleCatId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const articleCatName = ref("");

    const fetchData = () => {
      getArticleCatById(props.articleCatId)
        .then((res) => {
          if (res.success) {
            articleCatName.value = res.data.articleCat.catName;
          } else {
            ElMessage("获取不到数据");
          }
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      articleCatName, // 在 setup 函数中返回 articleCatName 变量
    };
  },
};
</script>

<style scoped>
</style>
