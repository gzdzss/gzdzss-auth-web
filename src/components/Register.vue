<template>
    <div>

        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <h1>gzDzss注册</h1>
        <form>
            <label>用户名<input type="text" autocomplete="username" v-model="registerForm.username"
                             placeholder="用户名"/></label><br>
            <label>密码<input type="password" autocomplete="current-password" v-model="registerForm.password"
                            placeholder="密码"/></label><br>
            <button type="button" @click="register">Register</button>
            <br>
            <br>
            <br>
            <br>
            <a href="/login">已经有账号了，去登录</a>

        </form>
    </div>
</template>

<script>
    import {register} from "@/api/userApi";

    export default {
        name: "Register",
        data: () => ({
            registerForm: {
                username: '',
                password: ''
            }
        }),
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            }
        }, methods: {
            register() {
                register(this.registerForm).then(() => {
                    this.$router.push({
                        name: 'Login'
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>