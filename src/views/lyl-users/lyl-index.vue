<template>
  <div class="lyl-index">
    <div class="lyl-index-top">
      <p>个人中心</p>
    </div>
    <div class="lyl-index-middle">
      <div class="index-middle_view">
        <img class="index-middle-view_img" src="@/images/login_top.jpeg" />
        <p class="index-middle-view_p">{{ user.username }}</p>
      </div>
      <div class="index-middle_input">
        <el-descriptions class="centered-item" :column="1">
          <el-descriptions-item align="center" label="邮箱:">{{
            user.email
          }}</el-descriptions-item>
          <el-descriptions-item align="center" label="创建时间:">{{
            formattedCreateTime
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="index-middle_button">
        <el-button type="primary" @click="onGoArticle">文章列表</el-button>
        <el-button type="danger" @click="onLogOut">退出登陆</el-button>
      </div>
    </div>
    <div class="lyl-buttom"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { login } from "@/http/user.js";

const userStore = useUserStore();
const router = useRouter();
const user = ref({
  username: "",
  email: "",
  createTime: "",
});

const data = {
  email: localStorage.getItem("auth_email"),
  password: localStorage.getItem("auth_password"),
};

const dataLoaded = ref(false);

onMounted(() => {
  login(data)
    .then((res) => {
      if (res.success) {
        user.value.email = res.data.userinfo.email;
        user.value.username = res.data.userinfo.userName;
        user.value.createTime = res.data.userinfo.createTime;
        console.log("user:", user.value);
        dataLoaded.value = true; // 设置数据已加载的标志
      } else {
        ElMessage("获取不到数据");
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
});

const onGoArticle = () => {
  router.push("/article/list");
};

const onLogOut = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_userName");
  localStorage.removeItem("auth_email");
  localStorage.removeItem("auth_password");
  router.push("/login");
};
const formattedCreateTime = computed(() => {
  if (user.value.createTime) {
    const date = new Date(user.value.createTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return "";
});
</script>

<style scoped>
.lyl-index {
  width: 100%;
  height: 100%;
  text-align: center;
}
.lyl-index-top {
  width: 100%;
  height: 60px;
  background-color: #6e48e7;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d9c6fb;
}
.index-middle_view {
  margin-top: 32px;
}
.index-middle-view_img {
  width: 120px;
  height: 120px;
  border-radius: 120px;
}
.index-middle-view_p {
  color: #9283dd;
  margin: 0;
  font-size: 20px;
}
.index-middle_input {
  margin-top: 20px;
  padding: 0 24%;
}
.index-middle_button {
  margin-top: 20px;
}
.centered-item {
  text-align: center;
}
</style>