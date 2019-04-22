<template>
    <div>
        <p style="color:red" v-show="httpError.hasError">{{httpError.status}} | {{httpError.statusText}}</p>
        <form>
            <label>用户名<input type="text" autocomplete="username" v-model="loginForm.username" placeholder="用户名"/></label><br>
            <label>密码<input type="password" autocomplete="current-password" v-model="loginForm.password"
                            placeholder="密码"/></label><br>
            <button type="button" @click="login">login</button>
            <br>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: "Login",
        data: () => ({
            loginForm: {
                username: '',
                password: ''
            }
        }),
        computed: {
            httpError() {
                return this.$store.state.app.httpError;
            }
        },
        methods: {
            ...mapActions([
                'handleLogin'
            ]),
            login() {
                this.handleLogin(this.loginForm).then(()=> {
                    if (this.$route.query.redirect === location.hostname) {
                        this.$router.go(-1)
                    } else {
                        this.$router.push({
                            name: 'Index'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>