<template>
    <div class="lyl-login">
        <div class="lyl-login-top">
            <p class="login-top_title">miracle</p>
        </div>
        <div class="lyl-login-middle">
            <div class="login-middle_nav">
                <div class="login-middle_signIn">
                    <p>Sign In</p>
                </div>
            </div>
            <div class="login-middle_input">
                <div class="login-middle-input_signIn login-input">
                    <el-input type="email" v-model="loginForm.email" placeholder="请输入邮箱">
                        <template #prefix>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="login-middle-input_signUp login-input">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码">
                            <template #prefix>
                                <el-icon>
                                    <Lock />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
            </div>
            <div class="login-middle_button">
                <div class="login-middle-button_signIn login-middle-button">
                    <el-button type="primary" @click="onLogin" round>登录</el-button>
                </div>
                <div class="login-middle-button_signUp login-middle-button"></div>
                <el-button type="primary" @click="onRegister" round>注册</el-button>
                <p class="login-middle-button_p">忘记密码？</p>
            </div>
        </div>
        <div class="lyl-login-buttom">

        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useUserStore } from '@/store/user'
import { login } from '@/http/user.js'

const router = useRouter();
const userStore = useUserStore();
const loginForm = reactive({
    password: "",
    email: ""
})

const onLogin = () => {
    const data = loginForm;
    userLogin(data);
}

const onRegister = () => {
    router.push("/register");
    
}

const userLogin = (data) => {
    login(data).then(res => {
        if (res.success) {
            userStore.user.token = res.data.userinfo.token;
            userStore.user.email = res.data.userinfo.email;
            userStore.user.userName = res.data.userinfo.userName;
            localStorage.setItem('auth_token', userStore.user.token);
            localStorage.setItem('auth_email', userStore.user.email);
            localStorage.setItem('auth_userName', userStore.user.userName);
            localStorage.setItem('auth_password', loginForm.password);
            console.log(res);
            router.push("/index")
        } else {
            ElMessage(res.msg)
        }
    }).catch(err => {
        ElMessage.error(err)
    })
}
</script>

<style scoped>
.lyl-login {
    width: 100%;
    height: 100%;
    text-align: center;
}
.lyl-login-top {
    width: 100%;
    height: 232px;
    background-image: url("../images/login_top.jpeg");
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-top_title {
    font-size: 48px;
    color: #efedf8;
    font-weight: bold;
}
.lyl-login-middle {
    width: 100%;
    min-height: 500px;
}
.login-middle_nav {
    width: 100%;
    height: 72px;
    background-color: #ededf8;
    display: flex;
    justify-content: space-evenly;
    font-size: 20px;
    color: #a393e9;
    font-weight: bold;
}
.login-middle_input {
    width: 100%;
    padding-top: 24px;
}
.login-middle-input_signIn {
    width: 100%;
    height: 56px;
}
.login-middle-input_signUp {
    width: 100%;
    height: 56px;
}
.login-input {
    width: 72%;
    margin: auto;
}
.login-middle_button {
    width: 100%;
    padding-top: 10px;
    
}
.el-input {
    height: 40px;
}
.el-button {
    width: 256px;
    height: 40px;
    font-size: 20px;
}
.login-middle-button_p {
    margin-left: 190px;
    color: #b3b2c2;
}

.login-middle-button {
    width: 100%;
    height: 28px;
}
.lyl-login-buttom {
}
</style>