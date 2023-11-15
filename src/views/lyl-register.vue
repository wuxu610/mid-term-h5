<template>
    <div class="lyl-register">
        <div class="lyl-register-top">
            <p class="register-top_title">miracle</p>
        </div>
        <div class="lyl-register-middle">
            <div class="register-middle_nav">
                <div class="register-middle_signUp">
                    <p>Sign Up</p>
                </div>
            </div>
            <div class="register-middle_input">
                <div class="register-middle-input_signUp ">
                        <el-input v-model="RegisterForm.userName" placeholder="请输入用户名">
                            <template #prefix>
                                <el-icon>
                                    <User />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                <div class="register-middle-input_signUp ">
                    <el-input type="email" v-model="RegisterForm.email" placeholder="请输入邮箱">
                        <template #prefix>
                            <el-icon>
                                <Message />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="register-middle-input_signUp ">
                    <el-input type="password" v-model="RegisterForm.password" placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="register-middle-input_signUp ">
                    <el-input type="password" v-model="RegisterForm.repassword" placeholder="请重新输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="register-middle_button">
                <div class="register-middle-button_signUp register-middle-button"></div>
                <el-button type="primary" @click="onRegister" round>注册</el-button>
                <p class="register-middle-button_p" @click="onGoLogin">返回登陆</p>
            </div>
        </div>
        <div class="lyl-register-buttom">

        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "vue"
import { register } from '@/http/user.js'
import { ElMessage } from 'element-plus'
const router = useRouter();

const RegisterForm = reactive({
    userName: "",
    password: "",
    repassword: '',
    email: ""
})

const onRegister = () => {
    if (RegisterForm.password === RegisterForm.repassword) {
        const data = RegisterForm;
        userRegister(data);
    } else {
        ElMessage.error("输入错误")
        return false
    }
}

const userRegister = (data) => {
    register(data).then(res => {
        if (res.success) {
            router.push("/login")
        } else {
            ElMessage(res.msg)
        }
    }).eatch(err => {
        ElMessage.error(err)
    })
}

const onGoLogin = () => {
    router.push("/login");
}
</script>

<style scoped>
.lyl-register {
    width: 100%;
    height: 100%;
    text-align: center;
}

.lyl-register-top {
    width: 100%;
    height: 232px;
    background-image: url("../images/login_top.jpeg");
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-top_title {
    font-size: 48px;
    color: #efedf8;
    font-weight: bold;
}

.lyl-register-middle {
    width: 100%;
    min-height: 500px;
}

.register-middle_nav {
    width: 100%;
    height: 72px;
    background-color: #ededf8;
    display: flex;
    justify-content: space-evenly;
    font-size: 20px;
    color: #a393e9;
    font-weight: bold;
}

.register-middle_input {
    width: 100%;
    padding-top: 24px;
}

.register-middle-input_signUp {
    height: 56px;
    width: 72%;
    margin: auto;
}


.register-middle_button {
    width: 100%;
    height: 160px;
    padding-top: 20px;

}

.el-input {
    height: 40px;
}

.el-button {
    width: 256px;
    height: 40px;
    font-size: 20px;
}

.register-middle-button_p {
    margin-left: 190px;
    color: #b3b2c2;
}

.register-middle-button {
    width: 100%;
}
.register-middle-button_p {
    cursor: pointer;
}
.lyl-register-buttom {}</style>