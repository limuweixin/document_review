<template>
    <div class="login-wrapper">
        <el-form
                class="login-form"
                autocomplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left"
        >
            <div class="title-container">
                <h3 class="title">诺瓦文档评审系统</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                  <i class="iconfont icon-dengluyonghuming"></i>
                </span>
                <el-input
                        name="username"
                        type="text"
                        v-model="loginForm.username"
                        autocomplete="on"
                        placeholder="请输入用户名"
                />
            </el-form-item>

            <el-form-item prop="password">
                <span class="svg-container">
                  <i class="iconfont icon-mima"></i>
                </span>
                <el-input
                        name="password"
                        :type="passwordType"
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.password"
                        autocomplete="on"
                        placeholder="请输入密码"
                />
                <span class="show-pwd" @click="showPwd">
                  <i class="iconfont" :class="passwordType==='password'?'icon-yanjing-bi':'icon-yanjing'"></i>
                </span>
            </el-form-item>

            <el-button
                    type="primary"
                    style="width:100%;height:50px;margin-bottom:20px;font-size:16px;"
                    :loading="loading"
                    @click.native.prevent="handleLogin"
            >登&nbsp;录</el-button>
        </el-form>
    </div>
</template>

<script>
    import { isvalidUsername } from "@/utils/validate";

    export default {
        name: "login",
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error("请输入用户名"));
                } else {
                    callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error("密码不能小于6位"));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                loginRules: {
                    username: [
                        { required: true, trigger: "blur", validator: validateUsername }
                    ],
                    password: [
                        { required: true, trigger: "blur", validator: validatePassword }
                    ]
                },
                passwordType: "password",
                loading: false
            };
        },
        computed:{
            /*fullheight(){
                return document.documentElement.clientHeight
            }*/
        },
        methods: {
            showPwd() {
                if (this.passwordType === "password") {
                    this.passwordType = "";
                } else {
                    this.passwordType = "password";
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = false;
                        this.$router.push({ path: "/home" });

                       /* this.loading = true;
                        this.$store.dispatch("LoginByUsername", this.loginForm)
                            .then(() => {
                                this.loading = false;
                                this.$router.push({ path: "/home" });
                            })
                            .catch(res => {
                                this.loading = false;
                                if (res.code == 0) {
                                    this.$message({
                                        message: res.msg,
                                        type: "warning"
                                    });
                                }
                            });*/
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        },
        created() {},
        destroyed() {}
    };
</script>

<style scoped>
.login-wrapper{
    overflow: hidden;
    background: #339966;
    height:100%;
}
.login-form{
    width: 20%;
    padding: 20px;
    margin: 0 auto;
    margin-top: 13rem;
    border: 1px solid #eee;
    background: #f5f9f3;
}
</style>
